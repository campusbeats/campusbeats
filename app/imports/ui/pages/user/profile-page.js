import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
// import { Interests } from '/imports/api/interest/InterestCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe(Abilities.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Profiles.getSchema().namedContext('Profile_Page');
});

Template.Profile_Page.helpers({
  successClass() {
    return Template.instance().messageFlags.get(displaySuccessMessage) ? 'success' : '';
  },
  displaySuccessMessage() {
    return Template.instance().messageFlags.get(displaySuccessMessage);
  },
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  profile() {
    return Profiles.findDoc(FlowRouter.getParam('username'));
  },
  abilities() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedAbilities = profile.abilities;
    return profile && _.map(Abilities.findAll(),
            function makeAbilityObject(ability) {
              return { label: ability.name, selected: _.contains(selectedAbilities, ability.name) };
            });
  },
});


Template.Profile_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const firstName = event.target.First.value;
    const lastName = event.target.Last.value;
    const phone = event.target.Phone.value;
    const email = event.target.Email.value;
    const address = event.target.Address.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const picture = event.target.Picture.value;
    const soundcloud = event.target.Soundcloud.value;
    const youtube = event.target.Youtube.value;
    const spotify = event.target.Spotify.value;
    const bio = event.target.Bio.value;
    const selectedAbilities = _.filter(event.target.Abilities.selectedOptions, (option) => option.selected);
    const abilities = _.map(selectedAbilities, (option) => option.value);

    const updatedProfileData = { firstName, lastName, phone, email, address, picture, soundcloud, youtube, spotify,
      bio, abilities, username };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Profiles.getSchema().clean(updatedProfileData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = Profiles.findDoc(FlowRouter.getParam('username'))._id;
      const id = Profiles.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

