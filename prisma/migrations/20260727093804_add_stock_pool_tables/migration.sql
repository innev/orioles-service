-- 补建 stock-pool 三张表（此前由 db push 创建，未纳入迁移；线上库缺失）

-- CreateTable
CREATE TABLE `watchlist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `market` VARCHAR(10) NOT NULL,
    `type` VARCHAR(20) NOT NULL DEFAULT 'individual',
    `cost` DECIMAL(10, 4) NOT NULL DEFAULT 0,
    `alerts_json` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL,

    UNIQUE INDEX `watchlist_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action` VARCHAR(50) NOT NULL,
    `code` VARCHAR(20) NULL,
    `details` TEXT NULL,
    `agent_id` VARCHAR(100) NULL,
    `timestamp` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `audit_log_timestamp_idx`(`timestamp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alert_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(20) NOT NULL,
    `alert_type` VARCHAR(50) NOT NULL,
    `severity` VARCHAR(20) NOT NULL,
    `message` TEXT NOT NULL,
    `current_value` DECIMAL(10, 4) NULL,
    `threshold_value` DECIMAL(10, 4) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `alert_history_code_alert_type_created_at_idx`(`code`, `alert_type`, `created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
