import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private webRequestService: WebRequestService) { }

  createCategory(title: string, description: string): Observable<any>{
    return this.webRequestService.post('categories', { title, description });
  }

  updateCategory(id: string,title: string, description: string) {
    return this.webRequestService.patch(`categories/${id}`, { title, description });
  }

  getCategories(): Observable<any>{
    return this.webRequestService.get('categories');
  }

  deleteCategory(id: string) {
    return this.webRequestService.delete(`categories/${id}`);
  }

  createOperation(
    category: string,
    type: string, 
    sum: number, 
    description: string, 
    date: string, 
    categoryId: string
  ) {
    return this.webRequestService.post(`categories/${categoryId}/operations`,
     { category, type, sum, description, date });
  }

  updateOperation(
    category: string,
    type: string, 
    sum: number, 
    description: string, 
    date: string, 
    categoryId: string,
    operationId: string
  ) {
    return this.webRequestService.patch(`categories/${categoryId}/operations/${operationId}`, { category, type, sum, description, date, categoryId });
  }

  getOperations(categoryId: string): Observable<any>{
    return this.webRequestService.get(`categories/${categoryId}/operations`);
  }

  deleteOperation(categoryId: string, operationId: string) {
    return this.webRequestService.delete(`categories/${categoryId}/operations/${operationId}`);
  }
}
