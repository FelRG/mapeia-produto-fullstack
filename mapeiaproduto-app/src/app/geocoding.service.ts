import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  geocoder = new google.maps.Geocoder();

  geocodeAddress(enderecoCompleto: string): Promise<google.maps.LatLngLiteral> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address: enderecoCompleto }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(`Erro na geocodificação: ${status}`);
        }
      });
    });
  }
}
