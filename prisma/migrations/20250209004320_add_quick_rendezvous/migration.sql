/*
  Warnings:

  - You are about to drop the column `codeRendezVous` on the `rendez_vous` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `rendez_vous_codeRendezVous_key` ON `rendez_vous`;

-- AlterTable
ALTER TABLE `rendez_vous` DROP COLUMN `codeRendezVous`;
