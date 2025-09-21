import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Card } from './ui/card';

interface TripPreferences {
  comfortRating: number;
  budget: string;
  duration: string;
  travelStyle: string;
  accommodation: string;
  activities: string[];
}

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (preferences: TripPreferences) => void;
  tripQuery: string;
}

export function PreferencesModal({ isOpen, onClose, onSubmit, tripQuery }: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (preferences: TripPreferences) => void;
  tripQuery: string;
}) {
  const [preferences, setPreferences] = useState<TripPreferences>({
    comfortRating: 3,
    budget: '',
    duration: '',
    travelStyle: '',
    accommodation: '',
    activities: []
  });
  const [currentStep, setCurrentStep] = useState(0);

  const questions = [
    {
      title: "What's your comfort rating?",
      subtitle: "1 = Budget travel, 5 = Luxury travel",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Comfort Level: {preferences.comfortRating}</Label>
            <Slider
              value={[preferences.comfortRating]}
              onValueChange={(value) => setPreferences(prev => ({ ...prev, comfortRating: value[0] }))}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Budget</span>
              <span>Luxury</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "What's your budget range?",
      subtitle: "This helps us recommend appropriate options",
      content: (
        <div className="space-y-4">
          <Select value={preferences.budget} onValueChange={(value) => setPreferences(prev => ({ ...prev, budget: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-25k">Under ₹25,000</SelectItem>
              <SelectItem value="25k-50k">₹25,000 - ₹50,000</SelectItem>
              <SelectItem value="50k-100k">₹50,000 - ₹1,00,000</SelectItem>
              <SelectItem value="100k-200k">₹1,00,000 - ₹2,00,000</SelectItem>
              <SelectItem value="above-200k">Above ₹2,00,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    },
    {
      title: "How long is your trip?",
      subtitle: "Duration helps us plan the perfect itinerary",
      content: (
        <div className="space-y-4">
          <Select value={preferences.duration} onValueChange={(value) => setPreferences(prev => ({ ...prev, duration: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select trip duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2-days">1-2 Days</SelectItem>
              <SelectItem value="3-5-days">3-5 Days</SelectItem>
              <SelectItem value="1-week">1 Week</SelectItem>
              <SelectItem value="2-weeks">2 Weeks</SelectItem>
              <SelectItem value="1-month">1 Month+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    },
    {
      title: "What's your travel style?",
      subtitle: "This helps us customize your experience",
      content: (
        <div className="space-y-4">
          <Select value={preferences.travelStyle} onValueChange={(value) => setPreferences(prev => ({ ...prev, travelStyle: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select your travel style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adventure">Adventure & Outdoor</SelectItem>
              <SelectItem value="cultural">Cultural & Historical</SelectItem>
              <SelectItem value="relaxation">Relaxation & Wellness</SelectItem>
              <SelectItem value="family">Family Friendly</SelectItem>
              <SelectItem value="business">Business Travel</SelectItem>
              <SelectItem value="romantic">Romantic Getaway</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    },
    {
      title: "Preferred accommodation type?",
      subtitle: "Choose what suits your style best",
      content: (
        <div className="space-y-4">
          <Select value={preferences.accommodation} onValueChange={(value) => setPreferences(prev => ({ ...prev, accommodation: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select accommodation preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hotel">Hotels</SelectItem>
              <SelectItem value="resort">Resorts</SelectItem>
              <SelectItem value="homestay">Homestays</SelectItem>
              <SelectItem value="hostel">Hostels</SelectItem>
              <SelectItem value="airbnb">Vacation Rentals</SelectItem>
              <SelectItem value="boutique">Boutique Properties</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    }
  ];

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: return preferences.comfortRating > 0;
      case 1: return preferences.budget !== '';
      case 2: return preferences.duration !== '';
      case 3: return preferences.travelStyle !== '';
      case 4: return preferences.accommodation !== '';
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onSubmit(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Let's plan your perfect trip!</DialogTitle>
          <p className="text-sm text-muted-foreground">{tripQuery}</p>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Step {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3>{questions[currentStep].title}</h3>
                <p className="text-sm text-muted-foreground">{questions[currentStep].subtitle}</p>
              </div>
              {questions[currentStep].content}
            </div>
          </Card>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex-1"
            >
              Back
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!isCurrentStepValid()}
              className="flex-1"
            >
              {currentStep === questions.length - 1 ? 'Generate Itinerary' : 'Next'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
