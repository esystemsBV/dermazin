-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fname` VARCHAR(191) NOT NULL,
    `lname` VARCHAR(191) NOT NULL,
    `bday` DATETIME(3) NOT NULL,
    `sexe` ENUM('male', 'female') NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `mail` VARCHAR(191) NULL,
    `cin` VARCHAR(191) NULL,
    `mutuelle` ENUM('Cnss', 'Cnops', 'Sanlam', 'Ramed') NOT NULL,

    UNIQUE INDEX `patients_mail_key`(`mail`),
    UNIQUE INDEX `patients_cin_key`(`cin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
