import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import featherApiService from './../shared/featherApiService';
import {Observable} from 'rxjs';


@Injectable()
export class MessageService{
  
  constructor(public featherApiService: featherApiService) {
    
    featherApiService.init("messages");
  }
  
  findMessages(){
    return this.featherApiService.find();  
  }
  
  createMessage(message){
     return this.featherApiService.create(message);  
  }
  
  removeMessage(id){
     return this.featherApiService.remove(id);  
  }
}
