import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send } from "lucide-react";

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  displayName?: string;
  pfpUrl?: string;
  message: string;
  timestamp: string;
}

interface ChatPanelProps {
  messages: ChatMessage[];
  currentUserId?: string;
  onSendMessage?: (message: string) => void;
  isConnected?: boolean;
}

export default function ChatPanel({ 
  messages, 
  currentUserId, 
  onSendMessage,
  isConnected = false
}: ChatPanelProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !isConnected) return;
    
    setIsSending(true);
    console.log('Sending message:', newMessage);
    try {
      await onSendMessage?.(newMessage);
      setNewMessage("");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="flex flex-col h-96">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col min-h-0 p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p data-testid="text-no-messages">No messages yet</p>
              <p className="text-xs">Be the first to say something!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-3 ${
                  msg.userId === currentUserId ? 'flex-row-reverse' : 'flex-row'
                }`}
                data-testid={`message-${msg.id}`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={msg.pfpUrl} />
                  <AvatarFallback>
                    {msg.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className={`flex-1 max-w-xs ${
                  msg.userId === currentUserId ? 'text-right' : 'text-left'
                }`}>
                  <div className="text-xs text-muted-foreground mb-1">
                    {msg.displayName || msg.username} • {new Date(msg.timestamp).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className={`inline-block p-2 rounded-lg text-sm ${
                    msg.userId === currentUserId 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    {msg.message}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="flex-shrink-0 p-4 border-t">
          {!isConnected ? (
            <div className="text-center text-sm text-muted-foreground py-2">
              Connect Farcaster to join the chat
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSending}
                data-testid="input-chat-message"
              />
              <Button 
                onClick={handleSend}
                disabled={!newMessage.trim() || isSending}
                size="icon"
                data-testid="button-send-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}