import { Component, OnInit } from '@angular/core';
import { Router, Route, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  constructor(router: Router) {
    router.events.subscribe();
    this.currentRoute = router.url;
    if (this.currentRoute == "/dashboard") {

    }

  }

  ngOnInit() {
  }
  public currentRoute;
  public visible = false;
  toggle() {

    if (this.visible) {
      document.getElementById('right').style.display = "none";
      this.visible = false;
    } else {
      document.getElementById('right').style.display = "flow-root";
      this.visible = true;
    }

  }
}
