import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';
import { Goals } from '/imports/api/goal/GoalCollection';
import { Experiences } from '/imports/api/experience/ExperienceCollection';

const displaySuccessMessage = 'displaySuccessMessage';
const displayErrorMessages = 'displayErrorMessages';
const selectedAbilitiesKey = 'selectedAbilities';
const selectedStylesKey = 'selectedStyles';
const selectedGoalsKey = 'selectedGoals';
const selectedExperiencesKey = 'selectedExperiences';

Template.Create_Page.onCreated(function onCreated() {
  this.subscribe(Abilities.getPublicationName());
  this.subscribe(Styles.getPublicationName());
  this.subscribe(Profiles.getPublicationName());
  this.subscribe(Goals.getPublicationName());
  this.subscribe(Experiences.getPublicationName());
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displaySuccessMessage, false);
  this.messageFlags.set(displayErrorMessages, false);
  this.messageFlags.set(selectedAbilitiesKey, undefined);
  this.messageFlags.set(selectedStylesKey, undefined);
  this.messageFlags.set(selectedGoalsKey, undefined);
  this.messageFlags.set(selectedExperiencesKey, undefined);
  this.context = Abilities.getSchema().namedContext('Create_Page');
});

Template.Create_Page.helpers({
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
    /* return _.map(Abilities.findAll(),
        function makeAbilityObject(ability) {
          return {
            label: ability.name,
            selected: _.contains(Template.instance().messageFlags.get(selectedAbilitiesKey), ability.name),
          };
        }); */
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedAbilities = profile.abilities;
    return profile && _.map(Abilities.findAll(),
        function makeAbilityObject(ability) {
          return { label: ability.name, selected: _.contains(selectedAbilities, ability.name) };
        });
  },
  styles() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedStyles = profile.styles;
    return profile && _.map(Styles.findAll(),
        function makeStyleObject(style) {
          return { label: style.name, selected: _.contains(selectedStyles, style.name) };
        });
  },
  goals() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedGoals = profile.goals;
    return profile && _.map(Goals.findAll(),
        function makeGoalObject(goal) {
          return { label: goal.name, selected: _.contains(selectedGoals, goal.name) };
        });
  },
  experiences() {
    const profile = Profiles.findDoc(FlowRouter.getParam('username'));
    const selectedExperiences = profile.experiences;
    return profile && _.map(Experiences.findAll(),
        function makeExperienceObject(experience) {
          return { label: experience.name, selected: _.contains(selectedExperiences, experience.name) };
        });
  },
});


Template.Create_Page.events({
  'submit .create-data-form'(event, instance) {
    event.preventDefault();
    const username = FlowRouter.getParam('username'); // schema requires username.
    const selectedAbilities = _.filter(event.target.Abilities.selectedOptions, (option) => option.selected);
    const abilities = _.map(selectedAbilities, (option) => option.value);
    /* const selectedStyles = _.filter(event.target.Styles.selectedOptions, (option) => option.selected);
    const styles = _.map(selectedStyles, (option) => option.value);
    const selectedGoals = _.filter(event.target.Goals.selectedOptions, (option) => option.selected);
    const goals = _.map(selectedGoals, (option) => option.value);
    const selectedExperiences = _.filter(event.target.Experiences.selectedOptions, (option) => option.selected);
    const experiences = _.map(selectedExperiences, (option) => option.value); */
    const updatedAbilitiesData = { abilities, username };

    // Clear out any old validation errors.
    instance.context.reset();
    // Invoke clean so that updatedProfileData reflects what will be inserted.
    const cleanData = Abilities.getSchema().clean(updatedAbilitiesData);
    // Determine validity.
    instance.context.validate(cleanData);

    if (instance.context.isValid()) {
      const docID = Abilities._id;
      const id = Abilities.update(docID, { $set: cleanData });
      instance.messageFlags.set(displaySuccessMessage, id);
      instance.messageFlags.set(displayErrorMessages, false);
    } else {
      instance.messageFlags.set(displaySuccessMessage, false);
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});
