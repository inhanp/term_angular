import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../_services/user.service';
import {NotificationService} from '../_services/notification.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo;
  @Output() deleteEvent = new EventEmitter<Date>();

  task: string;
  dueDate: Date;
  createdDate: Date;
  username: string;
  color: string;

  constructor(private userService: UserService,
              private notif: NotificationService) { }

  delete(date) {
    this.deleteEvent.emit(date);
  }
  upcoming() {
    const date1 = new Date(this.dueDate);
    const date2 = new Date();
    const diffTime = date1.getTime() - date2.getTime();
    const diffDay = Math.round(diffTime / (1000 * 3600 * 24));
    if (diffDay < 1) {
      this.notif.showNotif('You have task to do today!', 'confirmation');
      this.color = 'red';
    } else if (diffDay < 3) {
      this.notif.showNotif('There is upcoming task within three days', 'confirmation');
      this.color = '#ffba00';
    } else if (diffDay < 7) {
      this.notif.showNotif('There is upcoming task within a week', 'confirmation');
      this.color = 'blue';
    }
  }

  ngOnInit() {
    this.userService.getUser(this.todo.createdBy).pipe(first()).subscribe(user => {
      this.username = user;
    });
    this.dueDate = this.todo.dueDate;
    this.createdDate = this.todo.createdDate;
    this.task = this.todo.task;
    this.upcoming();
  }

}
