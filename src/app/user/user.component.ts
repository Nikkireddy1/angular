import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { debounceTime, distinctUntilChanged, finalize, map, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user',
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  userSearch: string = '';
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  search = new Subject<string>();
  search$ = this.search.asObservable();
  isLoading = true;
  errorMessage = '';

  ngOnInit() {
    this.errorMessage = '';
    this.userService.getUsers()
      .pipe(
        takeUntilDestroyed(this.destroyRef),

        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (data) => {
          this.users = data;
          this.filteredUsers = [...this.users];
        },
        error: () => {
          this.errorMessage = 'Failed to load users';
        }
      })
    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((term): User[] =>
        this.users.filter(u => u.name.toLowerCase().includes(term.toLowerCase()))
      ),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (filteredUsers) => {
        this.filteredUsers = filteredUsers;
      }
    })
  }

  onSearchChange(value: string) {
    console.log('HANDLER FIRED:', value);
    this.search.next(value);
  }


}
