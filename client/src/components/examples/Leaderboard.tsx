import Leaderboard from '../Leaderboard';

//todo: remove mock functionality
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
  {
    id: "3",
    username: "charlie.defi",
    displayName: "Charlie Wilson", 
    pfpUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    wins: 8,
    totalGames: 15,
    winRate: 53,
    streak: 1,
  },
  {
    id: "4",
    username: "diana.nft",
    displayName: "Diana Lee",
    pfpUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    wins: 5,
    totalGames: 12,
    winRate: 42,
    streak: 0,
  },
];

export default function LeaderboardExample() {
  return (
    <Leaderboard 
      entries={mockLeaderboard}
      currentUserId="1"
    />
  );
}