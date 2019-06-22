import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {

  private url:string="http://localhost:60087/api/Tenant";
  constructor(private http : HttpClient) { }

  getTenateDetails(): Observable<any> {
    return this.http.get(this.url);
  }
  
}
