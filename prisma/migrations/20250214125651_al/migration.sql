/*
  Warnings:

  - The primary key for the `medicaments` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `medicaments` DROP PRIMARY KEY,
    MODIFY `code` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`code`);
