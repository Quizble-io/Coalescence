CREATE DATABASE quizit;
USE quizit;

CREATE TABLE Users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(100) NOT NULL, 
    CONSTRAINT unique_name UNIQUE (username),
    CONSTRAINT unique_email UNIQUE (email)
);

CREATE TABLE RefreshTokens (
    id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    valid_until DATE NOT NULL,
    refresh_token TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    UNIQUE (user_id)
);