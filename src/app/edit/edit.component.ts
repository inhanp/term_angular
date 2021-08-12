import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {TodoService} from '../_services/todo.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import {NotificationService} from '../_services/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  dueDate: Date;
  createdDate: Date;
  task: string;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute,
              private router: Router,
              private notif: NotificationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.createdDate = new Date(params.get('createdDate'));
      this.dueDate = new Date(params.get('dueDate'));
      this.task = params.get('task');
    });
  }

  dateChange(date: Date) {
    if (this.dueDate !== date) {
      this.dueDate = date;
    }
    return date;
  }
  taskChange(task: string) {
    if (this.task !== task) {
      this.task = task;
    }
    return task;
  }
  submit() {
    if (this.dueDate.getTime() - new Date().getTime() < 0) {
      this.notif.showNotif('Received due date is not in the future', 'error');
    } else if (this.task === undefined) {
      this.notif.showNotif('You forgot to write the task', 'error');
    } else {
      this.todoService.edit(this.createdDate, this.dueDate, this.task).pipe(first()).subscribe(result => {
        this.notif.showNotif('Recorded!', 'confirmation');
        this.router.navigate(['/']);
      });
    }
  }

}
