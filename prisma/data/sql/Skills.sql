-- ----------------------------------------
-- Export of table `Skills`
-- Date: 2026-03-25T14:14:33.881Z
-- Rows: 37
-- ----------------------------------------

SET FOREIGN_KEY_CHECKS=0;
SET UNIQUE_CHECKS=0;
SET AUTOCOMMIT=0;

-- Data for `Skills` (37 rows)
INSERT IGNORE INTO `Skills` (`id`, `name`, `icon`, `url`, `visiable`, `type`, `typeName`, `createdAt`, `updatedAt`, `user`) VALUES
  (1, 'Python', 'Python', 'https://python.org', 0, 'language', '语言', '2024-12-19 14:59:28', '2024-12-19 14:59:28', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (2, 'C', 'C', 'https://www.runoob.com/cprogramming/c-tutorial.html', 0, 'language', '语言', '2024-12-19 14:59:28', '2024-12-19 14:59:28', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (3, 'C++', 'C++', 'https://www.runoob.com/cplusplus/cpp-tutorial.html', 0, 'language', '语言', '2024-12-19 14:59:28', '2024-12-19 14:59:28', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (4, 'Java', 'Java', 'https://www.java.com', 0, 'language', '语言', '2024-12-19 14:59:28', '2024-12-19 14:59:28', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (5, 'PHP', 'Php', 'https://www.php.net', 0, 'language', '语言', '2024-12-19 14:59:28', '2024-12-19 14:59:28', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (6, 'Lua', 'Lua', 'https://www.lua.org', 0, 'language', '语言', '2024-12-19 14:59:28', '2024-12-19 14:59:28', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (7, 'HTML5', 'HTML5', 'https://developer.mozilla.org/zh-CN/docs/Web/HTML', 0, 'language', '语言', '2024-12-19 14:59:28', '2024-12-19 14:59:28', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (8, 'CSS3', 'CSS3', 'https://developer.mozilla.org/zh-CN/docs/Web/CSS', 0, 'language', '语言', '2024-12-19 14:59:28', '2024-12-19 14:59:28', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (9, 'JavaScript', 'JavaScript', 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript', 0, 'language', '语言', '2024-12-19 14:59:28', '2024-12-19 14:59:28', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (10, 'TypeScript', 'TypeScript', 'https://www.typescriptlang.org/', 0, 'language', '语言', '2024-12-19 14:59:28', '2024-12-19 14:59:28', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (11, 'Docker', 'Docker', 'https://www.docker.com', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (12, 'Kubernetes', 'Kubernetes', 'https://kubernetes.io', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (13, 'FastAPI', 'FastAPI', 'https://fastapi.tiangolo.com', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (14, 'React', 'React', 'https://reactjs.org', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (15, 'Spring', 'Spring', 'https://spring.io', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (16, 'NextJS', 'NextJS', 'https://nextjs.org', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (17, 'Vercel', 'Vercel', 'https://vercel.io', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (18, 'NodeJS', 'NodeJS', 'https://nodejs.org', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (19, 'TailwindCSS', 'TailwindCSS', 'https://tailwindcss.com', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (20, 'Terraform', 'Terraform', 'https://www.terraform.io', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (21, 'Grafana', 'Grafana', 'https://grafana.com', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (22, 'Nginx', 'Nginx', 'https://www.nginx.com', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (23, 'Mysql', 'Mysql', 'https://www.mysql.com', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (24, 'Redis', 'Redis', 'https://redis.io', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (25, 'MongoDB', 'MongoDB', 'https://www.mongodb.com', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (26, 'Prometheus', 'Prometheus', 'https://prometheus.io', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (27, 'Tensorflow', 'TensorFlow', 'https://www.tensorflow.org', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (28, 'CI/CD', 'CircleCI', 'https://www.drone.io', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (29, 'Arduino', 'Arduino', 'https://www.arduino.cc', 0, 'technical', '技能', '2024-12-19 14:59:29', '2024-12-19 14:59:29', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (30, 'VS Code', 'VSCode', 'https://code.visualstudio.com', 0, 'software', '软件', '2024-12-19 14:59:30', '2024-12-19 14:59:30', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (31, 'Warp', 'Warp', 'https://warp.dev', 0, 'software', '软件', '2024-12-19 14:59:30', '2024-12-19 14:59:30', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (32, 'Postman', 'Postman', 'https://www.postman.com', 0, 'software', '软件', '2024-12-19 14:59:30', '2024-12-19 14:59:30', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (33, 'Git', 'Git', 'https://git-scm.com', 0, 'software', '软件', '2024-12-19 14:59:30', '2024-12-19 14:59:30', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (34, 'Mqttx', 'Mqttx', 'https://mqttx.app/zh/docs', 0, 'software', '软件', '2024-12-19 14:59:30', '2024-12-19 14:59:30', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (35, 'TIDB', 'TIDB', 'https://tidbcloud.com/enterprise/signin/innev', 0, 'software', '软件', '2024-12-19 14:59:30', '2024-12-19 14:59:30', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (36, 'Huggingface', 'Huggingface', 'https://huggingface.co/innev', 0, 'software', '软件', '2024-12-29 14:59:30', '2024-12-29 14:59:30', 'b376fa9c-0626-4bcb-909c-f5a8a6a38619'),
  (37, 'A2A', 'Google', 'https://google.github.io/A2A', 0, 'software', '软件', '2025-04-14 14:59:30', '2025-04-14 14:59:30', '2025-04-14 14:59:30.731');

COMMIT;
SET UNIQUE_CHECKS=1;
SET FOREIGN_KEY_CHECKS=1;
