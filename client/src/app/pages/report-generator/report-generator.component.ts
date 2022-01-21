import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { OperationService } from './../../services/operation.service'
import { DatePipe } from '@angular/common'
import { Category } from '../../models/category.model'

@Component({
  selector: 'app-report-generator',
  templateUrl: './report-generator.component.html',
  styleUrls: ['./report-generator.component.css']
})
export class ReportGeneratorComponent implements OnInit {
  categories!: Category[];
  selected!: number;
  operationType: any = "";
  _dateToday!: Date;
  _dateStart: any;
  _dateEnd: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private operationService: OperationService,
    private datepipe: DatePipe
  ) {
    this._dateToday = new Date();
  }

  ngOnInit(): void {
    this.getCategories();
    this.getTodayDate();
  }

  getTodayDate() {
    this._dateStart = this.datepipe.transform(this._dateToday, 'yyyy-MM-dd');
    this._dateEnd = this.datepipe.transform(this._dateToday, 'yyyy-MM-dd');
  }

  getCategories() {
    this.operationService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

  updateSelect(e: any){
    this.selected = e.target.value
  }

  generate(startDate: string, endDate: string) {

  }

  clear() {

  }

  graphicReport(startDate: string, endDate: string) {

  }

  byDates() {

  }
}
