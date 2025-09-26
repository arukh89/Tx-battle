import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import LiveBlockDisplay from "./components/LiveBlockDisplay";
import PredictionInput from "./components/PredictionInput";
import GameLeaderboard from "./components/GameLeaderboard";
import PlayerStats from "./components/PlayerStats";
import BlockChart from "./components/BlockChart";
import GameHeader from "./components/GameHeader";
import { ThemeToggle } from "./components/ThemeToggle";

function TXBattleGameSimple() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-md bg-bitcoin flex items-center justify-center">
              <span className="text-bitcoin-foreground font-mono font-bold">₿</span>
            </div>
            <h1 className="text-2xl font-mono font-bold bg-gradient-to-r from-bitcoin to-electric bg-clip-text text-transparent">
              TxBattle
            </h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Game Interface */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <LiveBlockDisplay />
            <PredictionInput />
          </div>

          {/* Center Column */}
          <div className="lg:col-span-2 space-y-6">
            <BlockChart />
            <div className="grid md:grid-cols-2 gap-6">
              <GameLeaderboard />
              <PlayerStats />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-border">
          <p className="text-sm text-muted-foreground font-mono">
            High-tech Bitcoin transaction guessing game • Powered by mempool.space
          </p>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={TXBattleGameSimple} />
      <Route component={() => <div className="p-8 text-center">404 - Page Not Found</div>} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;