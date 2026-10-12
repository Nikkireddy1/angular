import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [{
    id: 1, name: 'Nikhil', email: 'nikkireddy333@gmail.com', role: 'admin'
  },
  {
    id: 2, name: 'John', email: 'john.doe@example.com', role: 'user'
  },
  {
    id: 3, name: 'Jane', email: 'jane.doe@example.com', role: 'user'
  }

  ]


  getUsers(): Observable<User[]> {
    return of(this.users);
  }
}
