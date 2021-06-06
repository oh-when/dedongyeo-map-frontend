import {
  useCurrentPosition,
  isCustomSpotFlag,
  mapSpots,
} from '~/lib/apollo/vars/home';

const home = {
  typePolicies: {
    Query: {
      fields: {
        spotsState: {
          read() {
            return mapSpots();
          },
        },
        currentPosition: {
          read() {
            return useCurrentPosition();
          },
        },
        isCustomSpotSetting: {
          read() {
            return isCustomSpotFlag();
          },
        },
      },
    },
  },
};

export default home;
