import { Component, OnInit, Input, OnChanges, Output, ViewChild, ElementRef } from '@angular/core';
import { timer, forkJoin, fromEvent, Observable, of, from } from 'rxjs';

import { takeUntil, take, map, toArray, concatAll, switchMap, flatMap } from 'rxjs/operators';
import { EventEmitter } from 'protractor';
import { IScore } from '../iscore';
import { ScoreService } from '../score.service';
import { async } from 'q';



@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
})


export class ProgressPage implements OnInit, OnChanges {

  // @ViewChild('btnProgress', { read: ElementRef }) btnProgress : ElementRef;

  scoreArray: IScore[];
  progress: number = 0;
  @Input() score: IScore;
  timeInterval: number = 0;
  shuttleTimer: number = 0;
  restTimer: number = 0;
  scoreId: number = 0;
  scoreSpeedLevel: number = 0;
  scoreShuttleNumber: number = 0;
  scoreSpeed: number = 0;
  scoreLevelTime: number = 0;
  scoreShuttleDist: number = 0;
  scoreCumulativeTime: number = 0;
  scoreVo2Max: number = 0;

  constructor(private scoreService: ScoreService) {

  }

  progressBar = timer(0, (this.timeInterval) / 100);

  stopper = timer(this.timeInterval);

  ngAfterViewInit() {
    // console.log(this.btnProgress.nativeElement);
  }


  ngOnInit(): void {
    this.scoreService.getScores().subscribe(
      (s) => {
        this.scoreArray = s;
        this.score = s[0];
        this.scoreId = s[0].id;
        this.scoreSpeedLevel = s[0].speedLevel;
        this.scoreShuttleNumber = s[0].shuttleNumber;
        this.scoreSpeed = s[0].speed;
        this.scoreLevelTime = s[0].levelTime;
        this.scoreShuttleDist = s[0].shuttleDist;
        this.scoreCumulativeTime = s[0].cumulativeTime;
        this.scoreVo2Max = s[0].vo2Max;
        // this.timeInt=this.scoreLevelTime*1000;
        console.log(s);
      },
      (error: any) => {
        console.log('Error while subscribing score service');
      },
      () => { }
    )
    //throw new Error("Method not implemented.");


  }

  ngOnChanges(): void {
    console.log(this.timeInterval);
  }
  // myObserver = {
  //   next: (s) => {
  //     console.log(s);
  //     console.log(s.levelTime);

  //     this.timeInterval = s.levelTime * 1000;
  //     console.log(this.timeInterval);
  //     //TODO 1: change the button name to STOP
  //     //TODO 2: add 5 second delay

  //     timerCountdown(this.timeInterval);
  //     function timerCountdown(interval: number) {

  //       var count = interval / 1000;
  //       timer(0, 1000).pipe(
  //         take(count),
  //         map(() => --count)).subscribe(
  //           t => this.shuttleTimer = t
  //         );

  //     }
  //     //this.timeInterval = this.score.levelTime * 1000;
  //     console.log(this.timeInterval);

  //     const progressBar = timer(0, (this.timeInterval) / 100);
  //     const stopper = timer(this.timeInterval);


  //     progressBar.pipe(
  //       takeUntil(stopper))
  //       .subscribe(n => {
  //         console.log(n);
  //         this.progress = (n + 1) / 100;
  //         console.log(this.progress);
  //         //start timer countdown     
  //         this.shuttleTimer = ((((100 - n) / 100) * this.timeInterval / 1000) - this.timeInterval / 100000);
  //       },
  //         (error: any) => console.log('error in progress bar component'),
  //         () => {
  //           this.progress = 0;
  //           console.log('Completed progress bar');
  //           //TODO 3: Start rest timer countdown

  //           var restCountdown = timer(0, 1000);
  //           var restStopper = timer(10000);
  //           restCountdown.pipe(
  //             takeUntil(restStopper))
  //             .subscribe(r =>
  //               this.restTimer = 10 - r,
  //               (error: any) => console.log('error in rest countdown'),
  //               () => {
  //                 this.restTimer = 0;
  //               }
  //             )


  //         }

  //       );
  //   },
  //   error: err => console.error('Observer got an error: ' + err),
  //   complete: () => console.log('Observer got a complete notification'),
  // };

   onTimerClick() {


    //#region forEach
    // this.scoreArray.forEach(s => {
    //   this.timeInterval = s.levelTime * 1000;
    //   //TODO 1: change the button name to STOP
    //   //TODO 2: add 5 second delay

    //   var count = this.timeInterval / 1000;
    //   const timerCountdown = timer(0, 1000).pipe(
    //     take(count),
    //     map(() => --count));

    //   timerCountdown.subscribe(
    //     t => this.shuttleTimer = t
    //   );


    //   // this.timeInterval = this.score.levelTime * 1000;
    //   console.log(this.timeInterval);

    //   const progressBar = timer(0, (this.timeInterval) / 100);
    //   const stopper = timer(this.timeInterval);

    //   // timerCountdown.pipe(
    //   //   switchMap( t => t  )
    //   // )

    //   progressBar.pipe(
    //     takeUntil(stopper))
    //     .subscribe(n => {
    //       console.log(n);
    //       this.progress = (n + 1) / 100;
    //       console.log(this.progress);
    //       //start timer countdown     
    //       this.shuttleTimer = ((((100 - n) / 100) * this.timeInterval / 1000) - this.timeInterval / 100000);
    //     },
    //       (error: any) => console.log('error in progress bar component'),
    //       () => {
    //         this.progress = 0;
    //         console.log('Completed progress bar');
    //         //TODO 3: Start rest timer countdown

    //         var restCountdown = timer(0, 1000);
    //         var restStopper = timer(10000);
    //         restCountdown.pipe(
    //           takeUntil(restStopper))
    //           .subscribe(r =>
    //             this.restTimer = 10 - r,
    //             (error: any) => console.log('error in rest countdown'),
    //             () => {
    //               this.restTimer = 0;
    //             }
    //           )


    //       }
    //     );


    // });

    //#endregion forEach

    //#region forked

    // forkJoin(this.scoreService.getScoresArray()).subscribe(
    // // this.scoreService.getScoresForked().subscribe(
    //   (s) =>{

    //     this.timeInterval = s[0].levelTime * 1000;
    //     //TODO 1: change the button name to STOP
    //     //TODO 2: add 5 second delay

    //     var count = this.timeInterval / 1000;
        
    //     countDownProgress(count);

    //     // this.timeInterval = this.score.levelTime * 1000;
    //     console.log(this.timeInterval);
    //     timerFunc(s[0]);

    //   }

    // )

    //#endregion forked

    //#region array  
    // this.scoreService.getScoresArray().subscribe(
    //   (s) => {

    //     this.timeInterval = s.levelTime * 1000;
    //     //TODO 1: change the button name to STOP
    //     //TODO 2: add 5 second delay

    //     var count = this.timeInterval / 1000;
    //     const timerCountdown = timer(0, 1000).pipe(
    //       take(count),
    //       map(() => --count));

    //     timerCountdown.subscribe(
    //       t => this.shuttleTimer = t
    //     );


    //     // this.timeInterval = this.score.levelTime * 1000;
    //     console.log(this.timeInterval);

    //     const progressBar = timer(0, (this.timeInterval) / 100);
    //     const stopper = timer(this.timeInterval);

    //     // timerCountdown.pipe(
    //     //   switchMap( t => t  )
    //     // )

    //     progressBar.pipe(
    //       takeUntil(stopper))
    //       .subscribe(n => {
    //         console.log(n);
    //         this.progress = (n + 1) / 100;
    //         console.log(this.progress);
    //         //start timer countdown     
    //         this.shuttleTimer = ((((100 - n) / 100) * this.timeInterval / 1000) - this.timeInterval / 100000);
    //       },
    //         (error: any) => console.log('error in progress bar component'),
    //         () => {
    //           this.progress = 0;
    //           console.log('Completed progress bar');
    //           //TODO 3: Start rest timer countdown

    //           var restCountdown = timer(0, 1000);
    //           var restStopper = timer(10000);
    //           restCountdown.pipe(
    //             takeUntil(restStopper))
    //             .subscribe(r =>
    //               this.restTimer = 10 - r,
    //               (error: any) => console.log('error in rest countdown'),
    //               () => {
    //                 this.restTimer = 0;
    //               }
    //             )


    //         }
    //       );
    //   }
    // )
    //#endregion array

    //#region asyncAwait
    (async()=>{

   
    for (let index = 0; index < this.scoreArray.length; index++) {
    await   this.scoreService.getScores().subscribe(
        async (s) =>{
          console.log(s[index]);
          
           await (async(s) =>{
            console.log(this);
            
              this.timeInterval = s.levelTime * 1000;
              //TODO 1: change the button name to STOP
              //TODO 2: add 5 second delay
        
              var count = this.timeInterval / 1000;
        
              await (async (count)=> {
                const timerCountdown = timer(0, 1000).pipe(
                  take(count),
                  map(() => --count));
          
                 await timerCountdown.subscribe(
                  t => this.shuttleTimer = t
                );
              }  )(count);
        
              // this.timeInterval = this.score.levelTime * 1000;
              console.log(this.timeInterval);
        
              const progressBar = timer(0, (this.timeInterval) / 100);
              const stopper = timer(this.timeInterval);
        
        
        
               await progressBar.pipe(
                takeUntil(stopper))
                .subscribe(n => {
                  console.log(n);
                  this.progress = (n + 1) / 100;
                  console.log(this.progress);
                  //start timer countdown     
                  this.shuttleTimer = ((((100 - n) / 100) * this.timeInterval / 1000) - this.timeInterval / 100000);
                },
                  (error: any) => console.log('error in progress bar component'),
                  async () => {
                    this.progress = 0;
                    console.log('Completed progress bar');
                    //TODO 3: Start rest timer countdown
        
                    var restCountdown = timer(0, 1000);
                    var restStopper = timer(10000);
                     await restCountdown.pipe(
                      takeUntil(restStopper))
                      .subscribe(r =>
                        this.restTimer = 10 - r,
                        (error: any) => console.log('error in rest countdown'),
                        () => {
                          this.restTimer = 0;
                        }
                      )
        
        
                  }
                );
            
          }  )(s[index]);
      
        }  
      )
    } 
  })();
    //#endregion asyncAwait
    //#region demo
    
    // function sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }
    
    // async function demo() {
    //   console.log('Taking a break...');
    //   await sleep(2000);
    //   console.log('Two seconds later, showing sleep in a loop...');
    
    //   // Sleep in loop
    //   for (let i = 0; i < 5; i ++) {
    //   if (i === 3)
    //     await sleep(2000);
    //   console.log(i);
    //   }
    // }
    
    // demo();

    //#endregion demo
      
     
    

  }
  
}

  //#region myObserver
  // this.scoreService.getScores().pipe(

  // ) 
  // //  fromEvent(this.btnProgress.nativeElement,'click')
  // .subscribe(
  //   this.myObserver
  // )
  //#endregion myObserver 












