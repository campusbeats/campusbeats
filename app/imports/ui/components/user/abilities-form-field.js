import { Template } from 'meteor/templating';

Template.Abilities_Form_Field.onRendered(function onRendered() {
  this.$('.dropdown').dropdown();
});

