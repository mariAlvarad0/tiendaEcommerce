-- CREAMOS LA BASE DE DATOS : 
CREATE DATABASE IF NOT EXISTS ecoomerce; 
-- INICIALIZAMOS:
USE ecommerce; 

-- CREAMOS LAS TABLAS: 
CREATE TABLE `ecommerce`.`orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `ecommerce`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `img` VARCHAR(100) NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `marked` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `ecommerce`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
