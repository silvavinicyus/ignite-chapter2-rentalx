import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import RentalsRepositoryInMemory from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import CreateRentalUseCase from './CreateRentalUseCase';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Rental', () => {
  const dayAdd24h = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it('Should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 123',
      description: 'Car teste',
      brand: 'Brand test',
      daily_rate: 100,
      fine_amount: 100,
      license_plate: 'ABC TESTE',
      category_id: '12345',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24h,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rental if there is another open rental to the same user', async () => {
    const rental = await rentalsRepositoryInMemory.create({
      car_id: '1111',
      expected_return_date: dayAdd24h,
      user_id: '12345',
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '123123',
        expected_return_date: dayAdd24h,
      })
    ).rejects.toEqual(
      new AppError('There is a rental in progress for this user.')
    );
  });

  it('Should not be able to create a new rental if there is another open rental to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      user_id: 'XXXX',
      car_id: '121212',
      expected_return_date: dayjs().toDate(),
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'XXXX1',
        car_id: '121212',
        expected_return_date: dayAdd24h,
      })
    ).rejects.toEqual(new AppError('Car is not available'));
  });

  it('Should not be able to create a new rental if rent time are not at least one day', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: 'XXXX0',
        car_id: '121218',
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError('Rent must have at least 24h.'));
  });
});
