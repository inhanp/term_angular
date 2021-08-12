import { Component, OnInit } from '@angular/core';
import {TodoService} from '../_services/todo.service';
import {NotificationService} from '../_services/notification.service';
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
              private notif: NotificationService) { }

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
    this.todoService.add(this.task, this.dueDate).pipe(first()).subscribe(result => {
      this.notif.showNotif('Recorded!', 'confirmation');
    });
  }
}
