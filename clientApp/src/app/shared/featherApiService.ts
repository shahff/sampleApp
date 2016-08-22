import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';


const feathers = require('feathers/client');
const socketio = require('feathers-socketio/client');
const io = require('socket.io-client');
const localstorage = require('feathers-localstorage');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest/client');
const authentication = require('feathers-authentication/client');

@Injectable()
export default class FeatherApiService {

   _app:any;
   _selectService:any; 
  
  constructor() {
    
    let socket = io('http://localhost:3030/');
     this._app = feathers()
        .configure(socketio(socket)) // you could use Primus or REST instead
        .configure(hooks())
        .configure(authentication({ storage: window.localStorage }));

  }

  init(serviceName:string){
    this._selectService = this._app.service(serviceName);
  }

  auth(account){
      let acct = {type: 'local','email': account.email,'password': account.password};
     return Observable.fromPromise(this._app.authenticate(acct)).share();  
  }

  register(account){
     return Observable.fromPromise(this._app.service('users').create({email: account.email,password: account.password}));
  }
  
  find(params?){
     params = {query: {$limit: 10}};
     return Observable.fromPromise(this._selectService.find(params)).share().map(res => (res as any).data);  
  }
  
  create(data, params?){
     return Observable.fromPromise(this._selectService.create(data));  
  }
  
  remove(id,params?){
     return Observable.fromPromise(this._selectService.remove(id));  
  }


  //get(id, params [, callback]) {},
  //update(id, data, params [, callback]) {},
  //patch(id, data, params [, callback]) {},
  
}
