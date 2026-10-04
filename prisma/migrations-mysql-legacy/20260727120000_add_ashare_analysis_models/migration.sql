-- CreateTable（A股股票清单）
CREATE TABLE `stock_basic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `market` VARCHAR(10) NOT NULL,
    `listed_date` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `stock_basic_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable（A股日线行情）
CREATE TABLE `stock_daily` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `date` DATE NOT NULL,
    `open` DOUBLE NOT NULL,
    `close` DOUBLE NOT NULL,
    `high` DOUBLE NOT NULL,
    `low` DOUBLE NOT NULL,
    `volume` DOUBLE NOT NULL,
    `amount` DOUBLE NOT NULL,
    `change_pct` DOUBLE NOT NULL,
    `turnover` DOUBLE NULL,

    UNIQUE INDEX `stock_daily_code_date_key`(`code`, `date`),
    INDEX `stock_daily_date_idx`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable（分析信号：底部放量/顶部放量等）
CREATE TABLE `stock_signal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `date` DATE NOT NULL,
    `type` VARCHAR(30) NOT NULL,
    `detail` TEXT NULL,

    UNIQUE INDEX `stock_signal_code_date_type_key`(`code`, `date`, `type`),
    INDEX `stock_signal_date_type_idx`(`date`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable（资讯快讯）
CREATE TABLE `news_flash` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `source` VARCHAR(20) NOT NULL,
    `external_id` VARCHAR(50) NOT NULL,
    `title` VARCHAR(500) NULL,
    `content` TEXT NOT NULL,
    `codes` TEXT NULL,
    `published_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `news_flash_source_external_id_key`(`source`, `external_id`),
    INDEX `news_flash_published_at_idx`(`published_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
