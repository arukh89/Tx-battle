import ChatPanel from '../ChatPanel';

//todo: remove mock functionality  
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
  {
    id: "3",
    userId: "3",
    username: "charlie.defi",
    displayName: "Charlie Wilson",
    pfpUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    message: "My prediction is locked in 🚀",
    timestamp: new Date(Date.now() - 60000).toISOString(),
  },
];

export default function ChatPanelExample() {
  return (
    <ChatPanel 
      messages={mockMessages}
      currentUserId="1"
      isConnected={true}
      onSendMessage={(message) => console.log('Message sent:', message)}
    />
  );
}