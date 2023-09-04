import { AlarmType, Prisma, Threshold, ValueType } from '@prisma/client';

export interface ThresholdsRepository {
  create(data: Prisma.ThresholdCreateInput): Promise<Threshold | null>;
  get(id: string): Promise<Threshold | null>;
  getByType(value: ValueType, alarm: AlarmType): Promise<Threshold | null>;
  update(
    id: string,
    data: Prisma.ThresholdUpdateInput,
  ): Promise<Threshold | null>;
  delete(id: string): Promise<boolean>;
}
