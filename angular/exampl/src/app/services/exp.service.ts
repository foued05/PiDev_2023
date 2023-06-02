import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ExpService {


  private socket: any;

  constructor(private http: HttpClient) { 
    this.socket = io('http://localhost:3000');
  }

  getData():Observable<any>{
    return this.http.get<any>('http://localhost:3000/api/data')
  }

  sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  getResponse(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('response', (data: any) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }
}
