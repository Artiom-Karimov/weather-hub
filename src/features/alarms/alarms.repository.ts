import { Alarm, Prisma } from '@prisma/client';
import { AlarmsQueryDto } from './alarms.query.dto';

export interface AlarmsRepository {
  create(data: Prisma.AlarmCreateInput): Promise<Alarm | null>;
  get(id: string): Promise<Alarm | null>;
  getMany(query: AlarmsQueryDto): Promise<Alarm[]>;
}
