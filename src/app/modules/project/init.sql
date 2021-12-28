-- ----------------------------
-- Table structure for project_origin_tree
-- ----------------------------
DROP TABLE IF EXISTS `project_origin_tree`;
CREATE TABLE `project_origin_tree`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `parentId` bigint(20) DEFAULT NULL COMMENT '父目录ID',
  `name` varchar(255) NOT NULL COMMENT '目录名称',
  'docId' bigint(20) DEFAULT NULL COMMENT '文档ID',
  `file` varchar(255) DEFAULT NULL COMMENT '文档地址',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型 0：目录 1：文档 ',
  `orderNum` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `isShow` tinyint(4) NOT NULL DEFAULT '1' COMMENT '父目录名称',
  PRIMARY KEY (`id`),
  KEY `IDX_05e3d6a56604771a6da47ebf8e` (`createTime`),
  KEY `IDX_d5203f18daaf7c3fe0ab34497f` (`updateTime`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of project_origin_tree
-- ----------------------------
BEGIN;
-- INSERT INTO `project_app_tree` VALUES (1, '2021-09-11 11:13:33.000000', '2021-09-11 11:13:33.000000', NULL, 1, '项目文档库', '/')
COMMIT;

-- ----------------------------
-- Records of base_sys_menu
-- ----------------------------
BEGIN;
SELECT SLEEP(3); -- 等待表结构创建完成后再执行（表数据多时候需要修改等候时间）
INSERT INTO `base_sys_menu` VALUES (132, '2021-10-05 06:19:56.000000', '2021-10-06 09:30:06.000000', 45, '工程', '/project/', NULL, 1, 'icon-pending', 4, 'cool/modules/project/views/projectSummary.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (133, '2021-09-27 01:37:32.000000', '2021-09-28 09:05:22.000000', NULL, '工程管理', NULL, '', 0, 'icon-pending', 4, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (134, '2021-09-27 01:37:32.000000', '2021-09-28 09:05:22.000000', 133, '工程列表', '/project/admin/project', '', 1, 'icon-menu', 1, 'cool/modules/project/views/admin/project.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (135, '2021-10-06 01:39:47.000000', '2021-10-06 09:26:34.000000', 133, '工程文档树', '/project/admin/doc', NULL, 1, 'icon-dept', 2, 'cool/modules/project/views/admin/projectdoc_tree.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (135, '2021-10-06 01:39:47.000000', '2021-10-06 09:26:34.000000', 133, '工程文档', '/project/admin/doc', NULL, 1, 'icon-log', 3, 'cool/modules/project/views/admin/doc.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (136, '2021-09-28 09:05:57.717495', '2021-09-28 09:05:57.717495', 122, '添加', NULL, 'project:wlog:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (137, '2021-09-28 09:06:18.327435', '2021-09-28 09:06:18.327435', 122, '编辑', NULL, 'project:wlog:update', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (138, '2021-09-28 09:06:36.198437', '2021-09-28 09:06:36.198437', 122, '删除', NULL, 'project:wlog:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (139, '2021-09-28 09:06:56.059940', '2021-09-28 09:06:56.059940', 122, '查询', NULL, 'project:wlog:page,project:wlog:list,project:wlog:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (140, '2021-10-14 07:46:46.632914', '2021-10-14 07:46:46.632914', 123, '添加文档', NULL, 'project:doc:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (141, '2021-10-14 08:05:56.122137', '2021-10-14 08:05:56.122137', 123, '编辑文档', NULL, 'project:doc:update', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (142, '2021-10-14 08:06:13.466733', '2021-10-14 08:06:13.466733', 123, '删除文档', NULL, 'project:doc:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (143, '2021-10-14 08:06:39.647892', '2021-10-14 08:06:39.647892', 123, '查看文档', NULL, 'project:doc:list,project:doc:info,project:doc:page', 2, NULL, 0, NULL, 1, 1);
COMMIT;