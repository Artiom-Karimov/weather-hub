import { PrismaConnection } from '../../shared/prisma-client';
import { Alarm, Prisma } from '@prisma/client';
import { AlarmsRepository } from './alarms.repository';
import { AlarmsQueryDto } from './alarms.query.dto';

export class DbAlarmsRepository implements AlarmsRepository {
  private readonly alarm: Prisma.AlarmDelegate;

  constructor(db: PrismaConnection) {
    this.alarm = db.alarm;
  }

  public async create(data: Prisma.AlarmCreateInput): Promise<Alarm | null> {
    try {
      const result = await this.alarm.create({ data });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async get(id: string): Promise<Alarm | null> {
    try {
      const result = await this.alarm.findUniqueOrThrow({
        where: { id },
      });
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async getMany(query: AlarmsQueryDto): Promise<Alarm[]> {
    try {
      return await this.alarm.findMany(this.makeFilter(query));
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  private makeFilter({
    thresholdId,
    sensorId,
    take,
    skip,
  }: AlarmsQueryDto): Prisma.AlarmFindManyArgs {
    let where = { thresholdId, sensorId };
    if (!thresholdId && !sensorId) where = undefined;

    return {
      where,
      take,
      skip,
      orderBy: { createdAt: 'desc' },
    };
  }
}
