-- CreateTable
CREATE TABLE `Video` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `source` ENUM('douyin', 'youtube', 'iqiyi', 'qq', 'youku', 'bilibili') NOT NULL DEFAULT 'qq',
    `name` VARCHAR(191) NOT NULL,
    `cover` VARCHAR(500) NOT NULL,
    `url` VARCHAR(500) NOT NULL,
    `visiable` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Video_name_key`(`name`),
    INDEX `Video_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
