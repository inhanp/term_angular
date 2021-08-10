import {Component, Input, OnInit} from '@angular/core';
import {PArecordService} from '../_services/parecord.service';
import {ThemePalette} from '@angular/material';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.css']
})
export class RankComponent implements OnInit {
  @Input() name: string;
  avgcalories: number;
  avgminutes: number;
  calrate: number;
  minuterate: number;
  accentColor: ThemePalette = 'accent';
  constructor(private recordService: PArecordService) { }

  ngOnInit() {
    this.recordService.getAverage(this.name).subscribe(record => {
      this.avgcalories = record.avgcalories;
      this.avgminutes = record.avgminutes;
      this.calrate = Math.round(record.avgcalories / record.calgoal * 100);
      this.minuterate = Math.round(record.avgminutes / record.minutegoal * 100);
    });
  }
}
