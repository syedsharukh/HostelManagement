import { Component, OnInit, Input } from '@angular/core';
import { UtilServiceService } from '../shared/util-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { PopupTenantComponent } from '../popup-tenant/popup-tenant.component';
@Component({
  selector: 'app-index-main',
  templateUrl: './index-main.component.html',
  styleUrls: ['./index-main.component.css']
})
export class IndexMainComponent implements OnInit {
  constructor(private util:UtilServiceService, private dialog: MatDialog) { }
  public results:any=[];
  public tenants:any=[];
  ngOnInit() {
    this.getTenateDetails();
  }
  getTenateDetails() {
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
 
  onCreate() {
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    const dailogRef = this.dialog.open(PopupTenantComponent, dialogConfig);
    dailogRef.afterClosed().subscribe(res => {
      this.getTenateDetails();
    })
  }
 
}
