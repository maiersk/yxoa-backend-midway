-- ----------------------------
-- Records of base_sys_menu
-- ----------------------------
BEGIN;
SELECT SLEEP(3); -- 等待表结构创建完成后再执行（表数据多时候需要修改等候时间）
INSERT INTO `base_sys_menu` VALUES (120, '2021-10-05 06:19:56.000000', '2021-10-06 09:30:06.000000', 45, '日志', '/worklog/', NULL, 1, 'icon-log', 4, 'cool/modules/worklog/views/wlog.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (121, '2021-09-27 01:37:32.000000', '2021-09-28 09:05:22.000000', NULL, '日志管理', NULL, '', 0, 'icon-log', 4, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (122, '2021-09-27 01:37:32.000000', '2021-09-28 09:05:22.000000', 121, '日志列表', '/worklog/admin/wlog', '', 1, 'icon-log', 1, 'cool/modules/worklog/views/admin/wlog.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (123, '2021-10-06 01:39:47.000000', '2021-10-06 09:26:34.000000', 121, '日志分组', '/worklog/admin/category', NULL, 1, 'icon-tag', 0, 'cool/modules/worklog/views/admin/category.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (124, '2021-09-28 09:05:57.717495', '2021-09-28 09:05:57.717495', 122, '添加', NULL, 'worklog:wlog:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (125, '2021-09-28 09:06:18.327435', '2021-09-28 09:06:18.327435', 122, '编辑', NULL, 'worklog:wlog:update', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (126, '2021-09-28 09:06:36.198437', '2021-09-28 09:06:36.198437', 122, '删除', NULL, 'worklog:wlog:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (127, '2021-09-28 09:06:56.059940', '2021-09-28 09:06:56.059940', 122, '查询', NULL, 'worklog:wlog:page,worklog:wlog:list,worklog:wlog:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (128, '2021-10-14 07:46:46.632914', '2021-10-14 07:46:46.632914', 123, '添加日志分组', NULL, 'worklog:category:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (129, '2021-10-14 08:05:56.122137', '2021-10-14 08:05:56.122137', 123, '编辑日志分组', NULL, 'worklog:category:update', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (130, '2021-10-14 08:06:13.466733', '2021-10-14 08:06:13.466733', 123, '删除日志分组', NULL, 'worklog:category:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (131, '2021-10-14 08:06:39.647892', '2021-10-14 08:06:39.647892', 123, '查看日志分组', NULL, 'worklog:category:list,worklog:category:info,worklog:category:page', 2, NULL, 0, NULL, 1, 1);
COMMIT;