import { Component, OnInit } from '@angular/core';
import {User} from '../_models/user';
import {UserService} from '../_services/user.service';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser: User;
  caloriegoal: number;
  minutegoal: number;
  constructor(private userService: UserService,
              private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    console.log('setting executed');
    this.caloriegoal = 2500; this.minutegoal = 100;
    console.log(this.currentUser.minutegoal);
    this.currentUser.caloriegoal = this.caloriegoal; this.currentUser.minutegoal = this.minutegoal;
    console.log(this.currentUser.minutegoal);
    this.userService.setgoals(this.currentUser);
  }

}
