import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { timer } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { EventEmitter } from 'protractor';
import { IScore } from '../iscore';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})
export class ProgressPage implements OnInit, OnChanges {

  progress: number = 0;
  @Input() score: IScore;
  timeInterval: number = 0;
  constructor() {
    
   }

  progressBar = timer(0, (this.timeInterval) / 100);

  stopper = timer(this.timeInterval);


  ngOnInit(): void {
    //throw new Error("Method not implemented.");
    
  }

  ngOnChanges(): void {
    console.log(this.timeInterval);
  }

  onTimerClick() {
    this.timeInterval = this.score.levelTime*1000;
    const progressBar = timer(0, (this.timeInterval) / 100);
    // const secondsCounter = timer(0,70);
    const stopper = timer(this.timeInterval);


    progressBar.pipe(
      takeUntil(stopper))
      .subscribe(n => {
        console.log(n);
        // console.log(n*100);
        this.progress = (n + 1) / 100;
        console.log(this.progress);
      }
      );
  }


}
