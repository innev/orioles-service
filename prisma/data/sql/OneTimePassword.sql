-- ----------------------------------------
-- Export of table `OneTimePassword`
-- Date: 2026-03-25T14:21:34.236Z
-- Rows: 18
-- ----------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET AUTOCOMMIT=0;

-- Data for `OneTimePassword` (18 rows)
INSERT IGNORE INTO `OneTimePassword` (`id`, `name`, `email`, `otp`, `expires`, `createdAt`) VALUES
  (1, 'dockerhub', '', '3XDBWUQG3TVOM63P4TXOCAOYBETXV6JJ', NULL, '2024-12-19 14:59:37'),
  (2, 'X', '', '6QNAAQWG35ORIPXD', NULL, '2024-12-19 14:59:37'),
  (3, 'npmjs', 'aigrego', '2JUHPL3243U2GIP3Y3DXOLZBRCPEYPUH', NULL, '2024-12-19 14:59:37'),
  (4, 'gitea', '', 'NCBU2FC4P3FDTSFQPNXOO5GQKTK62LXFXRS3EW55EVBCSTKWSJ', NULL, '2024-12-19 14:59:37'),
  (5, 'github', '', 'ESTCQPA2XDFF6ARR', NULL, '2024-12-19 14:59:37'),
  (6, 'mongodb', '393715354@qq.com', 'ICCWSNNBR6K2IYET', NULL, '2024-12-19 14:59:37'),
  (7, 'ox-prod', 'jz.sun@gen-x.tech', 'XYU22MFILWKFBFK3', NULL, '2024-12-19 14:59:37'),
  (8, 'ox-prod', 'zhaozhao200295@gmail.com', 'TKVX5QVZJAYY2LHV', NULL, '2024-12-19 14:59:37'),
  (9, 'ox-dev', '06d15e837299@drmail.in', 'W3GEGDNBJIMRNJUB', NULL, '2024-12-19 14:59:37'),
  (10, 'ox-dev', 'zhaozhao200295@gmail.com', 'TKVX5QVZJAYY2LHV', NULL, '2024-12-19 14:59:37'),
  (11, 'Test', 'admin@bull.com', '2FZ2HEGID5YAICUD', NULL, '2024-12-30 06:48:04'),
  (12, 'Kerr-Prod', 'kerrbak@gmail.com', 'MPTFGHE75TMCPEQF', NULL, '2025-03-07 06:48:04'),
  (13, 'HZ-Dev', 'd5c97fad8c6b@drmail.in', 'Z5FNKNFFT6U5UOW2', NULL, '2025-04-16 06:48:04'),
  (14, 'Ruizean Pty Ltd', 'junzhao.sun@ruizean.com', 'g7cr7nydtmhnwxxn', NULL, '2025-06-09 06:48:04'),
  (15, 'Fireblocks', 'junzhao.sun@ruizean.com', 'J52G4MDXLZYXESKSPVEWKVSKIE3ECPCA', NULL, '2025-07-10 06:48:04'),
  (16, 'AWS', 'JZ@083284592572', '63XKN3UIMRTQ26TM7RPCQDTB6LBA5H6YISJFT5NSVSDAVNY54HFG6TMTCPELX5PI', NULL, '2025-07-11 06:48:04'),
  (17, 'AWS', 'JZ@844277662901', '2KPG26LYTH22L45RG57QXPAMIHVIQK6QS43CQ72RKRCJJZBKIG6OGNTD7HCB57MG', NULL, '2025-07-22 06:48:04'),
  (240002, 'AWS', 'JZ-OSS', 'B42DYNEXWHYHXSGXUL42KSPJDZPGRNH7', NULL, '2025-10-27 06:48:04');

COMMIT;
SET UNIQUE_CHECKS=1;
SET FOREIGN_KEY_CHECKS=1;
