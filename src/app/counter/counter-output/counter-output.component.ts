import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { Observable } from 'rxjs';
import { getCounter } from '../state/counter.selectors';
import { AppState } from 'src/app/data/store-global/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss']
})
export class CounterOutputComponent implements OnInit {

  counter$?: Observable<number>;

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
   this.counter$ = this.store.select(getCounter);
  }

}
