import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'xm-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // 视图封装策略 ？
  encapsulation: ViewEncapsulation.None
})
export class BreadCrumbComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
