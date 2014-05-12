

var ProgressBar = Marionette.ItemView.extend({
  template: "#progress-bar-tpl",
  className: "progress-bar",

  events: {
    'click #b-0': 'empty',
    'click #b-50': 'mid',
    'click #b-100': 'done'
  },

  ui: {
    'bar': '.bar'
  },

  empty: function() {
    this.ui.bar.removeClass('done mid');
  },

  mid: function() {
    this.ui.bar.removeClass('done').addClass('mid');
  },

  done: function() {
    this.ui.bar.removeClass('mid').addClass('done');
  }

});


var progressBar = new ProgressBar({model: new Backbone.Model});
progressBar.render()
$('#example').prepend(progressBar.$el);
