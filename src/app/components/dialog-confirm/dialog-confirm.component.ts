import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent {

  constructor(
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private matDialog: MatDialogRef<DialogConfirmComponent>) { }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.id).subscribe()
    this.matDialog.close(true)
  }

}
