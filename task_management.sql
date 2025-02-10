-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2025 at 03:15 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_management`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddUser` (IN `p_name` VARCHAR(100), IN `p_email` VARCHAR(100), IN `p_password_hash` VARCHAR(100), IN `p_role` ENUM('admin','user'), IN `p_profile_picture_url` VARCHAR(100), IN `p_phone_number` VARCHAR(15), IN `p_address` TEXT, IN `p_date_of_birth` DATE, IN `p_bio` TEXT, IN `p_company_id` VARCHAR(100))   BEGIN
    DECLARE new_id INT;

    -- Insert the user without a username
    INSERT INTO users (name, email, password_hash, role, profile_picture_url, phone_number, address, date_of_birth, bio, company_id)
    VALUES (p_name, p_email, p_password_hash, p_role, p_profile_picture_url, p_phone_number, p_address, p_date_of_birth, p_bio, p_company_id);

    -- Get the last inserted ID
    SET new_id = LAST_INSERT_ID();

    -- Update the username using the last inserted ID
    UPDATE users
    SET username = CONCAT(p_name, '-', new_id)
    WHERE id = new_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `assignment_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `priority` enum('Low','Medium','High') NOT NULL,
  `deadline` date NOT NULL,
  `assigned_to` varchar(100) NOT NULL,
  `status` enum('To-Do','In-Progress','Completed') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`task_id`, `title`, `description`, `priority`, `deadline`, `assigned_to`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Complete Project Proposal5', 'Draft and finalize the project proposal for the upcoming project3.', 'Low', '2024-12-18', 'Alice Johnson-4', 'Completed', '2024-10-13 15:04:15', '2024-11-27 04:17:15'),
(7, 'dshaaaaaaa', 'sagedfhfjghk', 'High', '2024-10-29', 'Alice Johnson-2', 'Completed', '2024-10-14 09:30:34', '2024-11-27 04:21:55'),
(8, 'xcn', 'sdg', 'Low', '2024-10-05', 'Bob Smith-3', 'Completed', '2024-10-14 09:31:55', '2024-10-14 09:31:55'),
(9, 'sffg', 'sdg', 'Low', '2024-10-11', 'Alice Johnson-2', 'Completed', '2024-10-14 09:34:26', '2024-10-14 09:34:26'),
(10, 'sdh', 'fjdg', 'Low', '2024-10-08', 'Alice Johnson-4', 'To-Do', '2024-10-14 09:38:43', '2024-10-14 09:38:43'),
(11, 'zdsh', 'dgsgh', 'Medium', '2024-10-12', 'Alice Johnson-2', 'In-Progress', '2024-10-14 10:08:23', '2024-10-14 10:08:23'),
(12, 'zdsh', 'dgsgh', 'Medium', '2024-10-12', 'Alice Johnson-2', 'In-Progress', '2024-10-14 10:08:32', '2024-10-14 10:08:32'),
(13, 'ddhsff', 'gjfkdgj', 'Medium', '2024-10-18', 'Bob Smith-3', 'In-Progress', '2024-10-14 10:39:58', '2024-10-14 10:39:58'),
(14, 'xfnd', 'dsh', 'Low', '2024-10-09', 'Alice Johnson-2', 'To-Do', '2024-10-14 10:47:43', '2024-10-14 10:47:43'),
(15, 'dsghs', 'sfhdhh', 'Medium', '2024-10-25', 'Alice Johnson-2', 'Completed', '2024-10-14 10:48:20', '2024-12-03 09:04:33'),
(16, 'dxn', 'dxdngmngjj', 'Low', '2024-11-07', 'Alice Johnson-2', 'In-Progress', '2024-10-14 10:59:51', '2024-10-14 10:59:51'),
(17, 'zdggsh', 'dgs', 'Low', '2024-10-28', 'Alice Johnson-4', 'In-Progress', '2024-10-17 05:50:40', '2024-10-17 05:50:40'),
(18, 'xbfb', 'djt', 'Medium', '2024-10-28', 'Bob Smith-3', 'To-Do', '2024-10-17 05:51:25', '2024-10-17 05:51:25'),
(19, 'dxh', 'dgj', 'Medium', '2024-10-22', 'Bob Smith-3', 'To-Do', '2024-10-17 05:51:50', '2024-10-17 05:51:50'),
(20, 'cg', 'cfn', 'Medium', '2024-10-16', 'Alice Johnson-2', 'To-Do', '2024-10-17 05:52:12', '2024-10-17 05:52:12'),
(21, 'sfh', 'sfh', 'Medium', '2024-10-07', 'Bob Smith-3', 'To-Do', '2024-10-17 05:52:41', '2024-10-17 05:52:41'),
(22, 'bfh', 'xcb', 'Medium', '2024-10-08', 'Bob Smith-3', 'To-Do', '2024-10-17 05:53:23', '2024-10-17 05:53:23'),
(23, 'gkf', 'srht', 'High', '2024-10-06', 'Alice Johnson-2', 'To-Do', '2024-10-17 05:53:57', '2024-10-17 05:53:57'),
(24, 'kt', 'asfseg', 'Medium', '2024-10-08', 'Alice Johnson-4', 'To-Do', '2024-10-17 05:54:14', '2024-10-17 05:54:14'),
(25, 'fdj', 'u', 'Medium', '2024-10-03', 'Alice Johnson-4', 'To-Do', '2024-10-17 06:13:42', '2024-10-17 06:13:42'),
(26, 'sfhssssssssss', 'srh', 'Low', '2024-10-17', 'Bob Smith-3', 'To-Do', '2024-10-20 09:54:44', '2024-10-20 09:55:00'),
(28, 'shfffffffffffffffffffff', 'xnff', 'Low', '2024-12-23', 'Alice Johnson-4', 'To-Do', '2024-12-03 04:03:14', '2024-12-03 04:08:21');

-- --------------------------------------------------------

--
-- Table structure for table `task_priority`
--

CREATE TABLE `task_priority` (
  `priority_id` int(11) NOT NULL,
  `priority_level` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_priority`
--

INSERT INTO `task_priority` (`priority_id`, `priority_level`) VALUES
(1, 'Low'),
(2, 'Medium'),
(3, 'High');

-- --------------------------------------------------------

--
-- Table structure for table `task_status`
--

CREATE TABLE `task_status` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `task_status`
--

INSERT INTO `task_status` (`status_id`, `status_name`) VALUES
(1, 'To-Do'),
(2, 'In-Progress'),
(3, 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password_hash` varchar(100) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `profile_picture_url` varchar(100) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `company_id` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password_hash`, `role`, `profile_picture_url`, `phone_number`, `address`, `date_of_birth`, `bio`, `company_id`, `created_at`, `updated_at`) VALUES
(2, 'Alice Johnson', 'alice.johnson@company.com', 'Alice Johnson-2', 'hashed_password_1', 'admin', 'https://example.com/alice.jpg', '1234567890', '123 Main St, City, Country', '1990-05-15', 'Head of Operations', 'COMP001', '2024-10-13 07:21:00', '2024-10-13 07:21:00'),
(3, 'Bob Smith', 'bob.smith@company.com', 'Bob Smith-3', 'hashed_password_2', 'user', 'https://example.com/bob.jpg', '0987654321', '456 Elm St, City, Country', '1985-08-22', 'Project Manager', 'COMP002', '2024-10-13 07:22:49', '2024-10-13 07:22:49'),
(4, 'Alice Johnson', 'charlie.brown@company.com', 'Alice Johnson-4', 'hashed_password_3', 'user', 'https://example.com/charlie.jpg', '5678901234', '789 Pine St, City, Country', '1992-12-30', 'Software Engineer', 'COMP003', '2024-10-13 07:22:49', '2024-10-13 07:22:49'),
(5, 'dsgbd', 'vj@gmail.com', 'admin', '$2y$10$s3wZM/18FVZeiSlIJEfGZelf6XzB38Q98Xl8bG9A.A9ymeL80/gJG', 'admin', 'uploads/profile_pics/1733200754_undraw_undraw_undraw_undraw_sign_up_ln1s_-1-_s4bc_-1-_ee41_(1)_kf4d.', '43585496', 'asdghjet', '2024-12-18', 'egrg', '347', '2024-12-03 04:39:14', '2024-12-03 04:39:14'),
(6, 'g', 'vk@gmail.com', 'vj', '$2y$10$fPDER235AhZBepUTQIGKLOhVrngwkyU67NeiDt4oOOJhJ9zo1sVDe', 'user', 'uploads/profile_pics/1733223277_undraw_undraw_undraw_undraw_sign_up_ln1s_-1-_s4bc_-1-_ee41_(1)_kf4d.', '3264758', 'dshjd', '2024-12-25', 'dfjyk', '659556', '2024-12-03 04:41:50', '2024-12-03 10:54:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`task_id`);

--
-- Indexes for table `task_priority`
--
ALTER TABLE `task_priority`
  ADD PRIMARY KEY (`priority_id`);

--
-- Indexes for table `task_status`
--
ALTER TABLE `task_status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `company_id` (`company_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `task_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `task_priority`
--
ALTER TABLE `task_priority`
  MODIFY `priority_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `task_status`
--
ALTER TABLE `task_status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `assignments_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
