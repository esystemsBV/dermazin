/*
  Warnings:

  - You are about to drop the column `Suspended` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `Suspended`,
    ADD COLUMN `suspended` BOOLEAN NOT NULL DEFAULT false;
