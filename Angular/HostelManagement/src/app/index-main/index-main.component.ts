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
      "Name" : "Ajay",
      "DOJ" : "22-06-2019",
      "Email" : "ajay@gmail.com",
      "phonenumber" : "8494516498"
    },
    {
      "Name" : "Gowtham",
      "DOJ" : "22-06-2019",
      "Email" : "gowtham@gmail.com",
      "phonenumber" : "8494656544"
    },
    {
      "Name" : "Hemanth",
      "DOJ" : "22-06-2019",
      "Email" : "hemanth@gmail.com",
      "phonenumber" : "494454654"
    }
  ]
  ngOnInit() {
    console.log(this.tenants);
  }
 
}
