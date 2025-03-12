-- CreateTable
CREATE TABLE `rendez_vous` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codeRendezVous` VARCHAR(191) NOT NULL,
    `dateHeure` DATETIME(3) NOT NULL,
    `patientId` INTEGER NULL,
    `quickPatientId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rendez_vous_codeRendezVous_key`(`codeRendezVous`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quick_patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rendez_vous` ADD CONSTRAINT `rendez_vous_quickPatientId_fkey` FOREIGN KEY (`quickPatientId`) REFERENCES `quick_patients`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
