import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, of } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  getUsers() {
    if (this.storage.get('users')) {
      return of(this.storage.get('users'));
    } else {
      return this.http.get('assets/data/users.json')
        .pipe(map((json: any) => {
          this.storage.set('users', json);
          return json
        }))
    }
  }
}
