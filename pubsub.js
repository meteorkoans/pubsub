Items = new Meteor.Collection("items");

if (Meteor.isClient) {
  Meteor.autosubscribe(function() {
    Meteor.subscribe("itemsChannel", Session.get("category"));
  });

  Template.itemList.helpers({
    items: function() {
      return Items.find();
    }
  });

  Template.itemFilter.events({
    'keypress input': function(e, t) {
      if (e.keyCode === 13) {
        Session.set("category", e.currentTarget.value);
        e.currentTarget.value = "";
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.publish("itemsChannel", function(category) {
    return Items.find({ category: category });
  });
}
