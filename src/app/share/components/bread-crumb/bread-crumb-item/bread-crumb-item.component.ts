import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'xm-bread-crumb-item',
    templateUrl: './bread-crumb-item.component.html',
    styleUrls: ['./bread-crumb-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadCrumbItemComponent implements OnInit {

    @Input() xmSeparator?: TemplateRef<any>;
    constructor() { }

    ngOnInit(): void {
    }

}
