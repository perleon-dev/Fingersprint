import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './service/web-socket.service';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'fingersprint_Virdi';

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.connect().subscribe(
      (message) => {
        console.log("Conecto : "+ message);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sendMessage(): void {
    this.webSocketService.sendMessage('{"msgId":"2000","body":{"UserId":"","ImageType":"JPG","BrandType":"VIRDI","FingerIndex":1,"TemplateFormat":3}}');
  }
}
