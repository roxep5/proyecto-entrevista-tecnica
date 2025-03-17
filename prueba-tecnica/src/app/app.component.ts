import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './models/User';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './components/UserTable/UserTable.component';
import { SearchBarComponent } from './components/SearchBar/SearchBar.component';
import { NationalityFilterComponent } from './components/NationalityFilter/NationalityFilter.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule,
    UserTableComponent,
    RouterOutlet,
    SearchBarComponent,
    NationalityFilterComponent
  ]
})
export class AppComponent implements OnInit {
  allUsers: User[] = [];
  usersFiltered: User[] = [];
  nationalities: string[] = [];
  nameFilter: string = '';
  nationalitiesSelectedFilter: string[] = [];
  // filtramos los usuarios por nombre y nacionalidad validando cual esta lleno
  get getFilteredUsers() {
    if (this.nameFilter !== '' && this.nationalitiesSelectedFilter.length === 0) {
      return this.allUsers.filter(user => {
        const nameComplete = user.name.first.toLowerCase() + user.name.last.toLowerCase();
        return nameComplete.includes(this.nameFilter.toLowerCase())
      });
    }
    if (this.nameFilter === '' && this.nationalitiesSelectedFilter.length !== 0) {
      return this.allUsers.filter(user => this.nationalitiesSelectedFilter.includes(user.nat));
    }
    if (this.nameFilter !== '' && this.nationalitiesSelectedFilter.length !== 0) {
      return this.allUsers.filter(user => {
        const nameComplete = user.name.first + user.name.last;
        return this.nationalitiesSelectedFilter.includes(user.nat) && nameComplete.includes(this.nameFilter)
      });
    }

    return this.allUsers;
  }
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.allUsers = data.results;
        this.usersFiltered = this.allUsers;
        this.nationalities = [...new Set(this.allUsers.map(user => user.nat))]
      },
      error: (error) => console.error('Error:', error)
    });
  }
  //filtramos los usuarios por nacionalidad
  filteredNat(event: string[]) {
    this.nationalitiesSelectedFilter = event;
    this.usersFiltered = this.getFilteredUsers;
  }
  //filtramos los usuarios por nombre y apellidos
  filteredName(event: string) {
    this.nameFilter = event;
    console.log(this.nameFilter);
    this.usersFiltered = this.getFilteredUsers;
  }
}
