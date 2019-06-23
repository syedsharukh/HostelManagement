import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup,  Validators, FormControl } from '@angular/forms';
import { Tenant } from '../Model/Tenant';
import { UtilServiceService } from '../shared/util-service.service';
import { IndexMainComponent } from '../index-main/index-main.component';
@Component({
  selector: 'app-popup-tenant',
  templateUrl: './popup-tenant.component.html',
  styleUrls: ['./popup-tenant.component.css']
})
export class PopupTenantComponent implements OnInit {
  addTenantForm : FormGroup;
  tenant : Tenant = <Tenant>{};
  constructor(public dialogRef : MatDialogRef<PopupTenantComponent>, private util : UtilServiceService) {
   }

  ngOnInit() {
    this.createForm();
  }
  onClose() {
    this.addTenantForm.reset();
    this.dialogRef.close();
  }
  createForm() {
    this.addTenantForm = new FormGroup({
      'name' : new FormControl('', [Validators.required]),
      'mobileNumber' : new FormControl('', [Validators.required]),
      'aMobileNumber' : new FormControl(''),
      'email' : new FormControl('', [Validators.required]),
      'gender' : new FormControl('', [Validators.required]),
      'address' : new FormControl(''),
      'age' : new FormControl('', [Validators.required]),
      'advanceAmount' : new FormControl('', [Validators.required])
    })
  }
  addTenant() {
    this.tenant.Name = this.addTenantForm.controls["name"].value;
    this.tenant.MobileNumber = this.addTenantForm.controls["mobileNumber"].value;
    this.tenant.AlternativeMobileNumber = this.addTenantForm.controls["aMobileNumber"].value;
    this.tenant.Email = this.addTenantForm.controls["email"].value;
    this.tenant.Gender = this.addTenantForm.controls["gender"].value;
    this.tenant.Address = this.addTenantForm.controls["address"].value;
    this.tenant.Age = this.addTenantForm.controls["age"].value;
    this.tenant.AdvanceAmount = this.addTenantForm.controls["advanceAmount"].value;
    this.tenant.IsActive = true;
    this.tenant.Referral = "";
    console.log(this.tenant);
    this.util.insertTenateDetails(this.tenant).subscribe(res => {
      if(res) {
        alert("Tenant Created Successfully.");
        this.dialogRef.close();
        
      } else {
        alert("something Went Wrong");
      }
    }, error => {
      alert("Error : " + error);
    })
  }
}
