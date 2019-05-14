import { Injectable } from '@angular/core';
import { Observable, of,from,forkJoin } from 'rxjs';

import { IScore } from "./iscore";
import { SCORES } from "./scores";

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }

  getScores(): Observable<IScore[]> {
    return of(SCORES);
  }

  getScoresArray(): Observable<IScore>{
    return from(SCORES);
  }

  getScoresForked(): Observable<IScore>{
    return forkJoin(SCORES);
  }
}
