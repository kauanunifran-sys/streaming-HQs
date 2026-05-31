export interface Comic {
  id: string;
  title: string;
  coverUrl: string;
  issueNumber: string;
  author: string;
  artist?: string;
  publisher: 'Marvel' | 'DC' | 'Dark Horse' | 'Image Comics';
  year: string;
  description: string;
  rating: number;
  pagesCount: number;
  progressPage?: number; // active reading page
  progressPercent?: number; // progress indicator percentage
  isSaved?: boolean;
  featured?: boolean;
  pages: string[];
}

export interface UserComment {
  id: string;
  userName: string;
  avatarUrl?: string;
  date: string;
  text: string;
  likes: number;
}

export type ActiveTab = 'home' | 'reading' | 'saved' | 'details' | 'register' | 'login';

export type DashboardSection = 'novidades' | 'populares' | 'explorar';
