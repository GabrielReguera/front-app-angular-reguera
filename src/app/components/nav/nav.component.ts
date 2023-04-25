import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() openNav: EventEmitter<any> = new EventEmitter()

  titulo: string

  constructor(private router: Router) {

    this.titulo = 'Militão asdasdasda'
  }
  ngOnInit(): void {
    this.router.navigate(['/home'])
  }

}
