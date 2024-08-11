-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           11.3.0-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour tiptop
CREATE DATABASE IF NOT EXISTS `tiptop` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `tiptop`;

-- Listage de la structure de table tiptop. categorie_user
CREATE TABLE IF NOT EXISTS `categorie_user` (
  `idCategorie_user` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`idCategorie_user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table tiptop.categorie_user : ~3 rows (environ)
INSERT INTO `categorie_user` (`idCategorie_user`, `title`) VALUES
	(1, 'admin'),
	(2, 'particulier'),
	(3, 'employe');

-- Listage de la structure de table tiptop. jeu
CREATE TABLE IF NOT EXISTS `jeu` (
  `idJeu` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `nbre_participant` int(11) DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  PRIMARY KEY (`idJeu`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table tiptop.jeu : ~0 rows (environ)
INSERT INTO `jeu` (`idJeu`, `title`, `description`, `nbre_participant`, `date_debut`, `date_fin`) VALUES
	(1, 'jeu_1', 'Caelestis auctor tener acquiro approbo comburo decumbo crebro tonsor ulterius.', 10, '2025-01-15', '2025-01-30'),
	(2, 'jeu_2', 'Assentator canis audio tametsi.', 10, '2025-03-27', '2024-12-10'),
	(3, 'jeu_3', 'Cenaculum sulum tero ullam impedit angustus spoliatio.', 10, '2024-12-21', '2025-02-18'),
	(4, 'jeu_4', 'Voluptatem balbus tracto ea sub arbitro.', 10, '2025-04-18', '2024-11-11'),
	(5, 'jeu_5', 'Numquam perspiciatis ars.', 10, '2025-06-08', '2024-12-01');

-- Listage de la structure de table tiptop. lot
CREATE TABLE IF NOT EXISTS `lot` (
  `idLot` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `idTicket` int(11) DEFAULT NULL,
  PRIMARY KEY (`idLot`),
  KEY `idTicket` (`idTicket`),
  CONSTRAINT `lot_ibfk_1` FOREIGN KEY (`idTicket`) REFERENCES `ticket` (`idTicket`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table tiptop.lot : ~0 rows (environ)
INSERT INTO `lot` (`idLot`, `title`, `idTicket`) VALUES
	(1, 'Infuseur à Thé', 1),
	(2, 'Infuseur à Thé', 51),
	(3, 'Infuseur à Thé', 6),
	(4, 'Coffret D mini', 56),
	(5, 'Infuseur à Thé', 11),
	(6, 'Thé détox', 61),
	(7, 'Thé signature', 16),
	(8, 'Infuseur à Thé', 66),
	(9, 'Infuseur à Thé', 21),
	(10, 'Thé détox', 71),
	(11, 'Infuseur à Thé', 26),
	(12, 'Infuseur à Thé', 76),
	(13, 'Infuseur à Thé', 31),
	(14, 'Infuseur à Thé', 81),
	(15, 'Thé signature', 36),
	(16, 'Thé détox', 86),
	(17, 'Coffret D max', 41),
	(18, 'Thé détox', 91),
	(19, 'Infuseur à Thé', 46),
	(20, 'Infuseur à Thé', 96);

-- Listage de la structure de table tiptop. ticket
CREATE TABLE IF NOT EXISTS `ticket` (
  `idTicket` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `idUser` int(11) DEFAULT NULL,
  `idJeu` int(11) DEFAULT NULL,
  PRIMARY KEY (`idTicket`),
  KEY `idUser` (`idUser`),
  KEY `idJeu` (`idJeu`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`idJeu`) REFERENCES `jeu` (`idJeu`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table tiptop.ticket : ~3 rows (environ)
INSERT INTO `ticket` (`idTicket`, `title`, `idUser`, `idJeu`) VALUES
	(1, 'ticket_1', 1, 1),
	(2, 'ticket_2', 2, 2),
	(3, 'ticket_3', 3, 3),
	(4, 'ticket_4', 4, 4),
	(5, 'ticket_5', 5, 5),
	(6, 'ticket_6', 6, 1),
	(7, 'ticket_7', 7, 2),
	(8, 'ticket_8', 8, 3),
	(9, 'ticket_9', 9, 4),
	(10, 'ticket_10', 10, 5),
	(11, 'ticket_11', 11, 1),
	(12, 'ticket_12', 12, 2),
	(13, 'ticket_13', 13, 3),
	(14, 'ticket_14', 14, 4),
	(15, 'ticket_15', 15, 5),
	(16, 'ticket_16', 16, 1),
	(17, 'ticket_17', 17, 2),
	(18, 'ticket_18', 18, 3),
	(19, 'ticket_19', 19, 4),
	(20, 'ticket_20', 20, 5),
	(21, 'ticket_21', 21, 1),
	(22, 'ticket_22', 22, 2),
	(23, 'ticket_23', 23, 3),
	(24, 'ticket_24', 24, 4),
	(25, 'ticket_25', 25, 5),
	(26, 'ticket_26', 26, 1),
	(27, 'ticket_27', 27, 2),
	(28, 'ticket_28', 28, 3),
	(29, 'ticket_29', 29, 4),
	(30, 'ticket_30', 30, 5),
	(31, 'ticket_31', 31, 1),
	(32, 'ticket_32', 32, 2),
	(33, 'ticket_33', 33, 3),
	(34, 'ticket_34', 34, 4),
	(35, 'ticket_35', 35, 5),
	(36, 'ticket_36', 36, 1),
	(37, 'ticket_37', 37, 2),
	(38, 'ticket_38', 38, 3),
	(39, 'ticket_39', 39, 4),
	(40, 'ticket_40', 40, 5),
	(41, 'ticket_41', 41, 1),
	(42, 'ticket_42', 42, 2),
	(43, 'ticket_43', 43, 3),
	(44, 'ticket_44', 44, 4),
	(45, 'ticket_45', 45, 5),
	(46, 'ticket_46', 46, 1),
	(47, 'ticket_47', 47, 2),
	(48, 'ticket_48', 48, 3),
	(49, 'ticket_49', 49, 4),
	(50, 'ticket_50', 50, 5),
	(51, 'ticket_51', 1, 1),
	(52, 'ticket_52', 2, 2),
	(53, 'ticket_53', 3, 3),
	(54, 'ticket_54', 4, 4),
	(55, 'ticket_55', 5, 5),
	(56, 'ticket_56', 6, 1),
	(57, 'ticket_57', 7, 2),
	(58, 'ticket_58', 8, 3),
	(59, 'ticket_59', 9, 4),
	(60, 'ticket_60', 10, 5),
	(61, 'ticket_61', 11, 1),
	(62, 'ticket_62', 12, 2),
	(63, 'ticket_63', 13, 3),
	(64, 'ticket_64', 14, 4),
	(65, 'ticket_65', 15, 5),
	(66, 'ticket_66', 16, 1),
	(67, 'ticket_67', 17, 2),
	(68, 'ticket_68', 18, 3),
	(69, 'ticket_69', 19, 4),
	(70, 'ticket_70', 20, 5),
	(71, 'ticket_71', 21, 1),
	(72, 'ticket_72', 22, 2),
	(73, 'ticket_73', 23, 3),
	(74, 'ticket_74', 24, 4),
	(75, 'ticket_75', 25, 5),
	(76, 'ticket_76', 26, 1),
	(77, 'ticket_77', 27, 2),
	(78, 'ticket_78', 28, 3),
	(79, 'ticket_79', 29, 4),
	(80, 'ticket_80', 30, 5),
	(81, 'ticket_81', 31, 1),
	(82, 'ticket_82', 32, 2),
	(83, 'ticket_83', 33, 3),
	(84, 'ticket_84', 34, 4),
	(85, 'ticket_85', 35, 5),
	(86, 'ticket_86', 36, 1),
	(87, 'ticket_87', 37, 2),
	(88, 'ticket_88', 38, 3),
	(89, 'ticket_89', 39, 4),
	(90, 'ticket_90', 40, 5),
	(91, 'ticket_91', 41, 1),
	(92, 'ticket_92', 42, 2),
	(93, 'ticket_93', 43, 3),
	(94, 'ticket_94', 44, 4),
	(95, 'ticket_95', 45, 5),
	(96, 'ticket_96', 46, 1),
	(97, 'ticket_97', 47, 2),
	(98, 'ticket_98', 48, 3),
	(99, 'ticket_99', 49, 4),
	(100, 'ticket_100', 50, 5);

-- Listage de la structure de table tiptop. user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `idCategorie_user` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_categorie_user` (`idCategorie_user`),
  CONSTRAINT `fk_user_categorie_user` FOREIGN KEY (`idCategorie_user`) REFERENCES `categorie_user` (`idCategorie_user`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table tiptop.user : ~3 rows (environ)
INSERT INTO `user` (`id`, `email`, `firstname`, `lastname`, `password`, `idCategorie_user`) VALUES
	(1, 'Stephan38@gmail.com', 'Dax', 'Blanda-Streich', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(2, 'Anderson27@gmail.com', 'Justice', 'Hodkiewicz', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(3, 'Ernestina.Terry@yahoo.com', 'Maybelle', 'Mayer', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(4, 'Arvel.Becker@gmail.com', 'Israel', 'Ebert', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(5, 'Halie_Lind@yahoo.com', 'Vernice', 'Mertz-Flatley', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(6, 'Akeem.Beahan51@hotmail.com', 'Cale', 'Barton', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(7, 'Rocky29@yahoo.com', 'Shayna', 'Bartell', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(8, 'Reece.Wilderman@hotmail.com', 'Wava', 'Langosh', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(9, 'Zackary95@gmail.com', 'Patsy', 'Schmitt', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(10, 'Marco.Pacocha@hotmail.com', 'Kaelyn', 'Bergnaum', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(11, 'Ashly9@hotmail.com', 'Nyasia', 'Marquardt', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(12, 'John.Kohler29@yahoo.com', 'Kenneth', 'Robel', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(13, 'Laverne.Brown@yahoo.com', 'Isabella', 'Hills', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(14, 'Gunnar_Haag59@gmail.com', 'Fannie', 'Sanford', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(15, 'Jaqueline43@yahoo.com', 'Clifford', 'Von', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(16, 'Holly_Zboncak70@hotmail.com', 'Elizabeth', 'Ullrich', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(17, 'Alberto_Rath48@gmail.com', 'Jerrold', 'Kihn', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(18, 'Garfield_Ziemann56@gmail.com', 'Jude', 'Gibson', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(19, 'Toby.Braun42@gmail.com', 'Jolie', 'Schulist', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(20, 'Maria_Champlin@hotmail.com', 'Reuben', 'Bode', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(21, 'Alysha79@yahoo.com', 'Breana', 'Doyle', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(22, 'Astrid.Simonis57@gmail.com', 'Ernest', 'Moore', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(23, 'Javonte66@yahoo.com', 'Bud', 'Oberbrunner', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(24, 'Jeanne_Lemke94@gmail.com', 'Abagail', 'Koelpin', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(25, 'Dejon_Reichel86@gmail.com', 'Ludie', 'Leuschke', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(26, 'Dolly_Cummings@hotmail.com', 'Adan', 'Kilback', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(27, 'Ezequiel58@yahoo.com', 'Andreane', 'Cassin', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(28, 'Annie.Ziemann10@hotmail.com', 'Muhammad', 'Weber', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(29, 'Marcella33@hotmail.com', 'Heath', 'Harber', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(30, 'Deanna_Hodkiewicz@gmail.com', 'Kieran', 'Haley', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(31, 'Emilie.Jones2@hotmail.com', 'Brent', 'Bahringer', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(32, 'Dolores_Ankunding@hotmail.com', 'Milo', 'Roob-Vandervort', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(33, 'Mariah_Batz38@yahoo.com', 'Ruth', 'Ortiz', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(34, 'Nakia44@yahoo.com', 'Marjolaine', 'Hermann', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(35, 'Katelyn15@hotmail.com', 'Orlando', 'Hoeger', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(36, 'Ruby57@yahoo.com', 'Shaniya', 'Durgan', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(37, 'Rylan.Graham@yahoo.com', 'Susan', 'Reynolds', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(38, 'Krista_Ruecker@hotmail.com', 'Jennifer', 'Kiehn', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(39, 'Glen_Hand@gmail.com', 'Roscoe', 'Flatley', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(40, 'Sienna68@hotmail.com', 'Kariane', 'Keeling', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(41, 'Graham_McClure46@hotmail.com', 'Vallie', 'Walsh', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(42, 'Albertha_Ebert@yahoo.com', 'Teagan', 'DuBuque', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(43, 'Warren49@hotmail.com', 'Citlalli', 'Waelchi', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(44, 'Kaitlyn25@yahoo.com', 'Zita', 'Cormier', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(45, 'Jefferey.Ruecker@gmail.com', 'Rahsaan', 'Fadel', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(46, 'Ima_Pagac@hotmail.com', 'Kaleigh', 'Trantow', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(47, 'Elna65@gmail.com', 'Casandra', 'O\'Reilly', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(48, 'Ola.Stracke24@yahoo.com', 'Myrtle', 'Rolfson', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(49, 'Glen_Wisoky61@gmail.com', 'Brando', 'Satterfield', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2),
	(50, 'Mercedes43@gmail.com', 'Lilly', 'Schulist', '$2a$10$Bk87b/oscXVkcMLPa1rkFulwPwM1drJwhWvRkSwlYhcenyuzkndN6', 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
