export class MeasurementsQueryDto {
  sensorId?: string;
  pageSize = 20;
  page = 1;

  constructor({ sensorId, pageSize, page }: Partial<MeasurementsQueryDto>) {
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
