import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

interface BlockData {
  height: number;
  txCount: number;
  timestamp: number;
}

interface BlockChartProps {
  data?: BlockData[];
  currentBlock?: number;
}

export default function BlockChart({ 
  data = [
    { height: 870530, txCount: 2845, timestamp: Date.now() - 1200000 },
    { height: 870531, txCount: 3156, timestamp: Date.now() - 1080000 },
    { height: 870532, txCount: 2973, timestamp: Date.now() - 960000 },
    { height: 870533, txCount: 3412, timestamp: Date.now() - 840000 },
    { height: 870534, txCount: 3087, timestamp: Date.now() - 720000 },
    { height: 870535, txCount: 2654, timestamp: Date.now() - 600000 },
    { height: 870536, txCount: 3298, timestamp: Date.now() - 480000 },
    { height: 870537, txCount: 2889, timestamp: Date.now() - 360000 },
    { height: 870538, txCount: 3145, timestamp: Date.now() - 240000 },
    { height: 870539, txCount: 3456, timestamp: Date.now() - 120000 }
  ],
  currentBlock = 870540
}: BlockChartProps) {

  const chartData = data.map(block => ({
    ...block,
    name: `#${block.height}`,
    value: block.txCount
  }));

  const average = Math.round(data.reduce((sum, block) => sum + block.txCount, 0) / data.length);
  const trend = data.length > 1 ? 
    (data[data.length - 1].txCount - data[0].txCount) > 0 ? 'up' : 'down' : 'neutral';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-popover-border rounded-lg p-3 shadow-lg">
          <p className="font-mono font-semibold text-sm">{label}</p>
          <p className="font-mono text-bitcoin text-lg">
            {payload[0].value.toLocaleString()} txs
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            {new Date(data.timestamp).toLocaleTimeString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 border-accent/20 bg-gradient-to-br from-card to-card/50 hover-elevate" data-testid="card-block-chart">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-mono font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-accent-foreground" />
            Block History
          </h3>
          <div className="flex items-center gap-2">
            <TrendingUp className={`h-4 w-4 ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-muted-foreground'}`} />
            <span className="text-sm font-mono text-muted-foreground">
              Avg: {average.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="h-48 w-full" data-testid="chart-blocks">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontFamily: 'monospace', fill: 'hsl(var(--muted-foreground))' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontFamily: 'monospace', fill: 'hsl(var(--muted-foreground))' }}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(25 100% 50%)"
                strokeWidth={2}
                dot={{ fill: 'hsl(25 100% 50%)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(200 100% 60%)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <p className="text-lg font-mono font-bold text-success" data-testid="text-max-tx">
              {Math.max(...data.map(d => d.txCount)).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground font-mono">Peak</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-mono font-bold text-bitcoin" data-testid="text-avg-tx">
              {average.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground font-mono">Average</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-mono font-bold text-danger" data-testid="text-min-tx">
              {Math.min(...data.map(d => d.txCount)).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground font-mono">Low</p>
          </div>
        </div>
      </div>
    </Card>
  );
}