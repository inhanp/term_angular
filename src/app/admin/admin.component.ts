import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import {RankComponent} from '../rank/rank.component';
import {PArecordService} from '../_services/parecord.service';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
  users: User[] = [];
  records = [];
  avgcalories: number;
  avgminutes: number;
  calrate: number;
  minuterate: number;
  rank: number;

  constructor(private userService: UserService,
              private recordService: PArecordService) { }

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;
    });
  }
  average() {
  }
}
