-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: edly_db
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `icon_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'Art & Design','PenTool'),(3,'Development','CodeXml'),(4,'Lifestyle','Grid'),(5,'Business & Finance','BriefcaseBusiness'),(6,'Technology','Cpu'),(7,'Data Science','DatabaseZap'),(8,'Health & Fitness','HeartHandshake'),(9,'Marketing & SEO','Megaphone');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) DEFAULT '0.00',
  `course_level` enum('Begginer','Intermediate','Advance') DEFAULT 'Intermediate',
  `duration` varchar(100) DEFAULT NULL,
  `certificate` tinyint(1) DEFAULT '1',
  `language` varchar(100) DEFAULT NULL,
  `access` varchar(100) DEFAULT NULL,
  `instructor_name` varchar(255) NOT NULL,
  `category_id` int DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (7,'Emotional intelligence at work: Learn art and emotions','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque interdum venenatis, volutpat in at volutpat, ut enim. Nisl mauris massa adipiscing ac mauris, habitant ullamcorper. Tempus quis tortor lectus consectetur at suspendisse tortor libero. At blandit a quis tortor and lectus dipiscing volutpat eleifend.',55.00,'Intermediate','7 weeks',1,'English','Lifetime','Smit Jeku',8,'https://res.cloudinary.com/drmapt3ni/image/upload/v1779108208/edly_courses/xgqeafcnbkdbhzfuahvh.webp','2026-05-18 12:43:29'),(8,'Learn how to start an amazon FBA store & analysis','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque interdum venenatis, volutpat in at volutpat, ut enim. Nisl mauris massa adipiscing ac mauris, habitant ullamcorper. Tempus quis tortor lectus consectetur at suspendisse tortor libero. At blandit a quis tortor and lectus dipiscing volutpat eleifend.',20.00,'Intermediate','7 weeks',1,'English','Lifetime','Smit Jeku',9,'https://res.cloudinary.com/drmapt3ni/image/upload/v1779108304/edly_courses/woyzg200xhvnl9c8inbu.webp','2026-05-18 12:45:05'),(9,'Edly Test Course','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque interdum venenatis, volutpat in at volutpat, ut enim. Nisl mauris massa adipiscing ac mauris, habitant ullamcorper. Tempus quis tortor lectus consectetur at suspendisse tortor libero. At blandit a quis tortor and lectus dipiscing volutpat eleifend.',0.00,'Begginer','1 week',1,'English','Lifetime','Smit Jeku',7,'https://res.cloudinary.com/drmapt3ni/image/upload/v1779108992/edly_courses/ma4filjo95hluiq7jr5z.webp','2026-05-18 12:56:33'),(10,'Competitive Strategy law & Organization career','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque interdum venenatis, volutpat in at volutpat, ut enim. Nisl mauris massa adipiscing ac mauris, habitant ullamcorper. Tempus quis tortor lectus consectetur at suspendisse tortor libero. At blandit a quis tortor and lectus dipiscing volutpat eleifend.',45.00,'Advance','12 weeks',1,'English','Lifetime','Smit Jeku',7,'https://res.cloudinary.com/drmapt3ni/image/upload/v1779109114/edly_courses/njqhb57l0ax7enpnws1y.webp','2026-05-18 12:58:34'),(11,'Data Competitive Strategy law & Organization','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque interdum venenatis, volutpat in at volutpat, ut enim. Nisl mauris massa adipiscing ac mauris, habitant ullamcorper. Tempus quis tortor lectus consectetur at suspendisse tortor libero. At blandit a quis tortor and lectus dipiscing volutpat eleifend.',75.00,'Advance','12 weeks',1,'English','Lifetime','Smit Jeku',6,'https://res.cloudinary.com/drmapt3ni/image/upload/v1779109176/edly_courses/w0osanfd7owovaj5wjg1.webp','2026-05-18 12:59:37'),(12,'Cinematography Course: Shoot Better Video','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque interdum venenatis, volutpat in at volutpat, ut enim. Nisl mauris massa adipiscing ac mauris, habitant ullamcorper. Tempus quis tortor lectus consectetur at suspendisse tortor libero. At blandit a quis tortor and lectus dipiscing volutpat eleifend.',0.00,'Intermediate','7 weeks',1,'English','Lifetime','Smit Jeku',6,'https://res.cloudinary.com/drmapt3ni/image/upload/v1779109360/edly_courses/hftqsk2nph4b5i2vpp4l.webp','2026-05-18 13:02:41'),(13,'Digital Skills: Using user testing information to build','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque interdum venenatis, volutpat in at volutpat, ut enim. Nisl mauris massa adipiscing ac mauris, habitant ullamcorper. Tempus quis tortor lectus consectetur at suspendisse tortor libero. At blandit a quis tortor and lectus dipiscing volutpat eleifend.',0.00,'Intermediate','7 weeks',1,'English','Lifetime','Smit Jeku',5,'https://res.cloudinary.com/drmapt3ni/image/upload/v1779109405/edly_courses/x3szhaq5tuoejhxfrpqp.webp','2026-05-18 13:03:26'),(14,'Adobe Lightroom Classic : Photo Editing','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque interdum venenatis, volutpat in at volutpat, ut enim. Nisl mauris massa adipiscing ac mauris, habitant ullamcorper. Tempus quis tortor lectus consectetur at suspendisse tortor libero. At blandit a quis tortor and lectus dipiscing volutpat eleifend.',55.00,'Intermediate','7 weeks',1,'English','Lifetime','Smit Jeku',4,'https://res.cloudinary.com/drmapt3ni/image/upload/v1779109470/edly_courses/yh5vinxlyuahuym0ab1k.webp','2026-05-18 13:04:31'),(15,'SQL-Data Analysis: Crash Course demand career','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque interdum venenatis, volutpat in at volutpat, ut enim. Nisl mauris massa adipiscing ac mauris, habitant ullamcorper. Tempus quis tortor lectus consectetur at suspendisse tortor libero. At blandit a quis tortor and lectus dipiscing volutpat eleifend.',0.00,'Intermediate','5 weeks',1,'English','Lifetime','Smit Jeku',3,'https://res.cloudinary.com/drmapt3ni/image/upload/v1779109531/edly_courses/gscf6mnpl20ptyuiugte.webp','2026-05-18 13:05:32'),(16,'Digital Arts and Reshaping the modern Future','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natoque interdum venenatis, volutpat in at volutpat, ut enim. Nisl mauris massa adipiscing ac mauris, habitant ullamcorper. Tempus quis tortor lectus consectetur at suspendisse tortor libero. At blandit a quis tortor and lectus dipiscing volutpat eleifend.',26.00,'Intermediate','7 weeks',1,'English','Lifetime','Smit Jeku',2,'https://res.cloudinary.com/drmapt3ni/image/upload/v1779109671/edly_courses/wsgvptc3lx4uwgso1ibx.webp','2026-05-18 13:07:52');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollments`
--

DROP TABLE IF EXISTS `enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `enrolled_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollments`
--

LOCK TABLES `enrollments` WRITE;
/*!40000 ALTER TABLE `enrollments` DISABLE KEYS */;
INSERT INTO `enrollments` VALUES (1,2,7,'2026-05-18 13:11:37'),(3,2,15,'2026-05-22 12:02:14'),(5,2,16,'2026-05-22 12:30:39'),(10,2,12,'2026-05-22 12:34:10');
/*!40000 ALTER TABLE `enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','admin') DEFAULT 'student',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin@edly.com','$2b$10$YJ5Aopv8fG/FPtLtl65c0eJ1PKjytfJqJ5v5gKlzPTypDxHMuuh92','admin','2026-05-15 13:05:40'),(2,'test','test@gmail.com','$2b$10$KRADElk8t2x7BNS57r7cN.uubPwVIPWlFxam0L/cMeyWnTaIs8hx6','student','2026-05-15 13:18:15'),(4,'test','test1@gmail.com','$2b$10$Pseb4ZIuZ2zVRC7c/5WZd.NsT1CPyPsF167fHpox1HYAaNQ9JaSoW','student','2026-05-15 13:20:18'),(9,'Random','random@gmail.com','$2b$10$GNmnGf4t3BJAh/zBxrH6CeY9KMRkM7sKJ.mRw.NnEFOOP6hJ.oTCS','student','2026-05-27 06:33:01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'edly_db'
--
/*!50003 DROP PROCEDURE IF EXISTS `sp_AddCategory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_AddCategory`(
    IN p_name VARCHAR(100),
    IN p_icon_name VARCHAR(100)
)
BEGIN
    INSERT INTO categories (name, icon_name) 
    VALUES (p_name, p_icon_name);
    
    SELECT LAST_INSERT_ID() AS categoryId, 'Category created successfully' AS message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_AdminAddCourse` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_AdminAddCourse`(
    IN p_title VARCHAR(255),
    IN p_description TEXT,
    IN p_price DECIMAL(10, 2),
    IN p_course_level ENUM('Begginer','Intermediate','Advance'),
    IN p_duration VARCHAR(100),
    IN p_certificate BOOLEAN,
    IN p_language VARCHAR(100),
    IN p_access VARCHAR(100),
    IN p_instructor_name VARCHAR(255),
    IN p_category_id INT,
    IN p_thumbnail_url VARCHAR(255)
)
BEGIN
    INSERT INTO courses (
        title, description, price, course_level, duration, 
        certificate, language, access, instructor_name, 
        category_id, thumbnail_url
    ) VALUES (
        p_title, p_description, p_price, p_course_level, p_duration, 
        p_certificate, p_language, p_access, p_instructor_name, 
        p_category_id, p_thumbnail_url
    );
    
    SELECT LAST_INSERT_ID() AS courseId, 'Course created successfully' AS message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_AdminDeleteCourse` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_AdminDeleteCourse`(
    IN p_course_id INT
)
BEGIN
    -- Delete dependent enrollments first to maintain referential integrity
    DELETE FROM enrollments WHERE course_id = p_course_id;
    
    -- Delete the course
    DELETE FROM courses WHERE id = p_course_id;
    
    SELECT ROW_COUNT() AS rowsAffected, 'Course deleted successfully' AS message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_AdminGetAllEnrollments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_AdminGetAllEnrollments`()
BEGIN
    SELECT 
        e.id AS enrollment_id,
        e.user_id,
        u.fullname AS student_name,  
        u.email AS student_email,
        e.course_id,
        c.title AS course_title,
        c.price AS course_price,
        c.instructor_name,
        e.enrolled_at
    FROM enrollments e
    JOIN users u ON e.user_id = u.id
    JOIN courses c ON e.course_id = c.id
    ORDER BY e.enrolled_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_DeleteCategory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_DeleteCategory`(
    IN p_id INT
)
BEGIN
    -- Set category_id to NULL for any course attached to this category before deleting it
    UPDATE courses SET category_id = NULL WHERE category_id = p_id;

    DELETE FROM categories WHERE id = p_id;
    
    SELECT ROW_COUNT() AS rowsAffected, 'Category deleted successfully' AS message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetAllCategories` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetAllCategories`()
BEGIN
    SELECT id, name, icon_name FROM categories;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetAllCourses` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetAllCourses`()
BEGIN
    SELECT * FROM courses ORDER BY created_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetCourseById` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetCourseById`(IN p_course_id INT)
BEGIN
    SELECT * FROM courses WHERE id = p_course_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetStudentEnrolledCourses` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetStudentEnrolledCourses`(
    IN p_user_id INT
)
BEGIN
    SELECT 
        c.id AS course_id,
        c.title,
        c.description,
        c.price,
        c.course_level,
        c.duration,
        c.certificate,
        c.language,
        c.access,
        c.instructor_name,
        c.thumbnail_url,
        cat.name AS category_name,
        e.enrolled_at
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    LEFT JOIN categories cat ON c.category_id = cat.id
    WHERE e.user_id = p_user_id
    ORDER BY e.enrolled_at DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_GetUserByEmail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_GetUserByEmail`(
    IN p_email VARCHAR(100)
)
BEGIN
    SELECT id, fullname, email, password, role 
    FROM users 
    WHERE email = p_email;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_RegisterUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_RegisterUser`(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_role ENUM('student', 'admin') 
)
BEGIN
    INSERT INTO users (fullname, email, password, role) 
    VALUES (p_name, p_email, p_password, p_role);

    SELECT LAST_INSERT_ID() AS insertId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_StudentEnrollCourse` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_StudentEnrollCourse`(
    IN p_user_id INT,
    IN p_course_id INT
)
BEGIN
    INSERT INTO enrollments (user_id, course_id) 
    VALUES (p_user_id, p_course_id);
    
    SELECT LAST_INSERT_ID() AS enrollmentId, 'Enrolled successfully' AS message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_StudentUnenrollCourse` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_StudentUnenrollCourse`(
    IN p_user_id INT,
    IN p_course_id INT
)
BEGIN
    DELETE FROM enrollments 
    WHERE user_id = p_user_id AND course_id = p_course_id;
    
    SELECT ROW_COUNT() AS rowsAffected, 'Successfully unenrolled from the course' AS message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_UpdateCategory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_UpdateCategory`(
    IN p_id INT,
    IN p_name VARCHAR(100),
    IN p_icon_name VARCHAR(100)
)
BEGIN
    UPDATE categories 
    SET name = p_name, icon_name = p_icon_name 
    WHERE id = p_id;
    
    SELECT ROW_COUNT() AS rowsAffected, 'Category updated successfully' AS message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-27 15:15:08
