import { Component, OnInit, Input } from '@angular/core';
import { UtilServiceService } from '../shared/util-service.service';
@Component({
  selector: 'app-index-main',
  templateUrl: './index-main.component.html',
  styleUrls: ['./index-main.component.css']
})
export class IndexMainComponent implements OnInit {

  constructor(private util:UtilServiceService) { }
  public results:any=[];
  public tenants:any=[];
  // public tenants : any= [
  //   {
  //     "Name" : "Ajay",
  //     "DOJ" : "22-06-2019",
  //     "Email" : "ajay@gmail.com",
  //     "phonenumber" : "8494516498"
  //   },
  //   {
  //     "Name" : "Gowtham",
  //     "DOJ" : "22-06-2019",
  //     "Email" : "gowtham@gmail.com",
  //     "phonenumber" : "8494656544"
  //   },
  //   {
  //     "Name" : "Hemanth",
  //     "DOJ" : "22-06-2019",
  //     "Email" : "hemanth@gmail.com",
  //     "phonenumber" : "494454654"
  //   }
  // ]
  ngOnInit() {
   this.util.getTenateDetails().subscribe(res=>
    {
      console.table(res);
      this.results = res;
      this.tenants=res;
    });
  }
  
  FilterTenants(element : any)
  {
    var keyword = element.target.value.toLowerCase();
    if(keyword.length > 0){
      this.tenants=this.results.filter(x => x.name.toLowerCase().includes(keyword)||x.mobileNumber.toLowerCase().includes(keyword));
    }
    else{
      this.tenants=this.results;
    }
    
  }
 
 
}
