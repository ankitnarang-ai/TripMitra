import { useState } from 'react';
import { ChatInterface } from './components/chat-interface';
import { PreferencesModal } from './components/preferences-modal';
import { ItineraryDisplay } from './components/itinerary-display';
import { mockItineraries } from './components/mock-data';
import { toast } from 'sonner@2.0.3';

interface TripPreferences {
  comfortRating: number;
  budget: string;
  duration: string;
  travelStyle: string;
  accommodation: string;
  activities: string[];
}

export default function App() {
  const [tripQuery, setTripQuery] = useState('');
  const [preferences, setPreferences] = useState<TripPreferences | null>(null);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [generatedItineraries, setGeneratedItineraries] = useState(mockItineraries);
  const [showItineraries, setShowItineraries] = useState(false);

  const handleTripPlanningStart = (query: string) => {
    setTripQuery(query);
    setShowPreferencesModal(true);
  };

  const handlePreferencesSubmit = (prefs: TripPreferences) => {
    setPreferences(prefs);
    setShowPreferencesModal(false);
    
    // Simulate API call to generate itineraries
    toast("Generating your personalized itineraries...", {
      description: "Our AI is creating the perfect trip options for you."
    });
    
    setTimeout(() => {
      setShowItineraries(true);
      toast("Your itineraries are ready!", {
        description: "We've found 3 amazing trip options based on your preferences."
      });
    }, 2000);
  };

  const handleBooking = (itineraryId: string) => {
    const itinerary = generatedItineraries.find(it => it.id === itineraryId);
    toast(`Booking ${itinerary?.title || 'trip'}...`, {
      description: "Redirecting to booking platform. In a real app, this would integrate with booking APIs."
    });
  };

  const handleNewTrip = () => {
    setShowItineraries(false);
    setTripQuery('');
    setPreferences(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-8">
          {/* Chat Interface */}
          <div className={showItineraries ? "pb-8 border-b" : ""}>
            <ChatInterface 
              onTripPlanningStart={handleTripPlanningStart}
              onNewTrip={handleNewTrip}
              showNewTripOption={showItineraries}
            />
          </div>

          {/* Itineraries Display */}
          {showItineraries && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl mb-2">Your Trip Results</h2>
                <p className="text-muted-foreground">{tripQuery}</p>
              </div>
              
              <ItineraryDisplay 
                itineraries={generatedItineraries}
                onBooking={handleBooking}
              />
            </div>
          )}
        </div>

        <PreferencesModal
          isOpen={showPreferencesModal}
          onClose={() => setShowPreferencesModal(false)}
          onSubmit={handlePreferencesSubmit}
          tripQuery={tripQuery}
        />
      </div>
    </div>
  );
}