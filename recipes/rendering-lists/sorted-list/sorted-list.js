$(function() {
  var Marionette = Backbone.Marionette;

  // Override the appendHtml to account for model index
  var appendHtml = function(parentView, itemView, index) {
      var $container = this.getItemViewContainer ? this.getItemViewContainer(parentView) : parentView.$el,
          children = $container.children();

      if (parentView.isBuffering) {
        parentView.elBuffer.appendChild(itemView.el);
        parentView._bufferedChildren.push(itemView);
      } else {
        console.log(index);
        if (children.size() <= index) {
          $container.append(itemView.el);
        } else {
          children.eq(index).before(itemView.el);
        }
      }
  };

  Marionette.CollectionView = Marionette.CollectionView.extend({
      appendHtml: appendHtml
  });

  Marionette.CompositeView = Marionette.CompositeView.extend({
      appendHtml: appendHtml
  });


  var Task = Backbone.Model.extend({});
  var TaskCollection = Backbone.Collection.extend({
      model: Task
  });

  var Creator = Marionette.ItemView.extend({
      triggers: {
          "click #createbutton": "create"
      },
      onCreate: function() {
          var order = $("#neworder").val() || '0';
          order = parseInt(order);
          var model = new Task({
              title: $("#newtitle").val()
          });
          this.collection.add(model, { at: order });
      }
  });

  var TaskView = Marionette.ItemView.extend({
      className: "task",
      template: _.template( $("#item-view-template").html() )
  });

  var TasksView = Marionette.CollectionView.extend({
      itemView: TaskView
  });

  var App = new Marionette.Application();
  App.addInitializer(function() {
      window.collection = new TaskCollection();

      var creatorView = new Creator({
          el: $("#creator"),
          collection: window.collection
      });

      var creatorRegion = Marionette.Region.extend({
          el: "#creator",
          currentView: creatorView
      });

      App.addRegions({
          creator: creatorRegion,
          tasks: "#collection"
      });

      var tasksView = new TasksView({ collection: window.collection });
      App.tasks.show(tasksView);

      collection.add(new Task({ title: "Title 1" }));
      collection.add(new Task({ title: "Title 2" }));
      collection.add(new Task({ title: "Title 3" }));
  });

  App.start();
} );
