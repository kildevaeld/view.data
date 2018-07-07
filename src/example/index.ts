// import { withCollection, ModelCollection, Model, property, withModel } from '..';
// import { View, withAttachedViews, withTemplate, attach, event, attributes } from '@viewjs/view';
// import { TemplateView } from '../template-view';
// import { withEventListener } from '@viewjs/events';
// import { withBindings } from '../with-bindings';


// class Todo extends Model {
//     @property
//     name: string;
// }

// class Todos extends ModelCollection<Todo> {
//     Model = Todo;
//     todos: ModelCollection<Todo>;
// }

// @attributes({
//     tagName: "li",
//     _ui: {
//         input: 'input'
//     },
//     bind: {
//         '@input': 'name'
//     }
// })
// class TodoListItem extends withEventListener(withBindings(withModel(TemplateView))) {
//     edit: boolean = false;
//     ui: { input: HTMLInputElement }
//     template = _ => this.edit ?
//         `<input type="text" bind="name"><button>done</button>`
//         : `<h5 bind="name"></h5>`;


//     @event.click('button')
//     @event.keypress('input', 13)
//     onInputChange() {
//         this.edit = false;
//         this.render()
//     }

//     @event.click('h5')
//     onClick() {
//         this.edit = true
//         this.render().ui.input.focus();
//     }

// }

// class TodoList extends withCollection(View, TodoListItem, Todos, Todo) {

// }

// class Page extends withAttachedViews(withTemplate(View)) {
//     template = () => `
//         <h1>Todos</h1>
//         <button class="create-btn">Create</button>
//         <ul class="list-view"></ul>

//     `;

//     @attach('.list-view')
//     list: TodoList;

//     @event.click('.create-btn')
//     onCreateClick() {
//         console.log('click', this);
//         this.list.collection!.push({
//             name: 'New Todo'
//         });

//     }
// }


// new Page({
//     el: document.querySelector('#main') as HTMLElement,
// }).render();

import './collection';
