-- 删除已抽离到独立项目 vius（观微）的 stock/stock-pool 相关表
-- 数据已在 vius 的 PostgreSQL 中重建，此处彻底删除

DROP TABLE IF EXISTS `watchlist`;
DROP TABLE IF EXISTS `audit_log`;
DROP TABLE IF EXISTS `alert_history`;
DROP TABLE IF EXISTS `stock_basic`;
DROP TABLE IF EXISTS `stock_daily`;
DROP TABLE IF EXISTS `stock_signal`;
DROP TABLE IF EXISTS `news_flash`;
DROP TABLE IF EXISTS `Stock`;
DROP TABLE IF EXISTS `StockData`;
