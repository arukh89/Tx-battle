import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Target, Flame, BarChart3 } from 'lucide-react';

interface PlayerStatsProps {
  stats?: {
    totalGames: number;
    wins: number;
    accuracy: number;
    currentStreak: number;
    longestStreak: number;
    totalPoints: number;
    rank: number;
    averageError: number;
  };
}

export default function PlayerStats({ 
  stats = {
    totalGames: 247,
    wins: 89,
    accuracy: 73.6,
    currentStreak: 5,
    longestStreak: 18,
    totalPoints: 12450,
    rank: 42,
    averageError: 285
  }
}: PlayerStatsProps) {
  
  const winRate = Math.round((stats.wins / stats.totalGames) * 100);
  const accuracyColor = stats.accuracy >= 80 ? 'text-success' : 
                       stats.accuracy >= 60 ? 'text-bitcoin' : 'text-danger';

  return (
    <Card className="p-6 border-primary/20 bg-gradient-to-br from-card to-card/50 hover-elevate" data-testid="card-player-stats">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-mono font-semibold flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Your Stats
          </h3>
          <Badge variant="outline" className="font-mono">
            Rank #{stats.rank}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <Target className="h-6 w-6 mx-auto mb-2 text-bitcoin" />
            <p className="text-2xl font-mono font-bold text-bitcoin" data-testid="text-accuracy">
              {stats.accuracy}%
            </p>
            <p className="text-xs text-muted-foreground font-mono">Accuracy</p>
          </div>
          
          <div className="text-center p-4 bg-background/50 rounded-lg">
            <Flame className="h-6 w-6 mx-auto mb-2 text-danger" />
            <p className="text-2xl font-mono font-bold text-danger" data-testid="text-streak">
              {stats.currentStreak}
            </p>
            <p className="text-xs text-muted-foreground font-mono">Current Streak</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-mono text-muted-foreground">Win Rate</span>
              <span className="font-mono font-semibold">{winRate}%</span>
            </div>
            <Progress value={winRate} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-mono font-bold" data-testid="text-total-games">
                {stats.totalGames}
              </p>
              <p className="text-xs text-muted-foreground font-mono">Games</p>
            </div>
            <div>
              <p className="text-lg font-mono font-bold text-success" data-testid="text-wins">
                {stats.wins}
              </p>
              <p className="text-xs text-muted-foreground font-mono">Wins</p>
            </div>
            <div>
              <p className="text-lg font-mono font-bold text-electric" data-testid="text-points">
                {stats.totalPoints.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground font-mono">Points</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex justify-between">
            <span className="text-sm font-mono text-muted-foreground">Longest Streak</span>
            <span className="text-sm font-mono font-semibold">{stats.longestStreak} games</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-mono text-muted-foreground">Avg. Error</span>
            <span className="text-sm font-mono font-semibold">±{stats.averageError} txs</span>
          </div>
        </div>

        <div className="text-center">
          <BarChart3 className="h-4 w-4 inline mr-2 text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-mono">
            Playing since Block #850,124
          </span>
        </div>
      </div>
    </Card>
  );
}