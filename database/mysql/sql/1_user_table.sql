CREATE TABLE `users` (
  `id`        varchar(255) COLLATE utf8mb4_bin NOT NULL ,
  `name`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `is_admin`  boolean      COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;