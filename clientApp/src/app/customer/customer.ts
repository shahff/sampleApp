import {Component} from '@angular/core';
import {CustomerService} from './customerService';
import {Observable} from 'rxjs';

@Component({
  selector: 'customer',
  styleUrls: ['./customer.css'],
  templateUrl: './customer.html'
})
export class Customer {
    
    newCustomer:any = {};
    newlogin:any = {};
    customers$:Observable<any[]>;

    constructor(public customerService: CustomerService){
        
        this.customers$ = this.customerService.findCustomers();
    }

    login(){
      var account = {email:this.newlogin.email, password:this.newlogin.password};
      this.customerService.auth(account).subscribe(
        res =>{console.log(res)},
        err => {console.log(err)}
      );
    }

    register(){
      var account = {email:this.newlogin.email, password:this.newlogin.password};
      this.customerService.register(account).subscribe(
        res =>{console.log(res)},
        err => {console.log(err)}
      );
    }

    findCustomer(){
      this.customers$ = this.customerService.findCustomers();
    }

    createCustomer(){
      
      let cust = this.newCustomer;
      
      this.customerService.createCustomer(cust).subscribe(
        res => {this.findCustomer();},
        err => {console.log("err = "+err)}
      );
    }

    removeMsg(id){
      
      this.customerService.removeCustomer(id).subscribe(
        res => {this.findCustomer();},
        err => {console.log("err = "+err)}
      );
    }
}