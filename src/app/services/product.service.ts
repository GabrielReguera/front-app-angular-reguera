import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/assets/config';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${API_CONFIG.url}product/list`)
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${API_CONFIG.url}product/save`, product)
  }

  getProduct(idProduct: number): Observable<Product> {
    return this.http.get<Product>(`${API_CONFIG.url}product/find/${idProduct}`)
  }

  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${API_CONFIG.url}product/update`, product)
  }

  deleteProduct(idProduct: number) {
    return this.http.delete<Product>(`${API_CONFIG.url}product/delete/${idProduct}`)
  }
}
