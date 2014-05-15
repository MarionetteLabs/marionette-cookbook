  $(document).ready(function(){

    // Initialise App and Region Instance

    window.app = new Marionette.Application();

    var mainRegion = Backbone.Marionette.Region.extend({

      el: "#main-region"
      , currPosIndex: 0

      // Override Region prototype's close method - be careful if upgrading Marionette!
      // Most code is as-is, with the exception of _.delay and CSS class additions

      , close: function (showOptions){

        var view = this.currentView;
        if (!view || view.isClosed){ return; }

        // Check region's current position against incoming view's position
        // Used for determining slide direction and applying correct animation

        var classStr = ( this.currPosIndex < showOptions.posIndex ) ? 'slideOutToLeft' : 'slideOutToRight';

        view.$el.attr('class','').addClass(classStr);

        var that = this;

        _.delay(function(){

        // We delay this stuff so CSS animation has time to run

          if (view.close) { view.close(); }
          else if (view.remove) { view.remove(); }

          Marionette.triggerMethod.call(that, "close", view);

          delete that.currentView;

        }, 200);

      }

      // Override Region prototype's show method - be careful if upgrading Marionette!
      // Most code is as-is, with the exception of _.delay and CSS class additions

      , show: function(view, options){

        this.ensureEl();

        var showOptions = options || {};
        var isViewClosed = view.isClosed || _.isUndefined(view.$el);
        var isDifferentView = view !== this.currentView;
        var preventClose =  !!showOptions.preventClose;
        var _shouldCloseView = !preventClose && isDifferentView;

        if (_shouldCloseView) {

          this.close(showOptions);

          var that = this;

          _.delay(function(){

            // Delay this stuff so outbound view can animate and close

            view.render();
            Marionette.triggerMethod.call(that, "before:show", view);
            Marionette.triggerMethod.call(view, "before:show");
            if (isDifferentView || isViewClosed) {
              that.open(view);
            }

            // Check view positions and give incoming view correct animation

            var classStr = ( that.currPosIndex < showOptions.posIndex ) ? 'slideInFromRight' : 'slideInFromLeft';
            that.currPosIndex = showOptions.posIndex;
            view.$el.addClass(classStr);

            that.currentView = view;
            Marionette.triggerMethod.call(that, "show", view);
            Marionette.triggerMethod.call(view, "show");

          }, 200);
        }
      }
    });

    app.addRegions({ mainRegion: mainRegion });

    // Basic model and view instantiation for purposes of the demo

    var collection = Backbone.Collection.extend({});
    var modelList = new collection([
      { id: 0, name: 'Model Zero' },
      { id: 1, name: 'Model One' },
      { id: 2, name: 'Model Two' }
    ]);

    var view = Backbone.Marionette.Layout.extend({
      template: _.template('<div class="view"><h1>View number: <%= id %></h1></div>')
    });

    var views = [
      viewZero = new view({ model: modelList.get(0) }),
      viewOne = new view({ model: modelList.get(1) }),
      viewTwo = new view({ model: modelList.get(2) })
    ]

    var showRegion = function(view, posIndex){
      app.mainRegion.show( view, { posIndex: posIndex } );
    }

    $('.btn').on('click', function(evt){
      pos = $(evt.currentTarget).data('pos');
      showRegion( views[pos], pos );
    });

    // Show first region to get started

    showRegion( views[0], 0 );

});