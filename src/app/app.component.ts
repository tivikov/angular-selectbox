import { Component } from '@angular/core';
import {SelectOption} from "./models/select-option.model";
import {SelectProps} from "./components/select-box/select-box.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-selectbox';
  
  selectOptions1: SelectOption[] = [
    { label: 'Item 1', value: 'item1', disabled: true},
    { label: 'Test 1', value: 'test'},
    { label: 'TEST 2', value: 'test2'},
    { label: 'Item 3', value: 'item3'},
    { label: 'Item 4', value: 'item4'},
    { label: 'Item 5', value: 'item5'},
    { label: 'Item 6', value: 'item6'},
    { label: 'Item 7', value: 'item7'},
    { label: 'Item 8', value: 'item8', disabled: true},
  ];
  
  selectOptions2: SelectOption[] = [
    { label: 'Item 2', value: 'item2'},
    { label: 'Item 3', value: 'item3'},
    { label: 'Item 4', value: 'item4'},
    { label: 'Item 5', value: 'item5'},
    { label: 'Item 6', value: 'item6'},
    { label: 'Item 7', value: 'item7'},
  ];
  
  selectChange($event: SelectProps["value"]) {
    // console.log($event)
  }
}
