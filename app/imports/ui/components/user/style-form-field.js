import { Template } from 'meteor/templating';

Template.Styles_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

