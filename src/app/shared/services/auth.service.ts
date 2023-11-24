import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  shopp = new Subject();

  constructor(private http: HttpClient) { }

  login(userData: any) {
      return this.http.post('http://localhost:3000/login.php', userData);
  }
  
  register(userData: any) {
    return this.http.post('http://localhost:3000/register.php', userData);
}
}
