import { PrismaConnection } from '../../shared/prisma-client';
import { SensorsRepository } from './sensors.repository';
import { Prisma, Sensor } from '@prisma/client';

export class DbSensorsRepository implements SensorsRepository {
  private readonly sensor: Prisma.SensorDelegate;

  constructor(db: PrismaConnection) {
    this.sensor = db.sensor;
  }

  public async create(data: Prisma.SensorCreateInput): Promise<Sensor | null> {
    try {
      const result = await this.sensor.create({ data });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async get(id: string): Promise<Sensor | null> {
    try {
      const result = await this.sensor.findUniqueOrThrow({ where: { id } });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(
    id: string,
    data: Prisma.SensorUpdateInput,
  ): Promise<Sensor | null> {
    try {
      const result = await this.sensor.update({ where: { id }, data });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.sensor.delete({ where: { id } });
      return result != null;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
