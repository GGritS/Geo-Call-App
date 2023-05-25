const FAKE_LOCATIONS = [
  {
    coords: {
      latitude: 9.89863,
      longitude: -112.30765,
    },
  },
  {
    coords: {
      latitude: 62.73436,
      longitude: -40.50506,
    },
  },
  {
    coords: {
      latitude: -14.71048,
      longitude: -126.97919,
    },
  },
  {
    coords: {
      latitude: -3.95065,
      longitude: 19.09994,
    },
  },
];

export const getFakeLocation = () => {
  return FAKE_LOCATIONS[Math.floor(Math.random() * FAKE_LOCATIONS.length)];
};
