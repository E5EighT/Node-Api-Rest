CREATE DATABASE DBProducts;

USE DBProducts;

CREATE TABLE products (
    id INT(11) AUTO_INCREMENT,
    title VARCHAR(255),
    description VARCHAR(255),
    PRIMARY KEY (id)
);

INSERT INTO products (title,description) VALUES ("Portatil Asus","Asus portatil Intel");