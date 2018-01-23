import { CollectionView, ArrayCollection, Model, property } from '../index';
import { View, withAttachedViews, withTemplate, attach, Constructor, event } from 'view'
import { TemplateView } from '../template-view';

export class Todo extends Model {
    @property
    name: string;
}

export interface Todos {
    todos: ArrayCollection<Todo>;
}

export class Page extends withAttachedViews(withTemplate<Constructor<View>, Todos>(withAttachedViews(View))) {
    template = (data: Todos) => (`
        <h1>Todos</h1>
        <button class="create-btn">Create</button>
        <ul class="list-view"></ul>
        
    `)

    @attach('.list-view')
    list: TodoList;

    constructor(options: Todos) {
        super(options);
        this.list.collection = options.todos;
    }

    /* @event.click('.create-btn')
     onCreateClick(e: Event) {
         console.log('click')
     }*/
}

export class TodoListItem extends TemplateView { }

export class TodoList extends CollectionView<TodoListItem> {

}


var view = new Page({
    todos: new ArrayCollection()
})