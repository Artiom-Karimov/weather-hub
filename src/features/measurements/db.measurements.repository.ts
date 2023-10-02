import { PrismaConnection } from '../../shared/prisma-client';
import { MeasurementsQueryDto } from './measurements.query.dto';
import { MeasurementsRepository } from './measurements.repository';
import { Measurement, Prisma } from '@prisma/client';

export class DbMeasurementsRepository implements MeasurementsRepository {
  private readonly measurement: Prisma.MeasurementDelegate;

  constructor(db: PrismaConnection) {
    this.measurement = db.measurement;
  }

  public async create(
    data: Prisma.MeasurementCreateInput,
  ): Promise<Measurement | null> {
    try {
      const result = await this.measurement.create({ data });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async get(id: string): Promise<Measurement | null> {
    try {
      const result = await this.measurement.findUniqueOrThrow({
        where: { id },
      });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getMany(query: MeasurementsQueryDto): Promise<Measurement[]> {
    try {
      return await this.measurement.findMany(this.makeFilter(query));
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private makeFilter({
    sensorId,
    take,
    skip,
  }: MeasurementsQueryDto): Prisma.MeasurementFindManyArgs {
    const where = sensorId ? { sensorId } : undefined;
    return {
      where,
      take,
      skip,
      orderBy: { measuredAt: 'desc' },
    };
  }
}
