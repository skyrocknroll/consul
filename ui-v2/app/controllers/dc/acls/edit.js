import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  builder: service('form'),
  dom: service('dom'),
  init: function() {
    this._super(...arguments);
    this.form = this.builder.form('acl');
  },
  setProperties: function(model) {
    // essentially this replaces the data with changesets
    this._super(
      Object.keys(model).reduce((prev, key, i) => {
        switch (key) {
          case 'item':
            prev[key] = this.form.setData(prev[key]).getData();
            break;
        }
        return prev;
      }, model)
    );
  },
  actions: {
    change: function(e, value, item) {
      const event = this.dom.normalizeEvent(e, value);
      this.form.handleEvent(event);
    },
  },
});
