-- --------------------------
-- Table structure for project_app_tree
-- --------------------------
DROP TABLE IF EXISTS `project_app_tree`;
CREATE TABLE `project_app_tree`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `parentId` bigint NOT NULL COMMENT '父目录ID',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `type` tinyint NOT NULL DEFAULT 0 COMMENT '类型 0：目录 1：文档',
  `docId` int NULL DEFAULT NULL COMMENT '文档Id',
  `data` varchar(255) NULL DEFAULT NULL COMMENT '数据',
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
INSERT INTO `project_app_tree` VALUES (1, NULL, '项目文档库', 1, NULL, NULL, '', 1, '2021-09-11 11:13:33.000000', '2021-09-11 11:13:33.000000')
COMMIT;

-- ----------------------------
-- Records of base_sys_menu
-- ----------------------------
BEGIN;
SELECT SLEEP(3); -- 等待表结构创建完成后再执行（表数据多时候需要修改等候时间）
INSERT INTO `base_sys_menu` VALUES (132, '2021-10-05 06:19:56.000000', '2021-10-06 09:30:06.000000', 1, '工程', '/proj', NULL, 1, 'icon-pending', 3, 'cool/modules/project/views/projectsummary.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (133, '2021-10-05 06:19:56.000000', '2021-10-06 09:30:06.000000', 132, '工程详细', '/proj/detail', NULL, 1, 'icon-pending', 1, 'cool/modules/project/views/projectdetail.vue', 1, 0);
INSERT INTO `base_sys_menu` VALUES (170, '2021-12-29 01:36:43.891248', '2021-12-29 01:36:43.891248', 133, '工程详细文档树', NULL, 'project:doctree:prjdoclist,project:doctree:prjdocadd,project:doctree:prjdocdelete,project:doctree:prjdocorder,project:doctree:prjdocupdate', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (171, '2021-12-29 01:36:43.901474', '2021-12-29 01:36:43.901474', 133, '新增项目用户', NULL, 'project:prjuser:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (172, '2021-12-29 01:36:43.901474', '2021-12-29 01:36:43.901474', 133, '删除项目用户', NULL, 'project:prjuser:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (173, '2021-12-29 01:36:43.911118', '2021-12-29 01:36:43.911118', 133, '修改项目用户', NULL, 'project:prjuser:update;project:prjuser:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (174, '2021-12-29 01:36:43.917816', '2021-12-29 01:36:43.917816', 133, '详情项目用户', NULL, 'project:prjuser:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (175, '2021-12-29 01:36:43.922480', '2021-12-29 01:36:43.922480', 133, '全部项目用户', NULL, 'project:prjuser:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (176, '2021-12-29 01:36:43.926439', '2021-12-29 01:36:43.926439', 133, '分页项目用户', NULL, 'project:prjuser:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (134, '2021-09-27 01:37:32.000000', '2021-09-28 09:05:22.000000', NULL, '工程管理', NULL, '', 0, 'icon-pending', 4, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (135, '2021-12-29 01:08:06.625000', '2021-12-29 01:09:42.198000', 134, '工程列表', '/proj/admin/list', NULL, 1, 'icon-menu', 1, 'cool/modules/project/views/admin/project.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (136, '2021-12-29 01:08:06.681550', '2021-12-29 01:08:06.681550', 135, '新增', NULL, 'project:project:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (137, '2021-12-29 01:08:06.686214', '2021-12-29 01:08:06.686214', 135, '删除', NULL, 'project:project:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (138, '2021-12-29 01:08:06.696177', '2021-12-29 01:08:06.696177', 135, '修改', NULL, 'project:project:update;project:project:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (139, '2021-12-29 01:08:06.701365', '2021-12-29 01:08:06.701365', 135, '详情', NULL, 'project:project:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (140, '2021-12-29 01:08:06.707302', '2021-12-29 01:08:06.707302', 135, '全部', NULL, 'project:project:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (141, '2021-12-29 01:08:06.714781', '2021-12-29 01:08:06.714781', 135, '分页', NULL, 'project:project:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (142, '2021-12-29 01:33:45.844000', '2021-12-29 01:37:38.978000', 134, '文档模板树', '/proj/admin/doctree', NULL, 1, 'icon-dept', 2, 'cool/modules/project/views/admin/doctree.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (143, '2021-12-29 01:33:45.916127', '2021-12-29 01:33:45.916127', 142, '新增', NULL, 'project:doctree:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (144, '2021-12-29 01:33:45.925725', '2021-12-29 01:33:45.925725', 142, '删除', NULL, 'project:doctree:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (145, '2021-12-29 01:33:45.940958', '2021-12-29 01:33:45.940958', 142, '修改', NULL, 'project:doctree:update;project:doctree:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (146, '2021-12-29 01:33:45.949304', '2021-12-29 01:33:45.949304', 142, '详情', NULL, 'project:doctree:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (147, '2021-12-29 01:33:45.956058', '2021-12-29 01:33:45.956058', 142, '全部', NULL, 'project:doctree:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (148, '2021-12-29 01:33:45.961888', '2021-12-29 01:33:45.961888', 142, '分页', NULL, 'project:doctree:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (149, '2021-12-29 01:36:43.833000', '2021-12-29 01:37:19.625000', 134, '文档模板', '/proj/admin/doc', NULL, 1, 'icon-log', 3, 'cool/modules/project/views/admin/doc.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (150, '2021-12-29 01:36:43.891248', '2021-12-29 01:36:43.891248', 149, '新增', NULL, 'project:doc:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (151, '2021-12-29 01:36:43.901474', '2021-12-29 01:36:43.901474', 149, '删除', NULL, 'project:doc:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (152, '2021-12-29 01:36:43.911118', '2021-12-29 01:36:43.911118', 149, '修改', NULL, 'project:doc:update;project:doc:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (153, '2021-12-29 01:36:43.917816', '2021-12-29 01:36:43.917816', 149, '详情', NULL, 'project:doc:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (154, '2021-12-29 01:36:43.922480', '2021-12-29 01:36:43.922480', 149, '全部', NULL, 'project:doc:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (155, '2021-12-29 01:36:43.926439', '2021-12-29 01:36:43.926439', 149, '分页', NULL, 'project:doc:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (156, '2021-12-29 01:36:43.833000', '2021-12-29 01:37:19.625000', 134, '各方联系人', '/proj/admin/contact', NULL, 1, 'icon-news', 4, 'cool/modules/project/views/admin/contact.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (157, '2021-12-29 01:36:43.891248', '2021-12-29 01:36:43.891248', 156, '新增', NULL, 'project:contact:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (158, '2021-12-29 01:36:43.901474', '2021-12-29 01:36:43.901474', 156, '删除', NULL, 'project:contact:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (159, '2021-12-29 01:36:43.911118', '2021-12-29 01:36:43.911118', 156, '修改', NULL, 'project:contact:update;project:contact:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (160, '2021-12-29 01:36:43.917816', '2021-12-29 01:36:43.917816', 156, '详情', NULL, 'project:contact:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (161, '2021-12-29 01:36:43.922480', '2021-12-29 01:36:43.922480', 156, '全部', NULL, 'project:contact:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (162, '2021-12-29 01:36:43.926439', '2021-12-29 01:36:43.926439', 156, '分页', NULL, 'project:contact:page', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (163, '2021-12-29 01:36:43.833000', '2021-12-29 01:37:19.625000', 134, '工程设备', '/proj/admin/equipment', NULL, 1, 'icon-tag', 4, 'cool/modules/project/views/admin/equipment.vue', 1, 1);
INSERT INTO `base_sys_menu` VALUES (164, '2021-12-29 01:36:43.891248', '2021-12-29 01:36:43.891248', 163, '新增', NULL, 'project:equipment:add', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (165, '2021-12-29 01:36:43.901474', '2021-12-29 01:36:43.901474', 163, '删除', NULL, 'project:equipment:delete', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (166, '2021-12-29 01:36:43.911118', '2021-12-29 01:36:43.911118', 163, '修改', NULL, 'project:equipment:update;project:equipment:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (167, '2021-12-29 01:36:43.917816', '2021-12-29 01:36:43.917816', 163, '详情', NULL, 'project:equipment:info', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (168, '2021-12-29 01:36:43.922480', '2021-12-29 01:36:43.922480', 163, '全部', NULL, 'project:equipment:list', 2, NULL, 0, NULL, 1, 1);
INSERT INTO `base_sys_menu` VALUES (169, '2021-12-29 01:36:43.926439', '2021-12-29 01:36:43.926439', 163, '分页', NULL, 'project:equipment:page', 2, NULL, 0, NULL, 1, 1);
COMMIT;

-- ----------------------------
-- Records of project_app_contact
-- ----------------------------
BEGIN;
SELECT SLEEP(3);
INSERT INTO `project_app_contact` VALUES (2, '2022-04-19 08:15:12.144000', '2022-04-19 08:15:12.144000', '交换机', '交换机', '新华三', '技术', '王红伟', '19937801632');
INSERT INTO `project_app_contact` VALUES (3, '2022-04-19 08:17:04.751000', '2022-04-19 08:17:04.751000', '交换机', '交换机', '新华三', '技术', '康工', '18137109320');
INSERT INTO `project_app_contact` VALUES (4, '2022-04-19 08:18:54.281000', '2022-04-19 08:18:54.281000', '服务器、平台系统', '服务器、平台系统', '海康威视', '技术', '黄工', '18100193490');
INSERT INTO `project_app_contact` VALUES (5, '2022-04-19 08:19:42.392000', '2022-04-19 08:19:42.392000', '光纤收发器', '光纤收发器', '三旺', '销售', '毛工', '18938099920');
INSERT INTO `project_app_contact` VALUES (6, '2022-04-19 08:20:45.333000', '2022-04-19 08:20:45.333000', 'UPS', 'UPS', '柏亚斯', '销售', '郭工', '15360695022');
INSERT INTO `project_app_contact` VALUES (7, '2022-04-19 08:21:27.976000', '2022-04-19 08:21:27.976000', '智能电箱', '智能电箱', '博科思', '技术', '曾工', '13510927972');
INSERT INTO `project_app_contact` VALUES (8, '2022-04-19 08:22:01.658000', '2022-04-19 08:22:01.658000', '智能电箱', '智能电箱', '博科思', '技术', '唐广华', '15019161115');
INSERT INTO `project_app_contact` VALUES (9, '2022-04-19 08:22:44.655000', '2022-04-19 08:22:44.655000', '灭火控制器', '灭火控制器', '气宇', '销售', '周嘉艳', '18138750119');
INSERT INTO `project_app_contact` VALUES (10, '2022-04-19 08:23:31.236000', '2022-04-19 08:23:31.236000', '承建单位', '承建单位', '盈通', '项目经理', '万林', '13348926248');
INSERT INTO `project_app_contact` VALUES (11, '2022-04-19 08:24:13.047000', '2022-04-19 08:24:13.047000', '承建经理', '承建经理', '盈通', '项目经理', '温川志', '18666516681');
INSERT INTO `project_app_contact` VALUES (12, '2022-04-19 08:24:46.550000', '2022-04-19 08:24:46.550000', '承建单位', '承建单位', '盈通', '负责人', '王熊熊', '13302815968');
INSERT INTO `project_app_contact` VALUES (13, '2022-04-19 08:25:49.988000', '2022-04-19 08:25:49.988000', '监理单位', '监理单位', '中联信', '监理', '罗文锵', '13728533405');
INSERT INTO `project_app_contact` VALUES (14, '2022-04-19 08:26:30.398000', '2022-04-19 08:26:30.398000', '设计单位', '设计单位', '广东电信规划院', '设计', '蔡浩驹', '18929952977');
INSERT INTO `project_app_contact` VALUES (15, '2022-04-19 08:27:02.910000', '2022-04-19 08:27:02.910000', '设计单位', '设计单位', '广东电信规划院', '设计', '罗工', '18929881337');
INSERT INTO `project_app_contact` VALUES (16, '2022-04-19 08:27:40.081000', '2022-04-19 08:27:40.081000', '建设单位', '建设单位', '桂城派出所', '主要对接人', '陈杰铭', '18928578602');
COMMIT;