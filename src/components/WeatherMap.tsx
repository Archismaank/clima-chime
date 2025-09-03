import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface WeatherMapProps {
  lat: number;
  lon: number;
  cityName: string;
  mapboxToken?: string;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon, cityName, mapboxToken }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [lon, lat],
      zoom: 10,
    });

    // Add marker
    new mapboxgl.Marker({ color: '#3b82f6' })
      .setLngLat([lon, lat])
      .setPopup(new mapboxgl.Popup().setText(cityName))
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [lat, lon, cityName, mapboxToken]);

  if (!mapboxToken) {
    return (
      <Card className="shadow-lg bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            City Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted rounded-lg p-8 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-medium mb-2">Map Not Available</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please add your Mapbox public token to view the interactive map.
            </p>
            <div className="text-sm">
              <strong>Location:</strong> {cityName}<br />
              <strong>Coordinates:</strong> {lat.toFixed(4)}, {lon.toFixed(4)}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg bg-card border-border">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {cityName} Location
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={mapContainer} className="h-64 w-full rounded-b-lg" />
      </CardContent>
    </Card>
  );
};

export default WeatherMap;