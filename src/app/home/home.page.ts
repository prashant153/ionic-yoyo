import { Component,OnInit } from '@angular/core';
import { Observable, timer,interval ,from} from 'rxjs';
import {take, map, count,takeUntil,} from 'rxjs/operators'
import { ScoreService } from '../score.service';
import { IScore } from '../iscore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // progress : number=0;
  // currSec : number =0;
  score: IScore;
  // allScores: IScore[] = [];
  // timeInt:number=0;
  
  constructor( private scoreService : ScoreService) { }
  
  ngOnInit(): void {

 

    this.scoreService.getScores().subscribe(
      (s) => {

        this.score = s[0];
   

        console.log(s);
      },
      (error:any) => {
        console.log('Error while subscribing score service');
      },
      ()=>{ } 
      )

      // var source =from(this.allScores);

      // var sourceObserver = {
      //   next:s => {
      //     this.scoreId =s.id;
      //     this.scoreSpeedLevel = s.speedLevel;
      //     this.scoreShuttleNumber =s.shuttleNumber ;
      //     this.scoreSpeed = s.speed;
      //     this.scoreLevelTime= s.levelTime;
      //     this.scoreShuttleDist= s.shuttleDist;
      //     this.scoreCumulativeTime= s.cumulativeTime;
      //     this.scoreVo2Max= s.vo2Max;
      //     this.score = s;
      //     this.timeInt=this.scoreLevelTime*1000;
      //     console.log(s);
          
      //   }  ,
      //   error: err => console.error('Observer got an error: ' + err),
      //   complete: () => console.log('Observer got a complete notification'),
        
      // };
      // console.log(this.allScores);

      // source.subscribe(sourceObserver);

//-x-x-x-x-x-x-x-

      // function sequenceScore(observer) {
      //   for (let s of this.allScores) {
      //     observer.next(s);
      //   }
      //   observer.complete();
      // }

      // const sequence = new Observable(sequenceScore);

      // sequence.subscribe({
      //   next(score) { 
      //     console.log(score);
          
          
      //    },
      //   complete() { console.log('Finished sequence'); }
      // });
    }
}
