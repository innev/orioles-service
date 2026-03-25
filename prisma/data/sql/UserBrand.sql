-- ----------------------------------------
-- Export of table `UserBrand`
-- Date: 2026-03-25T14:13:49.696Z
-- Rows: 5
-- ----------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET AUTOCOMMIT=0;

-- Data for `UserBrand` (5 rows)
INSERT IGNORE INTO `UserBrand` (`icon`, `url`, `user`) VALUES
  ('github', 'https://github.com/innev', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  ('telegram', '#', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  ('tiktok', 'https://www.douyin.com/user/MS4wLjABAAAAuMw5gTp3HXiXngGfWKIRTvcr0qCeub13tDCDQTfrx9A', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  ('x', 'https://x.com/JunzhaoSun', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  ('youtube', '#', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619');

COMMIT;
SET UNIQUE_CHECKS=1;
SET FOREIGN_KEY_CHECKS=1;
