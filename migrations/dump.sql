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
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
  `author` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `genre_id` (`genre_id`),
  CONSTRAINT `book_detail_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: genre
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `genre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: library_map
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `library_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `floor_name` int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 29 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

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
  (3, 'Stephen Edwin Kingw');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book
# ------------------------------------------------------------

INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (1, 'UNAVAILABLE', '2020-05-11 00:00:00', 2);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (2, 'UNAVAILABLE', '2020-05-11 00:00:00', 2);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (3, 'UNAVAILABLE', '2020-05-12 00:00:00', 2);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (4, 'available', '2020-11-27 12:47:22', 3);
INSERT INTO
  `book` (`id`, `status`, `created`, `book_detail_id`)
VALUES
  (5, 'available', '2020-11-29 14:16:02', 4);

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
  (2, 3, 1);
INSERT INTO
  `book_author` (`id`, `book_detail_id`, `author_id`)
VALUES
  (3, 4, 3);

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
    `created`,
    `author`
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
    'uploads\\1607309809809federico-beccari-eGJg5iRGlg8-unsplash.jpg',
    'this is the summary1211',
    'AVAILABLE',
    '2020-05-11 00:00:00',
    ''
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
    `created`,
    `author`
  )
VALUES
  (
    3,
    '9781405295451',
    'SUPERWEIRDMYST01 DANGER AT DONUT DINER',
    '2020-11-20 00:00:00',
    'EGMONT',
    'digital',
    'uploads\\ebooks\\1606481242042T07 - Layout.pdf',
    1,
    1,
    'location 1',
    'uploads\\1607309826942humphrey-muleba-Zuvf5mxT5fs-unsplash.jpg',
    'Test Item',
    'available',
    '2020-11-27 12:47:22',
    ''
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
    `created`,
    `author`
  )
VALUES
  (
    4,
    '9781405295451',
    'Mathematics 101',
    '2020-11-17 00:00:00',
    'EGMONT',
    'digital',
    'uploads\\ebooks\\1606659362098Book of Vaadin 14.pdf',
    1,
    1,
    'location 1',
    'uploads\\160730983408920901.jpg',
    'asdsa',
    'available',
    '2020-11-29 14:16:02',
    ''
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: book_request
# ------------------------------------------------------------

INSERT INTO
  `book_request` (
    `id`,
    `user_id`,
    `book_id`,
    `type`,
    `status`,
    `reason`,
    `reject_reason`,
    `created`
  )
VALUES
  (
    1,
    2,
    2,
    'EXTEND',
    'ACCEPTED',
    NULL,
    NULL,
    '2020-11-29 16:08:38'
  );
INSERT INTO
  `book_request` (
    `id`,
    `user_id`,
    `book_id`,
    `type`,
    `status`,
    `reason`,
    `reject_reason`,
    `created`
  )
VALUES
  (
    2,
    2,
    1,
    'EXTEND',
    'ACCEPTED',
    NULL,
    NULL,
    '2020-11-29 16:17:05'
  );
INSERT INTO
  `book_request` (
    `id`,
    `user_id`,
    `book_id`,
    `type`,
    `status`,
    `reason`,
    `reject_reason`,
    `created`
  )
VALUES
  (
    3,
    2,
    3,
    'EXTEND',
    'ACCEPTED',
    NULL,
    NULL,
    '2020-12-05 05:13:05'
  );
INSERT INTO
  `book_request` (
    `id`,
    `user_id`,
    `book_id`,
    `type`,
    `status`,
    `reason`,
    `reject_reason`,
    `created`
  )
VALUES
  (
    16,
    2,
    1,
    'EXTEND',
    'REJECTED',
    NULL,
    NULL,
    '2020-12-05 09:14:36'
  );
INSERT INTO
  `book_request` (
    `id`,
    `user_id`,
    `book_id`,
    `type`,
    `status`,
    `reason`,
    `reject_reason`,
    `created`
  )
VALUES
  (
    17,
    2,
    1,
    'EXTEND',
    'ACCEPTED',
    NULL,
    NULL,
    '2020-12-05 09:16:52'
  );
INSERT INTO
  `book_request` (
    `id`,
    `user_id`,
    `book_id`,
    `type`,
    `status`,
    `reason`,
    `reject_reason`,
    `created`
  )
VALUES
  (
    25,
    2,
    1,
    'EXTEND',
    'REJECTED',
    NULL,
    'dfse',
    '2020-12-05 10:12:41'
  );
INSERT INTO
  `book_request` (
    `id`,
    `user_id`,
    `book_id`,
    `type`,
    `status`,
    `reason`,
    `reject_reason`,
    `created`
  )
VALUES
  (
    26,
    2,
    3,
    'EXTEND',
    'REJECTED',
    NULL,
    'a',
    '2020-12-05 10:12:41'
  );
INSERT INTO
  `book_request` (
    `id`,
    `user_id`,
    `book_id`,
    `type`,
    `status`,
    `reason`,
    `reject_reason`,
    `created`
  )
VALUES
  (
    27,
    2,
    2,
    'EXTEND',
    'ACCEPTED',
    NULL,
    NULL,
    '2020-12-05 10:12:41'
  );
INSERT INTO
  `book_request` (
    `id`,
    `user_id`,
    `book_id`,
    `type`,
    `status`,
    `reason`,
    `reject_reason`,
    `created`
  )
VALUES
  (
    28,
    2,
    1,
    'EXTEND',
    'PROCESSING',
    NULL,
    NULL,
    '2020-12-07 03:36:26'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: borrow_book
# ------------------------------------------------------------

INSERT INTO
  `borrow_book` (`id`, `book_id`, `start_date`, `due_date`, `user_id`)
VALUES
  (
    2,
    1,
    '2020-11-29 16:10:00',
    '2020-12-10 16:00:00',
    2
  );
INSERT INTO
  `borrow_book` (`id`, `book_id`, `start_date`, `due_date`, `user_id`)
VALUES
  (
    3,
    3,
    '2020-12-05 05:12:00',
    '2020-12-09 16:00:00',
    2
  );
INSERT INTO
  `borrow_book` (`id`, `book_id`, `start_date`, `due_date`, `user_id`)
VALUES
  (
    4,
    2,
    '2020-12-07 07:07:00',
    '2020-12-10 16:00:00',
    2
  );

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
    2,
    '2020-11-27 11:35:00',
    NULL,
    '2020-12-05 07:07:05',
    'RETURNED',
    2,
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
  (5, 'a', NULL);

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
  `library_map` (`id`, `floor_name`, `name`, `image_url`)
VALUES
  (
    2,
    1,
    'Floor 1',
    'uploads/library_map/1607310191622FirstFloor.jpg'
  );
INSERT INTO
  `library_map` (`id`, `floor_name`, `name`, `image_url`)
VALUES
  (
    5,
    3,
    'Floor 3',
    'uploads/library_map/1607310196071SecondFloor.jpg'
  );
INSERT INTO
  `library_map` (`id`, `floor_name`, `name`, `image_url`)
VALUES
  (
    6,
    5,
    'BLOCK B',
    'uploads/library_map/160717101606820901.jpg'
  );

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: notification
# ------------------------------------------------------------

INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    1,
    0,
    'New Book Request is available',
    NULL,
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 05:13:05',
    1,
    2
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    2,
    1,
    'New Book Request is available',
    NULL,
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 05:13:05',
    1,
    3
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    3,
    1,
    'New Book Request is available',
    NULL,
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 05:13:05',
    1,
    4
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    4,
    1,
    'Book Request have been accepted',
    '/borrowhistory',
    'https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png',
    'HIGH',
    '2020-12-05 07:05:25',
    1,
    3
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    5,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 07:19:41',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    6,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 07:19:47',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    7,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 07:22:06',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    8,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 07:25:13',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    9,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 07:25:53',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    10,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 07:27:38',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    11,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 07:27:58',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    12,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 07:29:24',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    13,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 09:07:26',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    14,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 09:09:34',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    15,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 09:09:51',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    16,
    1,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 09:10:10',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    17,
    0,
    'New Book Request is available',
    '/borrowbook/3',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 09:14:36',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    18,
    1,
    'New Book Request is available',
    '/borrowbook/2',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 09:16:52',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    19,
    0,
    'New Book Request is available',
    '/borrowbook/2',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 09:16:53',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    20,
    0,
    'Book Request have been accepted',
    '/borrowhistory',
    'https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png',
    'HIGH',
    '2020-12-05 09:18:09',
    1,
    2
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    21,
    1,
    'New Book Request is available',
    '/borrowbook/2',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 09:53:44',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    22,
    1,
    'New Book Request is available',
    '/borrowbook/2',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 10:03:18',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    23,
    1,
    'New Book Request is available',
    '/borrowbook/2',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 10:05:05',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    24,
    1,
    'New Book Request is available',
    '/borrowbook/2',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 10:06:22',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    25,
    1,
    'New Book Request is available',
    '/borrowbook/2',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-05 10:12:41',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    26,
    0,
    'Book Request have been rejected',
    '/borrowhistory',
    'https://www.pinclipart.com/picdir/middle/249-2495553_icon-failure-clipart.png',
    'HIGH',
    '2020-12-05 10:49:10',
    1,
    2
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    27,
    0,
    'New Book Request is available',
    '/borrowbook/2',
    'https://img.icons8.com/plasticine/2x/resize-diagonal.png',
    'HIGH',
    '2020-12-07 03:36:26',
    1,
    1
  );
INSERT INTO
  `notification` (
    `id`,
    `unread`,
    `title`,
    `url`,
    `thumbnail_url`,
    `priority`,
    `created`,
    `enable_push`,
    `user_id`
  )
VALUES
  (
    28,
    0,
    'Book Request have been accepted',
    '/borrowhistory',
    'https://www.freeiconspng.com/thumbs/success-icon/success-icon-10.png',
    'HIGH',
    '2020-12-07 03:37:03',
    1,
    2
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
# DATA DUMP FOR TABLE: user_role
# ------------------------------------------------------------

INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (1, 1, 1);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (2, 2, 2);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (3, 3, 3);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (6, 4, 4);
INSERT INTO
  `user_role` (`id`, `user_id`, `role_id`)
VALUES
  (8, 6, 2);

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
    'admin@test.com',
    '$2b$10$F5jACVXaC0mPvBE7LOxOneJISIEyMrUWElARgxaGrRk243jwqPeUu',
    '2020-11-27 11:24:43',
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
    'Dylan',
    'Salim',
    'student@test.com',
    '$2b$10$7rnK.pNYOsJbnYNvQsuqJOGS664T5fbACq8WhWWI8Hd2rtFKKZiui',
    '2020-11-27 11:25:00',
    0,
    NULL,
    NULL,
    '\nTaman Balkis, 75250 Melaka.',
    '+60186650165'
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
    'librarian@test.com',
    '$2b$10$GZiaCIB4qBr8TW870tANFuCNC4AEwTFBR3J2Ms/v8LHeJzWuUtdV2',
    '2020-11-27 11:25:12',
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
    'Dylan',
    'Salim',
    'teacher@test.com',
    '$2b$10$b9.obmPQoTIuYx4tzyOyi.KEiZ1unaIxpZCkhnw5aPdONpsfMDCq6',
    '2020-11-27 11:25:21',
    0,
    NULL,
    'uploads\\1606480535218map.jpg',
    '\nTaman Balkis, 75250 Melaka.',
    '+60186650165'
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
    6,
    NULL,
    NULL,
    'dylansalim3@gmail.com',
    NULL,
    '2020-12-07 03:57:12',
    0,
    '$2b$10$VAEBFk7zSohr9t6cmcDVCe8VAThvyXfiiBR.Teru.sG/mNYfXh93W',
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
