-- DropIndex
DROP INDEX `Stock_code_idx` ON `Stock`;

-- CreateIndex
CREATE INDEX `Stock_id_idx` ON `Stock`(`id`);
