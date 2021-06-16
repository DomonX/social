import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CrudModel } from './../models/crud.model';

export class Repository<T extends CrudModel> {
  private subject: ReplaySubject<T[]>;
  private items: T[];

  constructor(private http: HttpClient, private url: string) {
    this.subject = new ReplaySubject(1);
    this.items = [];
    http.get<T[]>(url).subscribe((i) => this.newState([...this.items, ...i]));
  }

  private newState(items: T[]): void {
    this.items = items;
    this.subject.next(this.items);
  }

  public addItem(item: Omit<T, 'id'>): void {
    const [lastId] = this.items.slice(-1);
    this.newState([...this.items, { ...item, id: lastId.id } as T]);
  }

  public getItems(): Observable<T[]> {
    return this.subject.asObservable();
  }

  public deleteItem(id: number): void {
    this.newState(this.items.filter((i) => i.id !== id));
  }

  public updateItem(id: number, item: Partial<T>): void {
    this.newState(this.items.map((i) => (i.id == id ? { ...i, ...item } : i)));
  }

  public getItem(id: Observable<number>): Observable<T | undefined> {
    return combineLatest([this.subject.asObservable(), id]).pipe(
      map(([items, id]) => {
        return items.find((i) => i.id == id);
      })
    );
  }
}
