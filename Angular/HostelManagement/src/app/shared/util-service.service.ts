import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tenant } from '../Model/Tenant';
@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {

  private url:string="http://localhost:60087/api/Tenant";
  private options = { headers: new HttpHeaders().set('Content-Type','application/json')};
  constructor(private http : HttpClient) { }

  getTenateDetails(): Observable<any> {
    return this.http.get(this.url);
  }
  insertTenateDetails(tenant : Tenant) : Observable<any> {
    return this.http.post(this.url + "/InsertTenantDetails", JSON.stringify(tenant), this.options);
  }
}
