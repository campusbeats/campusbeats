import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
/* import { Interests } from '/imports/api/interest/InterestCollection'; */
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';

Template.Profile_Page.onCreated(function onCreated() {
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Abilities.getPublicationName());
  this.subscribe(Styles.getPublicationName());
  this.subscribe(Goals.getPublicationName());
  this.subscribe(Experiences.getPublicationName());
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
          return { label: ability.abilityName, selected: _.contains(selectedAbilities, ability.abilityName) };
        });
  },
  styles() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedStyles = profile.styles;
    return profile && _.map(Styles.findAll(),
        function makeStyleObject(style) {
          return { label: style.styleName, selected: _.contains(selectedStyles, style.styleName) };
        });
  },
  goals() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedGoals = profile.goals;
    return profile && _.map(Goals.findAll(),
        function makeGoalObject(goal) {
          return { label: goal.goalName, selected: _.contains(selectedGoals, goal.goalName) };
        });
  },
  experiences() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedExperiences = profile.experiences;
    return profile && _.map(Experiences.findAll(),
        function makeExperienceObject(experience) {
          return {
            label: experience.experienceName, selected: _.contains(selectedExperiences,
                experience.experienceName)
          };
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
    const username = FlowRouter.getParam('username'); // schema requires username.
    const picture = event.target.Picture.value;
    const soundcloud = event.target.Soundcloud.value;
    const youtube = event.target.Youtube.value;
    const spotify = event.target.Spotify.value;
    const bio = event.target.Bio.value;
    const selectedAbilities = _.filter(event.target.Abilities.selectedOptions, (option) => option.selected);
    const abilities = _.map(selectedAbilities, (option) => option.value);
    const selectedStyles = _.filter(event.target.Styles.selectedOptions, (option) => option.selected);
    const styles = _.map(selectedStyles, (option) => option.value);
    const selectedGoals = _.filter(event.target.Goals.selectedOptions, (option) => option.selected);
    const goals = _.map(selectedGoals, (option) => option.value);
    const selectedExperiences = _.filter(event.target.Experiences.selectedOptions, (option) => option.selected);
    const experiences = _.map(selectedExperiences, (option) => option.value);
    const updatedProfileData = {
      firstName, lastName, phone, email, username, picture, soundcloud, youtube, spotify,
      bio, abilities, styles, goals, experiences
    };

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

