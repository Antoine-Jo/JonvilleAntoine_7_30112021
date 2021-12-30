-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `name` varchar(32) NOT NULL,
  `firstname` varchar(32) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `key` varchar(5) DEFAULT NULL,
  `picture` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=269 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (212,'Marion','Chargée de communication','groupomania@groupomania.com','$2b$10$Cw9gDYyLb8Rek.nkoQqPAeQJZ/3RsUYzzXQ8SBEd6lhU2cNkbYT12',1,'mneXq','http://localhost:5000/images/icon.png1640356839456.png'),(245,'Monsieur','Hulk','hulk@hulk.com','$2b$10$d365e1ERMEcx2KKQpCs6FOy7NjxwA9EzE7OhNaMRoLRCTMA65tu3a',0,'eRj0q','http://localhost:5000/images/Hulk.jpg1640356801568.jpg'),(255,'Sparrow','Jack','jack@jack.com','$2b$10$6F7n7JS0oGQaDFy6qDt40uuLxhqISWLXe13jJgNGxLYrltjR6jniq',0,'f2KDF','http://localhost:5000/images/Jack_Sparrow.jpg1640355323681.jpg'),(261,'Docteur','Octopus','octopus@octopus.com','$2b$10$Nqw2VC6o3Lb3.6APPUzgw.bOUh7St2MA9/WT3ifh0kEPLtCVpgOxK',0,'n2T7t','http://localhost:5000/images/octopus.jpg1640356775597.jpg'),(262,'De Riv','Geralt','geralt@geralt.com','$2b$10$AWGMpSiSwlccZsxdsLCYY.qgNpCW3ptPmT.tfEXHtLoBVZ5e9L3nq',0,'eg5yV','http://localhost:5000/images/geralt.jpg1640355269301.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-30 13:12:36
