import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  redirectToLevel(){
    this.iab.create("http://www.5-a-side.com/wp-content/uploads/2014/03/Yo-yo-intermittent-recovery-test-levels.jpg");
  }
  ngOnInit() {
  }

}
