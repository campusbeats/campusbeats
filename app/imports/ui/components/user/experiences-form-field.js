import { Template } from 'meteor/templating';

Template.Experiences_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

