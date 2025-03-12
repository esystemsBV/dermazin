/*
  Warnings:

  - You are about to drop the `medicament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `medicament`;

-- CreateTable
CREATE TABLE `medicaments` (
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

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
