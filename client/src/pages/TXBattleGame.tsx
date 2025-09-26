import { useState, useEffect } from 'react';
import GameHeader from '@/components/GameHeader';
import LiveBlockDisplay from '@/components/LiveBlockDisplay';
import PredictionInput from '@/components/PredictionInput';
import GameLeaderboard from '@/components/GameLeaderboard';
import PlayerStats from '@/components/PlayerStats';
import BlockChart from '@/components/BlockChart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Wifi, WifiOff, TrendingUp } from 'lucide-react';

export default function TXBattleGame() {
  const [isConnected, setIsConnected] = useState(true);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [gamePhase, setGamePhase] = useState<'waiting' | 'predicting' | 'revealing'>('predicting');
  const [timeRemaining, setTimeRemaining] = useState(298);

  // Mock game state - in real app this would come from WebSocket/API
  const [gameState, setGameState] = useState({
    currentBlock: {
      height: 870542,
      txCount: 3247,
      timestamp: Date.now() - 120000,
      hash: '00000000000000000008a89e1d...def123'
    },
    nextBlockCountdown: 298,
    mempoolSize: 15420,
    playerCount: 1247
  });

  const currentUser = {
    username: 'blockchainBeth',
    avatar: '',
    rank: 42,
    points: 12450
  };

  // Simulate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          // New block found - reset timer
          setGameState(prevState => ({
            ...prevState,
            currentBlock: {
              ...prevState.currentBlock,
              height: prevState.currentBlock.height + 1,
              txCount: Math.floor(Math.random() * 1000) + 2500,
              timestamp: Date.now()
            },
            nextBlockCountdown: 600
          }));
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePredictionSubmit = (pred: number) => {
    setPrediction(pred);
    console.log('Prediction submitted:', pred);
    // In real app, would send to backend
  };

  const handleReconnect = () => {
    console.log('Reconnecting...');
    setIsConnected(true);
    // In real app, would attempt WebSocket reconnection
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-tx-battle">
      {/* Header */}
      <GameHeader 
        gameStatus={gamePhase === 'predicting' ? 'active' : 'waiting'}
        playerCount={gameState.playerCount}
        currentUser={currentUser}
        onShare={() => console.log('Share game to Farcaster')}
        onConnect={() => console.log('Connect Farcaster wallet')}
      />

      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-destructive/10 border-b border-destructive/20 p-3">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-destructive">
              <WifiOff className="h-4 w-4" />
              Connection lost - some features may not work
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleReconnect}
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              <RefreshCw className="h-3 w-3 mr-2" />
              Reconnect
            </Button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Game Status Banner */}
        <Card className="p-4 border-electric/20 bg-gradient-to-r from-card to-electric/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-success animate-pulse" />
              <div>
                <h2 className="font-mono font-semibold text-lg">Round #{gameState.currentBlock.height}</h2>
                <p className="text-sm text-muted-foreground font-mono">
                  {gamePhase === 'predicting' ? 'Make your prediction now!' : 'Waiting for next block...'}
                </p>
              </div>
            </div>
            <Badge variant="outline" className="font-mono">
              {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')} remaining
            </Badge>
          </div>
        </Card>

        {/* Main Game Interface */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Game Data */}
          <div className="lg:col-span-1 space-y-6">
            <LiveBlockDisplay 
              currentBlock={gameState.currentBlock}
              nextBlockCountdown={timeRemaining}
              mempoolSize={gameState.mempoolSize}
            />
            <PredictionInput 
              onSubmitPrediction={handlePredictionSubmit}
              isSubmitted={prediction !== null}
              timeRemaining={timeRemaining}
              suggestedRange={{ min: 2800, max: 3500 }}
            />
          </div>

          {/* Center Column - Chart */}
          <div className="lg:col-span-2 space-y-6">
            <BlockChart currentBlock={gameState.currentBlock.height} />
            
            {/* Game Tabs */}
            <Tabs defaultValue="leaderboard" className="w-full">
              <TabsList className="grid w-full grid-cols-2 font-mono">
                <TabsTrigger value="leaderboard" data-testid="tab-leaderboard">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Leaderboard
                </TabsTrigger>
                <TabsTrigger value="stats" data-testid="tab-stats">
                  Your Stats
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="leaderboard" className="mt-6">
                <GameLeaderboard currentUserId="3" />
              </TabsContent>
              
              <TabsContent value="stats" className="mt-6">
                <PlayerStats />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <Card className="p-4 border-bitcoin/20 bg-gradient-to-r from-card to-bitcoin/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-success" />
                <span className="text-sm font-mono text-muted-foreground">
                  Connected to mempool.space
                </span>
              </div>
              <Badge variant="outline" className="font-mono">
                Block #{gameState.currentBlock.height + 1} incoming
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-muted-foreground">
                Next reward: {Math.floor(Math.random() * 500) + 100} points
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => console.log('Share to Farcaster')}
                className="font-mono"
                data-testid="button-share-result"
              >
                Share Result
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}