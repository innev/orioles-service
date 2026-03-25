-- ----------------------------------------
-- Export of table `Device`
-- Date: 2026-03-25T14:21:42.320Z
-- Rows: 3
-- ----------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET AUTOCOMMIT=0;

-- Data for `Device` (3 rows)
INSERT IGNORE INTO `Device` (`id`, `code`, `name`, `isDeleted`) VALUES
  (1, 'C0:4E:30:3E:91:15', '六路温度控制器（1）', 0),
  (2, 'FC:E8:C0:78:C1:52', '四路温度控制器（1）', 1),
  (3, '24:58:7C:EC:67:99', '六路温度控制器（2）', 1);

COMMIT;
SET UNIQUE_CHECKS=1;
SET FOREIGN_KEY_CHECKS=1;
