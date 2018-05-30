import { Component, OnInit, EventEmitter , Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() SendEvent = new EventEmitter<string>();

  onchange(value: string) {
    this.SendEvent.emit(value);
  }
  constructor() { }

  ngOnInit() {
  }

}
