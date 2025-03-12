-- AlterTable
ALTER TABLE `patients` ADD COLUMN `bloodType` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `Suspended` BOOLEAN NOT NULL DEFAULT false;
