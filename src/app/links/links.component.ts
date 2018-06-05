import { Component, OnInit } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { AngularFirestore, QueryFn } from 'angularfire2/firestore';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html'
})
export class LinksComponent implements OnInit {

  links;

  constructor(db: AngularFirestore) {
    const query: QueryFn = ref => ref.orderBy('position');
    this.links = db.collection('links', query).valueChanges();
  }

  ngOnInit() {

  }

}
