-- ----------------------------------------
-- Export of table `User`
-- Date: 2026-03-25T14:13:48.162Z
-- Rows: 1
-- ----------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET AUTOCOMMIT=0;

-- Data for `User` (1 rows)
INSERT IGNORE INTO `User` (`id`, `name`, `nickname`, `email`, `emailVerified`, `password`, `passwordSalt`, `avatar`, `bio`) VALUES
  ('b376fa9c-0626-4bcb-909c-f5a8a6a38619', 'Innev', 'Innev 🐬', 'zhaozhao200295@gmail.com', NULL, 'bN9swICiQPBem5vrfrMeFp+kE0Yv3RGts64cIMbVdD4=', '26679563', 'https://avatars.githubusercontent.com/u/2101841?v=4', '轻量级云原生架构实验室');

COMMIT;
SET UNIQUE_CHECKS=1;
SET FOREIGN_KEY_CHECKS=1;
