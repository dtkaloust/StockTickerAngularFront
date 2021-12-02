import { Stock } from './stock';

export interface Feed {
  id: number;
  name: string;
  creatorId: string;
  isPublic: boolean;
  stock: Stock[];
}
