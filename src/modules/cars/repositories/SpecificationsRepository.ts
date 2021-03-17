import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from './ISpecificationsRepository';

export default class SpecificationsRepository
  implements ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): void {
    throw new Error('Method not implemented.');
  }
}
