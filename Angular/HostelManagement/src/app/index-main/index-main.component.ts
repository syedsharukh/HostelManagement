import { Component, OnInit } from '@angular/core';
import { UtilServiceService } from '../shared/util-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PopupTenantComponent } from '../popup-tenant/popup-tenant.component';
@Component({
  selector: 'app-index-main',
  templateUrl: './index-main.component.html',
  styleUrls: ['./index-main.component.css']
})
export class IndexMainComponent implements OnInit {

  constructor(private util:UtilServiceService, private dialog: MatDialog) { }
  public tenants:any=[];
  
  ngOnInit() {
   this.util.getTenateDetails().subscribe(res=>
    {
      console.log(res);
      this.tenants=res;
    });
  }
  onCreate() {
    const dialogConfig =  new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    this.dialog.open(PopupTenantComponent, dialogConfig);
  }
 
}
