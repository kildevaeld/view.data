import { withCollection } from '../with-collection';
import { ModelCollection } from '../model-collection';
import { withModel } from '../with-model';
import { withBindings } from '../with-bindings';
import { TemplateView } from '../template-view';
import { Model } from '../model';
import { event } from '@viewjs/view';

class ListItem extends withBindings(withModel(TemplateView)) {
    template = () => `<span bind="text"></span>`
};


export class List extends withCollection(TemplateView, ListItem, ModelCollection, Model) {
    template = () => `
        <button>Sort</button>
        <div class="list"></div>
    `;

    childViewContainer = ".list"

    @event('click', 'button')
    onSortEller() {
        this.collection.sort("text");
        console.log('sort', this)
    }
}

const count = (char: string, count: number) => {
    let out = [];
    while (count-- > 0) {
        out.push(char)
    }

    return out.join('');
}

const chars = 'abcdfeghijklmnop';
let out = [];
let collection = new ModelCollection();
for (let i = 0; i < 100; i++) {
    let c = chars[i % chars.length];
    collection.push({ text: count(c, 5) + i })
}
console.log(collection)
let list = new List({ el: document.querySelector('#main') as HTMLElement }) //.render()
list.collection = collection;
list.render();

// var counter = 7999;

// const chunk = () => {

//     while (counter % 100 != 0) {
//         if (counter == 0) return;
//         let index = Math.floor(Math.random() * counter)
//         let oid = Math.floor(Math.random() * counter);

//         list.collection.item(oid).set('text', "OST");
//         list.collection.removeAtIndex(index);
//         counter--;

//     }
//     if (counter >= 0)
//         list.collection.pop()
//     counter--;
//     if (counter > 0)
//         setTimeout(chunk, 100)
// }

// setTimeout(chunk, 3000)