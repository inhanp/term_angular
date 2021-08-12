import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Todo} from '../_models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Todo[]>('http://localhost:3030/todo/gettodos');
  }
  add(task: string, dueDate: Date) {
    const todo = {task, dueDate};
    return this.http.post(`http://localhost:3030/todo/addtodo`, todo);
  }
  edit(createdDate: Date, dueDate: Date, task: string) {
    const todo = {createdDate, dueDate, task};
    return this.http.post('http://localhost:3030/todo/edittodo', todo);
  }
  delete() {
  }
}
