import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SectionTitleComponent } from 'src/app/shared/ui/section-title/section-title.component';
import { CommonModule } from '@angular/common';

interface ContributorsJson {
  staffActive: {
    name: string;
    avatar: string;
    role: string;
  }[];
  contributors: string[];
}

@Component({
  standalone: true,
  selector: 'app-team',
  templateUrl: './team.component.html',
  imports: [CommonModule, SectionTitleComponent]
})
export class TeamComponent implements OnInit {

  contributors: ContributorsJson = {
    staffActive: [],
    contributors: []
  };

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.http.get<ContributorsJson>('assets/data/contributors.json').subscribe(data => {
      this.contributors = data;
    });
  }

}
