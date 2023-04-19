import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Output() openNav: EventEmitter<any> = new EventEmitter()

  constructor(private router: Router) {

  }
  ngOnInit(): void {
    this.router.navigate(['/home'])
  }


}
