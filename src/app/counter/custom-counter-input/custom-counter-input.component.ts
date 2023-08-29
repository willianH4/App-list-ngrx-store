import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { changeActivityName, customIncrement } from '../state/counter.actions';
import { getActivityName } from '../state/counter.selectors';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/data/store-global/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {

  value!: number;
  activity$!: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.activity$ = this.store.select(getActivityName);
  }

  onAdd() {
    this.store.dispatch(customIncrement({count: +this.value}));
  }

  onChangeActivity() {
    this.store.dispatch(changeActivityName());
  }

}
