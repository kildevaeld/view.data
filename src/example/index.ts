import { withCollection, ModelCollection, Model, property, withModel, primaryKey } from '../index';
import { BaseView, View, withAttachedViews, withTemplate, attach, event, BaseViewOptions, attributes } from '@viewjs/view'
import { TemplateView } from '../template-view';
import { withEventListener } from '@viewjs/events';
import { IModelView } from '../model-view';
import { withBindings } from '../bindable-view';
import { Constructor } from '@viewjs/utils';


class Todo extends Model {
    @property
    name: string;
}

interface Todos extends BaseViewOptions<HTMLElement> {
    todos: ModelCollection<Todo>;
}

@attributes({
    tagName: "li",
    _ui: {
        input: 'input'
    },
    bind: {
        '@input': 'name'
    }
})
class TodoListItem extends withEventListener<Constructor<TemplateView<Todo> & IModelView<Todo>>>(withBindings(withModel(TemplateView))) {
    edit: boolean = false;
    // bindings = [{
    //     prop: 'name',
    //     selector: 'input'
    // }]
    ui: { input: HTMLInputElement }
    template = _ => this.edit ?
        `<input type="text" bind="name"><button>done</button>`
        : `<h5 bind="name"></h5>`;


    @event.click('button')
    @event.keypress('input', 13)
    onInputChange() {
        this.edit = false;
        this.render()
    }

    @event.click('h5')
    onClick() {
        this.edit = true
        this.render();
    }

}

class TodoList extends withCollection<Constructor<BaseView>, HTMLElement, TodoListItem, ModelCollection<Todo>>(View, TodoListItem, ModelCollection, Todo) {

}

class Page extends withAttachedViews(withTemplate<Constructor<View>, Todos>(View)) {
    template = () => `
        <h1>Todos</h1>
        <button class="create-btn">Create</button>
        <ul class="list-view"></ul>
        
    `;

    @attach('.list-view')
    list: TodoList;

    @event.click('.create-btn')
    onCreateClick() {
        console.log('click', this);
        this.list.collection!.push({
            name: 'New Todo'
        });
        console.log(this.list)
    }
}


const p = new Page({
    el: document.querySelector('#main') as HTMLElement
})


p.render();
