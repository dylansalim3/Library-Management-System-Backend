
INSERT INTO `genre` (`id`, `name`) VALUES
(1, 'mystery'),
(2, 'fantasy'),
(3,'thriller'),
(4,'Horror'),
(5,'Romance');

INSERT INTO `author` (`id`, `name`) VALUES
(1, 'Simon Sinek'),
(2, 'Stephen Edwin King');

INSERT INTO `book_detail` (`id`, `isbn`, `title`, `datepublished`, `publisher`, `type`, `e_book`, `category_id`, `genre_id`, `location`, `bookimg`, `summary`,`status`, `created`) VALUES
(1, 'ss', 'ss', '2020-05-01', 's2', 'physical', NULL, 2, 2, 'swq', 'uploads/1589162180832developmentprocess.jpg', 'sqwsq', 'AVAILABLE', '2020-05-11'),
(2, 'isbn', 'book title', '2020-05-03', 'publisher name', 'physical', NULL, 3, 1, 'location 1', 'uploads/1589162366744Turquoise Monster Cute Desktop Wallpaper.png', 'this is the summary', 'AVAILABLE', '2020-05-11');

INSERT INTO `book` (`id`,`status`,`created`,`book_detail_id`) values 
(1,'AVAILABLE','2020-05-11',2), (2,'AVAILABLE','2020-05-11',2),(3,'AVAILABLE','2020-05-12',2);

INSERT INTO `book_author` (`id`, `book_detail_id`, `author_id`) VALUES (1, 2, 2);



INSERT INTO `role` (`id`, `role`) VALUES
(1, 'admin'),
(2, 'student'),
(3, 'librarian'),
(4, 'teacher');

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'textbook'),
(2, 'magazine'),
(3, 'comic'),
(4, 'article');


-- INSERT INTO `user_role` (`id`, `user_id`, `role_id`) VALUES
-- (1, 1, 1),
-- (2, 1, 2),
-- (3, 2, 1),
