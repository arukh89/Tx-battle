import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Share2, Trophy } from "lucide-react";

interface GameHeaderProps {
  gameStatus: "waiting" | "active" | "completed";
  playerCount: number;
  currentUser?: {
    username: string;
    pfpUrl?: string;
  };
  onShare?: () => void;
  onConnect?: () => void;
}

export default function GameHeader({ 
  gameStatus, 
  playerCount, 
  currentUser, 
  onShare, 
  onConnect 
}: GameHeaderProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    console.log('Connecting to Farcaster...');
    try {
      await onConnect?.();
    } finally {
      setIsConnecting(false);
    }
  };

  const getStatusColor = () => {
    switch (gameStatus) {
      case "waiting": return "bg-chart-4";
      case "active": return "bg-chart-2";
      case "completed": return "bg-chart-1";
      default: return "bg-muted";
    }
  };

  const getStatusText = () => {
    switch (gameStatus) {
      case "waiting": return "Waiting for players...";
      case "active": return "Game in progress";
      case "completed": return "Game completed";
      default: return "Unknown";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">TX Battle</div>
          <Badge 
            className={`${getStatusColor()} text-white`}
            data-testid="badge-game-status"
          >
            {getStatusText()}
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span data-testid="text-player-count">{playerCount} players</span>
          </div>
          
          {currentUser ? (
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={currentUser.pfpUrl} />
                <AvatarFallback>{currentUser.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium" data-testid="text-username">
                {currentUser.username}
              </span>
            </div>
          ) : (
            <Button 
              onClick={handleConnect}
              disabled={isConnecting}
              size="sm"
              data-testid="button-connect"
            >
              {isConnecting ? "Connecting..." : "Connect Farcaster"}
            </Button>
          )}
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              console.log('Share triggered');
              onShare?.();
            }}
            data-testid="button-share"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}