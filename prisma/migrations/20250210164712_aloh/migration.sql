/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[quickPatientId]` on the table `rendez_vous` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `patients_phone_key` ON `patients`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `rendez_vous_quickPatientId_key` ON `rendez_vous`(`quickPatientId`);
