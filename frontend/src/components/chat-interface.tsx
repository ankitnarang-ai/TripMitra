import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Send, MessageCircle, Plus } from 'lucide-react';

interface ChatInterfaceProps {
  onTripPlanningStart: (query: string) => void;
  onNewTrip?: () => void;
  showNewTripOption?: boolean;
}

export function ChatInterface({ onTripPlanningStart, onNewTrip, showNewTripOption }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("I want to plan a trip from Delhi to Mumbai");
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai', content: string }>>([]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    
    // Simulate AI response and trigger trip planning
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: "Great! I'd love to help you plan your trip. Let me gather some information to create the perfect itinerary for you." 
      }]);
      onTripPlanningStart(inputValue);
    }, 1000);
    
    setInputValue("");
  };

  const handleSuggestionClick = (suggestion?: string) => {
    if (suggestion) {
      setInputValue(suggestion);
    }
    setTimeout(() => {
      setInputValue("");
      handleSend();
    }, 100);
  };

  const handleNewTrip = () => {
    setMessages([]);
    setInputValue("I want to plan a trip from Delhi to Mumbai");
    onNewTrip?.();
  };

  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MessageCircle className="w-8 h-8 text-primary" />
          <h1 className="text-3xl">TripMitra AI</h1>
        </div>
        <p className="text-muted-foreground">Your AI-powered travel planning companion</p>
        
        {/* New Trip Button */}
        {showNewTripOption && (
          <div className="mt-4">
            <Button 
              onClick={handleNewTrip}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Plan New Trip
            </Button>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="space-y-4 mb-6 min-h-[200px]">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">Start planning your next adventure! Try asking about a trip you'd like to take.</p>
            
            {/* Suggestion Cards */}
            <div className="grid gap-3 max-w-2xl mx-auto">
              <Card 
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleSuggestionClick()}
              >
                <p className="text-left">I want to plan a trip from Delhi to Mumbai</p>
              </Card>
              <Card 
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleSuggestionClick("Plan a weekend getaway to Goa")}
              >
                <p className="text-left">Plan a weekend getaway to Goa</p>
              </Card>
              <Card 
                className="p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => handleSuggestionClick("I need a family vacation to Kerala")}
              >
                <p className="text-left">I need a family vacation to Kerala</p>
              </Card>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <Card className={`p-4 max-w-[80%] ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  <p>{message.content}</p>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area - Only show if no itineraries are displayed */}
      {!showNewTripOption && (
        <div className="border-t pt-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your dream trip..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}