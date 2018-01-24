import { withCollection, ArrayCollection, Model, property, model, collection, withModel } from '../index';
import { BaseView, View, withAttachedViews, withTemplate, attach, Constructor, event, BaseViewOptions, attributes } from 'view'
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
    ui: { input: HTMLInputElement }
    template = (model: Todo) => this.edit ?
        `<input type="text" value="${model.name}"><button>done</button>`
        : `
            <h5>${model.name}</h5>
        `

    @model.change('name')
    onNameChange() {
        this.render();
    }


    @event.click('button')
    onInput() {
        this.edit = false;
        this.model.name = this.ui.input.value;
    }

    @event.click('h5')
    onClick() {
        this.edit = true
        this.render();
    }

}


export class TodoList extends withCollection<Constructor<BaseView>, HTMLElement, TodoListItem, ArrayCollection<Todo>>(View, TodoListItem, ArrayCollection) {

}

export class Page extends withAttachedViews(withTemplate<Constructor<View>, Todos>(withAttachedViews(View))) {
    template = () => `
        <h1>Todos</h1>
        <button class="create-btn">Create</button>
        <ul class="list-view"></ul>
        
    `

    @attach('.list-view')
    list: TodoList;

    @event.click('.create-btn')
    onCreateClick() {
        console.log('click')
        this.list.collection!.push(new Todo("New Todo"));
    }
}


new Page({
    el: document.querySelector('#main') as HTMLElement
}).render();

