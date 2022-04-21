import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private category$ = new BehaviorSubject<string>('youshengshu');
    private subcategory$ = new BehaviorSubject<string[]>([]);

    constructor() { }

    setCategory(category: string) {
        this.category$.next(category);
    }

    getCategory(): Observable<string> {
        return this.category$.asObservable();
    }

    setSubCategory(subcategory: string[]) {
        this.subcategory$.next(subcategory);
    }

    getSubcategory(): Observable<string[]> {
        return this.subcategory$.asObservable();
    }


}
