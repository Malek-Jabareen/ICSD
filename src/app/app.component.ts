import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ICSD';
  hide = 'yes';

  hideDiagram() {
    this.hide = '';
  }
  showDiagram() {
    this.hide = 'yes';
  }
  ngOnInit() {
  }
}
