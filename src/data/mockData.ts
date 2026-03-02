import { Screenshot, Tag } from '../types';

export const mockTags: Tag[] = [
  { id: '1', name: 'Dashboard', color: '#3B82F6' },
  { id: '2', name: 'Analytics', color: '#10B981' },
  { id: '3', name: 'UI Design', color: '#8B5CF6' },
  { id: '4', name: 'Mobile', color: '#F59E0B' },
  { id: '5', name: 'Landing Page', color: '#EF4444' },
  { id: '6', name: 'Settings', color: '#6B7280' },
  { id: '7', name: 'Profile', color: '#EC4899' },
  { id: '8', name: 'Charts', color: '#14B8A6' },
];

const createPlaceholderImage = (id: number, width: number, height: number): string => {
  const colors = ['3B82F6', '10B981', '8B5CF6', 'F59E0B', 'EF4444', '6B7280', 'EC4899', '14B8A6'];
  const bgColor = colors[id % colors.length];
  return `https://placehold.co/${width}x${height}/${bgColor}/FFFFFF?text=Screenshot+${id}`;
};

export const mockScreenshots: Screenshot[] = [
  {
    id: '1',
    name: 'Main Dashboard View',
    url: createPlaceholderImage(1, 1200, 800),
    thumbnail: createPlaceholderImage(1, 400, 300),
    tags: [mockTags[0], mockTags[1]],
    createdAt: new Date('2024-01-15'),
    size: '1.2 MB',
  },
  {
    id: '2',
    name: 'Analytics Overview',
    url: createPlaceholderImage(2, 1200, 800),
    thumbnail: createPlaceholderImage(2, 400, 300),
    tags: [mockTags[1], mockTags[7]],
    createdAt: new Date('2024-01-18'),
    size: '890 KB',
  },
  {
    id: '3',
    name: 'Mobile App Home',
    url: createPlaceholderImage(3, 1200, 800),
    thumbnail: createPlaceholderImage(3, 400, 300),
    tags: [mockTags[3], mockTags[0]],
    createdAt: new Date('2024-01-20'),
    size: '1.5 MB',
  },
  {
    id: '4',
    name: 'Landing Page V1',
    url: createPlaceholderImage(4, 1200, 800),
    thumbnail: createPlaceholderImage(4, 400, 300),
    tags: [mockTags[4], mockTags[2]],
    createdAt: new Date('2024-01-22'),
    size: '2.1 MB',
  },
  {
    id: '5',
    name: 'User Profile Settings',
    url: createPlaceholderImage(5, 1200, 800),
    thumbnail: createPlaceholderImage(5, 400, 300),
    tags: [mockTags[5], mockTags[6]],
    createdAt: new Date('2024-01-25'),
    size: '750 KB',
  },
  {
    id: '6',
    name: 'Charts Dashboard',
    url: createPlaceholderImage(6, 1200, 800),
    thumbnail: createPlaceholderImage(6, 400, 300),
    tags: [mockTags[1], mockTags[7], mockTags[0]],
    createdAt: new Date('2024-01-28'),
    size: '1.1 MB',
  },
  {
    id: '7',
    name: 'UI Components Kit',
    url: createPlaceholderImage(7, 1200, 800),
    thumbnail: createPlaceholderImage(7, 400, 300),
    tags: [mockTags[2], mockTags[5]],
    createdAt: new Date('2024-02-01'),
    size: '1.8 MB',
  },
  {
    id: '8',
    name: 'Mobile Profile Screen',
    url: createPlaceholderImage(8, 1200, 800),
    thumbnail: createPlaceholderImage(8, 400, 300),
    tags: [mockTags[3], mockTags[6]],
    createdAt: new Date('2024-02-03'),
    size: '620 KB',
  },
];
