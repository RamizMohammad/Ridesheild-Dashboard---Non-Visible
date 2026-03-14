import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { Loader2 } from "lucide-react"

interface GoogleMapViewProps {
    center: [number, number];
    zoom?: number;
    pickup?: { lat: number, lng: number };
    dropoff?: { lat: number, lng: number };
    driverLocation?: { lat: number, lng: number };
}

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '2rem'
};

export default function GoogleMapView({ center, zoom = 14, pickup, dropoff, driverLocation }: GoogleMapViewProps) {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_API || ""
    })

    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)

    const mapCenter = useMemo(() => {
        if (driverLocation) return driverLocation; // Center on driver if available
        return {
            lat: center[0],
            lng: center[1]
        }
    }, [center, driverLocation])


    useEffect(() => {
        if (map && (pickup || dropoff || driverLocation)) {
            const bounds = new google.maps.LatLngBounds();
            if (pickup) bounds.extend(pickup);
            if (dropoff) bounds.extend(dropoff);
            if (driverLocation) bounds.extend(driverLocation);
            map.fitBounds(bounds);
        }
    }, [map, pickup, dropoff, driverLocation])

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null)
    }, [])

    useEffect(() => {
        if (isLoaded && pickup && dropoff) {
            const service = new google.maps.DirectionsService();
            service.route({
                origin: pickup,
                destination: dropoff,
                travelMode: google.maps.TravelMode.DRIVING
            }, (result, status) => {
                if (status === "OK" && result) {
                    setDirections(result)
                } else {
                    console.error(`Directions request failed due to ${status}`);
                }
            })
        }
    }, [isLoaded, pickup, dropoff])

    if (loadError) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full bg-slate-100 dark:bg-slate-900 rounded-[2rem] gap-2 p-4 text-center">
                <p className="text-red-500 font-bold">Map Failed to Load</p>
                <p className="text-xs text-muted-foreground">{loadError.message}</p>
                <p className="text-[10px] text-muted-foreground mt-2">Error: OverQuotaMapError usually means the API key is valid but billing is not enabled or quota is exceeded.</p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-[2rem]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        )
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                disableDefaultUI: true,
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                styles: [
                    {
                        featureType: "poi",
                        elementType: "labels",
                        stylers: [{ visibility: "off" }]
                    }
                ]
            }}
        >
            {/* Show route if available */}
            {directions && (
                <DirectionsRenderer
                    directions={directions}
                    options={{
                        suppressMarkers: false,
                        polylineOptions: {
                            strokeColor: "#3b82f6",
                            strokeWeight: 5
                        }
                    }}
                />
            )}

            {/* Fallback markers if no route or just to highlight center */}
            {!directions && <Marker position={mapCenter} />}

            {/* Driver Marker */}
            {driverLocation && (
                <Marker
                    position={driverLocation}
                    icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 6,
                        fillColor: "#000000",
                        fillOpacity: 1,
                        strokeWeight: 2,
                        strokeColor: "#FFFFFF",
                        rotation: 0 // TODO: Add heading if available
                    }}
                    title="Driver"
                    zIndex={100}
                />
            )}
        </GoogleMap>
    )
}
