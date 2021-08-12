import { Component, OnInit } from '@angular/core';
import {TodoService} from '../_services/todo.service';
import {NotificationService} from '../_services/notification.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  dueDate: Date;
  task: string;

  constructor(private todoService: TodoService,
              private notif: NotificationService,
              private router: Router) { }

  ngOnInit() {}

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
    if (this.dueDate === undefined) {
      this.notif.showNotif('You did not selected due date', 'error');
    } else if (this.dueDate.getTime() - new Date().getTime() < 0) {
      this.notif.showNotif('Received due date is not in the future', 'error');
    } else if (this.task === undefined) {
      this.notif.showNotif('You forgot to write the task', 'error');
    } else {
      this.todoService.add(this.task, this.dueDate).pipe(first()).subscribe(result => {
        this.notif.showNotif('Recorded!', 'confirmation');
        this.router.navigate(['/']);
      });
    }
  }
}
