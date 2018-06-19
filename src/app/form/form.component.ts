import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() SendEvent = new EventEmitter<string>();
  @Input() funcText = '';
  onchange(value: string) {
    this.SendEvent.emit(value);
  }
  constructor() { }

  ngOnInit() {
  }

}
