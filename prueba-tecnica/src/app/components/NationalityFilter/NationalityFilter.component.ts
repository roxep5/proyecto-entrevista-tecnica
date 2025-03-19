import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-NationalityFilter',
  templateUrl: './NationalityFilter.component.html',
  styleUrls: ['./NationalityFilter.component.css'],
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
})
export class NationalityFilterComponent{

  @Input() nationality:string[] = [];
  @Output() nationalitySelectedOut = new EventEmitter<string[]>();
  
  nationalitys = new FormControl([]);
  constructor(public loadingService: LoadingService) { }

  updateSelection(){
    this.nationalitySelectedOut.emit(this.nationalitys.value!);
    console.log(this.nationalitys.value);
  }

}
