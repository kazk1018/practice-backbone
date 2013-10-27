(function() {

// Model

var Task = Backbone.Model.extend({
    defaults: {
        title : 'do something!',
        completed : false
    }
    /*
    validate: function(attrs) {
        if ( _.isEmpty(attrs.title) ) {
            return 'title must not be empty!';
        }
    },
    toggle: function() {
        this.set('completed', !this.get('completed'))
    }
    */
});

var task = new Task();

var TaskView = Backbone.View.extend({
    tagName: 'li',
    /*events: {
        'click .command': 'sayHello'
    },
    sayHello: function() {
        alert('Hello');
    },
    */
    template: _.template($('#task-template').html()),
    render: function() {
        var template = this.template( this.model.toJSON() );
        this.$el.html(template);
        return this;
    }
});

var taskView  = new TaskView({ model: task });
console.log(taskView.render().el);
//$('body').append(taskView.render().el)

var TasksView = Backbone.View.extend({
    tagName: 'ul',
    render: function() {
        this.collection.each(function(task) {
            var taskView = new TaskView({model: task});
            this.$el.append(taskView.render().el);
        }, this);
        return this;
    }
});

var Tasks = Backbone.Collection.extend({
    model: Task
});

var tasks = new Tasks([
    {
        title: 'task1',
        completed: true
    },
    {
        title: 'task2'
    },
    {
        title: 'task3'
    },
]);

console.log(tasks.toJSON());

tasksView = new TasksView({collection: tasks});
$('#tasks').html(tasksView.render().el);
})();