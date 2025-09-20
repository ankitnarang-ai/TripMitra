import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from './ui/accordion';
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  Plane, 
  Train, 
  Car, 
  Hotel, 
  Activity,
  Navigation,
  ExternalLink
} from 'lucide-react';

interface Itinerary {
  id: string;
  title: string;
  type: string;
  duration: string;
  budget: string;
  rating: number;
  summary: string;
  highlights: string[];
  route: {
    departure: {
      location: string;
      time: string;
      date: string;
    };
    arrival: {
      location: string;
      time: string;
      date: string;
    };
    return: {
      departure: {
        location: string;
        time: string;
        date: string;
      };
      arrival: {
        location: string;
        time: string;
        date: string;
      };
    };
  };
  vehicles: Array<{
    type: string;
    name: string;
    price: string;
    duration: string;
    features: string[];
  }>;
  hotels: Array<{
    name: string;
    rating: number;
    price: string;
    location: string;
    amenities: string[];
  }>;
  activities: Array<{
    name: string;
    type: string;
    duration: string;
    price: string;
    description: string;
  }>;
  mapData: {
    center: { lat: number; lng: number };
    markers: Array<{
      lat: number;
      lng: number;
      title: string;
      type: string;
    }>;
  };
}

interface ItineraryDisplayProps {
  itineraries: Itinerary[];
  onBooking: (itineraryId: string) => void;
}

export function ItineraryDisplay({ itineraries, onBooking }: ItineraryDisplayProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getVehicleIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'flight': return <Plane className="w-4 h-4" />;
      case 'train': return <Train className="w-4 h-4" />;
      case 'car': return <Car className="w-4 h-4" />;
      default: return <Navigation className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        {itineraries.map((itinerary) => (
          <AccordionItem key={itinerary.id} value={itinerary.id} className="border rounded-lg mb-4">
            <AccordionTrigger 
              className="px-6 py-4 hover:no-underline"
              onClick={() => toggleItem(itinerary.id)}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <h3>{itinerary.title}</h3>
                      <Badge variant="secondary">{itinerary.type}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {itinerary.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {itinerary.budget}
                      </div>
                      <div className="flex items-center gap-1">
                        <span>{renderStars(itinerary.rating)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onBooking(itinerary.id);
                  }}
                  className="ml-4"
                >
                  Book Now
                </Button>
              </div>
            </AccordionTrigger>
            
            <AccordionContent className="px-6 pb-6">
              <div className="space-y-6">
                {/* Trip Summary */}
                <div>
                  <h4 className="mb-2">Trip Summary</h4>
                  <p className="text-muted-foreground mb-3">{itinerary.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {itinerary.highlights.map((highlight, index) => (
                      <Badge key={index} variant="outline">{highlight}</Badge>
                    ))}
                  </div>
                </div>

                {/* Route Details */}
                <Card className="p-4">
                  <h4 className="mb-3 flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Route Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm mb-2">Outbound Journey</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>From: {itinerary.route.departure.location}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {itinerary.route.departure.date} at {itinerary.route.departure.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>To: {itinerary.route.arrival.location}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {itinerary.route.arrival.date} at {itinerary.route.arrival.time}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm mb-2">Return Journey</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>From: {itinerary.route.return.departure.location}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {itinerary.route.return.departure.date} at {itinerary.route.return.departure.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>To: {itinerary.route.return.arrival.location}</span>
                        </div>
                        <div className="text-muted-foreground">
                          {itinerary.route.return.arrival.date} at {itinerary.route.return.arrival.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Transportation Options */}
                <Card className="p-4">
                  <h4 className="mb-3">Transportation Options</h4>
                  <div className="grid gap-3">
                    {itinerary.vehicles.map((vehicle, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getVehicleIcon(vehicle.type)}
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{vehicle.name}</span>
                              <Badge variant="outline">{vehicle.type}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Duration: {vehicle.duration} • {vehicle.features.join(', ')}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            <span>{vehicle.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Hotels */}
                <Card className="p-4">
                  <h4 className="mb-3 flex items-center gap-2">
                    <Hotel className="w-4 h-4" />
                    Recommended Hotels
                  </h4>
                  <div className="grid gap-3">
                    {itinerary.hotels.map((hotel, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span>{hotel.name}</span>
                            <span className="text-sm">{renderStars(hotel.rating)}</span>
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">
                            {hotel.location}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {hotel.amenities.map((amenity, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            <span>{hotel.price}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">per night</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Activities */}
                <Card className="p-4">
                  <h4 className="mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Recommended Activities
                  </h4>
                  <div className="grid gap-3">
                    {itinerary.activities.map((activity, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span>{activity.name}</span>
                              <Badge variant="outline">{activity.type}</Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Duration: {activity.duration}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            <span>{activity.price}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Map Placeholder */}
                <Card className="p-4">
                  <h4 className="mb-3">Trip Route Map</h4>
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="w-8 h-8 mx-auto mb-2" />
                      <p>Interactive map showing your complete route</p>
                      <p className="text-sm">From {itinerary.route.departure.location} to {itinerary.route.arrival.location}</p>
                    </div>
                  </div>
                </Card>

                {/* Book Now Button */}
                <div className="text-center pt-4">
                  <Button 
                    size="lg" 
                    onClick={() => onBooking(itinerary.id)}
                    className="px-8"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Book This Trip Now
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}