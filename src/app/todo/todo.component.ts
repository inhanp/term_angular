import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../_services/user.service';
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

  constructor(private userService: UserService) { }

  delete(date) {
    this.deleteEvent.emit(date);
  }

  ngOnInit() {
    this.userService.getUser(this.todo.createdBy).pipe(first()).subscribe(user => {
      this.username = user;
    });
    this.dueDate = this.todo.dueDate;
    this.createdDate = this.todo.createdDate;
    this.task = this.todo.task;
  }

}
