import { Prisma, Sensor } from '@prisma/client';

export interface SensorsRepository {
  create(data: Prisma.SensorCreateInput): Promise<Sensor | null>;
  get(id: string): Promise<Sensor | null>;
  update(id: string, data: Prisma.SensorUpdateInput): Promise<Sensor | null>;
  delete(id: string): Promise<boolean>;
}
