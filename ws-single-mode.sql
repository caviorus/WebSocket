-- run current query on your database

CREATE TABLE websocket_sessions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    data TEXT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);

CREATE TABLE websocket_channels (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    channel_name VARCHAR(255) NOT NULL,
    channel_type ENUM('private', 'group', 'notification') NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);