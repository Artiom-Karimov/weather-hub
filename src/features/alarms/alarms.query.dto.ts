export class AlarmsQueryDto {
  thresholdId?: string;
  sensorId?: string;
  pageSize = 20;
  page = 1;

  constructor({
    thresholdId,
    sensorId,
    pageSize,
    page,
  }: Partial<AlarmsQueryDto>) {
    if (thresholdId) this.thresholdId = thresholdId;
    if (sensorId) this.sensorId = sensorId;

    if (pageSize != null && pageSize > 0 && pageSize < 1000)
      this.pageSize = pageSize;

    if (page != null && page > 0) this.page = page;
  }

  get take(): number {
    return this.pageSize;
  }
  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }
}
