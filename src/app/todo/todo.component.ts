import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo;
  @Output() deleteEvent = new EventEmitter<Date>();

  task: string;
  date: Date;
  username: string;

  constructor() { }

  delete(date) {
    this.deleteEvent.emit(date);
  }

  ngOnInit() {
    this.username = 'anonymous';
  }

}
