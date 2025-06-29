'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Card } from './ui/card';

type MapProps = {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: { lat: number; lng: number; key: string }[];
  className?: string;
};

export default function MapComponent({ center, zoom = 12, markers, className }: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Card className={`flex items-center justify-center bg-muted/50 text-muted-foreground ${className}`}>
        <div className="text-center p-4">
          <p className="font-semibold">Map Unavailable</p>
          <p className="text-sm">Google Maps API key is not configured.</p>
        </div>
      </Card>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className={className}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId="host_and_go_map_id"
          className='rounded-lg'
        >
          {markers ? (
            markers.map(marker => <AdvancedMarker key={marker.key} position={marker} />)
          ) : (
            <AdvancedMarker position={center} />
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
