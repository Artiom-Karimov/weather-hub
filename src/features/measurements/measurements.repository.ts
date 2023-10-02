import { Measurement, Prisma } from '@prisma/client';
import { MeasurementsQueryDto } from './measurements.query.dto';

export interface MeasurementsRepository {
  create(data: Prisma.MeasurementCreateInput): Promise<Measurement | null>;
  get(id: string): Promise<Measurement | null>;
  getMany(query: MeasurementsQueryDto): Promise<Measurement[]>;
}
