import GameHeader from '../GameHeader';

export default function GameHeaderExample() {
  return (
    <GameHeader 
      gameStatus="waiting"
      playerCount={5}
      currentUser={{
        username: "alice.eth",
        pfpUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
      }}
      onShare={() => console.log('Share game')}
      onConnect={() => console.log('Connect Farcaster')}
    />
  );
}