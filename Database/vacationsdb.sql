-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2022 at 08:21 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdb`
--
CREATE DATABASE IF NOT EXISTS `vacationsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdb`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` char(36) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
('d76ab647-8f70-4696-a494-5d56817c9243', 44),
('d76ab647-8f70-4696-a494-5d56817c9243', 45),
('d76ab647-8f70-4696-a494-5d56817c9243', 46),
('d76ab647-8f70-4696-a494-5d56817c9243', 47),
('d76ab647-8f70-4696-a494-5d56817c9243', 50),
('d76ab647-8f70-4696-a494-5d56817c9243', 58),
('df3eb755-b7fb-4263-a1b9-29341b845fff', 45),
('df3eb755-b7fb-4263-a1b9-29341b845fff', 46),
('df3eb755-b7fb-4263-a1b9-29341b845fff', 47),
('df3eb755-b7fb-4263-a1b9-29341b845fff', 50),
('df3eb755-b7fb-4263-a1b9-29341b845fff', 58);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` char(36) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
('26731bf0-b537-4335-a54f-9caddd46cbe2', 'shuki', 'levy', 'shuki1234', '$2b$10$Mn.GYNteTUcIbSH3mWbdTeRLbcbXgHk7KB1X2OHAzJzW9A3iabkJG', 0),
('82ae37bb-4ee5-4e53-8242-dea4f7470700', 'Tai', 'Orbach', 'TAITAI', '$2b$10$Gqsf0jB1IQdMQZQ/dahaYuBHtQ5MGQyr4ThKEr7H6FbJtfp.S6kGy', 1),
('97def9e1-6793-4578-92bd-f4e7a5ee49b2', 'barak', 'barak', 'barak', '$2b$10$0WPh3cXxn8EbHufV3CwgkeWD7kaUcO9tO843Bmt9i692d/zloE15C', 0),
('d76ab647-8f70-4696-a494-5d56817c9243', 'avi', 'cohen', 'avi12', '$2b$10$jpjFPzvKYWRbO9Bk/A5BReKC4YqIjUe2EZ0GjT7ol7xyrCHiywz5S', 0),
('df3eb755-b7fb-4263-a1b9-29341b845fff', 'yarden', 'yarden', 'yarden', '$2b$10$OXAg/sz7KGfMYbO0IO9WTO863X2HNRiNWsUiNgLySlRlYWZAmmHDS', 0);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `destination` varchar(100) NOT NULL,
  `imageName` varchar(500) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `description`, `destination`, `imageName`, `startDate`, `endDate`, `price`) VALUES
(44, 'Restaurants Tour', 'Spain', 'd3045042-b951-4859-9785-4fc847b49f93.jpg', '2022-04-14', '2022-04-21', '600'),
(45, 'Paris', 'France', 'fec1c00e-09c4-4ac8-b565-5b710b55b35e.jpg', '2022-04-19', '2022-04-25', '1000'),
(46, 'Islands Tour!', 'Thailand', '39948fe5-bf07-4a02-b5e3-753ebc403cd2.jpg', '2022-04-08', '2022-05-07', '1000'),
(47, 'London!', 'England', 'e79c2478-0827-497a-aa58-ab0475b0ffb5.jpg', '2022-04-23', '2022-04-30', '900'),
(50, 'Tokyo', 'Japan', 'fcdfa356-831b-4071-9c7b-1d9d02e99b01.jpg', '2022-04-25', '2022-05-07', '1200'),
(58, 'Tel Aviv', 'Israel', '756407ef-5d2b-49bf-aa6d-4395325ae52a.webp', '2022-05-04', '2022-05-07', '1000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`) USING BTREE;

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
