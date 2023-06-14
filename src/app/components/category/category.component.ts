import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'acoes'];
  dataSource?: Observable<MatTableDataSource<Category>>

  editando!: boolean

  form: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private categoryService: CategoryService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.loadCategory()
  }

  loadCategory() {
    this.dataSource = this.categoryService.getCategories().pipe(
      map(rs => {
        const data = new MatTableDataSource(rs)
        return data
      })
    )
  }

  saveCategory(formDirective: FormGroupDirective) {
    if (this.form.invalid) { return }
    const category: Category = this.form.value

    this.categoryService.saveCategory(category).subscribe({
      next: () => alert('sucesso'),
      error: e => alert('Deu erro aqui amigão'),
      complete: () => {
        formDirective.resetForm()
        this.loadCategory()
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

  carregarCategory(category: Category) {
    this.form.patchValue({
      id: category.id,
      name: category.name,
      description: category.description
    });

    this.editando = true
  }

  editCategory(formDirective: FormGroupDirective) {
    this.form.get('password')?.enable()
    const category: Category = this.form.value

    this.categoryService.editCategory(category).subscribe({
      complete: () => {
        formDirective.resetForm()
        this.loadCategory()
      }
    })
    this.editando = false
    alert('Atualizado com sucesso')
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe()
    this.loadCategory()
    alert('Deletado com sucesso')
  }

  openDialogConfirm(id: number) {
    this.dialog.open(DialogConfirmComponent, {
      width: 'auto',
      data: { id: id, tipo: 'category' },
    }).afterClosed().subscribe(b => b ? this.loadCategory() : null)
  }
}
