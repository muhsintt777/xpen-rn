import { api } from '@/services/api';
import { Category } from './category-types';

export class CategoryService {
  private static readonly PREFIX = '/category';

  static async list() {
    const res = await api.get(`${this.PREFIX}/list`);
    return res.data?.data as Category[];
  }
}
