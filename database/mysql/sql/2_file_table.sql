CREATE TABLE `files` (
  `id`        varchar(255) COLLATE utf8mb4_bin NOT NULL ,
  `name`      varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_id`   varchar(255)      COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;