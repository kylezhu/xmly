import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlbumArgs, Base, Category, CategoryInfo } from './types';
import { environment } from 'src/environments/environment';
import { stringify } from 'qs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    readonly prefix = '/xmly/';
    constructor(private http: HttpClient) { } // 想用 HttpClient，需要在 CoreModule 中导入 HttpClientModule

    // 一级分类列表
    /*
    catetory
    {
        id: number, 3
        displayName: string,  音乐
        pinyin: string        yinyue
    }

    Base
    export interface Base<T> {
        ret: number;
        message: string;
        data: T;
    }
    */
    categories(categoryId = 3) {
        const params = new HttpParams().set('categoryId', categoryId.toString());
        let resp = this.http.get(`${this.prefix}breadcrumb`, { params })
            .pipe( // 如果想对结果做一些处理(pipeline操作)，就需要 .pipe
                map(res => (res as Base<{ categories: Category[] }>).data.categories) // 把 res 强制转换成 Base, Base 里面又是泛型对象
            );

        return resp;
    }

    // 二三级分类列表
    detailCategoryPageInfo(args: Pick<AlbumArgs, 'category' | 'subcategory'>): Observable<CategoryInfo> {
        const params = new HttpParams({fromString: stringify(args)});
        return this.http.get(`${this.prefix}categories`, { params })
                        .pipe(map(res => (res as Base<CategoryInfo>).data));
    }

}