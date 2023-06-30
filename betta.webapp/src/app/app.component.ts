import { Component, OnInit } from '@angular/core';
import { ExpService } from './services/exp.service';
import { EventLocationService } from './services/event-location.service';
import { EventLocation } from './models/event-location.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'exampl';

  responses: string[] = [];
  eventLocations: EventLocation[];


  constructor(private expService: ExpService , private eventLocationSvc : EventLocationService){}
  ngOnInit(): void {
    
    this.expService.getData().subscribe(
      (response) => {
        console.log('API response:', response);
      },
      (error) => {
        console.log('API error:', error);
      }
    );

    this.eventLocationSvc.getData().subscribe(
      (response) => {
        console.log('eventLocationSvc response:', response);
        this.eventLocations=response
      },
      (error) => {
        console.log('eventLocationSvc error:', error);
      }
    );

    this.expService.sendMessage('Hello server!');

    this.expService.getResponse().subscribe(
      (response) => {
        this.responses.push(response);
        console.log('Server response:', response);
      },
      (error) => {
        console.log('Socket error:', error);
      }
    );

    this.eventLocationSvc.sendEventList(this.eventLocations)


  //   this.eventLocationSvc.sendEventList([
  //     {
  //         _id: "647f9316eb3bd8fe8435750e",
  //         event: "647db91ac33a655a960daf4b",
  //         "eventLocationLatitude": 48.8566,
  //         "eventLocationLongitude": 2.3522,
  //         "eventAddress": "789 Oak Street",
  //         "eventCountry": "France",
  //         "eventCity": "Paris",
  //         "eventRegion": "Ile-de-France",
  //         "eventLocationImage": "https://ssl.cdn-redfin.com/photo/94/mbphoto/809/genMid.6452809_1.jpg",
  //         "creationDate": new Date(),
  //         "createdBy": "postman",
  //         "isDeleted": false,
  //         "__v": 0
  //     },
  //     {
  //         "_id": "647f93eaeb3bd8fe84357519",
  //         "event": "647f93bceb3bd8fe84357515",
  //         "eventLocationLatitude": 40.7128,
  //         "eventLocationLongitude": -74.006,
  //         "eventAddress": "456 Elm Street",
  //         "eventCountry": "United States",
  //         "eventCity": "New York",
  //         "eventRegion": "New York",
  //         "eventLocationImage": "https://ssl.cdn-redfin.com/photo/77/bigphoto/483/20060483_0.jpg",
  //         "creationDate": new Date(),
  //         "createdBy": "postman",
  //         "isDeleted": false,
  //         "__v": 0
  //     },
  //     {
  //         "_id": "6481a79f136f859456c5220f",
  //         "event": "647f9391eb3bd8fe84357511",
  //         "eventLocationLatitude": 48.8566,
  //         "eventLocationLongitude": 2.3522,
  //         "eventAddress": "789 Oak Street",
  //         "eventCountry": "France",
  //         "eventCity": "Paris",
  //         "eventRegion": "Ile-de-France",
  //         "eventLocationImage": "https://ssl.cdn-redfin.com/photo/84/mbphoto/390/genMid.23592390_31_1.jpg",
  //         "creationDate": new Date(),
  //         "createdBy": "postman",
  //         "isDeleted": false,
  //         "__v": 0
  //     },
  //     {
  //         "_id": "6481a929136f859456c5222d",
  //         "event": "6481a908136f859456c52227",
  //         "eventLocationLatitude": 48.8566,
  //         "eventLocationLongitude": 2.3522,
  //         "eventAddress": "789 Oak Street",
  //         "eventCountry": "France",
  //         "eventCity": "Paris",
  //         "eventRegion": "Ile-de-France",
  //         "eventLocationImage": "https://ssl.cdn-redfin.com/photo/84/mbphoto/390/genMid.23592390_31_1.jpg",
  //         "creationDate": new Date(),
  //         "createdBy": "postman",
  //         "isDeleted": false,
  //         "__v": 0
  //     }
  // ]);

    this.eventLocationSvc.getEventLocations().subscribe(
      (eventLocations) => {
        this.eventLocations=eventLocations;
        console.log('Server eventLocations:', eventLocations);
      },
      (error) => {
        console.log('Socket error:', error);
      }
    );

  }
}
