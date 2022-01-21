import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperationService } from './../../services/operation.service';
import { Category } from '../../models/category.model';
import { Operation } from '../../models/operation.model';

@Component({
  selector: 'app-list-of-operations',
  templateUrl: './list-of-operations.component.html',
  styleUrls: ['./list-of-operations.component.css']
})
export class ListOfOperationsComponent implements OnInit {
  categories!: Category[];
  operations!: Operation[];
  tempOperations!: Operation[];
  selected!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operationService: OperationService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  updateSelect(e: any){
    this.selected = e.target.value;
    this.getSelectedOperations();
  }

  getCategories() {
    this.operationService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  getSelectedOperations() {
    this.operationService.getOperations(this.categories[this.selected]._id).subscribe((operations: Operation[]) => {
      this.operations = operations;
    });
  }

  deleteOperation(categoryId: string, operationId: string) {
    this.operationService.deleteOperation(this.categories[this.selected]._id, operationId).subscribe((response: any) => {
      this.operations = this.operations.filter(value => value._id !== operationId);
    });
  }

  addNewOperation() {
    this.router.navigate(['/add_operation'], {relativeTo: this.route});
  }
}
