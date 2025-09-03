import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WeatherSearchProps {
  onSearch: (city: string) => void;
  loading?: boolean;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="pl-10 bg-card border-border"
          disabled={loading}
        />
      </div>
      <Button 
        type="submit" 
        disabled={!city.trim() || loading}
        className="px-6 bg-primary hover:bg-primary/90"
      >
        {loading ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
};

export default WeatherSearch;