import { OperationService } from './../../services/operation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-list-of-categories',
  templateUrl: './list-of-categories.component.html',
  styleUrls: ['./list-of-categories.component.css']
})
export class ListOfCategoriesComponent implements OnInit {
  categories!: Category[];
  selectedCategoryId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operationService: OperationService
   ) {}

  ngOnInit(): void{
    this.route.params.subscribe(
      (params: Params) => {
        if (params['categoryId']) {
          this.selectedCategoryId = params['categoryId'];
        }
      }
    )
    
    this.getCategories();
  }

  openPageAddCategory() {
    this.router.navigate(['/add_category'], {relativeTo: this.route});
  }
  
  deleteCategory(categoryId: string) {
    this.operationService.deleteCategory(categoryId).subscribe((response: any) => {});
    setTimeout(() => {
      this.getCategories();
    }, 100);
  }

  getCategories() {
    this.operationService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }
}