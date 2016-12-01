import Marionette from 'backbone.marionette';
import { patch } from 'incremental-dom';

export const View = Marionette.View.extend({
  render() {
    const data = this.model ? this.model.attributes : {};

    if (this.templateContext) {
      Object.assign(data, this.templateContext());
    }

    patch(this.el, this.template, data);

    this.triggerMethod('render', this);

    return this;
  }
});
