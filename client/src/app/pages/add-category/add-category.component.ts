import { OperationService } from '../../services/operation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private operationService: OperationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  createNewCategory(title: string, description: string) {
    this.operationService.createCategory(title, description).subscribe((response: any) => {});
    this.router.navigate(['/list_of_categories'], {relativeTo: this.route});
  }

  goBack() {
    this.router.navigate(['/list_of_categories'], {relativeTo: this.route});
  }
}
