import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface Link {
  type: 'internal' | 'direct_link' | 'download';
  url: string;
  image?: string;
  icon?: IconDefinition;
  label?: string;
  text: string;
  subtext?: string;
  action: string;
}

@Component({
  imports: [RouterLink, FontAwesomeModule, NgTemplateOutlet],
  selector: 'app-list-links',
  templateUrl: './list-links.component.html',
  styleUrls: ['./list-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListLinksComponent {
  links = input<Link[]>([]);
}
