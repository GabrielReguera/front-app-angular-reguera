import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/assets/config';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${API_CONFIG.url}customer/list`)
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${API_CONFIG.url}customer/save`, customer)
  }

  getCustomer(idCustomer: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_CONFIG.url}customer/find/${idCustomer}`)
  }

  editCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${API_CONFIG.url}customer/update`, customer)
  }

  deleteCustomer(idCustomer: number) {
    return this.http.delete<Customer>(`${API_CONFIG.url}customer/delete/${idCustomer}`)
  }

}
