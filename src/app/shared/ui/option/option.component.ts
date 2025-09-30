import { Component } from '@angular/core';

@Component({
  selector: 'app-option',
  template: `<div class="bg-gray-200 p-1 rounded-e-full m-1 cursor hover:bg-gray-300 block dark:bg-gray-700 dark:hover:bg-gray-600">
    <ng-content />
  </div>`,
})
export default class OptionComponent {}
