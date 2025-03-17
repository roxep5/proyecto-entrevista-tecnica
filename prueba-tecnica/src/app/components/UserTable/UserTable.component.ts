import { Component, OnInit, ViewChild, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import { User } from '../../models/User';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-UserTable',
  templateUrl: './UserTable.component.html',
  styleUrls: ['./UserTable.component.css'],
  imports: [
    MatTableModule,      // Si usas tablas
    MatPaginatorModule,  // Asegúrate de que MatPaginatorModule esté aquí
  ]
})
export class UserTableComponent implements AfterViewInit {
  
  displayedColumns: string[] = ['name', 'lastname', 'gender', 'nat','picture'];
  @Input() users: User[] = []
  
  dataSource = new MatTableDataSource<User>(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private apiService: ApiService) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['users'] && this.users) {
      // Actualiza el dataSource cuando los usuarios cambian
      this.dataSource.data = this.users;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

}
