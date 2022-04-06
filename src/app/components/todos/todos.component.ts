import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/Todo';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  list: Todo[] = [];
  inputTodo: string = '';
  // add new task
  handleSubmit() {
    if (!this.inputTodo) {
      return alert('you can not submit an empty item');
    }
    this.list.push({
      content: this.inputTodo,
      completed: false,
      id: uuidv4(),
    });
    this.inputTodo = '';
    this.saveToStorage();
  }
  // delete task from list
  handleDelete(id: string) {
    this.list = this.list.filter((item) => {
      return item.id !== id;
    });
    this.saveToStorage();
  }
  // completed task
  handleCompleted(id: string) {
    this.list = this.list.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    this.saveToStorage();
  }
  // save to local storage
  saveToStorage() {
    localStorage.setItem('list', JSON.stringify(this.list));
  }
  // retrieve from local storage
  loadStorage() {
    this.list = JSON.parse(localStorage.getItem('list') || '[]');
  }
  constructor() {
    this.loadStorage();
  }

  ngOnInit(): void {}
}
