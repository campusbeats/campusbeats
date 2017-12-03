import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { EventData, EventDataSchema } from '/imports/api/eventdata/eventdata';


Meteor.methods({
  // Allows an event to be edited.
  editEvent( event ) {
    try {
      return EventData.update( event._id, {
        $set: event
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
});
