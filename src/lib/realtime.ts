export interface RealtimeQuote {
  code: string;
  name: string;
  current: number;
  changePct: number;
  volume: number;
  avgVolume?: number;
  open: number;
  close: number;
  high: number;
  low: number;
  amount: number;
  source: string;
}

// 转换股票代码为各平台格式
function toSinaCode(code: string, market: string): string {
  if (market === 'hk') return `rt_hk${code}`;
  if (market === 'us') return `gb_${code.toLowerCase()}`;
  if (market === 'sh') return `sh${code}`;
  if (market === 'sz') return `sz${code}`;
  if (market === 'bj') return `bj${code}`;
  return code;
}

function toTencentCode(code: string, market: string): string {
  if (market === 'hk') return `hk${code}`;
  if (market === 'us') return `us${code}`;
  if (market === 'sh') return `sh${code}`;
  if (market === 'sz') return `sz${code}`;
  return code;
}

function toEastMoneyCode(code: string, market: string): string {
  const marketMap: Record<string, string> = {
    'sh': '1', 'sz': '0', 'bj': '0', 'hk': '116', 'us': '105'
  };
  return `${marketMap[market] || '1'}.${code}`;
}

// 数据源 1: 新浪财经
async function fetchFromSina(codes: string[], markets: string[]): Promise<Record<string, RealtimeQuote>> {
  const sinaCodes = codes.map((code, i) => toSinaCode(code, markets[i] || 'sh'));
  const url = `https://hq.sinajs.cn/list=${sinaCodes.join(',')}`;

  const response = await fetch(url, {
    headers: {
      'Referer': 'https://finance.sina.com.cn',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!response.ok) throw new Error(`Sina error: ${response.status}`);

  const buffer = await response.arrayBuffer();
  const text = new TextDecoder('gb2312').decode(buffer);
  
  const result: Record<string, RealtimeQuote> = {};
  
  for (const line of text.split('\n')) {
    if (!line.includes('=')) continue;
    
    const lineParts = line.split('=');
    const keyPart = lineParts[0];
    const valuePart = lineParts[1];
    const codeKey = keyPart?.split('_').pop()?.replace(/^(sh|sz|hk|bj|rt_hk|gb_)/, '');
    const dataStr = valuePart?.trim().replace(/[";]/g, '');
    
    if (!codeKey || !dataStr) continue;
    const parts = dataStr.split(',');
    if (parts.length < 33) continue;

    const code = codeKey.toUpperCase();
    const current = parseFloat(parts[3]!);
    const close = parseFloat(parts[2]!);
    const volume = parseInt(parts[8]!);
    
    result[code] = {
      code,
      name: parts[0]!,
      open: parseFloat(parts[1]!),
      close,
      current,
      high: parseFloat(parts[4]!),
      low: parseFloat(parts[5]!),
      volume,
      amount: parseFloat(parts[9]!),
      changePct: close > 0 ? Math.round((current - close) / close * 10000) / 100 : 0,
      source: 'sina'
    };
  }

  return result;
}

// 数据源 2: 腾讯财经
async function fetchFromTencent(codes: string[], markets: string[]): Promise<Record<string, RealtimeQuote>> {
  const tencentCodes = codes.map((code, i) => toTencentCode(code, markets[i] || 'sh'));
  const url = `https://qt.gtimg.cn/q=${tencentCodes.join(',')}`;

  const response = await fetch(url, {
    headers: {
      'Referer': 'https://stock.qq.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!response.ok) throw new Error(`Tencent error: ${response.status}`);

  const buffer = await response.arrayBuffer();
  const text = new TextDecoder('gb2312').decode(buffer);
  
  const result: Record<string, RealtimeQuote> = {};
  
  for (const line of text.split(';')) {
    if (!line.includes('=')) continue;
    
    const lineParts = line.split('=');
    const keyPart = lineParts[0];
    const valuePart = lineParts[1];
    const codeKey = keyPart?.split('_').pop()?.replace(/^(sh|sz|hk|us)/, '');
    const dataStr = valuePart?.trim().replace(/["]/g, '');
    
    if (!codeKey || !dataStr) continue;
    const parts = dataStr.split('~');
    if (parts.length < 45) continue;

    const code = codeKey.toUpperCase();
    const current = parseFloat(parts[3]!);
    const close = parseFloat(parts[2]!);
    
    result[code] = {
      code,
      name: parts[1] || parts[0]!,
      open: parseFloat(parts[5]!),
      close,
      current,
      high: parseFloat(parts[33]!),
      low: parseFloat(parts[34]!),
      volume: parseInt(parts[36]!),
      amount: parseFloat(parts[37]!),
      changePct: parseFloat(parts[32]!) || (close > 0 ? Math.round((current - close) / close * 10000) / 100 : 0),
      source: 'tencent'
    };
  }

  return result;
}

// 数据源 3: 东方财富
async function fetchFromEastMoney(codes: string[], markets: string[]): Promise<Record<string, RealtimeQuote>> {
  const emCodes = codes.map((code, i) => toEastMoneyCode(code, markets[i] || 'sh'));
  const url = `https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&fields=f12,f13,f14,f2,f3,f4,f5,f6,f17,f18,f15,f16&secids=${emCodes.join(',')}`;

  const response = await fetch(url, {
    headers: {
      'Referer': 'https://quote.eastmoney.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });

  if (!response.ok) throw new Error(`EastMoney error: ${response.status}`);

  const json = await response.json();
  
  if (!json.data?.diff) throw new Error('EastMoney invalid response');

  const result: Record<string, RealtimeQuote> = {};
  
  for (const item of json.data.diff) {
    const code = item.f12 as string;
    const current = item.f2 as number | string;
    const close = item.f18 as number;
    
    if (!code || current === '-' || typeof current !== 'number') continue;
    
    result[code] = {
      code,
      name: item.f14 as string,
      open: item.f17 as number,
      close,
      current,
      high: item.f15 as number,
      low: item.f16 as number,
      volume: item.f5 as number,
      amount: item.f6 as number,
      changePct: item.f3 as number,
      source: 'eastmoney'
    };
  }

  return result;
}

// 主数据获取函数 - 带失败重试和多源切换
export async function fetchRealtimeQuotes(codes: string[]): Promise<RealtimeQuote[]> {
  if (codes.length === 0) return [];
  
  // 获取市场信息（从代码推断）
  const markets = codes.map(code => {
    if (code.startsWith('6')) return 'sh';
    if (code.startsWith('0') || code.startsWith('3')) return 'sz';
    if (code.startsWith('8') || code.startsWith('4')) return 'bj';
    if (/^\d{5}$/.test(code)) return 'hk';
    return 'us';
  });

  const sources = [
    { name: 'sina', fetch: fetchFromSina },
    { name: 'tencent', fetch: fetchFromTencent },
    { name: 'eastmoney', fetch: fetchFromEastMoney }
  ];

  let lastError: Error | null = null;

  for (const source of sources) {
    try {
      console.log(`Trying data source: ${source.name}`);
      const data = await source.fetch(codes, markets);
      
      const validCodes = Object.keys(data).length;
      if (validCodes > 0) {
        console.log(`✅ Data source ${source.name} returned ${validCodes} stocks`);
        return Object.values(data);
      }
      
      console.warn(`⚠️ Data source ${source.name} returned empty`);
    } catch (error) {
      console.warn(`❌ Data source ${source.name} failed:`, error);
      lastError = error as Error;
    }
  }

  throw lastError || new Error('All data sources failed');
}
