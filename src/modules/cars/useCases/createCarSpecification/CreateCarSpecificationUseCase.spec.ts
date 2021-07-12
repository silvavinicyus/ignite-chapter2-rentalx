import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import SpecificationRepositoryInMemory from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import CreateCarSpecificationUsecase from './CreateCarSpecificationUseCase';

let createCarSpecificationUsecase: CreateCarSpecificationUsecase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUsecase = new CreateCarSpecificationUsecase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should be able to add a new Specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'SBD-1013',
      fine_amount: 60,
      brand: 'Brand Example',
      category_id: 'category',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'Specification test',
      description: 'Description of specification test',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUsecase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it('should not be able to add a new Specification to a car that no exists', async () => {
    const car_id = '1234';
    const specifications_id = ['54321'];

    await expect(
      createCarSpecificationUsecase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError('There is no car with the given id.'));
  });
});
