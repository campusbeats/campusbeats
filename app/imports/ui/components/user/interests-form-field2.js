import { Template } from 'meteor/templating';

Template.Interests_Form_Field2.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

