-- 优化索引：删除自增主键/唯一键上的冗余索引，补充常用查询字段索引

-- DropIndex（冗余：主键 id 自带索引）
DROP INDEX `Video_id_idx` ON `Video`;
DROP INDEX `OneTimePassword_id_idx` ON `OneTimePassword`;
DROP INDEX `Stock_id_idx` ON `Stock`;
DROP INDEX `StockData_id_idx` ON `StockData`;
DROP INDEX `DeviceService_id_idx` ON `DeviceService`;
DROP INDEX `Device_id_idx` ON `Device`;

-- DropIndex（冗余：name 已有唯一索引）
DROP INDEX `Icon_name_idx` ON `Icon`;
DROP INDEX `GitMojis_name_idx` ON `GitMojis`;
DROP INDEX `GithubColor_name_idx` ON `GithubColor`;

-- CreateIndex（按 email 查询 OTP）
CREATE INDEX `OneTimePassword_email_idx` ON `OneTimePassword`(`email`);

-- CreateIndex（按股票查询 K 线数据）
CREATE INDEX `StockData_stock_date_idx` ON `StockData`(`stock`, `date`);

-- CreateIndex（getSkillsByType 按类型过滤）
CREATE INDEX `Skills_type_idx` ON `Skills`(`type`);

-- CreateIndex（getGrouApps 按 group + visiable 过滤）
CREATE INDEX `App_group_visiable_idx` ON `App`(`group`, `visiable`);
