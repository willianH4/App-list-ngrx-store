import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountRoutingModule } from './count-routing.module';
import { CounterComponent } from './counter/counter.component';
import { CounterButtonsComponent } from './counter-buttons/counter-buttons.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CustomCounterInputComponent } from './custom-counter-input/custom-counter-input.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CounterComponent,
    CounterButtonsComponent,
    CounterOutputComponent,
    CustomCounterInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CountRoutingModule
  ],
  exports: [
    CommonModule
  ]
})
export class CountModule { }
