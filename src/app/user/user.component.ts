import { Component } from '@angular/core';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  users: User[]= [{
    id:1, name:'Nikhil',email:'nikkireddy333@gmail.com',role:'admin'
  },
  {
    id:2, name:'John',email:'john.doe@example.com',role:'user'
  },
  {
    id:3, name:'Jane',email:'jane.doe@example.com',role:'user'
  }

]

}
