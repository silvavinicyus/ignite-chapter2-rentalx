import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const categoryExists = this.categoriesRepository.findByName(name);

    if (categoryExists) {
      throw new Error('Category already exists!');
    }

    this.categoriesRepository.create({ name, description });
  }
}
