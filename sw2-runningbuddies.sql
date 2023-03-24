-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Oct 30, 2022 at 09:54 AM
-- Server version: 8.0.24
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sw2-runningbuddies`
--

-- --------------------------------------------------------

--
-- Table structure for table `test_table`
--
-- SQL – Database Creation 
--
CREATE TABLE users (
    user_ID INT PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    user_city VARCHAR(50),
    user_street VARCHAR(50),
    user_age INT,
    user_gender VARCHAR(10),
    user_FitnessLevel VARCHAR(20)
);

--
-- Dumping data for table 'users'
--

INSERT INTO users (user_ID, user_name, user_city, user_street, user_age, user_gender, user_FitnessLevel) 
VALUES 
(1, 'Alice Johnson', 'London', 'Baker Street', 25, 'Female', 'Beginner'),
(2, 'Bob Brown', 'Manchester', 'Oxford Road', 32, 'Male', 'Intermediate'),
(3, 'Charlie Green', 'Liverpool', 'Mathew Street', 47, 'Male', 'Advanced'),
(4, 'Diana Lee', 'Birmingham', 'Broad Street', 41, 'Female', 'Intermediate'),
(5, 'Edward Davis', 'Bristol', 'Park Street', 38, 'Male', 'Beginner');

INSERT INTO users (user_ID, user_name, user_city, user_street, user_age, user_gender, user_FitnessLevel) 
VALUES 
(6, 'Frank Smith', 'London', 'Westminster', 29, 'Male', 'Advanced'),
(7, 'Grace Patel', 'London', 'Kensington High Street', 42, 'Female', 'Intermediate'),
(8, 'Henry Jones', 'London', 'Covent Garden', 37, 'Male', 'Beginner'),
(9, 'Isabel Taylor', 'London', 'Notting Hill Gate', 26, 'Female', 'Intermediate'),
(10, 'Jack Clark', 'London', 'Charing Cross Road', 31, 'Male', 'Advanced');
