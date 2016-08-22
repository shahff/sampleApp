import {Component} from '@angular/core';
import {MessageService} from './messageService';
import {Observable} from 'rxjs';



@Component({
  selector: 'message',
  styleUrls: ['./message.css'],
  templateUrl: './message.html'
})
export class Message {

    newMessage:any = {};
    messages$:Observable<any[]>;

    constructor(public messageService: MessageService){
        
        this.messages$ = this.messageService.findMessages();
    }

    findMsg(){
      this.messages$ = this.messageService.findMessages();
    }

    createMsg(){
      let message = this.newMessage;
      
      this.messageService.createMessage(message).subscribe(
        res => {this.findMsg();},
        err => {console.log("err = "+err)}
      );
    }

    removeMsg(id){
      
      this.messageService.removeMessage(id).subscribe(
        res => {this.findMsg();},
        err => {console.log("err = "+err)}
      );
    }
}
