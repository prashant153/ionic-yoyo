import { Component, OnInit, Input, OnChanges, Output } from '@angular/core';
import { timer } from 'rxjs';

import { takeUntil, take, map } from 'rxjs/operators';
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
  shuttleTimer:number = 0;
  restTimer: number=0;
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

  onTimerClick(){
    //TODO 1: change the button name to STOP
    //TODO 2: add 5 second delay
    
    timerCountdown(this.timeInterval);
    function timerCountdown(interval:number) {
      
      var count = interval/1000;
        timer(0,1000).pipe(
          take(count),
          map(() => --count)).subscribe(
            t=> this.shuttleTimer = t
          );

    }
    this.timeInterval = this.score.levelTime * 1000;
    console.log(this.timeInterval);

    const progressBar = timer(0, (this.timeInterval) / 100);
    const stopper = timer(this.timeInterval);


    progressBar.pipe(
      takeUntil(stopper))
      .subscribe(n => {
        console.log(n);
        this.progress = (n + 1) / 100;
        console.log(this.progress);  
        //start timer countdown     
        this.shuttleTimer = ((((100-n)/100)*this.timeInterval/1000)-this.timeInterval/100000);
      },
      (error: any) => console.log('error in progress bar component'),
      () =>{
        this.progress = 0;
        console.log('Completed progress bar');
        //TODO 3: Start rest timer countdown
        
        var restCountdown = timer(0,1000);
        var restStopper = timer(10000);
        restCountdown.pipe(
          takeUntil(restStopper))
          .subscribe( r =>
            this.restTimer =10- r,
            (error:any)=>console.log('error in rest countdown'),
            () =>{
              this.restTimer =0;
            }
          
          )
        
        
      }
      
      );
  }



}
