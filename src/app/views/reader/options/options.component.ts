import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MusicService } from 'src/app/shared/services/music.service';
import OptionComponent from 'src/app/shared/ui/option/option.component';
import { ReaderLayoutComponent } from 'src/app/shared/ui/reader-layout/reader-layout.component';

@Component({
  selector: 'app-reader-options',
  imports: [
    ReaderLayoutComponent,
    SliderModule,
    FormsModule,
    ToggleSwitchModule,
    OptionComponent,
  ],
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class ReaderOptionsComponent implements OnInit {
  musicActive?: boolean;
  musicVolume?: number;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicActive = this.musicService.active;
    this.musicVolume = this.musicService.volume * 100;
  }

  changeMusicVolume(event: number) {
    this.musicService.setVolume(event / 100);
  }

  changeMusicActive(event: boolean) {
    this.musicService.setActive(event);
  }
}
