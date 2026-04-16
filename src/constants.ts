import { Track } from './types';

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Cyber Drift',
    artist: 'AI Synth',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=400&h=400&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Neon Nights',
    artist: 'Digital Dreamer',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/neon/400/400',
  },
  {
    id: '3',
    title: 'Pulse Wave',
    artist: 'Bit Master',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/pulse/400/400',
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const MIN_SPEED = 50;
export const SPEED_INCREMENT = 2;
