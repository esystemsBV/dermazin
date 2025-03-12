/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `quick_patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `quick_patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `quick_patients` ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `quick_patients_phone_key` ON `quick_patients`(`phone`);
