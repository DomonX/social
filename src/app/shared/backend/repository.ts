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

  public addItem(item: T): void {
    const [lastId] = this.items.slice(-1);
    item.id = lastId.id;
    this.newState([...this.items, item]);
  }

  public getItems(): Observable<T[]> {
    return this.subject.asObservable();
  }

  public deleteItem(id: number): void {
    this.newState(this.items.filter((i) => i.id !== id));
  }

  public updateItem(id: number, item: T): void {
    this.newState(this.items.map((i) => (i.id == id ? item : i)));
  }

  public getItem(id: Observable<number>): Observable<T | undefined> {
    return combineLatest([this.subject.asObservable(), id]).pipe(
      map(([items, id]) => {
        return items.find((i) => i.id == id);
      })
    );
  }

  //   public joinOne<TJ extends CrudModel>(
  //     items: Observable<TJ[]>,
  //     keyname: string
  //   ): Observable<{ item: T; join: TJ }[]> {
  //     return combineLatest([this.subject.asObservable(), items]).pipe(
  //       map(([items, joins]) => {
  //         return items.map((item) => {
  //           const keyValue = (item as any)[keyname];
  //           const foundJoin: TJ | undefined = joins.find((i) => i.id == keyValue);
  //           return {
  //             item,
  //             join: foundJoin as TJ,
  //           };
  //         });
  //       })
  //     );
  //   }
}
