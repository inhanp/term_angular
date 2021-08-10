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
  date: Date;
  dateDisabled = false;

  constructor(private route: ActivatedRoute,
              private paService: PArecordService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('date') !== null) {
        this.date = new Date(params.get('date'));
        this.dateDisabled = true;
      }
    });
  }
  dateChange(date: Date) {
    if (this.date !== date) {
      this.date = date;
    }
    return date;
  }
  submit() {
    // this.paService.edit(this.date).pipe(first()).subscribe(result => {
    //   console.log('Successfully added');
    // });
  }

}
