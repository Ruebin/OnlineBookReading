/*
Navicat MySQL Data Transfer

Source Server         : my_server
Source Server Version : 50616
Source Host           : 39.106.133.124:3306
Source Database       : reading_online_library

Target Server Type    : MYSQL
Target Server Version : 50616
File Encoding         : 65001

Date: 2020-01-06 04:41:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_name` char(20) NOT NULL,
  `password` char(25) DEFAULT NULL,
  `rank` int(5) DEFAULT NULL,
  PRIMARY KEY (`admin_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('admin', '123', '1');

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `book_id` int(11) NOT NULL,
  `book_name` char(25) NOT NULL,
  `author` char(25) DEFAULT NULL,
  `press` varchar(255) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `belong` varchar(20) DEFAULT NULL,
  `is_public` enum('false','true') DEFAULT NULL,
  `cover_address` varchar(255) DEFAULT NULL,
  `comment_num` int(6) DEFAULT '0',
  `book_address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('1', 'CSS世界', '张鑫旭', '人民邮电出版社', '计算机', '公共', 'true', '/public/publicStorage/cover/cover-1.jpg', '0', '/public/publicStorage/book/book-1.pdf');
INSERT INTO `book` VALUES ('2', '数据库系统概论第5版', '王珊、萨师煊', '高等教育出版社', '计算机', '公共', 'true', '/public/publicStorage/cover/cover-2.jpg', '0', '/public/publicStorage/book/book-2.pdf');
INSERT INTO `book` VALUES ('3', '图解HTTTP', '上野宣', '人民邮电出版社', '计算机', '公共', 'true', '/public/publicStorage/cover/cover-3.jpg', '1', '/public/publicStorage/book/book-3.pdf');
INSERT INTO `book` VALUES ('4', 'ECMAScript 6 入门（第3版）', '阮一峰', '电子工业出版社', '计算机', 'sherlock', 'false', '/public/userStorage/storage-1/cover/cover-4.jpg', '2', '/public/userStorage/storage-1/book/book-4.pdf');
INSERT INTO `book` VALUES ('5', '深入浅出Node.js', '朴灵', '人民邮电出版社', '计算机', 'sherlock', 'false', '/public/publicStorage/cover/cover-5.jpg', '0', '/public/publicStorage/book/book-5.pdf');
INSERT INTO `book` VALUES ('6', 'JavaScript高级程序设计（第3版）', '[美] 尼古拉斯·泽卡斯', '人民邮电出版社', '计算机', '公共', 'true', '/public/publicStorage/cover/cover-6.jpg', '0', '/public/publicStorage/book/book-6.pdf');
INSERT INTO `book` VALUES ('7', 'JavaScript语言精粹', 'Douglas Crockford', '电子工业出版社', '计算机', '公共', 'true', '/public/publicStorage/cover/cover-7.jpg', '0', '/public/publicStorage/book/book-7.pdf');
INSERT INTO `book` VALUES ('8', 'JavaScript权威指南(第6版)', 'David Flanagan', '机械工业出版社', '计算机', '公共', 'true', '/public/publicStorage/cover/cover-8.jpg', '0', '/public/publicStorage/book/book-8.pdf');
INSERT INTO `book` VALUES ('9', '浪潮之巅（第一版）', '吴军', '电子工业出版社', '互联网', '公共', 'true', '/public/publicStorage/cover/cover-9.jpg', '0', '/public/publicStorage/book/book-9.pdf');
INSERT INTO `book` VALUES ('10', '机器学习', '周志华', '清华大学出版社', '计算机', 'sherlock', 'true', '/public/publicStorage/cover/cover-10.jpg', '0', '/public/publicStorage/book/book-10.pdf');
INSERT INTO `book` VALUES ('11', '你不知道的JavaScript（上卷）', '[美] Kyle Simpson', '人民邮电出版社', '计算机', '公共', 'true', '/public/publicStorage/cover/cover-11.jpg', '0', '/public/publicStorage/book/book-11.pdf');
INSERT INTO `book` VALUES ('12', '你不知道的JavaScript（中卷）', '[美] Kyle Simpson', '人民邮电出版社', '计算机', '公共', 'true', '/public/publicStorage/cover/cover-12.jpg', '0', '/public/publicStorage/book/book-12.pdf');
INSERT INTO `book` VALUES ('13', '你不知道的JavaScript（下卷）', '[美] Kyle Simpson', '人民邮电出版社', '计算机', '公共', 'true', '/public/publicStorage/cover/cover-13.jpg', '0', '/public/publicStorage/book/book-13.pdf');
INSERT INTO `book` VALUES ('14', 'test3', 'test4', 'test', 'test', '公共', 'true', '/public/publicStorage/cover/cover-14.jpg', '0', '/public/publicStorage/book/book-14.pdf');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `user_name` char(20) NOT NULL,
  `book_id` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `date` char(25) NOT NULL,
  PRIMARY KEY (`user_name`,`book_id`,`date`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `user` (`user_name`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('littlea', '2', '数据库令人头秃', '2020-1-4 20:38:37');
INSERT INTO `comments` VALUES ('sherlock', '1', '这本书讲的很仔细', '2020-1-4 20:27:35');
INSERT INTO `comments` VALUES ('sherlock', '2', '数据库有点难', '2020-1-4 20:28:37');
INSERT INTO `comments` VALUES ('sherlock', '3', '很棒', '2020-1-5 17:44:47');
INSERT INTO `comments` VALUES ('sherlock', '4', '123', '2020-1-5 14:47:58');
INSERT INTO `comments` VALUES ('sherlock', '4', '32132', '2020-1-5 15:29:33');

-- ----------------------------
-- Table structure for notes
-- ----------------------------
DROP TABLE IF EXISTS `notes`;
CREATE TABLE `notes` (
  `user_name` char(20) NOT NULL,
  `book_id` int(11) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `date` char(25) DEFAULT NULL,
  `title` char(35) DEFAULT NULL,
  PRIMARY KEY (`user_name`,`book_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `user` (`user_name`),
  CONSTRAINT `notes_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of notes
-- ----------------------------

-- ----------------------------
-- Table structure for reading_record
-- ----------------------------
DROP TABLE IF EXISTS `reading_record`;
CREATE TABLE `reading_record` (
  `user_name` char(25) NOT NULL DEFAULT '',
  `book_id` int(11) NOT NULL DEFAULT '0',
  `total_reading_duration` int(10) DEFAULT NULL,
  `last_reading_duration` int(10) DEFAULT NULL,
  `current_page` int(8) DEFAULT NULL,
  `reading_state` enum('','reading','finished') DEFAULT NULL,
  `reading_times` int(6) DEFAULT '0',
  PRIMARY KEY (`user_name`,`book_id`),
  KEY `reading_record_ibfk_1` (`user_name`),
  KEY `reading_record_ibfk_2` (`book_id`),
  CONSTRAINT `reading_record_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `user` (`user_name`),
  CONSTRAINT `reading_record_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`book_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of reading_record
-- ----------------------------
INSERT INTO `reading_record` VALUES ('littlea', '2', '320', '50', '28', 'reading', '0');
INSERT INTO `reading_record` VALUES ('sherlock', '1', '30', '40', '40', 'reading', '0');
INSERT INTO `reading_record` VALUES ('sherlock', '2', '100', '30', '10', 'reading', '0');
INSERT INTO `reading_record` VALUES ('sherlock', '3', '60', '20', '8', 'reading', '0');
INSERT INTO `reading_record` VALUES ('sherlock', '4', '0', '0', '10', 'reading', '0');
INSERT INTO `reading_record` VALUES ('sherlock', '5', '0', '0', '10', 'reading', '0');

-- ----------------------------
-- Table structure for storage
-- ----------------------------
DROP TABLE IF EXISTS `storage`;
CREATE TABLE `storage` (
  `storage_id` int(11) NOT NULL AUTO_INCREMENT,
  `size` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `used_size` int(11) DEFAULT NULL,
  PRIMARY KEY (`storage_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of storage
-- ----------------------------
INSERT INTO `storage` VALUES ('1', '1024', '/public/userStorage/storage-1', '212');
INSERT INTO `storage` VALUES ('2', '1024', '/public/userStorage/storage-2', '40');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_name` char(20) NOT NULL,
  `email` char(25) DEFAULT NULL,
  `password` char(25) DEFAULT NULL,
  `sex` enum('女','男') DEFAULT NULL,
  `phone` char(14) DEFAULT NULL,
  `storage_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_name`),
  KEY `storage_id` (`storage_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`storage_id`) REFERENCES `storage` (`storage_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('littlea', '1102318446@qq.com', 'aaa', '男', '15532342222', '2');
INSERT INTO `user` VALUES ('sherlock', 'samuelhsy@163.com', '123', '男', '15522236666', '1');

-- ----------------------------
-- View structure for private_book
-- ----------------------------
DROP VIEW IF EXISTS `private_book`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `private_book` AS select `book`.`book_id` AS `book_id`,`book`.`book_name` AS `book_name`,`book`.`author` AS `author`,`book`.`press` AS `press`,`book`.`type` AS `type`,`book`.`belong` AS `belong`,`book`.`cover_address` AS `cover_address`,`book`.`comment_num` AS `comment_num`,`book`.`book_address` AS `book_address`,`book`.`is_public` AS `is_public` from `book` where (`book`.`belong` <> '公共') ;

-- ----------------------------
-- View structure for public_book
-- ----------------------------
DROP VIEW IF EXISTS `public_book`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `public_book` AS select `book`.`book_id` AS `book_id`,`book`.`book_name` AS `book_name`,`book`.`author` AS `author`,`book`.`press` AS `press`,`book`.`type` AS `type`,`book`.`belong` AS `belong`,`book`.`cover_address` AS `cover_address`,`book`.`comment_num` AS `comment_num`,`book`.`book_address` AS `book_address` from `book` where (`book`.`is_public` = 'true') ;

-- ----------------------------
-- View structure for user_storage
-- ----------------------------
DROP VIEW IF EXISTS `user_storage`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_storage` AS select `user`.`user_name` AS `user_name`,`storage`.`storage_id` AS `storage_id`,`storage`.`size` AS `size`,`storage`.`address` AS `address`,`storage`.`used_size` AS `used_size` from (`user` join `storage` on((`user`.`storage_id` = `storage`.`storage_id`))) ;
DROP TRIGGER IF EXISTS `update_book_comments`;
DELIMITER ;;
CREATE TRIGGER `update_book_comments` AFTER INSERT ON `comments` FOR EACH ROW begin
   update book set comment_num=comment_num+1 where book_id = (new.book_id);
end
;;
DELIMITER ;
