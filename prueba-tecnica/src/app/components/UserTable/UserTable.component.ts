import { Component, OnInit, ViewChild, AfterViewInit, Input, SimpleChanges } from '@angular/core';
import { User } from '../../models/User';
import { ApiService } from '../../services/api.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-UserTable',
  templateUrl: './UserTable.component.html',
  styleUrls: ['./UserTable.component.css'],
  imports: [
    MatTableModule,      // Si usas tablas
    MatPaginatorModule,
    CommonModule,
    MatProgressSpinnerModule  // Asegúrate de que MatPaginatorModule esté aquí
  ]
})
export class UserTableComponent implements AfterViewInit {
  
  @Input() users: User[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['name', 'lastname', 'gender', 'nat','picture'];
  
  dataSource = new MatTableDataSource<User>(this.users);
  constructor(public loadingService: LoadingService) { }
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
