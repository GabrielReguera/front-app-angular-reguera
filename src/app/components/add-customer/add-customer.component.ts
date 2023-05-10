import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../model/customer';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  form: FormGroup = this.fb.group({
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
  }

  saveCustomer(formDirective: FormGroupDirective) {
    console.log(this.form.value)
    if (this.form.invalid) { return }
    const datePipe = new DatePipe('en-US')
    const customer: Customer = this.form.value

    customer.birthDate = datePipe.transform(customer.birthDate, 'dd/MM/yyyy')!

    this.customerService.saveCustomer(customer).subscribe({
      next: () => alert('sucesso'),
      error: e => console.log(e.error.messages),
      complete: () => formDirective.resetForm()
    })
  }
}
