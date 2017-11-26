import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Abilities.removeAll();
}
