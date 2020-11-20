/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: author
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: book
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `book_detail_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_detail_id` (`book_detail_id`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`book_detail_id`) REFERENCES `book_detail` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: book_author
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `book_author` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_detail_id` int DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `book_author_authorId_book_detail_id_unique` (`book_detail_id`, `author_id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `book_author_ibfk_1` FOREIGN KEY (`book_detail_id`) REFERENCES `book_detail` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `book_author_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: book_detail
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `book_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `isbn` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `datepublished` datetime DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `e_book` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `genre_id` int DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `bookimg` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `book_detail_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: borrow_book
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `borrow_book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `borrow_book_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `borrow_book_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: borrow_book_history
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `borrow_book_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `due_date` datetime DEFAULT NULL,
  `return_date` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `overdue` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `borrow_book_history_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `borrow_book_history_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: category
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `book_detail_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_detail_id` (`book_detail_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`book_detail_id`) REFERENCES `book_detail` (`id`) ON DELETE
  SET
  NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: genre
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `genre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: library_map
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `library_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `floor` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: role
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: sequelizemeta
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8 COLLATE = utf8_unicode_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_role
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_role_role_id_user_id_unique` (`user_id`, `role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 39 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT '0',
  `verification_hash` varchar(255) DEFAULT NULL,
  `profileimg` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phonenum` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB AUTO_INCREMENT = 26 DEFAULT CHARSET = latin1;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: author
# ------------------------------------------------------------

INSERT INTO
  `author` (`id`, `name`)
VALUES
  (1, 'Simon Sinek');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (2, 'Stephen Edwin King');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (3, NULL);
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (4, 'cdsadsscd');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (5, 'Y.C Chow');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book
# ------------------------------------------------------------

INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (1, 'AVAILABLE', '2020-05-11 00:00:00', 2);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (2, 'AVAILABLE', '2020-05-11 00:00:00', 2);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (3, 'AVAILABLE', '2020-05-12 00:00:00', 2);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (4, 'available', '2020-09-12 11:58:57', 3);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (5, 'available', '2020-09-13 14:38:00', 4);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book_author
# ------------------------------------------------------------

INSERT INTO
  `book_author` (`id`, `book_detail_id`, `author_id`)
VALUES
  (1, 2, 2);
INSERT INTO
  `book_author` (`id`, `book_detail_id`, `author_id`)
VALUES
  (2, 2, 3);
INSERT INTO
  `book_author` (`id`, `book_detail_id`, `author_id`)
VALUES
  (4, 3, NULL);
INSERT INTO
  `book_author` (`id`, `book_detail_id`, `author_id`)
VALUES
  (5, 4, 5);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book_detail
# ------------------------------------------------------------

INSERT INTO
  `book_detail` (
    `id`,
    `isbn`,
    `title`,
    `datepublished`,
    `publisher`,
    `type`,
    `e_book`,
    `category_id`,
    `genre_id`,
    `location`,
    `bookimg`,
    `summary`,
    `status`,
    `created`
  )
VALUES
  (
    2,
    'isbn',
    'book title',
    '2020-05-03 00:00:00',
    'publisher name',
    'physical',
    NULL,
    3,
    1,
    'location 1',
    'uploads/1589162366744Turquoise Monster Cute Desktop Wallpaper.png',
    'this is the summary',
    'AVAILABLE',
    '2020-05-11 00:00:00'
  );
INSERT INTO
  `book_detail` (
    `id`,
    `isbn`,
    `title`,
    `datepublished`,
    `publisher`,
    `type`,
    `e_book`,
    `category_id`,
    `genre_id`,
    `location`,
    `bookimg`,
    `summary`,
    `status`,
    `created`
  )
VALUES
  (
    3,
    'dss',
    'effsfvs',
    '2020-09-01 00:00:00',
    'plokij',
    'physical',
    NULL,
    1,
    1,
    'Rack 1',
    NULL,
    'fsdvfdsvfdsvfdsvds',
    'available',
    '2020-09-12 11:58:57'
  );
INSERT INTO
  `book_detail` (
    `id`,
    `isbn`,
    `title`,
    `datepublished`,
    `publisher`,
    `type`,
    `e_book`,
    `category_id`,
    `genre_id`,
    `location`,
    `bookimg`,
    `summary`,
    `status`,
    `created`
  )
VALUES
  (
    4,
    '138729473298',
    'GS 24: FIELD TRIP TO NIAGARA FALLS',
    '2020-09-03 00:00:00',
    'SCHOLASTIC',
    'physical',
    NULL,
    1,
    1,
    'Rack 2A',
    NULL,
    'fewfefewfw',
    'available',
    '2020-09-13 14:38:00'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: borrow_book
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: borrow_book_history
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: category
# ------------------------------------------------------------

INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (1, 'textbook', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (2, 'magazine', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (3, 'comic', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (4, 'article', NULL);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: genre
# ------------------------------------------------------------

INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (1, 'mystery');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (2, 'fantasy');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (3, 'thriller');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (4, 'Horror');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (5, 'Romance');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: library_map
# ------------------------------------------------------------

INSERT INTO
  `library_map` (`id`, `floor`, `name`, `image_url`)
VALUES
  (
    2,
    1,
    'Block A',
    'uploads/library_map/1600188158336Screenshot from 2020-09-08 23-37-44.png'
  );
INSERT INTO
  `library_map` (`id`, `floor`, `name`, `image_url`)
VALUES
  (
    5,
    1,
    'Block B',
    'uploads/library_map/1600274007499Screenshot-from 2020-09-13 23-00-31.png'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: role
# ------------------------------------------------------------

INSERT INTO
  `role` (`id`, `role`)
VALUES
  (1, 'admin');
INSERT INTO
  `role` (`id`, `role`)
VALUES
  (2, 'student');
INSERT INTO
  `role` (`id`, `role`)
VALUES
  (3, 'librarian');
INSERT INTO
  `role` (`id`, `role`)
VALUES
  (4, 'teacher');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: sequelizemeta
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: user_role
# ------------------------------------------------------------

INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (7, 1, 2);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (33, 1, 3);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (8, 2, 1);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (9, 3, 2);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (32, 3, 3);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (12, 7, 3);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (17, 12, 2);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (34, 12, 3);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (35, 24, 2);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (38, 24, 3);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (30, 25, 4);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `password`,
    `created`,
    `active`,
    `verification_hash`,
    `profileimg`,
    `address`,
    `phonenum`
  )
VALUES
  (
    1,
    'dylan',
    'salim',
    'dylansalim7@gmail.com',
    '$2b$10$Yn5JxzSDu5/4JGJSnFoS0uCIP7LohmriGBxFq2cit78SeIO.BvvXO',
    '2020-09-12 09:44:39',
    0,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `password`,
    `created`,
    `active`,
    `verification_hash`,
    `profileimg`,
    `address`,
    `phonenum`
  )
VALUES
  (
    2,
    'dylan',
    'salim',
    'dylansalim3@gmail.com',
    '$2b$10$At.1xYEM8BExLDx0Vg/V6ewQXm5F9OIEylO8SvrhuWJsyzVXsU8LC',
    '2020-09-12 09:59:49',
    0,
    NULL,
    NULL,
    NULL,
    '74'
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `password`,
    `created`,
    `active`,
    `verification_hash`,
    `profileimg`,
    `address`,
    `phonenum`
  )
VALUES
  (
    3,
    'dylan',
    'salim',
    'dylansalim1@gmail.com',
    '$2b$10$BG4syFwTrezEFxCIuEKK8uA4miykzV4iyhqzhkdz/FiE1BEqVkYUu',
    '2020-09-12 13:15:21',
    0,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `password`,
    `created`,
    `active`,
    `verification_hash`,
    `profileimg`,
    `address`,
    `phonenum`
  )
VALUES
  (
    7,
    'Dylan',
    'Salim',
    'healthinsider10@gmail.com',
    '$2b$10$Zzdcsh7TEvy5zn/0qaSqXOlaga7ZVcNU2oG5RNR1p.ZFFofX/9NZi',
    '2020-09-13 08:26:14',
    1,
    '',
    'uploads/1599987204446Screenshot from 2020-09-12 22-41-26.png',
    'fdewfwewf',
    '0186650165'
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `password`,
    `created`,
    `active`,
    `verification_hash`,
    `profileimg`,
    `address`,
    `phonenum`
  )
VALUES
  (
    12,
    'dylan',
    'salim',
    'dylansalim4@gmail.com',
    '$2b$10$ubOleZeo8wsBjiXgWLtsFOfnzSM4Z2kCZD6tY2ABMfqk/kIfumicS',
    '2020-09-13 10:04:07',
    0,
    NULL,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `password`,
    `created`,
    `active`,
    `verification_hash`,
    `profileimg`,
    `address`,
    `phonenum`
  )
VALUES
  (
    24,
    NULL,
    NULL,
    'dylansalim015@gmail.com',
    NULL,
    '2020-09-13 14:06:40',
    0,
    '$2b$10$JznKwLOvYUamXYeKiaJ7Ru90impKb.N4JbNrVK1BGKqElWf6L3SXG',
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `users` (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `password`,
    `created`,
    `active`,
    `verification_hash`,
    `profileimg`,
    `address`,
    `phonenum`
  )
VALUES
  (
    25,
    NULL,
    NULL,
    'dylansalim003@gmail.com',
    NULL,
    '2020-09-13 14:06:40',
    0,
    '$2b$10$fe.5wC98GCu22Z1wjWYu2OQvupiYzB.1F8wppqeeMnitD82txiaOG',
    NULL,
    NULL,
    NULL
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
