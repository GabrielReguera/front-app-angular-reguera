import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent {

  constructor(
    private customerService: CustomerService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, tipo: string },
    private matDialog: MatDialogRef<DialogConfirmComponent>) { }

  deletes() {
    if (this.data.tipo == 'category') {
      this.categoryService.deleteCategory(this.data.id).subscribe()
      this.matDialog.close(true)
    } else if (this.data.tipo == 'customer') {
      this.customerService.deleteCustomer(this.data.id).subscribe()
      this.matDialog.close(true)
    }
  }

}
