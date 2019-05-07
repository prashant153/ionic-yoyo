import { Component,OnInit } from '@angular/core';
import { Observable, timer,interval ,} from 'rxjs';
import {take, map, count,takeUntil} from 'rxjs/operators'
import { ScoreService } from '../score.service';
import { IScore } from '../iscore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  scoreId: number =0;
  scoreSpeedLevel:number =0;
  scoreShuttleNumber:number=0;
  scoreSpeed: number=0;
  scoreLevelTime:number=0;
  scoreShuttleDist:number=0;
  scoreCumulativeTime: number=0;
  scoreVo2Max:number=0;
  progress : number=0;
  currSec : number =0;
  score: IScore;
  timeInt:number=0;
  
  constructor( private scoreService : ScoreService) { }
  
  ngOnInit(): void {
    this.scoreService.getScores().subscribe(
      (s) => {
        this.scoreId =s[0].id;
        this.scoreSpeedLevel = s[0].speedLevel;
        this.scoreShuttleNumber =s[0].shuttleNumber ;
        this.scoreSpeed = s[0].speed;
        this.scoreLevelTime= s[0].levelTime;
        this.scoreShuttleDist= s[0].shuttleDist;
        this.scoreCumulativeTime= s[0].cumulativeTime;
        this.scoreVo2Max= s[0].vo2Max;
        this.score = s[0];
        this.timeInt=this.scoreLevelTime*1000;
      }
      )
    }
    
    //onTimerClick(){
      // const timeInt=this.scoreLevelTime*1000;
      // const progressBar = timer(0,(timeInterval)/100);
      // // const secondsCounter = timer(0,70);
      // const stopper= timer(timeInterval);
            

      // progressBar.pipe(
      //   takeUntil(stopper))
      //   .subscribe(n => 
      //     {
      //       console.log(n);
      //       // console.log(n*100);
      //       this.progress = (n+1) /100 ; 
      //       // console.log(this.progress);
      //     }
      //   );
       //}
}
