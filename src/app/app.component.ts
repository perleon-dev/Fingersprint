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
  user?: User;
  imageBase64?:string;

  public messages: User[] = [];

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.connect().subscribe(
      (message) => {
        this.user = JSON.parse(message);
        
        if(this.user != undefined && this.user.msgId == 2001){
          var xx = JSON.parse(this.user?.body)
          this.imageBase64 = xx.imageData;
          console.log("Conecto : "+ JSON.stringify(this.user) );
        }else{
          console.log("Conecto : "+ message );
        }

        
      },
      (error) => {
        console.error(error);
      }
    );
  }

  //fingerindes numero de dedo
  sendMessage(numDedo: string): void {
    this.webSocketService.sendMessage('{"msgId":"2000","body":{"UserId":"","ImageType":"JPG","BrandType":"VIRDI","FingerIndex":'+numDedo+',"TemplateFormat":3}}');
  }
}
