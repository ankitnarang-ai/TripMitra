import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Send, MessageCircle, Plus, Loader2 } from 'lucide-react';
import { PreferencesModal } from './preferences-modal';
import { ItineraryDisplay } from './itinerary-display';
import { mockItineraries } from './mock-data';

interface TripPreferences {
  comfortRating: number;
  budget: string;
  duration: string;
  travelStyle: string;
  accommodation: string;
  activities: string[];
}

interface ChatInterfaceProps {
  onTripPlanningStart?: (query: string) => void;
  onNewTrip?: () => void;
  showNewTripOption?: boolean;
}

export function ChatInterface({ onTripPlanningStart, onNewTrip, showNewTripOption }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("I want to plan a trip from Delhi to Mumbai");
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai', content: string }>>([]);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [pendingTripQuery, setPendingTripQuery] = useState('');
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSetPreferences, setHasSetPreferences] = useState(false);

  // API Functions
  const callPreferencesAPI = async (preferences: TripPreferences) => {
    try {
      const response = await fetch('http://localhost:3001/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ preferences }),
      });
      
      if (!response.ok) {
        throw new Error('Preferences API failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Preferences API Error:', error);
      throw error;
    }
  };

  const callChatAPI = async (message: string) => {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      
      if (!response.ok) {
        throw new Error('Chat API failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    
    if (!hasSetPreferences) {
      // First time - show preferences modal
      setPendingTripQuery(inputValue);
      setShowPreferencesModal(true);
      
      // Add AI thinking message
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: "Great! I'd love to help you plan your trip. Let me gather some information to create the perfect itinerary for you." 
        }]);
      }, 1000);
    } else {
      // Subsequent chats - directly call chat API
      handleDirectChat(inputValue);
    }
    
    setInputValue("");
  };

  const handleDirectChat = async (message: string) => {
    setIsLoading(true);
    
    try {
      // Add AI thinking message
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: "Let me find the best options for you..." 
      }]);

      const chatResponse = await callChatAPI(message);
      
      // Update AI message with response
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          type: 'ai',
          content: chatResponse.message || "I've found some great options for your trip!"
        };
        return newMessages;
      });

      // Set itineraries from API response or use mock data (only for first time or if new itineraries)
      if (chatResponse.itineraries && chatResponse.itineraries.length > 0) {
        setItineraries(chatResponse.itineraries);
      } else if (itineraries.length === 0) {
        // Only set mock data if no itineraries exist
        setItineraries(mockItineraries);
      }
      
    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          type: 'ai',
          content: "I encountered an issue, but I've prepared some great options for you using our recommendations!"
        };
        return newMessages;
      });
      if (itineraries.length === 0) {
        setItineraries(mockItineraries);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesSubmit = async (preferences: TripPreferences) => {
    setShowPreferencesModal(false);
    setIsLoading(true);

    try {
      // First call preferences API
      await callPreferencesAPI(preferences);
      
      // Add AI message
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: "Perfect! I've noted your preferences. Let me create personalized itineraries for you..." 
      }]);

      // Then call chat API with the pending query
      const chatResponse = await callChatAPI(pendingTripQuery);
      
      // Update AI message
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          type: 'ai',
          content: chatResponse.message || "Based on your preferences, I've crafted these personalized travel options for you!"
        };
        return newMessages;
      });

      // Set itineraries
      if (chatResponse.itineraries && chatResponse.itineraries.length > 0) {
        setItineraries(chatResponse.itineraries);
      } else {
        setItineraries(mockItineraries);
      }

      setHasSetPreferences(true);
      
    } catch (error) {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          type: 'ai',
          content: "I've prepared some excellent options based on your preferences!"
        };
        return newMessages;
      });
      setItineraries(mockItineraries);
      setHasSetPreferences(true);
    } finally {
      setIsLoading(false);
      setPendingTripQuery(''); // Clear pending query after processing
    }
  };

  const handleSuggestionClick = (suggestion?: string) => {
    if (isLoading) return;
    
    if (suggestion) {
      setInputValue(suggestion);
    }
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  const handleNewTrip = () => {
    setMessages([]);
    setItineraries([]);
    setInputValue("I want to plan a trip from Delhi to Mumbai");
    setHasSetPreferences(false);
    onNewTrip?.();
  };

  const handleBooking = (itineraryId: string) => {
    alert(`Booking initiated for itinerary: ${itineraryId}`);
  };

  const showItineraries = itineraries.length > 0;
  const showNewTripButton = showItineraries || showNewTripOption;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="flex flex-col max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
            <h1 className="text-3xl">TripMitra AI</h1>
          </div>
          <p className="text-muted-foreground">Your AI-powered travel planning companion</p>
          
          {/* New Trip Button */}
          {showNewTripButton && (
            <div className="mt-4">
              <Button 
                onClick={handleNewTrip}
                variant="outline"
                className="flex items-center gap-2"
                disabled={isLoading}
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
                  className={`p-4 cursor-pointer hover:bg-accent transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleSuggestionClick()}
                >
                  <p className="text-left">I want to plan a trip from Delhi to Mumbai</p>
                </Card>
                <Card 
                  className={`p-4 cursor-pointer hover:bg-accent transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleSuggestionClick("Plan a weekend getaway to Goa")}
                >
                  <p className="text-left">Plan a weekend getaway to Goa</p>
                </Card>
                <Card 
                  className={`p-4 cursor-pointer hover:bg-accent transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                    <div className="flex items-center gap-2">
                      {message.type === 'ai' && isLoading && index === messages.length - 1 && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      <p>{message.content}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area - Show when no itineraries OR when itineraries exist (for continuous chat) */}
        {(!showItineraries || (showItineraries && messages.length > 0)) && (
          <div className="border-t pt-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={showItineraries ? "Ask me anything more about your trip..." : "Describe your dream trip..."}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                size="icon" 
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Itineraries Display */}
        {showItineraries && (
          <div className="mt-8">
            <ItineraryDisplay 
              itineraries={itineraries} 
              onBooking={handleBooking}
            />
          </div>
        )}

        {/* Preferences Modal */}
        <PreferencesModal
          isOpen={showPreferencesModal}
          onClose={() => {
            setShowPreferencesModal(false);
            setPendingTripQuery('');
          }}
          onSubmit={handlePreferencesSubmit}
          tripQuery={pendingTripQuery}
        />
      </div>
    </div>
  );
}