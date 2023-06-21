import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  displayedColumns: string[] = ['id', 'name', 'description', 'cost', 'amount', 'category', 'acoes'];
  dataSource?: Observable<MatTableDataSource<Product>>

  editando!: boolean

  categories?: Observable<Category[]>

  form: FormGroup = this.fb.group({
    idProduct: [null],
    nameProduct: ['', Validators.required],
    descriptionProduct: ['', Validators.required],
    costPriceProduct: ['', Validators.required],
    amountProduct: [null, Validators.required],
    category: [null, Validators.required]
  });

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.loadProduct()

    this.categories = categoryService.getCategories()
  }

  loadProduct() {
    this.dataSource = this.productService.getProducts().pipe(
      map(rs => {
        const data = new MatTableDataSource(rs)
        return data
      })
    )
  }

  saveProduct(formDirective: FormGroupDirective) {
    if (this.form.invalid) { return }
    const product: Product = this.form.value

    this.productService.saveProduct(product).subscribe({
      next: () => alert('sucesso'),
      error: e => alert('Algo deu errado'),
      complete: () => {
        formDirective.resetForm()
        this.loadProduct()
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

  carregarProduct(product: any) {
    this.form.patchValue({
      idProduct: product.idProduct,
      nameProduct: product.nameProduct,
      descriptionProduct: product.descriptionProduct,
      costPriceProduct: product.costPriceProduct,
      amountProduct: product.amountProduct,
      category: product.category.id,
    });

    this.editando = true
  }

  editProduct(formDirective: FormGroupDirective) {
    if (this.form.invalid) { return }
    const product: Product = this.form.value
    this.productService.editProduct(product).subscribe({
      complete: () => {
        formDirective.resetForm()
        this.loadProduct()
      }
    })
    this.editando = false
    alert('Atualizado com sucesso')
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe()
    this.loadProduct()
    alert('Deletado com sucesso')
  }

  openDialogConfirm(id: number) {
    this.dialog.open(DialogConfirmComponent, {
      width: 'auto',
      data: { id: id, tipo: 'product' },
    }).afterClosed().subscribe(b => b ? this.loadProduct() : null)
  }

}
