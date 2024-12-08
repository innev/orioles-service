-- CreateTable
CREATE TABLE `Icon` (
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Icon_name_key`(`name`),
    INDEX `Icon_name_idx`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GitMojis` (
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `emoji` VARCHAR(50) NOT NULL,
    `entity` VARCHAR(50) NOT NULL,
    `description` VARCHAR(200) NOT NULL,
    `semver` VARCHAR(191) NULL,
    `color` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GitMojis_name_key`(`name`),
    INDEX `GitMojis_name_idx`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GithubColor` (
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `GithubColor_name_key`(`name`),
    INDEX `GithubColor_name_idx`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
