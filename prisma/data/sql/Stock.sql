-- ----------------------------------------
-- Export of table `Stock`
-- Date: 2026-03-25T14:21:37.411Z
-- Rows: 16
-- ----------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET AUTOCOMMIT=0;

-- Data for `Stock` (16 rows)
INSERT IGNORE INTO `Stock` (`id`, `code`, `source`, `type`) VALUES
  (1, '000001', 'SS', 'ZS'),
  (2, '399001', 'SZ', 'ZS'),
  (3, '399006', 'SZ', 'ZS'),
  (4, '000688', 'SS', 'ZS'),
  (5, '399330', 'SZ', 'ZS'),
  (6, '000300', 'SS', 'ZS'),
  (7, '000905', 'SS', 'ZS'),
  (8, '000852', 'SS', 'ZS'),
  (9, '603617', 'SS', 'AG'),
  (10, '600481', 'SS', 'AG'),
  (11, '603687', 'SS', 'AG'),
  (12, '300940', 'SZ', 'AG'),
  (13, '002515', 'SZ', 'AG'),
  (14, '002006', 'SZ', 'AG'),
  (16, '002772', 'SZ', 'AG'),
  (17, '600973', 'SS', 'AG');

COMMIT;
SET UNIQUE_CHECKS=1;
SET FOREIGN_KEY_CHECKS=1;
