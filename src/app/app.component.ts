import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from './services/apis/album.service';
import { Category } from './services/apis/types';
import { CategoryService } from './services/business/category.service';

@Component({
    selector: 'xm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // 需要到构造函数中导入 private cdr: ChangeDetectorRef，因为 Http 请求不会触发变更检测，必须手动的触发变更检测.
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

    title = 'xmly';
    currentCategory: Category;  // 音乐
    categories: Category[] = []; // 所有的 category，音乐，有声书 ... 
    categoryPinyin = '';       // yinyue, youshengshu
    subcategory: string[];     // 全部分类 > 音乐 > xxx 

    constructor(private albumService: AlbumService, 
                private categoryService: CategoryService, 
                private cdr: ChangeDetectorRef,
                private router: Router) {

    }

    // 一些初始化的逻辑可以放入 ngOnInit() 函数中
    ngOnInit() {
        this.init();
    }

    private init() {

        // Get category from categoryService
        this.categoryService.getCategory().subscribe( category => {
            if (category != this.categoryPinyin) {
                this.categoryPinyin = category;
                // 如果 categories 的数据已经存在

                if (this.categories.length) {
                    this.currentCategory = this.categories.find(item => item.pinyin == this.categoryPinyin);
                } else {
                    this.getCategories();
                }
            }
            // 可能需要手动调用变更检测 
            // this.cdr.markForCheck()
        });
    }

    private getCategories() {
        this.albumService.categories().subscribe(res => {
            this.categories = res;
            this.currentCategory = this.categories.find(item => item.pinyin == this.categoryPinyin);
            // OnPush 策略下触发变更检测的时机
            // 1. 组件的 @Input 引用发生变换
            // 2. 组件的 DOM 事件，包括他的子组件的 DOM 事件，比如 click, submit, mouse down 等等
            // 3. Observable 订阅事件，同时设置 Async pipe
            // 4. 手动使用 ChangeDectorRef.detectChanges(), ChangeDectorRef.markForCheck(), ApplicationRef.tick()方法等
            // 在这里是 HTTP 事件所以不符合 1, 2 和 3， 就必须手动检测。
            this.cdr.markForCheck();
        });
    }

    changeCategory(c: Category) {
        if (this.currentCategory.id != c.id) {
            this.currentCategory = c;
            this.categoryService.setCategory(c.pinyin);
            this.router.navigateByUrl('/albums/' + c.pinyin);
        }
    }
}
