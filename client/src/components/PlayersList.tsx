import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Crown, Trophy } from "lucide-react";

interface Player {
  id: string;
  username: string;
  displayName?: string;
  pfpUrl?: string;
  prediction?: string;
  isWinner?: boolean;
  joinedAt: string;
}

interface PlayersListProps {
  players: Player[];
  currentUserId?: string;
  gameStatus: "waiting" | "active" | "completed";
}

export default function PlayersList({ players, currentUserId, gameStatus }: PlayersListProps) {
  const sortedPlayers = [...players].sort((a, b) => {
    // Winners first in completed games
    if (gameStatus === "completed") {
      if (a.isWinner && !b.isWinner) return -1;
      if (!a.isWinner && b.isWinner) return 1;
    }
    // Then by join time
    return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Players
          <Badge variant="outline" data-testid="badge-player-count">
            {players.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {players.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p data-testid="text-no-players">No players joined yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedPlayers.map((player, index) => (
              <div 
                key={player.id}
                className={`flex items-center gap-3 p-3 rounded-lg hover-elevate ${
                  player.id === currentUserId ? 'bg-accent' : 'bg-muted/30'
                }`}
                data-testid={`player-card-${player.id}`}
              >
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={player.pfpUrl} />
                    <AvatarFallback>
                      {player.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {gameStatus === "completed" && player.isWinner && (
                    <div className="absolute -top-1 -right-1">
                      <Crown className="w-5 h-5 text-chart-3 fill-current" />
                    </div>
                  )}
                  {index === 0 && gameStatus !== "completed" && (
                    <div className="absolute -top-1 -right-1">
                      <Badge variant="secondary" className="text-xs px-1">1st</Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm truncate" data-testid={`text-player-name-${player.id}`}>
                      {player.displayName || player.username}
                    </span>
                    {player.id === currentUserId && (
                      <Badge variant="outline" className="text-xs">You</Badge>
                    )}
                    {gameStatus === "completed" && player.isWinner && (
                      <Badge className="bg-chart-3 text-white text-xs flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        Winner
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    @{player.username}
                  </div>
                  {gameStatus === "completed" && player.prediction && (
                    <div className="text-xs mt-1 p-2 bg-background rounded border text-muted-foreground">
                      {player.prediction}
                    </div>
                  )}
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {new Date(player.joinedAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}