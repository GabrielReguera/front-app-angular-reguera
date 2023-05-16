import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../../model/customer';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'cpf', 'birthDate', 'monthlyIncome', 'status', 'acoes'];
  dataSource?: Observable<MatTableDataSource<Customer>>

  editando!: boolean

  form: FormGroup = this.fb.group({
    id: [null],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    cpf: ['', Validators.required],
    birthDate: ['', Validators.required],
    monthlyIncome: [null, Validators.required],
    status: [true, Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private customerService: CustomerService,
    private fb: FormBuilder,
  ) {
    this.loadCustomer()
  }

  loadCustomer() {
    this.dataSource = this.customerService.getCustomers().pipe(
      map(rs => {
        const data = new MatTableDataSource(rs)
        return data
      })
    )
  }

  saveCustomer(formDirective: FormGroupDirective) {
    if (this.form.invalid) { return }
    const datePipe = new DatePipe('en-US')
    const customer: Customer = this.form.value

    customer.birthDate = datePipe.transform(customer.birthDate, 'dd/MM/yyyy')!

    this.customerService.saveCustomer(customer).subscribe({
      next: () => alert('sucesso'),
      error: e => console.log(e.error.messages),
      complete: () => {
        formDirective.resetForm()
        this.loadCustomer()
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource = this.dataSource?.pipe(map(r => {
      r.filter = filterValue.trim().toLowerCase()
      return r
    }))

  }

  carregarCustomer(customer: Customer) {
    this.form.patchValue({
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      cpf: customer.cpf,
      birthDate: new Date(customer.birthDate),
      monthlyIncome: customer.monthlyIncome,
      status: customer.status,
      email: customer.email,
      password: customer.password
    });

    this.form.get('password')?.disable()
    this.editando = true
  }

  editCustomer(formDirective: FormGroupDirective) {
    this.form.get('password')?.enable()
    this.customerService.editCustomer(this.form.value).subscribe(() => formDirective.resetForm())
    this.loadCustomer()
    alert('Atualizado com sucesso')
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe()
    this.loadCustomer()
    alert('Deletado com sucesso')
  }

}
