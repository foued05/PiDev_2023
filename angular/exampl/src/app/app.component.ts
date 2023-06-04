import { Component, OnInit } from '@angular/core';
import { ExpService } from './services/exp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'exampl';

  responses: string[] = [];

  constructor(private expService: ExpService){}
  ngOnInit(): void {
    
    this.expService.getData().subscribe(
      (response) => {
        console.log('API response:', response);
      },
      (error) => {
        console.log('API error:', error);
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
  }
}
