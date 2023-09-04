import { PrismaConnection } from '../../shared/prisma-client';
import { ThresholdsRepository } from './thresholds.repository';
import { AlarmType, Prisma, Threshold, ValueType } from '@prisma/client';

export class DbThresholdsRepository implements ThresholdsRepository {
  private readonly threshold: Prisma.ThresholdDelegate;

  constructor(db: PrismaConnection) {
    this.threshold = db.threshold;
  }

  public async create(
    data: Prisma.ThresholdCreateInput,
  ): Promise<Threshold | null> {
    try {
      const result = await this.threshold.create({ data });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async get(id: string): Promise<Threshold | null> {
    try {
      const result = await this.threshold.findUniqueOrThrow({ where: { id } });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getByType(
    value: ValueType,
    alarm: AlarmType,
  ): Promise<Threshold | null> {
    try {
      const result = await this.threshold.findFirstOrThrow({
        where: { valueType: value, alarmType: alarm },
      });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async update(
    id: string,
    data: Prisma.ThresholdUpdateInput,
  ): Promise<Threshold | null> {
    try {
      const result = await this.threshold.update({ where: { id }, data });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const result = await this.threshold.delete({ where: { id } });
      return result != null;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
