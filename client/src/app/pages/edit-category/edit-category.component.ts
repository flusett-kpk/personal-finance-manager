import { OperationService } from '../../services/operation.service';
import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categoryId: string = '';
  title: string= '';
  description: string = '';

  constructor(private operationService: OperationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.queryParams['title'];
    this.description = this.route.snapshot.queryParams['description'];
    this.route.params.subscribe(
      (params: Params) => {
        this.categoryId = params['categoryId'];
      }
    )
  }

  editCategory(title: string, description: string) {
    this.operationService.updateCategory(this.categoryId, title, description).subscribe((response: any) => {});
    this.router.navigate(['/list_of_categories'], {relativeTo: this.route});
  }

  goBack() {
    this.router.navigate(['/list_of_categories'], {relativeTo: this.route});
  }
}
