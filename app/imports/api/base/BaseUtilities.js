import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Interests } from '/imports/api/interest/InterestCollection';
import { Abilities } from '/imports/api/ability/AbilityCollection';
import { Styles } from '/imports/api/style/StyleCollection';

export function removeAllEntities() {
  Profiles.removeAll();
  Interests.removeAll();
  Abilities.removeAll();
  Styles.removeAll();
}
