import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-options-modal',
  imports: [FontAwesomeModule],
  templateUrl: './options-modal.component.html',
  styleUrls: ['./options-modal.component.scss'],
})
export class OptionsModalComponent {
  @Output() hideOptions = new EventEmitter<void>();

  faClose = faClose;
}
