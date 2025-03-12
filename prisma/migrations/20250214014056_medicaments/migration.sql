-- CreateTable
CREATE TABLE `Medicament` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `specialite` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `forme` VARCHAR(191) NOT NULL,
    `presentation` VARCHAR(191) NOT NULL,
    `pp_gn` VARCHAR(191) NOT NULL,
    `substance_active` VARCHAR(191) NOT NULL,
    `classe_therapeutique` VARCHAR(191) NOT NULL,
    `epi` VARCHAR(191) NOT NULL,
    `ppv` VARCHAR(191) NOT NULL,
    `ph` VARCHAR(191) NOT NULL,
    `pfht` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
