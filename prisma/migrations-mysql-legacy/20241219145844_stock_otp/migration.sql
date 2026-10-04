-- AlterTable
ALTER TABLE `App` MODIFY `updatedAt` DATETIME(3) NULL,
    MODIFY `user` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Video` MODIFY `source` ENUM('douyin', 'youtube', 'iqiyi', 'qq', 'youku', 'bilibili', 'sohu') NOT NULL DEFAULT 'qq',
    MODIFY `url` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `OneTimePassword` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(50) NOT NULL,
    `expires` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `OneTimePassword_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` INTEGER NOT NULL,
    `source` ENUM('SS', 'SZ') NOT NULL,
    `type` ENUM('ZS', 'AG') NOT NULL,

    UNIQUE INDEX `Stock_code_key`(`code`),
    INDEX `Stock_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stock` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `open` DOUBLE NOT NULL,
    `close` DOUBLE NOT NULL,
    `high` DOUBLE NOT NULL,
    `low` DOUBLE NOT NULL,
    `volume` DOUBLE NOT NULL,
    `amount` DOUBLE NOT NULL,
    `change` DOUBLE NOT NULL,
    `percent` DOUBLE NOT NULL,
    `amplitude` DOUBLE NOT NULL,

    INDEX `StockData_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
