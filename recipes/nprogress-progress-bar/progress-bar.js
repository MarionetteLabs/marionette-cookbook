

var ProgressBar = Backbone.View.extend({
  el: '#example',

  settings: {
    parent: "example",
    showSpinner: false
  },

  events: {
    'click #b-0': 'start',
    'click #b-40': 'percent',
    'click #b-inc': 'inc',
    'click #b-100': 'done'
  },

  initialize: function() {
    _.extend(NProgress.settings, this.settings);
  },

  start: function() {
    NProgress.start();
  },

  percent: function() {
    NProgress.set(0.4);
  },

  inc: function() {
    NProgress.inc();
  },

  done: function() {
    NProgress.done();
  }

});

var progressBar = new ProgressBar();
