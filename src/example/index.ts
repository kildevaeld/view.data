import { CollectionView, ArrayCollection, Model, property, model, withModel } from '../index';
import { View, withAttachedViews, withTemplate, attach, Constructor, event, BaseViewOptions, attributes } from 'view'
import { TemplateView } from '../template-view';
import { EventListener } from 'mixins.events';

export class Todo extends Model {
    @property
    name: string;
    constructor(name: string) {
        super();
        this.name = name;
    }
}

export interface Todos extends BaseViewOptions<HTMLElement> {
    todos: ArrayCollection<Todo>;
}

@attributes({
    tagName: "li",
    ui: {
        input: 'input'
    }
})
export class TodoListItem extends EventListener<Constructor<TemplateView<Todo>>>(withModel(TemplateView)) {
    edit: boolean = false;
    template = (model: Todo) => this.edit ?
        `<input type="text" value="${model.name}"><button>done</button>`
        : `
            <h5>${model.name}</h5>
        `

    @model.change('name')
    onNameChange(value: any) {
        this.render();
    }

    @event.click('button')
    onInput() {
        this.edit = false;
        this.model.name = this.el!.querySelector('input')!.value;
    }

    @event.click('h5')
    onClick() {
        this.edit = true
        this.render();
    }

}

export class TodoList extends CollectionView<TodoListItem, Todo> {
    collection: ArrayCollection<Todo>
    childView = TodoListItem;
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

    @event.click('.create-btn')
    onCreateClick(e: Event) {
        this.list.collection!.push(new Todo("New Todo"));
    }
}


var view = new Page({
    el: document.querySelector('#main') as HTMLElement,
    todos: new ArrayCollection()
}).render();

