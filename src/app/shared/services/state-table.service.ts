import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateTableService {

  public statusDeleteTable: BehaviorSubject<any> = new BehaviorSubject(null);
  public statusInsertTable: BehaviorSubject<any> = new BehaviorSubject(null);
  public statusUpdateTable: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }
}
