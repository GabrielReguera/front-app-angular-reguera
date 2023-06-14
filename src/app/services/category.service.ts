import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/assets/config';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_CONFIG.url}category/list`)
  }

  saveCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${API_CONFIG.url}category/save`, category)
  }

  getCategory(idCategory: number): Observable<Category> {
    return this.http.get<Category>(`${API_CONFIG.url}category/find/${idCategory}`)
  }

  editCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${API_CONFIG.url}category/update`, category)
  }

  deleteCategory(idCategory: number) {
    return this.http.delete<Category>(`${API_CONFIG.url}category/delete/${idCategory}`)
  }
}
