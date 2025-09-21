
from typing import List, Optional
from pydantic import BaseModel, Field


class Location(BaseModel):
    """Location details for departure/arrival"""
    location: str = Field(description="Location name")
    time: str = Field(description="Time")
    date: str = Field(description="Date")


class ReturnDetails(BaseModel):
    """Return journey details"""
    departure: Location = Field(description="Return departure details")
    arrival: Location = Field(description="Return arrival details")


class Route(BaseModel):
    """Travel route information"""
    departure: Location = Field(description="Initial departure details")
    arrival: Location = Field(description="Initial arrival details")
    return_journey: ReturnDetails = Field(description="Return journey details")


class Vehicle(BaseModel):
    """Transportation vehicle details"""
    type: str = Field(description="Type of vehicle (Train, Flight, Car, etc.)")
    name: str = Field(description="Vehicle name or flight number")
    price: str = Field(description="Price in currency format")
    duration: str = Field(description="Duration of travel")
    features: List[str] = Field(description="List of features/amenities")


class Hotel(BaseModel):
    """Hotel accommodation details"""
    name: str = Field(description="Hotel name")
    rating: int = Field(description="Hotel rating (1-5)")
    price: str = Field(description="Price per night in currency format")
    location: str = Field(description="Hotel location")
    amenities: List[str] = Field(description="List of hotel amenities")


class Activity(BaseModel):
    """Activity details"""
    name: str = Field(description="Activity name")
    type: str = Field(description="Activity type (Heritage, Cultural, Leisure, etc.)")
    duration: str = Field(description="Activity duration")
    price: str = Field(description="Activity price")
    description: str = Field(description="Activity description")


class MapMarker(BaseModel):
    """Map marker details"""
    lat: float = Field(description="Latitude coordinate")
    lng: float = Field(description="Longitude coordinate")
    title: str = Field(description="Marker title")
    type: str = Field(description="Marker type (departure, destination, activity)")


class MapData(BaseModel):
    """Map data for the trip"""
    center: MapMarker = Field(description="Map center coordinates")
    markers: List[MapMarker] = Field(description="List of map markers")


class TripItinerary(BaseModel):
    """Complete trip itinerary matching frontend structure"""
    id: str = Field(description="Unique trip identifier")
    title: str = Field(description="Trip title")
    type: str = Field(description="Trip type (Budget Friendly, Mid-Range, Premium)")
    duration: str = Field(description="Trip duration (e.g., '3 Days', '4 Days')")
    budget: str = Field(description="Budget range (e.g., '₹15,000 - ₹20,000')")
    rating: int = Field(description="Trip rating (1-5)")
    summary: str = Field(description="Trip summary description")
    highlights: List[str] = Field(description="List of trip highlights")
    route: Route = Field(description="Travel route information")
    vehicles: List[Vehicle] = Field(description="List of transportation options")
    hotels: List[Hotel] = Field(description="List of accommodation options")
    activities: List[Activity] = Field(description="List of activities")
    mapData: MapData = Field(description="Map data for visualization")


class AgentOutputSchema(BaseModel):
    """Output schema for the trip planning agent"""
    itineraries: List[TripItinerary] = Field(description="List of trip itineraries")
    success: bool = Field(description="Whether the itineraries were successfully generated")
    message: Optional[str] = Field(description="Additional message or notes", default=None)
