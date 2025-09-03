import React from 'react';
import { ForecastData } from '@/services/weatherService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ForecastCardProps {
  forecast: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  // Get daily forecasts (one per day)
  const dailyForecasts = forecast.list.filter((item, index) => 
    index % 8 === 0 // API returns data every 3 hours, so every 8th item is roughly one day
  ).slice(0, 5);

  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="shadow-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dailyForecasts.map((day, index) => (
            <div 
              key={day.dt} 
              className="flex items-center justify-between p-3 rounded-lg bg-accent/50 hover:bg-accent/70 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img 
                  src={getWeatherIcon(day.weather[0].icon)} 
                  alt={day.weather[0].description}
                  className="w-10 h-10"
                />
                <div>
                  <div className="font-medium">
                    {index === 0 ? 'Today' : formatDate(day.dt)}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {day.weather[0].description}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold">
                  {Math.round(day.main.temp)}°C
                </div>
                <div className="text-xs text-muted-foreground">
                  {day.main.humidity}% humidity
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;