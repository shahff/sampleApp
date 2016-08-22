import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import featherApiService from './../shared/featherApiService';


@Injectable()
export class CustomerService{
  
  customerService:any;

  constructor(public featherApiService: featherApiService) {
    
    featherApiService.init("customers");
  }
  
  findCustomers(){
    return this.featherApiService.find();  
  }
  
  createCustomer(customer){
     return this.featherApiService.create(customer);  
  }
  
  removeCustomer(id){
     return this.featherApiService.remove(id);  
  }

  auth(account){
      return this.featherApiService.auth(account);  
  }

  register(account){
     return this.featherApiService.register(account);
  }
}
