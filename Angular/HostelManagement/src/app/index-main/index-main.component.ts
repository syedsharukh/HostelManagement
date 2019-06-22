import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-main',
  templateUrl: './index-main.component.html',
  styleUrls: ['./index-main.component.css']
})
export class IndexMainComponent implements OnInit {

  constructor() { }
  public tenants : any= [
    {
      "FirstName" : "Ajay",
      "LastName" : "Kumar",
      "Email" : "ajay@gmail.com",
      "phonenumber" : "8494516498"
    },
    {
      "FirstName" : "Gowtham",
      "LastName" : "Susarla",
      "Email" : "gowtham@gmail.com",
      "phonenumber" : "8494656544"
    },
    {
      "FirstName" : "Hemanth",
      "LastName" : "Kumar",
      "Email" : "hemanth@gmail.com",
      "phonenumber" : "494454654"
    }
  ]
  ngOnInit() {
    console.log(this.tenants);
  }
 
}
