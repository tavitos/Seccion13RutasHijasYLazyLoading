import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public publishers = [
    { id: 'DC comics', desc: 'DC - Comics' },
    { id: 'Marvel comics', desc: 'Marvel - Comics' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
