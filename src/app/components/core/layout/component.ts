import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
