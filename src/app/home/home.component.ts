import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, mergeMap} from 'rxjs/operators';

import {NotificationService} from '../_services/notification.service';
import {Todo} from '../_models/Todo';
import {TodoService} from '../_services/todo.service';


@Component({ templateUrl: 'home.component.html' ,

  styleUrls: ['home.component.css']})
export class HomeComponent implements OnInit {


  todos: Todo[] = [];


  constructor(
    private todoservice: TodoService,
    private notifService: NotificationService,
  ) {}

  ngOnInit() {
    this.loadAllTodos();
  }

  private loadAllTodos() {
    this.todoservice.getAll().subscribe(todos => {
      this.todos = todos;
      this.todos.sort((a, b) => {
        const date1 = new Date(a.dueDate);
        const date2 = new Date(b.dueDate);
        return date1.getTime() - date2.getTime();
      });
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
    );
  }

}

