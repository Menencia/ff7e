import { Component } from '@angular/core';

@Component({
  selector: 'app-option',
  template: `<div class="flex items-center bg-gray-200 p-5 m-1 rounded-e-full hover:bg-gray-300">
    <ng-content />
  </div>`,
})
export default class OptionComponent {}
