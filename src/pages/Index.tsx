import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WeatherService, WeatherData, ForecastData, Alert } from '@/services/weatherService';
import WeatherSearch from '@/components/WeatherSearch';
import CurrentWeather from '@/components/CurrentWeather';
import ForecastCard from '@/components/ForecastCard';
import AlertsPanel from '@/components/AlertsPanel';
import WeatherMap from '@/components/WeatherMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CloudSun, Key, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/weather-hero.jpg';

const Index = () => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [weatherApiKey, setWeatherApiKey] = useState<string>('');
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showSetup, setShowSetup] = useState<boolean>(true);
  const { toast } = useToast();

  const weatherService = weatherApiKey ? new WeatherService(weatherApiKey) : null;

  const { data: currentWeather, isLoading: weatherLoading, error: weatherError } = useQuery({
    queryKey: ['weather', selectedCity, weatherApiKey],
    queryFn: () => weatherService!.getCurrentWeather(selectedCity),
    enabled: !!(selectedCity && weatherApiKey && weatherService),
    retry: false,
  });

  const { data: forecast } = useQuery({
    queryKey: ['forecast', selectedCity, weatherApiKey],
    queryFn: () => weatherService!.getForecast(selectedCity),
    enabled: !!(selectedCity && weatherApiKey && weatherService),
    retry: false,
  });

  const alerts: Alert[] = currentWeather && forecast && weatherService 
    ? weatherService.generateAlerts(currentWeather, forecast)
    : [];

  const weatherTheme = currentWeather && weatherService 
    ? weatherService.getWeatherTheme(currentWeather.weather[0].main)
    : 'clear';

  const handleSearch = async (city: string) => {
    if (!weatherApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenWeather API key first.",
        variant: "destructive",
      });
      return;
    }
    setSelectedCity(city);
  };

  const handleSetupComplete = () => {
    if (!weatherApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenWeather API key to continue.",
        variant: "destructive",
      });
      return;
    }
    setShowSetup(false);
    toast({
      title: "Setup Complete!",
      description: "You can now search for weather in any city.",
    });
  };

  if (showSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <CloudSun className="h-12 w-12 text-primary" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-rainy bg-clip-text text-transparent">
                  Smart Weather Dashboard
                </h1>
              </div>
              <p className="text-xl text-muted-foreground">
                Get real-time weather, forecasts, and smart alerts for any city
              </p>
            </div>

            <Card className="shadow-xl bg-card/80 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  API Setup Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="weather-api">OpenWeather API Key *</Label>
                  <Input
                    id="weather-api"
                    type="password"
                    placeholder="Enter your OpenWeather API key..."
                    value={weatherApiKey}
                    onChange={(e) => setWeatherApiKey(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Get your free API key at{' '}
                    <a 
                      href="https://openweathermap.org/api" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      openweathermap.org
                    </a>
                  </p>
                </div>

                <div>
                  <Label htmlFor="mapbox-token">Mapbox Public Token (Optional)</Label>
                  <Input
                    id="mapbox-token"
                    type="password"
                    placeholder="Enter your Mapbox public token..."
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Get your token at{' '}
                    <a 
                      href="https://mapbox.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      mapbox.com
                    </a>{' '}
                    to enable map features
                  </p>
                </div>

                <Button 
                  onClick={handleSetupComplete}
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!weatherApiKey}
                >
                  Start Using Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (weatherError) {
    toast({
      title: "Weather Error",
      description: "Failed to fetch weather data. Please check your API key and city name.",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CloudSun className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Smart Weather Dashboard</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Get real-time weather, forecasts, and smart alerts
          </p>
          
          <div className="flex justify-center">
            <WeatherSearch onSearch={handleSearch} loading={weatherLoading} />
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 pb-8">
        {selectedCity && currentWeather ? (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/* Current Weather - Spans 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <CurrentWeather weather={currentWeather} theme={weatherTheme} />
            </div>

            {/* Alerts Panel */}
            <div>
              <AlertsPanel alerts={alerts} />
            </div>

            {/* Forecast - Spans 2 columns on lg screens, 3 on xl */}
            <div className="lg:col-span-2 xl:col-span-3">
              {forecast && <ForecastCard forecast={forecast} />}
            </div>

            {/* Map - Spans full width */}
            <div className="lg:col-span-2 xl:col-span-3">
              <WeatherMap 
                lat={currentWeather.coord.lat}
                lon={currentWeather.coord.lon}
                cityName={currentWeather.name}
                mapboxToken={mapboxToken}
              />
            </div>
          </div>
        ) : selectedCity && weatherLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading weather data...</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Search for a City</h2>
            <p className="text-muted-foreground">
              Enter a city name above to get current weather, forecast, and alerts
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
