----------------------------
-- Table structure for project_app_tree
----------------------------
DROP TABLE IF EXISTS `project_app_tree`;
CREATE TABLE `project_app_tree`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `parentId` bigint NOT NULL COMMENT '父目录ID',
  `name` varchar(255) NOT NULL COMMENT '项目名称',
  `docId` int NULL DEFAULT NULL COMMENT '文档Id',
  `docData` varchar(255) NULL DEFAULT NULL COMMENT '文档数据',
  `docCount` int NULL DEFAULT NULL COMMENT '文档数量',
  `type` tinyint NOT NULL DEFAULT 0 COMMENT '类型 0：目录 1：文档',
  `remark` varchar(255) NULL DEFAULT '' COMMENT '备注',
  `orderNum` int(11) NOT NULL COMMENT '排序',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_4511e666b869bb94598b58d2fe`(`createTime`) USING BTREE,
  INDEX `IDX_9aec39ace16a95f87ddb9a2f92`(`updateTime`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of project_app_tree
-- ----------------------------
BEGIN;
INSERT INTO `project_app_tree` VALUES (1, NULL, '项目文档库', NULL, NULL, NULL, 0, '', 1, '2021-09-11 11:13:33.000000', '2021-09-11 11:13:33.000000')
INSERT INTO `project_app_tree` VALUES (1, NULL, '开工', NULL, NULL, NULL, 0, '', 1, '2021-09-11 11:13:33.000000', '2021-09-11 11:13:33.000000')
COMMIT;

-- ----------------------------
-- Records of base_sys_menu
-- ----------------------------
BEGIN;
SELECT SLEEP(3); -- 等待表结构创建完成后再执行（表数据多时候需要修改等候时间）
INSERT INTO `base_sys_menu` VALUES (132, '2021-10-05 06:19:56.000000', '2021-10-06 09:30:06.000000', 45, '工程', '/project/', NULL, 1, 'icon-pending', 3, 'cool/modules/project/views/projectsummary.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (133, '2021-10-05 06:19:56.000000', '2021-10-06 09:30:06.000000', 132, '工程详细', '/project/detail', NULL, 1, 'icon-pending', 1, 'cool/modules/project/views/projectdetail.vue', 1, 0);
INSERT INTO `base_sys_menu` VALUES (134, '2021-09-27 01:37:32.000000', '2021-09-28 09:05:22.000000', NULL, '工程管理', NULL, '', 0, 'icon-pending', 4, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (135, '2021-12-29 01:08:06.625000', '2021-12-29 01:09:42.198000', 134, '工程列表', '/project/admin/project', NULL, 1, 'icon-menu', 1, 'cool/modules/project/views/admin/project.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (136, '2021-12-29 01:08:06.681550', '2021-12-29 01:08:06.681550', 135, '新增', NULL, 'project:project:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (137, '2021-12-29 01:08:06.686214', '2021-12-29 01:08:06.686214', 135, '删除', NULL, 'project:project:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (138, '2021-12-29 01:08:06.696177', '2021-12-29 01:08:06.696177', 135, '修改', NULL, 'project:project:update;project:project:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (139, '2021-12-29 01:08:06.701365', '2021-12-29 01:08:06.701365', 135, '详情', NULL, 'project:project:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (140, '2021-12-29 01:08:06.707302', '2021-12-29 01:08:06.707302', 135, '全部', NULL, 'project:project:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (141, '2021-12-29 01:08:06.714781', '2021-12-29 01:08:06.714781', 135, '分页', NULL, 'project:project:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (142, '2021-12-29 01:33:45.844000', '2021-12-29 01:37:38.978000', 134, '文档模板树', '/project/admin/docTree', NULL, 1, 'icon-dept', 2, 'cool/modules/project/views/admin/doctree.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (143, '2021-12-29 01:33:45.916127', '2021-12-29 01:33:45.916127', 142, '新增', NULL, 'project:docTree:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (144, '2021-12-29 01:33:45.925725', '2021-12-29 01:33:45.925725', 142, '删除', NULL, 'project:docTree:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (145, '2021-12-29 01:33:45.940958', '2021-12-29 01:33:45.940958', 142, '修改', NULL, 'project:docTree:update;project:doctree:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (146, '2021-12-29 01:33:45.949304', '2021-12-29 01:33:45.949304', 142, '详情', NULL, 'project:docTree:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (147, '2021-12-29 01:33:45.956058', '2021-12-29 01:33:45.956058', 142, '全部', NULL, 'project:docTree:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (148, '2021-12-29 01:33:45.961888', '2021-12-29 01:33:45.961888', 142, '分页', NULL, 'project:docTree:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (149, '2021-12-29 01:36:43.833000', '2021-12-29 01:37:19.625000', 134, '文档模板', '/project/admin/doc', NULL, 1, 'icon-log', 3, 'cool/modules/project/views/admin/doc.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (150, '2021-12-29 01:36:43.891248', '2021-12-29 01:36:43.891248', 149, '新增', NULL, 'project:doc:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (151, '2021-12-29 01:36:43.901474', '2021-12-29 01:36:43.901474', 149, '删除', NULL, 'project:doc:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (152, '2021-12-29 01:36:43.911118', '2021-12-29 01:36:43.911118', 149, '修改', NULL, 'project:doc:update;project:doc:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (153, '2021-12-29 01:36:43.917816', '2021-12-29 01:36:43.917816', 149, '详情', NULL, 'project:doc:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (154, '2021-12-29 01:36:43.922480', '2021-12-29 01:36:43.922480', 149, '全部', NULL, 'project:doc:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (155, '2021-12-29 01:36:43.926439', '2021-12-29 01:36:43.926439', 149, '分页', NULL, 'project:doc:page', 2, NULL, 0, NULL, 1, 1);
COMMIT;