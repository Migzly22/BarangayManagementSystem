-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2023 at 01:36 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bms`
--

-- --------------------------------------------------------

--
-- Table structure for table `barangay_information`
--

CREATE TABLE `barangay_information` (
  `barangay_id` bigint(20) NOT NULL,
  `barangay_email` varchar(255) DEFAULT NULL,
  `barangay_name` varchar(255) DEFAULT NULL,
  `barangay_phone` varchar(255) DEFAULT NULL,
  `current_barangay_captain` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barangay_information`
--

INSERT INTO `barangay_information` (`barangay_id`, `barangay_email`, `barangay_name`, `barangay_phone`, `current_barangay_captain`, `location`) VALUES
(0, 'salinas2@gmail.com', 'Salinas II', '09387171963', 'Juan Dela Cruz', 'salinas 2 bacoor cavite'),
(1, 'salinas2@gmail.com', 'salinas 2', '09387171963', 'Juan Dela Cruz', 'Salinas 2 Bacoor cavite'),
(2, 'salinas4@gmail.com', 'Salinas IV', '0928883737373', 'Salinas IV Captain', 'salinas 4 bacoor cavite'),
(3, 'Salinas 5', 'salinas v ', '0938727473777', 'Mike Enriquez', 'salinas 5 bacoor');

-- --------------------------------------------------------

--
-- Table structure for table `barangay_information_seq`
--

CREATE TABLE `barangay_information_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barangay_information_seq`
--

INSERT INTO `barangay_information_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `barangay_officials`
--

CREATE TABLE `barangay_officials` (
  `official_id` bigint(20) NOT NULL,
  `elected_or_appointed` varchar(255) DEFAULT NULL,
  `end_date` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `resident_id` bigint(20) NOT NULL,
  `start_date` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barangay_officials`
--

INSERT INTO `barangay_officials` (`official_id`, `elected_or_appointed`, `end_date`, `position`, `resident_id`, `start_date`) VALUES
(0, 'elected', '1/1/2024', 'Peace Officer', 0, '5/31/2022'),
(1, 'appointed', '5/23/2025', 'Barangay Captain', 1, '5/23/2023'),
(2, 'appointed', '11/3/2024', 'Secretary', 2, '11/3/2021'),
(3, 'appointed', '11/28/2023', 'Tanod', 3, '1/1/2021'),
(4, 'elected', '7/1/2025', 'sk chairman', 4, '6/2/2023');

-- --------------------------------------------------------

--
-- Table structure for table `barangay_officials_seq`
--

CREATE TABLE `barangay_officials_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `barangay_officials_seq`
--

INSERT INTO `barangay_officials_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `document_id` bigint(20) NOT NULL,
  `date_released` varchar(255) DEFAULT NULL,
  `date_requested` varchar(255) DEFAULT NULL,
  `document_name` varchar(255) DEFAULT NULL,
  `document_type` varchar(255) DEFAULT NULL,
  `resident_id` bigint(20) NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `documents_seq`
--

CREATE TABLE `documents_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `documents_seq`
--

INSERT INTO `documents_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `household_information`
--

CREATE TABLE `household_information` (
  `household_id` bigint(20) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `household_head_id` varchar(255) DEFAULT NULL,
  `streets` varchar(255) DEFAULT NULL,
  `total_residents` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `household_information_seq`
--

CREATE TABLE `household_information_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `household_information_seq`
--

INSERT INTO `household_information_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `incident_report`
--

CREATE TABLE `incident_report` (
  `incident_id` bigint(20) NOT NULL,
  `date_reported` varchar(255) DEFAULT NULL,
  `date_time_occured` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `resident_id` bigint(20) NOT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `incident_report_seq`
--

CREATE TABLE `incident_report_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incident_report_seq`
--

INSERT INTO `incident_report_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `residents`
--

CREATE TABLE `residents` (
  `resident_id` bigint(20) NOT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `household_id` bigint(20) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `residents`
--

INSERT INTO `residents` (`resident_id`, `date_of_birth`, `email`, `first_name`, `gender`, `household_id`, `last_name`, `middle_name`, `phone_number`, `user_id`) VALUES
(0, '12/1/2001', 'ericsoriano@gmail.com', 'Eric Yeoj', 'Male', 0, 'Soriano', 'Horlanda', '09387171963', 0),
(1, '3/1/2000', 'sample@gmail.com', 'Lhieniel', 'Male', 1, 'Ravelo', 'Dela Cruz', '09387171963', 1),
(2, '1/23/2001', 'resident3@gmail.com', 'Rolly', 'male', 2, 'Migrino', 'Lamparas', '095738882662', 2),
(3, '4/12/2000', 'johnrey@gmail.com', 'John Rey', 'bisexual', 0, 'Maloloy-on', 'Monzales', '0947347373888', 4);

-- --------------------------------------------------------

--
-- Table structure for table `residents_seq`
--

CREATE TABLE `residents_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `residents_seq`
--

INSERT INTO `residents_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts`
--

CREATE TABLE `user_accounts` (
  `user_id` bigint(20) NOT NULL,
  `access` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_accounts`
--

INSERT INTO `user_accounts` (`user_id`, `access`, `email`, `password_hash`) VALUES
(0, 'resident', 'yeojsoriano721@gmail.com', '12345'),
(1, 'ADMIN', 'admin@gmail.com', '12345'),
(2, 'RESIDENT', 'resident@gmail.com', '12345'),
(3, 'RESIDENT', 'resident3@gmail.com', '12345'),
(4, 'STAFF', 'staff@gmail.com', '12345'),
(5, 'staff', 'staff3@gmail.com', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `user_accounts_seq`
--

CREATE TABLE `user_accounts_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_accounts_seq`
--

INSERT INTO `user_accounts_seq` (`next_val`) VALUES
(1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `barangay_information`
--
ALTER TABLE `barangay_information`
  ADD PRIMARY KEY (`barangay_id`);

--
-- Indexes for table `barangay_officials`
--
ALTER TABLE `barangay_officials`
  ADD PRIMARY KEY (`official_id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`document_id`);

--
-- Indexes for table `household_information`
--
ALTER TABLE `household_information`
  ADD PRIMARY KEY (`household_id`);

--
-- Indexes for table `incident_report`
--
ALTER TABLE `incident_report`
  ADD PRIMARY KEY (`incident_id`);

--
-- Indexes for table `residents`
--
ALTER TABLE `residents`
  ADD PRIMARY KEY (`resident_id`);

--
-- Indexes for table `user_accounts`
--
ALTER TABLE `user_accounts`
  ADD PRIMARY KEY (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
