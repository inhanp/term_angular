import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  caloriegoal: number;
  minutegoal: number;
  calorie = 2000;
  minute = 165;
  public ctrlValue: number;
  constructor(private userService: UserService) {}
  ngOnInit() {
    console.log('setting executed');
    this.caloriegoal = 2500; this.minutegoal = 100;
    this.userService.setgoals({calories: this.caloriegoal, minutes: this.minutegoal});
  }
  calorieLabel(calorie: number) {
    if (this.calorie !== calorie) {
      this.calorie = calorie;
    }
    return calorie;
  }
  minuteLabel(minute: number) {
    if (this.minute !== minute) {
      this.minute = minute;
    }
    return minute;
  }
  submit() {this.userService.getgoals().pipe().subscribe(result => {
    this.calorie = result.goals.caloriegoal;
    this.minute = result.goals.minutegoal;
  }); }

}
