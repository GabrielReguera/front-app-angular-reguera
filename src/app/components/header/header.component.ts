import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() change: EventEmitter<any> = new EventEmitter<any>()


  toggle() {
    this.change.emit(null)
  }
  onOpen() {

  }
}
