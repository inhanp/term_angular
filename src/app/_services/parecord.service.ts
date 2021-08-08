
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {AuthService} from './auth.service';
import {PARecord} from '../_models/PARecord';
import {conditionallyCreateMapObjectLiteral} from '@angular/compiler/src/render3/view/util';




@Injectable({ providedIn: 'root' })
export class PArecordService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  getAll() {
      return this.http.get<PARecord[]>(`http://localhost:3030/parecord/getparecords`);
  }





  // add() {
  //   const randparecord = {
  //         calories: Math.floor(Math.random() * 2500),
  //         minutes: Math.floor(Math.random() * 180),
  //         steps:  Math.floor(Math.random() * 25000),
  //         activityType: Math.floor(Math.random() * 3)
  //       };
  //
  //
  //   return this.http.post(`http://localhost:3030/parecord/addparecord`, randparecord);
  //
  // }

  edit(type: number, date: Date, minutes: number, calories: number) {
    console.log(minutes);
    const parecord = {type, date, minutes, calories};
    console.log(parecord);
    return this.http.post(`http://localhost:3030/parecord/editparecord`, parecord);
  }


  delete(date: string) {
    return this.http.delete(`http://localhost:3030/parecord/${date}`);

  }



}
