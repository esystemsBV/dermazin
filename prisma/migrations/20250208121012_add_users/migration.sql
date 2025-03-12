/*
  Warnings:

  - The values [Cnss,Cnops,Sanlam,Ramed] on the enum `patients_mutuelle` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `patients` MODIFY `mutuelle` ENUM('cnss', 'cnops', 'sanlam', 'ramed') NOT NULL;
