import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap } from 'lucide-react';

interface LiveBlockDisplayProps {
  currentBlock?: {
    height: number;
    txCount: number;
    timestamp: number;
    hash: string;
  };
  nextBlockCountdown?: number;
  mempoolSize?: number;
}

export default function LiveBlockDisplay({ 
  currentBlock = { height: 870542, txCount: 3247, timestamp: Date.now() - 120000, hash: 'abc123...' },
  nextBlockCountdown = 480,
  mempoolSize = 15420
}: LiveBlockDisplayProps) {
  const [countdown, setCountdown] = useState(nextBlockCountdown);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 border-bitcoin/20 bg-gradient-to-br from-card to-card/50 hover-elevate" data-testid="card-live-block">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-mono font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-bitcoin" />
            Live Block #{currentBlock.height.toLocaleString()}
          </h2>
          <Badge variant="outline" className="font-mono text-electric">
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(countdown)}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-mono">Current Transactions</p>
            <p className="text-3xl font-mono font-bold text-bitcoin" data-testid="text-current-tx">
              {currentBlock.txCount.toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-mono">Mempool Size</p>
            <p className="text-3xl font-mono font-bold text-electric" data-testid="text-mempool-size">
              {mempoolSize.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono">
            Hash: {currentBlock.hash}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            {new Date(currentBlock.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </Card>
  );
}