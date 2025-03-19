import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './models/User';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './components/UserTable/UserTable.component';
import { SearchBarComponent } from './components/SearchBar/SearchBar.component';
import { NationalityFilterComponent } from './components/NationalityFilter/NationalityFilter.component';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule,
    UserTableComponent,
    RouterOutlet,
    SearchBarComponent,
    NationalityFilterComponent,
    MatProgressSpinnerModule
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
    return this.nameFilter !== '' ? this.allUsers.filter(user => {
      const nameComplete = user.name.first.toLowerCase() + user.name.last.toLowerCase();
      return nameComplete.includes(this.nameFilter.toLowerCase())
    }) : this.allUsers;
  }
  constructor(private apiService: ApiService,
    public loadingService: LoadingService
  ) { }
  ngOnInit(): void {
    this.loadingService.setLoading(true);
    this.apiService.getUsers().subscribe({
      next: (data) => {
        this.allUsers = data.results;
        this.usersFiltered = this.allUsers;
        //cargamos los datos de nacionalidades
        this.nationalities = [...new Set(this.allUsers.map(user => user.nat))]
      },
      error: (error) => console.error('Error:', error),
      complete: () => {
        this.loadingService.setLoading(false);
      }
    });
  }
  //filtramos los usuarios por nacionalidad
  filteredNat(event: string[]) {
    this.loadingService.setLoading(true);
    this.apiService.getUsersByNation(event).subscribe({
      next: (data) => {

        this.allUsers = data.results;
        this.usersFiltered = this.getFilteredUsers;
      },
      error: (error) => console.error('Error:', error),
      complete: () => {

        this.loadingService.setLoading(false);
      }
    });
  }
  //filtramos los usuarios por nombre y apellidos
  filteredName(event: string) {
    this.nameFilter = event;
    console.log(this.nameFilter);
    this.usersFiltered = this.getFilteredUsers;
  }
}
