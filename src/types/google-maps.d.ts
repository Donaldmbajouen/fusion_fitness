// Google Maps type declarations
declare global {
  interface Window {
    google?: typeof google;
    initGoogleMap?: () => void;
  }
}

declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
  }

  class Marker {
    constructor(opts?: MarkerOptions);
  }

  interface MapOptions {
    center?: LatLngLiteral;
    zoom?: number;
    styles?: MapTypeStyle[];
    disableDefaultUI?: boolean;
    zoomControl?: boolean;
    mapTypeControl?: boolean;
    streetViewControl?: boolean;
  }

  interface MarkerOptions {
    position?: LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: Symbol | string;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapTypeStyle {
    elementType?: string;
    featureType?: string;
    stylers?: object[];
  }

  interface Symbol {
    path: SymbolPath;
    scale?: number;
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeWeight?: number;
  }

  enum SymbolPath {
    CIRCLE = 0,
  }
}

export {};
