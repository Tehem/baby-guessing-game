interface Baby {
  id: number;
  name: string;
  image: {
    type: 'url' | 'local';
    source: string;
  };
}

export const babies: Baby[] = [
  {
    id: 1,
    name: "Jules",
    image: {
      type: 'local',
      source: "baby1.png"
    }
  },
  {
    id: 2,
    name: "Robin",
    image: {
      type: 'local',
      source: "baby4.png"
    }
  },
  {
    id: 3,
    name: "Jules",
    image: {
      type: 'local',
      source: "baby3.png"
    }
  },
  {
    id: 4,
    name: "Robin",
    image: {
      type: 'local',
      source: "baby5.png"
    }
  },
  {
    id: 5,
    name: "Robin",
    image: {
      type: 'local',
      source: "baby6.png"
    }
  },
  {
    id: 6,
    name: "Jules",
    image: {
      type: 'local',
      source: "baby2.png"
    }
  },
];
