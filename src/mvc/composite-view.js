import Marionette from 'backbone.marionette';
import { patch, elementOpen, elementClose } from 'incremental-dom';

export const CompositeView = Marionette.CompositeView.extend({
  _initialEvents() {
    if (this.collection) {
      this.listenTo(this.collection, 'add update reset sort', this.render);
    }
  },

  render() {
    patch(this.el, this._collectionTemplate.bind(this));

    this.triggerMethod('render', this);

    return this;
  },

  _collectionTemplate() {
    this.collection.models.forEach(model => {
      const ChildView = this._getChildView(model);
      const view = this.buildChildView(model, ChildView);
      const data = model ? model.attributes : {};

      if (view.templateContext) {
        Object.assign(data, view.templateContext());
      }

      elementOpen(view.tagName);
      view.template(data);
      elementClose(view.tagName);
    });
  }
});
