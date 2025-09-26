import PlayersList from '../PlayersList';

//todo: remove mock functionality
const mockPlayers = [
  {
    id: "1",
    username: "alice.eth",
    displayName: "Alice Smith",
    pfpUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    prediction: "ETH will hit $4000 before the weekend",
    isWinner: true,
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
  {
    id: "3",
    username: "charlie.defi", 
    displayName: "Charlie Wilson",
    pfpUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    prediction: "New DeFi protocol will launch",
    isWinner: false,
    joinedAt: new Date(Date.now() - 1800000).toISOString(),
  },
];

export default function PlayersListExample() {
  return (
    <PlayersList 
      players={mockPlayers}
      currentUserId="1"
      gameStatus="completed"
    />
  );
}