import axios from 'axios';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
    };
    dt_txt: string;
  }>;
}

export interface Alert {
  type: 'rain' | 'heat' | 'wind';
  message: string;
  icon: string;
}

export class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCurrentWeather(city: string): Promise<WeatherData> {
    const response = await axios.get(
      `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`
    );
    return response.data;
  }

  async getForecast(city: string): Promise<ForecastData> {
    const response = await axios.get(
      `${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric`
    );
    return response.data;
  }

  generateAlerts(currentWeather: WeatherData, forecast: ForecastData): Alert[] {
    const alerts: Alert[] = [];

    // Check for rain in current or forecast
    const hasRain = currentWeather.weather.some(w => w.main.toLowerCase().includes('rain')) ||
                   forecast.list.slice(0, 8).some(item => 
                     item.weather.some(w => w.main.toLowerCase().includes('rain'))
                   );

    if (hasRain) {
      alerts.push({
        type: 'rain',
        message: 'Carry an umbrella! Rain expected',
        icon: '🌧️'
      });
    }

    // Check for high temperature
    if (currentWeather.main.temp > 35) {
      alerts.push({
        type: 'heat',
        message: 'Stay hydrated! High temperature warning',
        icon: '🥵'
      });
    }

    // Check for high wind
    if (currentWeather.wind.speed > 50) {
      alerts.push({
        type: 'wind',
        message: 'High winds warning! Be careful outside',
        icon: '🌪️'
      });
    }

    return alerts;
  }

  getWeatherTheme(weatherMain: string): string {
    const condition = weatherMain.toLowerCase();
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rainy';
    if (condition.includes('clear') || condition.includes('sun')) return 'sunny';
    if (condition.includes('cloud')) return 'cloudy';
    if (condition.includes('storm') || condition.includes('thunder')) return 'stormy';
    return 'clear';
  }
}