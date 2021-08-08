import { Component, OnInit } from '@angular/core';
import {PArecordService} from '../_services/parecord.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  exerciseType: string;
  date: Date;
  calories: number;
  minutes: number;
  dateDisabled = false;

  constructor(private route: ActivatedRoute,
              private paService: PArecordService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('date') !== null) {
        this.date = new Date(params.get('date'));
        this.dateDisabled = true;
      }
      this.calories = Number(params.get('calories'));
      this.minutes = Number(params.get('minutes'));
      this.exerciseType = params.get('type');
    });
  }
  dateChange(date: Date) {
    if (this.date !== date) {
      this.date = date;
    }
    return date;
  }
  calorieChange(calorie: number) {
    if (this.calories !== calorie) {
      this.calories = calorie;
    }
    return this.calories;
  }
  minuteChange(minute: number) {
    if (this.minutes !== minute) {
      this.minutes = minute;
    }
    return this.minutes;
  }
  submit() {
    this.paService.edit(Number(this.exerciseType), this.date, this.minutes, this.calories).pipe(first()).subscribe(result => {
      console.log('Successfully added');
    });
  }

}
