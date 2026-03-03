export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Screenshot {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  tags: Tag[];
  createdAt: Date;
  size: string;
}

export type ViewMode = 'grid' | 'list';

export interface FilterState {
  search: string;
  tags: string[];
}
