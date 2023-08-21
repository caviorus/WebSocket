CREATE TABLE `users` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`username` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`password` VARCHAR(255) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_general_ci',
	`email` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`phone` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`verified` TINYINT(4) NOT NULL DEFAULT '0',
	`auth_key` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`access_key` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_general_ci',
	`created` DATETIME NULL DEFAULT NULL,
	`createdby` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`updated` DATETIME NULL DEFAULT NULL,
	`updatedby` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`status` TINYINT(4) NULL DEFAULT '1',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `email` (`email`) USING BTREE,
	UNIQUE INDEX `phone` (`phone`) USING BTREE,
	UNIQUE INDEX `username` (`username`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;


CREATE TABLE `users_app` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`users_id` BIGINT(20) UNSIGNED NULL DEFAULT NULL,
	`app_name` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`app_key` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`created` DATETIME NULL DEFAULT NULL,
	`createdby` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`updated` DATETIME NULL DEFAULT NULL,
	`updatedby` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`status` TINYINT(4) NULL DEFAULT '1',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `users_id` (`users_id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

INSERT INTO `users` (`name`, `username`, `password`, `email`, `phone`, `verified`, `auth_key`, `access_key`, `created`, `updated`) VALUES ('caviorus', 'caviorus', '4b25d9b5aac4bc357de1aa5d4bcfda3e76c1bbd4', 'xlucief@gmail.com', '6289652660352', '1', 'acfe75c1e3751a183560a97d1a120144c3efef39', 'b8609de7b1efde3bc6323fb56474e5115c855052', '2023-03-11 09:38:46', '2023-03-11 09:38:54');
INSERT INTO `users_app` (`users_id`, `app_name`, `app_key`, `created`, `updated`) VALUES ('1', 'testing', '75aea3a98415b4f0b9de741363d6f52866df25b0', '2023-03-11 09:40:36', '2023-03-11 09:40:39');
