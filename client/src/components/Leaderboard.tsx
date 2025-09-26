import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  username: string;
  displayName?: string;
  pfpUrl?: string;
  wins: number;
  totalGames: number;
  winRate: number;
  streak: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

export default function Leaderboard({ entries, currentUserId }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-chart-3" />;
      case 2: return <Medal className="w-5 h-5 text-muted-foreground" />;
      case 3: return <Award className="w-5 h-5 text-chart-4" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-chart-3 text-white";
      case 2: return "bg-muted text-muted-foreground";
      case 3: return "bg-chart-4 text-white";
      default: return "bg-muted/50 text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p data-testid="text-no-leaderboard">No rankings yet</p>
            <p className="text-xs">Play some games to see the leaderboard!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, index) => {
              const rank = index + 1;
              const isCurrentUser = entry.id === currentUserId;
              
              return (
                <div 
                  key={entry.id}
                  className={`flex items-center gap-3 p-3 rounded-lg hover-elevate ${
                    isCurrentUser ? 'bg-accent' : rank <= 3 ? 'bg-muted/30' : 'bg-muted/10'
                  }`}
                  data-testid={`leaderboard-entry-${entry.id}`}
                >
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={`${getRankBadgeColor(rank)} flex items-center gap-1 px-2 py-1`}
                    >
                      {getRankIcon(rank)}
                      #{rank}
                    </Badge>
                    
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={entry.pfpUrl} />
                      <AvatarFallback>
                        {entry.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate" data-testid={`text-leaderboard-name-${entry.id}`}>
                        {entry.displayName || entry.username}
                      </span>
                      {isCurrentUser && (
                        <Badge variant="outline" className="text-xs">You</Badge>
                      )}
                      {entry.streak > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          🔥 {entry.streak}
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      @{entry.username}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium" data-testid={`text-win-rate-${entry.id}`}>
                      {entry.winRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {entry.wins}/{entry.totalGames} wins
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}