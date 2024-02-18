/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50736
Source Host           : localhost:3306
Source Database       : book_serve

Target Server Type    : MYSQL
Target Server Version : 50736
File Encoding         : 65001

Date: 2022-06-01 16:03:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int(11) NOT NULL,
  `user` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES ('1', 'admin', '123456', 'admin');
INSERT INTO `admin_user` VALUES ('2', 'test', '1234561', 'test');

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply` (
  `id` varchar(255) NOT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `user` varchar(255) DEFAULT NULL,
  `bid` varchar(255) DEFAULT NULL,
  `book` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `stateType` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of apply
-- ----------------------------
INSERT INTO `apply` VALUES ('1', '10001', 'root', null, '三国演义', '2022-04-30 03:03:39', '借阅中', '3');
INSERT INTO `apply` VALUES ('3', '10001', 'root', null, '三国演义', '2022-05-02 03:03:00', '待取书', '3');
INSERT INTO `apply` VALUES ('4', '10001', 'root', null, '三国演义', '2022-05-02 03:03:00', '待取书', '3');
INSERT INTO `apply` VALUES ('5', '10001', 'root', null, '三国演义', '2022-05-02 03:03:00', '申请还书', '2');
INSERT INTO `apply` VALUES ('6', '10001', 'root', null, '三国演义', '2022-05-02 03:03:00', '申请还书', '2');
INSERT INTO `apply` VALUES ('7', '10001', 'root', null, '三国演义', '2022-05-02 03:03:00', '申请还书', '2');
INSERT INTO `apply` VALUES ('8', '10001', 'root', null, '三国演义', '2022-05-02 03:03:00', '申请还书', '2');
INSERT INTO `apply` VALUES ('9', '10004', 'root', '2', '三国演义', '2022-05-02 03:03:00', '申请还书', '2');
INSERT INTO `apply` VALUES ('10', '10004', 'root', null, '三国演义', '2022-05-02 03:03:00', '申请借阅', '1');
INSERT INTO `apply` VALUES ('11', '10004', 'root', '6', '三国演义', '2022-05-02 03:03:00', '申请还书', '2');
INSERT INTO `apply` VALUES ('12', '10004', 'root', '5', '三国演义', '2022-05-02 03:03:00', '申请还书', '2');
INSERT INTO `apply` VALUES ('2', '10004', 'root', '3', '三国演义', '2022-05-02 03:03:00', '拒绝借阅申请', '3');
INSERT INTO `apply` VALUES ('1652101469397', '10004', 'test', '1651530180133', '骆驼祥子', '2022-05-09 21:04:29', '待取书', '3');
INSERT INTO `apply` VALUES ('1652101174372', '10004', 'root', '1', '水浒传', '2022-05-09 20:59:34', '待取书', '3');
INSERT INTO `apply` VALUES ('1652102767925', 'abc1', 'root', '1', '水浒传', '2022-05-09 21:26:08', '申请借阅', '1');
INSERT INTO `apply` VALUES ('1652149029545', 'a123', 'test', '1', '水浒传', '2022-05-10 10:17:10', '申请借阅', '1');
INSERT INTO `apply` VALUES ('1652169674113', 'asdasd', 'test', '1', '水浒传', '2022-05-10 16:01:14', '申请借阅', '1');
INSERT INTO `apply` VALUES ('1652169728905', 'asdasd', 'test', '1651437992076', '红楼梦', '2022-05-10 16:02:09', '待取书', '3');
INSERT INTO `apply` VALUES ('1652235310824', 'a123123', 'test', '1', '水浒传', '2022-05-11 10:15:11', '待取书', '3');

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `writer` varchar(255) DEFAULT NULL,
  `sort` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('9', '三国演义', '无', '罗贯中', 'novel', 'E-01');
INSERT INTO `book` VALUES ('8', '三国演义', '无', '罗贯中', 'novel', 'E-01');
INSERT INTO `book` VALUES ('7', '三国演义', '无', '罗贯中', 'novel', 'E-01');
INSERT INTO `book` VALUES ('6', '三国演义', '无', '罗贯中', 'novel', 'E-01');
INSERT INTO `book` VALUES ('5', '三国演义', '无', '罗贯中', 'novel', 'E-01');
INSERT INTO `book` VALUES ('4', '三国演义', '无', '罗贯中111', 'novel', 'A-92');
INSERT INTO `book` VALUES ('1', '水浒传', '1651542005298.png', '罗贯中', 'novel', 'E-01');
INSERT INTO `book` VALUES ('2', '三国演义', '无', '罗贯中', 'novel', 'E-01');
INSERT INTO `book` VALUES ('3', '三国演义', '无', '罗贯中', 'novel', 'E-01');
INSERT INTO `book` VALUES ('1651530180133', '骆驼祥子', '1651530168950.jpeg', '老舍', 'literature', 'C-01');
INSERT INTO `book` VALUES ('1651437992076', '红楼梦', '1651541963641.png', '曹雪芹', 'literature', 'C-22');
INSERT INTO `book` VALUES ('1651438188753', '西游记', '1651542046952.png', '吴承恩', 'novel', 'S-11');
INSERT INTO `book` VALUES ('1651537057195', '南部档案', '1651537034789.png', '南派三叔', 'novel', 'S-01');
INSERT INTO `book` VALUES ('1651537209622', '法医秦明', '1651537192072.png', '秦明', 'novel', 'S-01');
INSERT INTO `book` VALUES ('1651537303077', '破茧成蝶', '1651537266381.png', '李盾', 'novel', 'S-01');
INSERT INTO `book` VALUES ('1651537331217', '背影', '1651537319684.png', '马未都', 'novel', 'S-01');
INSERT INTO `book` VALUES ('1651538007367', '平凡的世界', '1651537992159.png', '路遥', 'novel', 'S-01');
INSERT INTO `book` VALUES ('1652101734063', '123', '1652101723802.jpeg', '123', 'history', 'S-01');
INSERT INTO `book` VALUES ('1652102884027', 'abc', '1652102874806.jpeg', 'abc', 'Technology', 'AA1');
INSERT INTO `book` VALUES ('1652169904243', '321', '1652169893761.jpeg', '312', 'literature', 'S001');

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `container` longtext,
  `date` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES ('1651435560122', '123123', '1231231', '2022-04-29 19:01:35');
INSERT INTO `notice` VALUES ('1651436741467', '五一休假通知', '<p>asdasdaasdas</p>', '2022-05-05 19:01:32');
INSERT INTO `notice` VALUES ('1651436791476', '五一休假通知', '<p><span style=\"background-color: rgb(255, 255, 255);\"><font color=\"#000000\">as</font><font color=\"#4d80bf\" style=\"\">dasdaasdasasdasd</font></span><span style=\"font-size: 14px; background-color: rgb(0, 0, 0);\"></span><span style=\"font-size: 14px; background-color: rgb(77, 128, 191);\"></span></p>', '2022-05-01 19:01:29');
INSERT INTO `notice` VALUES ('1652093648981', '最新通知', '<p>这是最新的通知 2022年5月9日18:54:06</p>', '2022-04-06 19:01:23');
INSERT INTO `notice` VALUES ('1652094075990', '测试通知', '<p>2022年5月9日19:01:14</p>', '2022-05-09 19:01:16');
INSERT INTO `notice` VALUES ('1652094356390', '测试通知', '<p>2022年5月9日19:05:54</p>', '2022-05-09 19:05:56');
INSERT INTO `notice` VALUES ('1652094374552', '测试通知1', '<p>2022年5月9日19:06:13</p>', '2022-05-09 19:06:15');
INSERT INTO `notice` VALUES ('1652094801348', '测试', '<p>2022年5月9日19:13:19</p>', '2022-05-09 19:13:21');
INSERT INTO `notice` VALUES ('1652094842262', '测试2', '<p>2022年5月9日19:13:59</p>', '2022-05-09 19:14:02');
INSERT INTO `notice` VALUES ('1652095232178', '测试2', '<p>2022年5月9日19:20:30</p>', '2022-05-09 19:20:32');
INSERT INTO `notice` VALUES ('1652101772630', '123', '<p>123456<img src=\"http://localhost:5000/1652101771383.jpeg\" contenteditable=\"false\" style=\"font-size: 14px; max-width: 100%;\"/></p>', '2022-05-09 21:09:33');
INSERT INTO `notice` VALUES ('1652103005160', 'abc', '<p>ASD123<img src=\"http://localhost:5000/1652102991549.jpeg\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>', '2022-05-09 21:30:05');
INSERT INTO `notice` VALUES ('1652170057912', 'aaaa', '<p>aaaa<img src=\"http://localhost:5000/1652170056679.jpeg\" contenteditable=\"false\" style=\"font-size: 14px; max-width: 100%;\"/></p>', '2022-05-10 16:07:38');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` varchar(11) NOT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `pic` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('10001', 'sadasdasd', 'root', '1111', '1652169948317.jpeg');
INSERT INTO `user` VALUES ('10002', 'sdajkldkasd', 'root', '1323123123', '无');
INSERT INTO `user` VALUES ('10003', '456456', 'sadasd', 'asdasda', '无');
INSERT INTO `user` VALUES ('10004', '123456', 'root', '', '1651519772144.jpeg');
INSERT INTO `user` VALUES ('10005', '123456', '啦啦啦啦啦啦', '1323123123', '1652149104911.jpeg');
INSERT INTO `user` VALUES ('10006', '123456', 'root', '1323123123', '无');
INSERT INTO `user` VALUES ('10007', '123456', 'root', '1323123123', '无');
INSERT INTO `user` VALUES ('10008', '123456', 'root', '1323123123', '无');
INSERT INTO `user` VALUES ('10009', '123456', 'root', '1323123123', '无');
INSERT INTO `user` VALUES ('10011', 'abcdefg', null, 'phone', null);
INSERT INTO `user` VALUES ('asdas123', 'asdasd2131', null, '19123122356', null);
INSERT INTO `user` VALUES ('a123', 'a123456789', 'test', '19120640981', '1652149012120.jpeg');
INSERT INTO `user` VALUES ('abc1', 'a123456789', 'root', '', '1652102741395.jpeg');
INSERT INTO `user` VALUES ('asdasd', 'a123456789', 'test', '19120640981', '1652169637456.jpeg');
INSERT INTO `user` VALUES ('a123123', 'a123456789', 'test', '19120640981', '1652235283897.jpeg');
