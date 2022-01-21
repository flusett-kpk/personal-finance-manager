import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { OperationService } from './../../services/operation.service'
import { DatePipe } from '@angular/common'
import { Category } from '../../models/category.model'

@Component({
  selector: 'app-add-operation',
  templateUrl: './add-operation.component.html',
  styleUrls: ['./add-operation.component.css']
})
export class AddOperationComponent implements OnInit {
  categories!: Category[];
  selected!: number;
  operationType: any = "";
  today: any;
  _date!: Date;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operationService: OperationService,
    private datepipe: DatePipe
  ) {
    this._date = new Date();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getTodayDate();
  }

  getTodayDate() {
    this.today = this.datepipe.transform(this._date, 'yyyy-MM-dd');
  }

  updateSelect(e: any){
    this.selected = e.target.value
  }

  getCategories() {
    this.operationService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  addNewOperation(sum: string, description: string, date: string) {
    this.operationService.createOperation(
      this.categories[this.selected].title,
      this.operationType,
      +sum,
      description,
      date,
      this.categories[this.selected]._id
    ).subscribe((response: any) => {});
    this.router.navigate(['/list_of_operations'], {relativeTo: this.route});
  }

  reload() {
    window.location.reload();
  }
}
