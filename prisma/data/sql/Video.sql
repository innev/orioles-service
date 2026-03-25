-- ----------------------------------------
-- Export of table `Video`
-- Date: 2026-03-25T14:21:26.071Z
-- Rows: 2
-- ----------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET AUTOCOMMIT=0;

-- Data for `Video` (2 rows)
INSERT IGNORE INTO `Video` (`id`, `source`, `name`, `cover`, `url`, `visiable`) VALUES
  (1, 'iqiyi', '西游记', '/github/stars', 'https://www.iqiyi.com/v_19rrjaains.html?eventId=9e17f35c378fbbf5ce0fc4d9ef240eff&bstp=3&r_originl=2&e=9e17f35c378fbbf5ce0fc4d9ef240eff&stype=2&bkt=9185_A,9184_A,9391_A,9387_A&rseat=5&r_area=channel_falls&ht=0&c1=2&r_source=54&recArea=channel_falls&vfrmrst=5&bucket=9185_A,9184_A,9391_A,9387_A&vfrmblk=pca_2_waterfall&r=101738201&event_id=9e17f35c378fbbf5ce0fc4d9ef240eff&rank=5&block=pca_2_waterfall&rpage=pcw_dianshiju&position=4&vfrm=pcw_dianshiju', 1),
  (2, 'qq', '黄金大劫案', '/github/stars', 'https://v.qq.com/x/cover/amosl3e5qhrp1hz/u0015x13q20.html?ptag=iqiyi&vfrm=3&vfrmblk=pca_115_site_enlarge&vfrmrst=0', 1);

COMMIT;
SET UNIQUE_CHECKS=1;
SET FOREIGN_KEY_CHECKS=1;
