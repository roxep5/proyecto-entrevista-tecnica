import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-SearchBar',
  templateUrl: './SearchBar.component.html',
  styleUrls: ['./SearchBar.component.css'],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule],
})
export class SearchBarComponent implements OnInit {
  @Output() nameOut = new EventEmitter<string>();
  constructor(public loadingService: LoadingService) { }

  ngOnInit() {
  }
  search(event: any) {
    this.nameOut.emit(event.target.value);
  }
}
