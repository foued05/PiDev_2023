import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { EventLocation } from '../models/event-location.model';

@Injectable({
  providedIn: 'root',
})
export class EventLocationService {
  private socket: any;

  constructor(private http: HttpClient) { 
    this.socket = io('http://localhost:3080');
  }

  getData():Observable<any>{
    return this.http.get<any>('http://localhost:3080/event-location/list')
  }
  sendEventList(eventLocationList: EventLocation[]): void {
    this.getData().subscribe((res)=>console.log(res))
    this.socket.emit('event-location-list', eventLocationList);
  }
  getEventLocations(): Observable<EventLocation[]> {
    return new Observable((observer) => {
      this.socket.on(
        'event-location-list',
        (eventLocationList: EventLocation[]) => {
          observer.next(eventLocationList);
          console.log(eventLocationList)
        }
      );
      return () => {
        this.socket.off('event-location-list');
      };
    });
  }
}
