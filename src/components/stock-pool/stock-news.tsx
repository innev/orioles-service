'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

interface NewsItem {
  source: string;
  title: string;
  content: string;
  publishedAt: string;
}

interface StockNewsProps {
  code: string;
  market: string;
  limit?: number;
}

// 去除快讯内容中的 HTML 标签
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// 相关资讯面板：快讯列表（时间 + 来源徽标 + 内容摘要）
export function StockNews({ code, market, limit = 30 }: StockNewsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/ashare/stocks/${code}/news?market=${market}&limit=${limit}`);
        const result = await res.json();

        if (result.code !== 0) {
          throw new Error(result.message || '获取相关资讯失败');
        }

        setNews(Array.isArray(result.data) ? result.data : []);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [code, market, limit]);

  if (loading) {
    return (
      <div className="h-[350px] flex items-center justify-center text-muted-foreground">
        加载相关资讯...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[350px] flex flex-col items-center justify-center gap-2">
        <div className="text-yellow-400">⚠️ {error}</div>
        <div className="text-xs text-muted-foreground">资讯服务暂时不可用，请稍后再试</div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="h-[350px] flex items-center justify-center text-muted-foreground">
        暂无相关资讯
      </div>
    );
  }

  return (
    <div className="max-h-[400px] overflow-auto space-y-3 pr-1">
      {news.map((item, i) => (
        <div
          key={i}
          className="rounded-lg border border-border bg-background p-3"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <Badge variant="outline" className="text-blue-400 border-blue-400/30">
              {item.source || '快讯'}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {item.publishedAt ? new Date(item.publishedAt).toLocaleString('zh-CN') : '-'}
            </span>
          </div>
          {item.title && (
            <div className="text-sm font-medium mb-1">{stripHtml(item.title)}</div>
          )}
          <div className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {stripHtml(item.content)}
          </div>
        </div>
      ))}
    </div>
  );
}
