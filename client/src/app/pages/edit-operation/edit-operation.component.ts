import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router'
import { OperationService } from './../../services/operation.service'
import { Category } from '../../models/category.model'

@Component({
  selector: 'app-edit-operation',
  templateUrl: './edit-operation.component.html',
  styleUrls: ['./edit-operation.component.css']
})
export class EditOperationComponent implements OnInit {
  categories!: Category[];
  selected!: number;
  operationType: any;
  operationId: string = '';
  categoryId: string;
  category: string;
  _sum: number;
  _date: Date;
  _description: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operationService: OperationService
  ) {
    this.categoryId = this.route.snapshot.queryParams['categoryId'];
    this.category = this.route.snapshot.queryParams['category'];
    this.operationType = this.route.snapshot.queryParams['type'];
    this._sum = this.route.snapshot.queryParams['sum'];
    this._date = this.route.snapshot.queryParams['date'];
    this._description = this.route.snapshot.queryParams['description'];
    this.route.params.subscribe(
      (params: Params) => {
        this.operationId = params['operationId'];
      }
    );
  }

  ngOnInit(): void {
    this.getCategories();

  }

  updateSelect(e: any) {
    this.selected = e.target.value
  }

  getCategories() {
    this.operationService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  editOperation(sum: string, description: string, date: string) {
    this.operationService.updateOperation(
      this.selected == null ? this.category : this.categories[this.selected].title,
      this.operationType,
      +sum,
      description,
      date,
      this.selected == null ? this.categoryId : this.categories[this.selected]._id,
      this.operationId
    ).subscribe(() => {
      this.router.navigate(['/list_of_operations'], { relativeTo: this.route });
    });
  }

  goBack() {
    this.router.navigate(['/list_of_operations'], { relativeTo: this.route });
  }
}
