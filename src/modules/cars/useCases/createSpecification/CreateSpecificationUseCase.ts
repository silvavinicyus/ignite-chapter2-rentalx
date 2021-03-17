import { ISpecificationsRepository } from '../../repositories/implementations/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): void {
    const specificationExists = this.specificationsRepository.findByName(name);

    if (specificationExists) {
      throw new Error('Specification already exists.');
    }

    this.specificationsRepository.create({ name, description });
  }
}
