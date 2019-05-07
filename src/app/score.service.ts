import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
}
