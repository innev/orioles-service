import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { checkStockAlerts } from '@/lib/alerts';
import { pushAlertsToFeishu } from '@/lib/feishu';
import { fetchRealtimeQuotes } from '@/lib/realtime';

// 告警冷却时间：同 code + alertType 30 分钟内只记录/推送一次
const ALERT_COOLDOWN_MS = 30 * 60 * 1000;

// GET /api/alerts/check - 检查预警
export async function GET(request: Request) {
  try {
    
    const { searchParams } = new URL(request.url);
    const force = searchParams.get('force') === 'true';
    const noFeishu = searchParams.get('nofeishu') === 'true';
    
    // 获取所有股票
    const stocks = await prisma.watchlist.findMany();
    
    // 获取实时行情
    const codes = stocks.map(s => s.code);
    const realtimeQuotes = await fetchRealtimeQuotes(codes);
    
    const triggeredAlerts: any[] = [];
    
    // 检查每只股票的预警
    for (const stock of stocks) {
      const quote = realtimeQuotes.find(q => q.code === stock.code);
      if (!quote) continue;
      
      const alerts = JSON.parse(stock.alertsJson || '{}');
      if (Object.keys(alerts).length === 0) continue;
      
      const stockConfig = {
        code: stock.code,
        name: stock.name,
        cost: Number(stock.cost),
        alerts
      };
      
      const stockAlerts = checkStockAlerts(stockConfig, {
        current: quote.current,
        changePct: quote.changePct,
        volume: quote.volume,
        avgVolume: quote.avgVolume
      });
      
      triggeredAlerts.push(...stockAlerts);
    }
    
    // 冷却去重：同 code + alertType 30 分钟内已有记录则跳过（force=true 时跳过冷却检查）
    let alertsToSave = triggeredAlerts;
    let skippedCount = 0;
    if (!force && triggeredAlerts.length > 0) {
      const cooldownSince = new Date(Date.now() - ALERT_COOLDOWN_MS);
      const recentAlerts = await prisma.alertHistory.findMany({
        where: { createdAt: { gte: cooldownSince } },
        select: { code: true, alertType: true }
      });
      const recentKeys = new Set(recentAlerts.map(a => `${a.code}:${a.alertType}`));
      alertsToSave = triggeredAlerts.filter(a => !recentKeys.has(`${a.code}:${a.type}`));
      skippedCount = triggeredAlerts.length - alertsToSave.length;
    }

    // 批量写入数据库
    if (alertsToSave.length > 0) {
      await prisma.alertHistory.createMany({
        data: alertsToSave.map(alert => ({
          code: alert.code,
          alertType: alert.type,
          severity: alert.severity,
          message: alert.message,
          currentValue: alert.currentValue,
          thresholdValue: alert.thresholdValue
        }))
      });
    }

    // 推送飞书（在写库之后，推送失败不影响已写入的告警记录）
    let feishuSent = false;
    if (!noFeishu && alertsToSave.length > 0) {
      const feishuResult = await pushAlertsToFeishu(alertsToSave);
      feishuSent = feishuResult.sent;
    }

    return NextResponse.json({
      success: true,
      data: {
        alertsFound: triggeredAlerts.length,
        alertsSaved: alertsToSave.length,
        alertsSkipped: skippedCount,
        alerts: triggeredAlerts,
        feishuSent,
        force
      }
    });
    
  } catch (error) {
    console.error('Alert check error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check alerts' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
