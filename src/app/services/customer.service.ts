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
    return this.http.get<Customer[]>(`${API_CONFIG.url}/list`)
  }

  saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${API_CONFIG.url}/save`, customer)
  }

  getCustomer(idCustomer: number): Observable<Customer> {
    return this.http.get<Customer>(`${API_CONFIG.url}/find/${idCustomer}`)
  }

  deleteCustomer(idCustomer: number) {
    return this.http.delete<Customer>(`${API_CONFIG.url}/delete/${idCustomer}`)
  }

}
