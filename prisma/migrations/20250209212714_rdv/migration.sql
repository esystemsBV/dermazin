-- AddForeignKey
ALTER TABLE `rendez_vous` ADD CONSTRAINT `rendez_vous_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
