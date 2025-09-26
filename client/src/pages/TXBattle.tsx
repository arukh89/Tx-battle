import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import GameHeader from "@/components/GameHeader";
import PredictionPanel from "@/components/PredictionPanel";
import PlayersList from "@/components/PlayersList";
import ChatPanel from "@/components/ChatPanel";
import Leaderboard from "@/components/Leaderboard";
import ThemeToggle from "@/components/ThemeToggle";
import { farcasterService, type FarcasterUser } from "@/lib/farcaster";
import { RefreshCw, Play } from "lucide-react";

//todo: remove mock functionality
const mockPlayers = [
  {
    id: "1",
    username: "alice.eth",
    displayName: "Alice Smith",
    pfpUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    prediction: "ETH will hit $4000 before the weekend",
    isWinner: false,
    joinedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "2", 
    username: "bob.crypto",
    displayName: "Bob Johnson",
    pfpUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    prediction: "Market will crash by Monday",
    isWinner: false,
    joinedAt: new Date(Date.now() - 2400000).toISOString(),
  },
];

const mockMessages = [
  {
    id: "1",
    userId: "2",
    username: "bob.crypto",
    displayName: "Bob Johnson", 
    pfpUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    message: "This is going to be intense! 🔥",
    timestamp: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: "2",
    userId: "1",
    username: "alice.eth",
    displayName: "Alice Smith",
    pfpUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face", 
    message: "Good luck everyone!",
    timestamp: new Date(Date.now() - 120000).toISOString(),
  },
];

const mockLeaderboard = [
  {
    id: "1",
    username: "alice.eth",
    displayName: "Alice Smith",
    pfpUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    wins: 15,
    totalGames: 20,
    winRate: 75,
    streak: 3,
  },
  {
    id: "2",
    username: "bob.crypto", 
    displayName: "Bob Johnson",
    pfpUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    wins: 12,
    totalGames: 18,
    winRate: 67,
    streak: 0,
  },
];

export default function TXBattle() {
  const [currentUser, setCurrentUser] = useState<FarcasterUser | null>(null);
  const [gameStatus, setGameStatus] = useState<"waiting" | "active" | "completed">("waiting");
  const [userPrediction, setUserPrediction] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState(true);
  const [players, setPlayers] = useState(mockPlayers);
  const [messages, setMessages] = useState(mockMessages);

  useEffect(() => {
    initializeFarcaster();
  }, []);

  const initializeFarcaster = async () => {
    try {
      console.log('Initializing Farcaster SDK...');
      await farcasterService.initialize();
      
      // Check if user is already authenticated
      const context = farcasterService.getContext();
      if (context.user) {
        setCurrentUser({
          fid: context.user.fid,
          username: context.user.username,
          displayName: context.user.displayName,
          pfpUrl: context.user.pfpUrl,
          bio: context.user.bio || '',
        });
      }
    } catch (error) {
      console.error('Failed to initialize Farcaster:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleConnect = async () => {
    try {
      const user = await farcasterService.signIn();
      if (user) {
        setCurrentUser(user);
        console.log('Connected as:', user.username);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  const handleJoinGame = () => {
    console.log('Joining game...');
    setGameStatus("active");
  };

  const handleSubmitPrediction = async (prediction: string) => {
    console.log('Submitting prediction:', prediction);
    setUserPrediction(prediction);
  };

  const handleSendMessage = async (message: string) => {
    if (!currentUser) return;
    
    const newMessage = {
      id: Date.now().toString(),
      userId: currentUser.fid.toString(),
      username: currentUser.username,
      displayName: currentUser.displayName,
      pfpUrl: currentUser.pfpUrl,
      message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    console.log('Message sent:', message);
  };

  const handleShare = () => {
    console.log('Sharing game...');
    // Implementation for Farcaster sharing would go here
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-12 h-12 mx-auto animate-spin text-primary" />
          <div className="text-lg font-semibold">Loading TX Battle...</div>
          <div className="text-sm text-muted-foreground">Initializing Farcaster SDK</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <GameHeader
            gameStatus={gameStatus}
            playerCount={players.length}
            currentUser={currentUser ? {
              username: currentUser.username,
              pfpUrl: currentUser.pfpUrl,
            } : undefined}
            onShare={handleShare}
            onConnect={handleConnect}
          />
          <ThemeToggle />
        </div>

        {/* Main Game Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Game & Prediction */}
          <div className="lg:col-span-2 space-y-6">
            {gameStatus === "waiting" && !currentUser && (
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl">⚡</div>
                <div className="text-2xl font-bold">Ready to Battle?</div>
                <div className="text-muted-foreground max-w-md mx-auto">
                  Connect your Farcaster account to join the battle and make predictions with other players.
                </div>
                <Button 
                  size="lg" 
                  onClick={handleConnect}
                  className="mt-4"
                  data-testid="button-main-connect"
                >
                  Connect Farcaster
                </Button>
              </div>
            )}

            {gameStatus === "waiting" && currentUser && (
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl">🎯</div>
                <div className="text-2xl font-bold">Welcome, {currentUser.displayName || currentUser.username}!</div>
                <div className="text-muted-foreground max-w-md mx-auto">
                  Ready to make your prediction? Join the battle and compete with other players.
                </div>
                <Button 
                  size="lg" 
                  onClick={handleJoinGame}
                  className="mt-4"
                  data-testid="button-join-game"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Join Game
                </Button>
              </div>
            )}

            {gameStatus !== "waiting" && (
              <PredictionPanel
                gameStatus={gameStatus}
                userPrediction={userPrediction}
                onSubmitPrediction={handleSubmitPrediction}
                timeRemaining={30}
              />
            )}

            <PlayersList
              players={players}
              currentUserId={currentUser?.fid.toString()}
              gameStatus={gameStatus}
            />
          </div>

          {/* Right Column - Chat & Leaderboard */}
          <div className="space-y-6">
            <ChatPanel
              messages={messages}
              currentUserId={currentUser?.fid.toString()}
              onSendMessage={handleSendMessage}
              isConnected={!!currentUser}
            />
            
            <Leaderboard
              entries={mockLeaderboard}
              currentUserId={currentUser?.fid.toString()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}