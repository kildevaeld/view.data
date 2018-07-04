import { ArrayCollection } from './array-collection';
import { IModel } from './types';
import { Model } from './model';
import { Invoker, Constructor } from '@viewjs/view';



export class ModelCollection<M extends Model> extends ArrayCollection<M> {
	Model: Constructor<IModel> = Model;

	createModel(o?: { [key: string]: any }) {
		const model = Invoker.get(this.Model);
		if (o) {
			for (let key in o) {
				model.set(key, o[key]);
			}
		}
		return model;
	}

	push(m: M | any, trigger = true): number {
		if (!(m instanceof this.Model)) {
			m = this.createModel(m);
		}
		return super.push(m, trigger);
	}
}