import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterState } from '../state/counter.state';
import { changeActivityName, customIncrement } from '../state/counter.actions';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss']
})
export class CustomCounterInputComponent implements OnInit {

  value!: number;
  activity!: string;

  constructor(
    private store: Store<{ counter: CounterState }>
  ) { }

  ngOnInit(): void {
    this.store.select('counter').subscribe(data => {
      console.log('Activity name observable called')
      this.activity = data.activity;
    })
  }

  onAdd() {
    this.store.dispatch(customIncrement({count: +this.value}));
  }

  onChangeActivity() {
    this.store.dispatch(changeActivityName());
  }

}
