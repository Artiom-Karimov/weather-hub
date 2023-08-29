-- CreateEnum
CREATE TYPE "ValueType" AS ENUM ('Temperature', 'Humidity', 'AirQuality', 'Oxygen');

-- CreateEnum
CREATE TYPE "AlarmType" AS ENUM ('HighAlarm', 'LowAlarm');

-- CreateTable
CREATE TABLE "Sensor" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(500),
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,
    "valueType" "ValueType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "measuredAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Threshold" (
    "id" TEXT NOT NULL,
    "valueType" "ValueType" NOT NULL,
    "alarmType" "AlarmType" NOT NULL,
    "value" DOUBLE PRECISION,

    CONSTRAINT "Threshold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alarm" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,
    "measurementId" TEXT NOT NULL,
    "thresholdId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sensor_name_key" ON "Sensor"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Threshold_valueType_alarmType_key" ON "Threshold"("valueType", "alarmType");

-- CreateIndex
CREATE UNIQUE INDEX "Alarm_measurementId_key" ON "Alarm"("measurementId");

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "Measurement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_thresholdId_fkey" FOREIGN KEY ("thresholdId") REFERENCES "Threshold"("id") ON DELETE CASCADE ON UPDATE CASCADE;
