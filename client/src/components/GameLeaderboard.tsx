import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

interface Player {
  id: string;
  username: string;
  avatar?: string;
  score: number;
  accuracy: number;
  streak: number;
  rank: number;
}

interface GameLeaderboardProps {
  players?: Player[];
  currentUserId?: string;
}

export default function GameLeaderboard({ 
  players = [
    { id: '1', username: 'bitcoinpro', avatar: '', score: 15420, accuracy: 87.5, streak: 12, rank: 1 },
    { id: '2', username: 'satoshi_fan', avatar: '', score: 14250, accuracy: 82.1, streak: 8, rank: 2 },
    { id: '3', username: 'blockchainBeth', avatar: '', score: 13890, accuracy: 79.3, streak: 15, rank: 3 },
    { id: '4', username: 'txpredictor', avatar: '', score: 12100, accuracy: 76.8, streak: 5, rank: 4 },
    { id: '5', username: 'mempoolmaster', avatar: '', score: 11850, accuracy: 74.2, streak: 7, rank: 5 }
  ],
  currentUserId = '3'
}: GameLeaderboardProps) {
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-amber-600" />;
      default: return <span className="text-sm font-mono font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getInitials = (username: string) => {
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <Card className="p-6 border-electric/20 bg-gradient-to-br from-card to-card/50 hover-elevate" data-testid="card-leaderboard">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-mono font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-electric" />
            Leaderboard
          </h3>
          <Badge variant="outline" className="font-mono">
            {players.length} Players
          </Badge>
        </div>

        <div className="space-y-3">
          {players.map((player) => (
            <div 
              key={player.id} 
              className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                player.id === currentUserId 
                  ? 'bg-bitcoin/10 border-bitcoin/30 shadow-sm' 
                  : 'bg-background/50 border-border hover:bg-muted/30'
              }`}
              data-testid={`row-player-${player.rank}`}
            >
              <div className="flex items-center justify-center w-8">
                {getRankIcon(player.rank)}
              </div>

              <Avatar className="h-10 w-10">
                <AvatarImage src={player.avatar} alt={player.username} />
                <AvatarFallback className="text-xs font-mono bg-muted">
                  {getInitials(player.username)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="font-mono font-semibold text-sm truncate" data-testid={`text-username-${player.rank}`}>
                  {player.username}
                  {player.id === currentUserId && (
                    <Badge variant="secondary" className="ml-2 text-xs">You</Badge>
                  )}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted-foreground font-mono">
                    {player.accuracy}% accuracy
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {player.streak} streak
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-mono font-bold text-lg text-bitcoin" data-testid={`text-score-${player.rank}`}>
                  {player.score.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground font-mono">points</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono">
            Updated every block • Next round in 4:32
          </p>
        </div>
      </div>
    </Card>
  );
}