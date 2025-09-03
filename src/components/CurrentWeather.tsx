import React from 'react';
import { WeatherData } from '@/services/weatherService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, MapPin } from 'lucide-react';

interface CurrentWeatherProps {
  weather: WeatherData;
  theme: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, theme }) => {
  const getWeatherIcon = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case 'sunny':
        return 'bg-gradient-to-br from-sunny/20 to-sunny/10 border-sunny/30';
      case 'rainy':
        return 'bg-gradient-to-br from-rainy/20 to-rainy/10 border-rainy/30';
      case 'cloudy':
        return 'bg-gradient-to-br from-cloudy/20 to-cloudy/10 border-cloudy/30';
      case 'stormy':
        return 'bg-gradient-to-br from-stormy/20 to-stormy/10 border-stormy/30';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <Card className={`shadow-lg ${getThemeClasses(theme)}`}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-xl">
          <MapPin className="h-5 w-5" />
          {weather.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <img 
              src={getWeatherIcon(weather.weather[0].icon)} 
              alt={weather.weather[0].description}
              className="w-16 h-16"
            />
          </div>
          <div className="text-4xl font-bold mb-1">{Math.round(weather.main.temp)}°C</div>
          <div className="text-lg text-muted-foreground capitalize">
            {weather.weather[0].description}
          </div>
          <div className="text-sm text-muted-foreground">
            Feels like {Math.round(weather.main.feels_like)}°C
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-sm text-muted-foreground">Humidity</div>
            <div className="text-lg font-semibold">{weather.main.humidity}%</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Wind className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-sm text-muted-foreground">Wind</div>
            <div className="text-lg font-semibold">{Math.round(weather.wind.speed * 3.6)} km/h</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-sm text-muted-foreground">Range</div>
            <div className="text-lg font-semibold">
              {Math.round(weather.main.temp_min)}°-{Math.round(weather.main.temp_max)}°
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;