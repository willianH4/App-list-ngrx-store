import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { getLoading } from './store/shared/shared.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ngrxCounter';
  showLoading?: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ){

  }

  ngOnInit(): void {
    this.showLoading = this.store.select(getLoading);
  }

}
