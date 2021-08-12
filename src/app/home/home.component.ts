import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';


import {NotificationService} from '../_services/notification.service';
import {PARecord} from '../_models/PARecord';
import {PArecordService} from '../_services/parecord.service';
import {UserService} from '../_services/user.service';
import {Todo} from '../_models/Todo';
import {TodoService} from '../_services/todo.service';


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {


  todos: Todo[] = [];
  parecords: PARecord[] = [];


  constructor(
    private parecordservice: PArecordService,
    private todoservice: TodoService,
    private notifService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadAllTodos();
  }

  private loadAllTodos() {
    this.todoservice.getAll().subscribe(todos => {
      this.todos = todos;
    }, error => {
      this.notifService.showNotif(error.toString(), 'warning');
    });
  }

  deleteTodo(date) {
    this.todoservice.delete(date).pipe(first()).subscribe(
      result => {
        this.todos = null;
        this.loadAllTodos();
      }
    )
  }

}

