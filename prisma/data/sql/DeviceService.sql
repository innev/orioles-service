-- ----------------------------------------
-- Export of table `DeviceService`
-- Date: 2026-03-25T14:21:43.237Z
-- Rows: 3
-- ----------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET AUTOCOMMIT=0;

-- Data for `DeviceService` (3 rows)
INSERT IGNORE INTO `DeviceService` (`id`, `uuid`, `isPrimary`, `device`) VALUES
  (1, '4fafc201-1fb5-459e-8fcc-c5c9c331914b', 1, 1),
  (2, '4fafc201-1fb5-459e-8fcc-c5c9c331914b', 1, 2),
  (3, '4fafc201-1fb5-459e-8fcc-c5c9c331914b', 1, 3);

COMMIT;
SET UNIQUE_CHECKS=1;
SET FOREIGN_KEY_CHECKS=1;
