import { useState, useRef, useEffect } from 'react';
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

  // scroll ref for messages
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // API Functions (unchanged)
  const callPreferencesAPI = async (preferences: TripPreferences) => {
    try {
      const response = await fetch('https://tripmitra.onrender.com/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });
      if (!response.ok) throw new Error('Preferences API failed');
      return await response.json();
    } catch (error) {
      console.error('Preferences API Error:', error);
      throw error;
    }
  };

  const callChatAPI = async (message: string) => {
    try {
      const response = await fetch('https://tripmitra.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) throw new Error('Chat API failed');
      return await response.json();
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  };

  // Keep handlers unchanged except UI tweaks
  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    if (!hasSetPreferences) {
      setPendingTripQuery(inputValue);
      setShowPreferencesModal(true);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'ai', 
          content: "Great! I'd love to help you plan your trip. Let me gather some information to create the perfect itinerary for you." 
        }]);
      }, 1000);
    } else {
      handleDirectChat(inputValue);
    }
    setInputValue("");
  };

  const handleDirectChat = async (message: string) => {
    setIsLoading(true);
    try {
      setMessages(prev => [...prev, { type: 'ai', content: "Let me find the best options for you..." }]);
      const chatResponse = await callChatAPI(message);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          type: 'ai',
          content: chatResponse.message || "I've found some great options for your trip!"
        };
        return newMessages;
      });
      if (chatResponse.itineraries && chatResponse.itineraries.length > 0) {
        setItineraries(chatResponse.itineraries);
      } else if (itineraries.length === 0) {
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
      if (itineraries.length === 0) setItineraries(mockItineraries);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreferencesSubmit = async (preferences: TripPreferences) => {
    setShowPreferencesModal(false);
    setIsLoading(true);

    try {
      await callPreferencesAPI(preferences);
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: "Perfect! I've noted your preferences. Let me create personalized itineraries for you..." 
      }]);
      const chatResponse = await callChatAPI(pendingTripQuery);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          type: 'ai',
          content: chatResponse.message || "Based on your preferences, I've crafted these personalized travel options for you!"
        };
        return newMessages;
      });
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
      setPendingTripQuery('');
    }
  };

  const handleSuggestionClick = (suggestion?: string) => {
    if (isLoading) return;
    if (suggestion) setInputValue(suggestion);
    setTimeout(() => handleSend(), 100);
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

  // auto-scroll to bottom when messages change
  useEffect(() => {
    const el = messagesRef.current;
    if (el) {
      // small timeout to allow rendering
      setTimeout(() => {
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }, 80);
    }
  }, [messages, isLoading]);

  const showItineraries = itineraries.length > 0;
  const showNewTripButton = showItineraries || showNewTripOption;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Top header: title + actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl md:text-3xl">TripMitra AI</h1>
              <p className="text-sm text-muted-foreground">Your AI-powered travel planning companion</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {showNewTripButton && (
              <Button 
                onClick={handleNewTrip}
                variant="outline"
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <Plus className="w-4 h-4" />
                Plan New Trip
              </Button>
            )}
          </div>
        </div>

        {/* MAIN LAYOUT: two columns on md+, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* LEFT: Chat column (spans 7 on md) */}
          <div className="md:col-span-7 flex flex-col">
            {/* Chat card */}
            <Card className="flex-1 flex flex-col p-0 overflow-hidden">
              {/* Messages area: fixed height + scrollable */}
              <div className="px-4 py-4 border-b">
                <p className="text-sm text-muted-foreground">Chat with TripMitra — ask about routes, hotels, activities or customise your plan.</p>
              </div>

              <div
                ref={messagesRef}
                className="flex-1 overflow-y-auto px-4 py-6 space-y-4"
                style={{ minHeight: 280 }}
              >
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-6">Start planning your next adventure! Try asking about a trip you'd like to take.</p>

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

              {/* Input area (sticky at bottom of chat card) */}
              <div className="border-t p-4 bg-background">
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
            </Card>
          </div>

          {/* RIGHT: Results / Itineraries column (spans 5 on md) */}
          <div className="md:col-span-5">
            {/* Make this panel sticky on larger screens so it's always visible */}
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg">Suggested Itineraries</h2>
                <div className="text-sm text-muted-foreground">{showItineraries ? `${itineraries.length} options` : 'No itineraries yet'}</div>
              </div>

              <Card className="p-4">
                {/* If no itineraries show helpful copy + CTA */}
                {!showItineraries ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Results will appear here after you ask or set preferences. This panel stays visible so you can review options while chatting.</p>
                    <div className="flex gap-2">
                      <Button onClick={() => handleSuggestionClick()} disabled={isLoading}>Try default trip</Button>
                      <Button variant="outline" onClick={() => setShowPreferencesModal(true)} disabled={isLoading}>Set Preferences</Button>
                    </div>
                  </div>
                ) : (
                  // ItineraryDisplay handles full details and its own accordions
                  <ItineraryDisplay itineraries={itineraries} onBooking={handleBooking} />
                )}
              </Card>

              {/* Compact quick-actions */}
              <div className="mt-4 space-y-2">
                <Button onClick={() => {
                  // quick reuse: copy first itinerary title to input for follow-up
                  if (itineraries[0]) {
                    setInputValue(`Tell me more about: ${itineraries[0].title}`);
                    // focus on input by selecting it — optional (requires ref on input if needed)
                  }
                }} disabled={!showItineraries || isLoading} className="w-full">Ask follow-up about top option</Button>

                <Button variant="ghost" onClick={handleNewTrip} disabled={isLoading} className="w-full">Start New Trip</Button>
              </div>
            </div>
          </div>
        </div>

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
