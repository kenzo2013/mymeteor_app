Tasks = new Mongo.Collection("tasks");
if (Meteor.isClient) {
  // This code only runs on the client
  // counter starts at 0
  Session.setDefault('counter', 0);
  // List all tasks
  Template.body.helpers({
    tasks: function () {
       return Tasks.find({}, {sort: {createdAt: -1}});
     },
     counter: function () {
       return Session.get('counter');
     }
  });

  //submit form
  Template.body.events({
    "submit form": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var text = event.target.text.value;
      var com = event.target.comment.value;
      // Insert a task into the collection
      Tasks.insert({
        text: text,
        comment: com,
        createdAt: new Date() // current time
      });
      // Clear form
      event.target.text.value = "";
      event.target.comment.value = "";
    }
  });
  // update and delete task
  Template.task.events({
    "click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
     "click .delete": function () {
      Tasks.remove(this._id);
      // increment the counter when button is clicked
       Session.set('counter', Session.get('counter') + 1);
    }
  });
}
