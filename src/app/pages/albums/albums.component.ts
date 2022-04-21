import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { AlbumService } from 'src/app/services/apis/album.service';
import { AlbumArgs, CategoryInfo, MetaValue, SubCategory } from 'src/app/services/apis/types';
import { CategoryService } from 'src/app/services/business/category.service';

@Component({
    selector: 'xm-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsComponent implements OnInit {

    searchParams: AlbumArgs = {
        category: '', // youshengshu
        subcategory: '',
        meta: '',
        sort: 0,
        page: 1,
        perPage: 30
    };
    categoryInfo: CategoryInfo;

    constructor(private albumService: AlbumService,
                private route: ActivatedRoute,
                private router: Router,
                private cdr: ChangeDetectorRef,
                private categoryService: CategoryService) { }

    ngOnInit(): void {
        combineLatest(
            this.categoryService.getCategory(),
            this.route.paramMap
        ).subscribe(([category, paramMap]) => {
            const pinyin = paramMap.get('pinyin');
            if (pinyin == category) {
                this.searchParams.category = pinyin;
                this.searchParams.subcategory = '';
                this.updatePageData();
            } else {
                this.categoryService.setCategory(pinyin);
                this.router.navigateByUrl('/albums/' + pinyin);
            }
        });

        // this.updatePageData();
        // this.route.paramMap.subscribe(paramMap => {
        //     const pinyin = paramMap.get('pinyin');
        //     console.log('pinyin params', pinyin);
        //     this.searchParams.category = pinyin;
        //     this.updatePageData();
        // });
    }

    private updatePageData() {
        this.albumService.detailCategoryPageInfo(this.searchParams).subscribe(categoryInfo => {
            console.log(categoryInfo);
            this.categoryInfo = categoryInfo;
            this.cdr.markForCheck();
        });
    }

    changeSubcategory(subCategory?: SubCategory) {
        if (this.searchParams.subcategory != subCategory?.code) {
            this.searchParams.subcategory = subCategory?.code || '';
            this.updatePageData();
        }
    }

    trackBySubCategories(index: number, item: SubCategory): string {
        return item.code;
    }

    
    trackByMetas(index: number, item: MetaValue): number {
        return item.id;
    }

}
