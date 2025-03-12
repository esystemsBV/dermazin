/*
  Warnings:

  - The primary key for the `medicaments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `medicaments` table. All the data in the column will be lost.
  - Added the required column `code` to the `medicaments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medicaments` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `code` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`code`);
