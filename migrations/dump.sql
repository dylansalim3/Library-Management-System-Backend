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
) ENGINE = InnoDB AUTO_INCREMENT = 39 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 13 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
  PRIMARY KEY (`id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `book_detail_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: book_request
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `book_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `book_id` int DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `reject_reason` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book_request_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `book_request_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: genre
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `genre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 14 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: library_map
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `library_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `floor` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: notification
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `notification` (
  `id` int NOT NULL AUTO_INCREMENT,
  `unread` tinyint(1) DEFAULT '1',
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `priority` varchar(255) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `enable_push` tinyint(1) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: role
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
  (3, 'x');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (4, 'new auth');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (32, 'auto,dqwdqw,asdwsdqw');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (33, 'ee');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (34, 'dqw');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (35, 'dqe');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (36, 'ebook author, adam');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (37, 'few');
INSERT INTO
  `author` (`id`, `name`)
VALUES
  (38, 'fwe');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book
# ------------------------------------------------------------

INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (4, 'AVAILABLE', '2020-11-26 14:20:22', NULL);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (5, 'available', '2020-11-26 19:08:45', NULL);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (6, 'available', '2020-11-27 01:26:40', NULL);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (7, 'available', '2020-11-27 02:01:09', NULL);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (12, 'available', '2020-11-27 06:04:06', 11);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book_author
# ------------------------------------------------------------

INSERT INTO
  `book_author` (`id`, `book_detail_id`, `author_id`)
VALUES
  (10, 11, 36);
INSERT INTO
  `book_author` (`id`, `book_detail_id`, `author_id`)
VALUES
  (11, 11, 37);
INSERT INTO
  `book_author` (`id`, `book_detail_id`, `author_id`)
VALUES
  (12, 11, 38);

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
    11,
    'IB-21312',
    'My Ebook',
    '2020-10-30 00:00:00',
    'ebook 22',
    'digital',
    'uploads/ebooks/1606457046452T04 - View and ViewGroup.pdf',
    12,
    4,
    'floor 3',
    'uploads/1606457046408bookcover.jpeg',
    'xdxx',
    'available',
    '2020-11-27 06:04:06'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book_request
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: borrow_book
# ------------------------------------------------------------


# ------------------------------------------------------------
# DATA DUMP FOR TABLE: borrow_book_history
# ------------------------------------------------------------

INSERT INTO
  `borrow_book_history` (
    `id`,
    `book_id`,
    `start_date`,
    `due_date`,
    `return_date`,
    `status`,
    `user_id`,
    `overdue`
  )
VALUES
  (
    1,
    4,
    '2020-11-27 14:29:00',
    NULL,
    '2020-11-26 14:30:54',
    'RETURNED',
    3,
    NULL
  );

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
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (5, 'Horror', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (6, 'Sci-fi', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (7, 'x', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (8, 'ok', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (9, 'new cat', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (10, '9.25am', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (11, 'xx', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (12, 'E-scifi', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (13, 'ws', NULL);
INSERT INTO
  `category` (`id`, `name`, `book_detail_id`)
VALUES
  (14, 'grewgg', NULL);

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
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (6, 'Sci-Fi');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (7, 'nice su');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (8, 'yeah');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (9, 'hello');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (10, 'xxxxx');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (11, 'really?');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (12, 'jinja?');
INSERT INTO
  `genre` (`id`, `name`)
VALUES
  (13, '9.25am');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: library_map
# ------------------------------------------------------------

INSERT INTO
  `library_map` (`id`, `floor`, `name`, `image_url`)
VALUES
  (
    7,
    1,
    'A',
    'uploads/library_map/1606660378588thearsonistbook.jpg'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: notification
# ------------------------------------------------------------


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
# DATA DUMP FOR TABLE: user_role
# ------------------------------------------------------------

INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (1, 2, 1);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (2, 3, 2);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (5, 4, 3);

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
    2,
    'yann',
    'ng',
    'admin@test.com',
    '$2b$10$DrQZ4mxrmtFLsXIHFITK9uh1FfbxdSbDv1QhKkAzbzR296U549Eqi',
    '2020-11-26 14:06:08',
    0,
    NULL,
    'uploads/1606657742367book3.png',
    '1home',
    '122'
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
    'lord',
    'ng',
    'student@test.com',
    '$2b$10$w8t0vNl1tT2IPlERYk7myOZYqTJhFah9eC1mHxD0S6lx76nXo1Rdy',
    '2020-11-26 14:07:55',
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
    4,
    'yann',
    'ng',
    'lordtocazwhite@gmail.com',
    '$2b$10$YztKE5FaOg.lisXN.cBllOw8F/QHTKJX0xYynUjU96J9.TaVkVs.q',
    '2020-11-29 13:50:37',
    1,
    '$2b$10$km6kKM6.lRhouQqFfNLmwursgIyFlmCYbUjHLcOoISurW6Is3rqNa',
    'uploads/1606657913502thearsonistbook.jpg',
    'dwqdwqd',
    '0123'
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
