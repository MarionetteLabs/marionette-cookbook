define(['underscore', 'marionette'], function(_, Marionette) {
    return Marionette.ItemView.extend({
        template: _.template("<h2>i am the cat man</h2>")
    });
});