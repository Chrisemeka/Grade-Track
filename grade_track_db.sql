-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Mar 19, 2025 at 06:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grade_track_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `activity_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `activity_type` varchar(50) NOT NULL,
  `activity_title` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `activity_instance`
--

CREATE TABLE `activity_instance` (
  `activity_instance_id` int(11) NOT NULL,
  `activity_id` int(11) NOT NULL,
  `instance_number` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_first_name` varchar(50) NOT NULL,
  `admin_last_name` varchar(50) NOT NULL,
  `admin_password` text NOT NULL,
  `admin_email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_first_name`, `admin_last_name`, `admin_password`, `admin_email`) VALUES
(1, 'Admin', 'Tester', '$2y$10$skSPOUdgjV9TkDMPwqrINOIYPrWjrot2bUgBfCQYNLlodPuC0YBiW', 'administrator@test.com');

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `class_id` int(11) NOT NULL,
  `class_name` varchar(100) NOT NULL,
  `lecturer_id` int(11) NOT NULL,
  `start_date` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `invite_code` varchar(50) NOT NULL,
  `class_description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `class_name`, `lecturer_id`, `start_date`, `end_date`, `created_at`, `updated_at`, `invite_code`, `class_description`) VALUES
(1, 'Testing Class', 1, '2025-03-10', '2025-03-10', '2025-03-10 16:34:19', '2025-03-10 16:34:19', '32534A', NULL),
(2, 'Testing Class2', 1, '2025-03-10', '2025-03-11', '2025-03-10 16:42:04', '2025-03-10 16:42:04', '4F1AE7', NULL),
(3, 'Testing Class3', 1, '2025-03-12', '2025-03-13', '2025-03-10 16:46:39', '2025-03-10 16:46:39', 'F9D223', NULL),
(4, 'Testing Class4', 1, '2025-03-12', '2025-03-13', '2025-03-10 16:54:40', '2025-03-10 16:54:40', '6BE2CF', NULL),
(5, 'Testing Class5', 1, '2025-03-26', '2025-03-22', '2025-03-10 17:05:19', '2025-03-10 17:05:19', '45DC81', NULL),
(6, 'Testing Class6', 1, '2025-03-17', '2025-03-18', '2025-03-10 17:21:52', '2025-03-10 17:21:52', '3F1CB9', NULL),
(7, 'Lecturer 2 class 1', 2, '2025-03-20', '2025-03-21', '2025-03-19 03:54:03', '2025-03-19 03:54:03', '05126D', NULL),
(8, 'lecturer1 testing', 1, '2025-03-20', '2025-03-21', '2025-03-19 04:27:42', '2025-03-19 04:27:42', 'C2A1C6', 'checking an important feature'),
(9, 'ertrytuytrter', 1, '2025-03-20', '2025-03-20', '2025-03-19 04:36:40', '2025-03-19 04:36:40', '6653DA', 'cfdgfuiyutyrter');

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `enrollment_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `enrolled_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lecturer`
--

CREATE TABLE `lecturer` (
  `lecturer_id` int(11) NOT NULL,
  `lecturer_first_name` varchar(50) NOT NULL,
  `lecturer_last_name` varchar(50) NOT NULL,
  `lecturer_email` varchar(50) NOT NULL DEFAULT '',
  `lecturer_password` text NOT NULL,
  `lecturer_department` varchar(50) DEFAULT NULL,
  `lecturer_phone_number` int(11) DEFAULT NULL,
  `lecturer_address` varchar(50) DEFAULT NULL,
  `lecturer_specialization` varchar(50) DEFAULT NULL,
  `lecturer_bio` text DEFAULT NULL,
  `lecturer_position` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lecturer`
--

INSERT INTO `lecturer` (`lecturer_id`, `lecturer_first_name`, `lecturer_last_name`, `lecturer_email`, `lecturer_password`, `lecturer_department`, `lecturer_phone_number`, `lecturer_address`, `lecturer_specialization`, `lecturer_bio`, `lecturer_position`) VALUES
(1, 'Lecturer', 'Tester', 'lecturer@test.com', '$2y$10$WBMKTyZ7d8fkIs3B7TV4d.YI1fbaorg1apm99/Tg1GbESwh.nz/Di', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Lecturer2', 'Tester', 'lecturer2@test.com', '$2y$10$AQNC8Sf7NR6oKITRcCb9c.T.ZXqHpMGiceCV37aQ0tQat1GfBVX82', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `parent`
--

CREATE TABLE `parent` (
  `parent_id` int(11) NOT NULL,
  `parent_first_name` varchar(50) NOT NULL,
  `parent_last_name` varchar(50) NOT NULL,
  `parent_email` varchar(50) NOT NULL,
  `parent_password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `parent`
--

INSERT INTO `parent` (`parent_id`, `parent_first_name`, `parent_last_name`, `parent_email`, `parent_password`) VALUES
(1, 'Parent', 'Tester', 'parent@test.com', '$2y$10$3dz7bKS/IIdti1XHONHySOD0SHiYJIax8QCY.uAuaGew6ROI914ki');

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `score_id` int(11) NOT NULL,
  `enrollment_id` int(11) NOT NULL,
  `activity_instance_id` int(11) NOT NULL,
  `score` decimal(5,2) NOT NULL,
  `graded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `student_first_name` varchar(50) NOT NULL,
  `student_last_name` varchar(50) NOT NULL,
  `student_email` varchar(50) NOT NULL,
  `student_password` text NOT NULL,
  `matric_number` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_first_name`, `student_last_name`, `student_email`, `student_password`, `matric_number`) VALUES
(1, 'Student', 'Tester', 'student@test.com', '$2y$10$BKmW3/Mswxqd3UjgcSvryOu2Sn79BOyh1I73EsCLPDnFOhb1Ul5Uu', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`activity_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `activity_instance`
--
ALTER TABLE `activity_instance`
  ADD PRIMARY KEY (`activity_instance_id`),
  ADD UNIQUE KEY `uniq_instance` (`activity_id`,`instance_number`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `lecturer_id` (`lecturer_id`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD UNIQUE KEY `uniq_enrollment` (`student_id`,`class_id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `lecturer`
--
ALTER TABLE `lecturer`
  ADD PRIMARY KEY (`lecturer_id`);

--
-- Indexes for table `parent`
--
ALTER TABLE `parent`
  ADD PRIMARY KEY (`parent_id`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`score_id`),
  ADD UNIQUE KEY `uniq_score` (`enrollment_id`,`activity_instance_id`),
  ADD KEY `activity_instance_id` (`activity_instance_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `activity_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `activity_instance`
--
ALTER TABLE `activity_instance`
  MODIFY `activity_instance_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `enrollment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lecturer`
--
ALTER TABLE `lecturer`
  MODIFY `lecturer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `parent`
--
ALTER TABLE `parent`
  MODIFY `parent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `score_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity`
--
ALTER TABLE `activity`
  ADD CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE;

--
-- Constraints for table `activity_instance`
--
ALTER TABLE `activity_instance`
  ADD CONSTRAINT `activity_instance_ibfk_1` FOREIGN KEY (`activity_id`) REFERENCES `activity` (`activity_id`) ON DELETE CASCADE;

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `class_ibfk_1` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturer` (`lecturer_id`) ON DELETE CASCADE;

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE;

--
-- Constraints for table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment` (`enrollment_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `score_ibfk_2` FOREIGN KEY (`activity_instance_id`) REFERENCES `activity_instance` (`activity_instance_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
