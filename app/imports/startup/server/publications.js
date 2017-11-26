import { Interests } from '/imports/api/interest/InterestCollection';
import { Profiles } from '/imports/api/profile/ProfileCollection';
import { Favorites } from '/imports/api/favorites/FavoritesCollection';

Interests.publish();
Profiles.publish();
Favorites.publish();
