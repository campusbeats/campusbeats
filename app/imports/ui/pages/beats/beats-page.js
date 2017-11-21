/* import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Beats_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.context = Profiles.getSchema().namedContext('Beats_Page');
});

Template.Beats_Page.helpers({
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
  interests() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedInterests = profile.interests;
    return profile && _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return { label: interest.name, selected: _.contains(selectedInterests, interest.name) };
        });
  },
});


Template.Beats_Page.events({
  'submit .profile-data-form'(event, instance) {
    event.preventDefault();
    const firstName = event.target.First.value;
    const lastName = event.target.Last.value;
    const title = event.target.Title.value;
    const username = FlowRouter.getParam('username'); // schema requires username.
    const picture = event.target.Picture.value;
    const github = event.target.Github.value;
    const facebook = event.target.Facebook.value;
    const instagram = event.target.Instagram.value;
    const bio = event.target.Bio.value;
    const selectedInterests = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    const interests = _.map(selectedInterests, (option) => option.value);

    const updatedProfileData = { firstName, lastName, title, picture, github, facebook, instagram, bio, interests,
      username };

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
}); */

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';

const selectedInterestsKey = 'selectedInterests';

Template.Beats_Page.onCreated(function onCreated() {
  this.subscribe(Interests.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(selectedInterestsKey, undefined);
  this.context = Profiles.getSchema().namedContext('Beats_Page');
});

Template.Beats_Page.helpers({
  profiles() {
    // Initialize selectedInterests to all of them if messageFlags is undefined.
    if (!Template.instance().messageFlags.get(selectedInterestsKey)) {
      Template.instance().messageFlags.set(selectedInterestsKey, _.map(Interests.findAll(), interest => interest.name));
    }
    // Find all profiles with the currently selected interests.
    const allProfiles = Profiles.findAll();
    const selectedInterests = Template.instance().messageFlags.get(selectedInterestsKey);
    return _.filter(allProfiles, profile => _.intersection(profile.interests, selectedInterests).length > 0);
  },

  interests() {
    /*  return _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return {
            label: interest.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedInterestsKey), interest.name),
          };
        }); */
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedInterests = profile.interests;
    return profile && _.map(Interests.findAll(),
        function makeInterestObject(interest) {
          return { label: interest.name, selected: _.contains(selectedInterests, interest.name) };
        });
  },
});

Template.Beats_Page.events({
  'submit .filter-data-form'(event, instance) {
    event.preventDefault();
    const selectedOptions = _.filter(event.target.Interests.selectedOptions, (option) => option.selected);
    instance.messageFlags.set(selectedInterestsKey, _.map(selectedOptions, (option) => option.value));
  },
});
