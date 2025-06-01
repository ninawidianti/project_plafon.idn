-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2025 at 09:22 AM
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
-- Database: `web_cafe`
--

-- --------------------------------------------------------

--
-- Table structure for table `cafe`
--

CREATE TABLE `cafe` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `J_Operasional` varchar(100) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `foto_menu` varchar(255) DEFAULT NULL,
  `foto_cafe` varchar(255) DEFAULT NULL,
  `maps` varchar(255) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `whatsapp` varchar(20) DEFAULT NULL,
  `fasilitas` text DEFAULT NULL,
  `kategori` enum('resto','cafe') DEFAULT NULL,
  `kategori_plafon_idn` enum('rekomendasi','non rekomendasi') DEFAULT NULL,
  `detail_menu` varchar(255) DEFAULT NULL,
  `harga` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cafe`
--

INSERT INTO `cafe` (`id`, `name`, `alamat`, `deskripsi`, `J_Operasional`, `rating`, `foto_menu`, `foto_cafe`, `maps`, `instagram`, `whatsapp`, `fasilitas`, `kategori`, `kategori_plafon_idn`, `detail_menu`, `harga`) VALUES
(7, 'malacca kopi', 'Jl. Tan Malaka No.20, Sawahan, Kec. Padang Tim., Kota Padang, Sumatera Barat 25171', ' cafe ini adalah tempat nongkrong dengan nuansa hangat dan estetik yang terletak di pusat Kota Padang. Cafe ini menyuguhkan perpaduan antara konsep rustic dan modern yang nyaman buat siapa pun—baik kamu yang ingin fokus kerja, ngobrol santai, atau sekadar menikmati sore hari dengan secangkir kopi hangat.Di sini, kamu bisa menemukan berbagai pilihan menu mulai dari makanan berat khas Nusantara hingga camilan kekinian. Suasana tenang, alunan musik lo-fi, serta interior dengan pencahayaan temaram menjadikan Warung Senja tempat ideal untuk melepaskan penat atau mencari inspirasi.', '09.00 - 23.00', 3, '1746459765210-641704862-foto_menu.jpeg', '1746459765214-717604368-foto_cafe.jpeg', 'https://maps.app.goo.gl/EcR3XDtUv23n23up8', 'https://www.instagram.com/malacca.kopi?igsh=NWNuNWk3MnU3c2tt', '088995262993', 'wifi, stop kontak, toilet, mushalla, live music, indoor dan outdoor', 'cafe', 'rekomendasi', 'Menu utama: tersedia rice bowl kekinian, mie pedas level, nasi goreng sambal matah, dan pasta creamy.Camilan dan pastry: mulai dari croissant, cinnamon roll, roti bakar, waffle, hingga donat artisan.', '20k'),
(8, 'Sarang\'e Coffee', 'Jl. Jend. Sudirman No.39-41, Jati Baru, Kec. Padang Tim., Kota Padang, Sumatera Barat 25129', ' cafe ini adalah tempat nongkrong dengan nuansa hangat dan estetik yang terletak di pusat Kota Padang. Cafe ini menyuguhkan perpaduan antara konsep rustic dan modern yang nyaman buat siapa pun—baik kamu yang ingin fokus kerja, ngobrol santai, atau sekadar menikmati sore hari dengan secangkir kopi hangat.Di sini, kamu bisa menemukan berbagai pilihan menu mulai dari makanan berat khas Nusantara hingga camilan kekinian. Suasana tenang, alunan musik lo-fi, serta interior dengan pencahayaan temaram menjadikan Warung Senja tempat ideal untuk melepaskan penat atau mencari inspirasi.', 'Weekdays :09.00-23.00 Weekend :15.00-23.00', 3, '1746460486123-259852567-foto_menu.jpeg', '1746460486124-808351545-foto_cafe.jpg', 'https://maps.app.goo.gl/96ufDbTG7XnMBUov9', 'https://www.instagram.com/saranghaecoffee/', '-', 'wifi, stop kontak, toilet, mushalla, live music, indoor dan outdoor', 'cafe', 'rekomendasi', 'Menu utama: tersedia rice bowl kekinian, mie pedas level, nasi goreng sambal matah, dan pasta creamy.Camilan dan pastry: mulai dari croissant, cinnamon roll, roti bakar, waffle, hingga donat artisan.', '20k'),
(9, 'Kopi Pagi ', 'Gg. Nuri No.22A, Air Tawar Bar., Kec. Padang Utara, Kota Padang, Sumatera Barat 25137', ' cafe ini adalah tempat nongkrong dengan nuansa hangat dan estetik yang terletak di pusat Kota Padang. Cafe ini menyuguhkan perpaduan antara konsep rustic dan modern yang nyaman buat siapa pun—baik kamu yang ingin fokus kerja, ngobrol santai, atau sekadar menikmati sore hari dengan secangkir kopi hangat.Di sini, kamu bisa menemukan berbagai pilihan menu mulai dari makanan berat khas Nusantara hingga camilan kekinian. Suasana tenang, alunan musik lo-fi, serta interior dengan pencahayaan temaram menjadikan Warung Senja tempat ideal untuk melepaskan penat atau mencari inspirasi.', '10.00 - 24.00', 3, '1746460935185-492526167-foto_menu.jpeg', '1746460935185-636487373-foto_cafe.jpg', 'https://maps.app.goo.gl/eUyzpW6QLy5cfUod9', 'https://www.instagram.com/kopipagi.official/', '081266868800', 'wifi, stop kontak, toilet, mushalla, live music, indoor dan outdoor', 'cafe', 'rekomendasi', 'Menu utama: tersedia rice bowl kekinian, mie pedas level, nasi goreng sambal matah, dan pasta creamy.Camilan dan pastry: mulai dari croissant, cinnamon roll, roti bakar, waffle, hingga donat artisan.', '20k'),
(10, 'Kupi Batigo', 'Jl. KH. Ahmad Dahlan No.19, Alai Parak Kopi, Kec. Padang Utara, Kota Padang, Sumatera Barat 25111', 'Kafe yang terletak di dekat Masjid Raya Sumbar ini memiliki tempat yang cukup luas baik indoor maupun outdoor.Lengkapnya fasilitas yang diberikan oleh Kupi Batigo cocok banget buat temen-temen yang mau kopi darat ataupun kumpul rame-rame sama temanKafe ini memiliki konsep creative space dan sering mengadakan acara hiburan seperti stand up comedy, pemutaran film, sulap dan lain sebagainya.Kalian juga pasti gak akan bosan nongkrong disini karena menu yang ditawarkan kafe ini sangat banyak dan bervariasi.', '11.00 - 24.00 WIB', 3, '1746462893278-378758399-foto_menu.jpg', '1746462893288-390613154-foto_cafe.jpeg', 'https://maps.app.goo.gl/8KmMV2bw4evRii8SA', 'https://www.instagram.com/kupibatigo_padang/', '0811663504', 'wifi, stop kontak, toilet, mushalla, live music, board games, indoor dan outdoor', 'cafe', 'rekomendasi', 'Menu utama: tersedia rice bowl kekinian, mie pedas level, nasi goreng sambal matah, dan pasta creamy.Camilan dan pastry: mulai dari croissant, cinnamon roll, roti bakar, waffle, hingga donat artisan.', '20k'),
(11, 'Laranja Garden', 'Jln. Prof. Dr. Hamka, Air Tawar, Kota Padang, Sumatera Barat', 'Laranja Garden yang berlokasi di rooftop Basko Grand Mall ini memiliki view yang luar biasa. Teman-teman bisa nongkrong sambil melihat pemandangan Kota Padang dari atas.Konsep rooftop yang kafe ini tawarkan serta didukung dengan interior dan eksterior yang menawan membuat kafe ini bisa menjadi pilihan tepat untuk tempat meeting atau nge-date bersama pasangan.Kafe ini memiliki menu yang cukup bervariasi dan worth it dipesan buat nemenin nongkrong santai kita. Fasilitas yang disediakan juga cukup lengkap mulai dari Wifi hingga Meeting room yang dapat teman-teman sewa jika ada kegiatan.', '14.00 - 24.00 WIB', 3, '1746463491309-273342046-foto_menu.png', '1746463491314-200883637-foto_cafe.jpeg', 'https://maps.app.goo.gl/h5m9YG5pLAtvMg5E8', 'https://www.instagram.com/laranja_garden/', '0811663504', 'wifi, Stop Kontak, Toilet, Mushalla, Indoor dan Outdoor', 'cafe', 'rekomendasi', 'Menu utama: tersedia rice bowl kekinian, mie pedas level, nasi goreng sambal matah, dan pasta creamy.Camilan dan pastry: mulai dari croissant, cinnamon roll, roti bakar, waffle, hingga donat artisan.', '20k'),
(12, 'Days Dome', 'Jl. Kp Tanjung, Kec. Lubuk Begalung, Kota Padang, Sumatera Barat', 'Kafe ini bisa jadi salah satu tempat yang cozy banget buat kalian yang pengen mencari ketenangan di tengah kesibukan kalianDengan lokasi yang jauh dari jalan raya serta keramaian, bakal membuat kalian pasti nyaman kalau mau nugas, ngantor atau sekedar chillinDengan konsep interior yang idustrial, dan berada di tempat yang tidak biasa yaitu gudang, bikin Days Dome jadi kafe anti-mainstream yang gaakan kalian temui di mana pun', '15.00 - 23.00 WIB', 3, '1746464402016-619331587-foto_menu.jpg', '1746464402017-818615018-foto_cafe.jpg', 'https://maps.app.goo.gl/YawTewxi5q8bkg727', 'https://www.instagram.com/daysdome/', '081261601635', 'wifi, Stop Kontak, Toilet, Mushalla', 'cafe', 'rekomendasi', 'Menu utama: tersedia rice bowl kekinian, mie pedas level, nasi goreng sambal matah, dan pasta creamy.Camilan dan pastry: mulai dari croissant, cinnamon roll, roti bakar, waffle, hingga donat artisan.', '20k'),
(14, 'Sasana Kopi', 'Jl. Jend. Ahmad Yani No 48, Padang Pasir, Kec. Padang Barat, Kota Padang, Sumatera Barat', 'Salah satu tempat yang nyaman buat beraktivitas selanjutnya jatuh kepada Sasana Kopi. Kafe ini punya ambience yang bikin betah berlama-lama nongkrong disiniTerletak di Jl. Jend Ahmad Yani, kafe ini sangat mudah ditemukan lokasi nya karena berada di pinggir jalan. Kafe ini juga memiliki parkiran yang cukup luas yang bisa menampung banyak motor atau mobilKafe ini buka dari pagi dan punya menu sarapan yang cocok buat mengawali pagi hari kita. Dengan fasilitas yang cukup lengkap dan suasana nya yang adem, bikin kafe ini bisa jadi station baru buat nongkrong bareng teman-teman', '07.30 - 21.00 WIB', 3, '1746465437229-949702930-foto_menu.jpeg', '1746465437231-186080470-foto_cafe.jpg', 'https://maps.app.goo.gl/RpXqzgT6jw4sPr4q6', 'https://www.instagram.com/sasanakopi/', '081268593612', 'wifi, Stop Kontak, Toilet, Mushalla', 'cafe', 'non rekomendasi', 'Menu utama: tersedia rice bowl kekinian, mie pedas level, nasi goreng sambal matah, dan pasta creamy.Camilan dan pastry: mulai dari croissant, cinnamon roll, roti bakar, waffle, hingga donat artisan.', '20k'),
(15, 'Maison Merjer', 'Jln. Batang Naras No.2b, Alai Parak Kopi, Kec. Padang Utara, Kota Padang, Sumatera Barat', 'Sesuai namanya, Maison Merjer memiliki konsep yang unik yaitu dengan memadukan indoor dan outdoor serta membuat pengalaman kita seperti nongkrong di rumah.Suasana homie yang kafe ini tawarkan di tambah lagi dengan lokasi yang tidak dekat dengan jalan raya dan sedikit tersembunyi, cocok banget untuk kita yang mau mencari ketenangan dan kenyamanan saat kerja atau mengerjakan tugas.Interior dan eksterior kafe ini dibuat sedemikian rupa dengan sangat apik, yang membuat kafe ini juga instagramable buat kita foto-foto.Menu yang ditawarkan juga bervariasi dan cukup terjangkau. Mulai dari minuman sampai makanan nya bisa kalian pesan untuk menemani nongkrong seru kalian.', '09.00 - 23.00 WIB', 3, '1746465976397-555282274-foto_menu.jpg', '1746465976398-576653742-foto_cafe.jpg', 'https://maps.app.goo.gl/eUkQNwf5JGC7KYA88', 'https://www.instagram.com/maisonmerjer/', '-', 'wifi, Stop Kontak, Toilet, Mushalla, Indoor dan Outdoor', 'cafe', 'rekomendasi', 'Menu utama: tersedia rice bowl kekinian, mie pedas level, nasi goreng sambal matah, dan pasta creamy.Camilan dan pastry: mulai dari croissant, cinnamon roll, roti bakar, waffle, hingga donat artisan.', '20k'),
(16, 'Garis Waktu', 'Jl. Perintis Kemerdekaan No.71, Jati Baru, Kec. Padang Timur, Kota Padang, Sumatera Barat', 'Kafe yang terletak di Jati ini memiliki 3 lantai dengan space yang cukup luas serta menu yang beragamDengan desain interior yang berbeda di setiap lantai nya, cocok banget buat teman-teman yang hobi foto foto, karena banyak banget spot foto yang bagus di Garis WaktuKafe ini adalah kolaborasi dengan Nyonya Bowl dan di sini kalian bisa nemuin Live Music setiap hari', '09.00 - 23.00 WIB', 3, '1746470241785-525389967-foto_menu.jpeg', '1746470241785-842076620-foto_cafe.jpg', 'https://maps.app.goo.gl/KchwnEx67iG6RN5w6', 'https://www.instagram.com/kopigariswaktu/', '082283634525', 'wifi, Stop Kontak, Toilet, Mushalla, Live Music, Indoor dan semi outdoor', 'cafe', 'rekomendasi', 'Menu utama: tersedia rice bowl kekinian, mie pedas level, nasi goreng sambal matah, dan pasta creamy.Camilan dan pastry: mulai dari croissant, cinnamon roll, roti bakar, waffle, hingga donat artisan.', '20k'),
(17, 'Alter Cafe', 'Jln. Rasuna Said, Rimbo Kaluang, Kec. Padang Barat, Kota Padang, Sumatera Barat', 'Kafe yang juga memiliki studio ini berlokasi di tempat yang sangat mudah dijangkau.Dengan desain interior yang kece nan aesthetic, bisa banget di post untuk keperluan insta story.Alter cafe juga menyediakan menu yang cukup lengkap mulai dari minuman nya sampai makanan nya, cocok banget buat nemenin kita waktu lagi nongkrong disana.', '10.00 - 22.00 WIB', 3, '1746470455449-531667453-foto_menu.jpeg', '1746470455450-63620604-foto_cafe.jpg', 'https://maps.app.goo.gl/wc2sF9AWZZoeYaDn8', 'https://www.instagram.com/alter.cafe.id/', '-', 'wifi, Stop Kontak, Toilet, Indoor', 'cafe', 'non rekomendasi', 'Menu utama: tersedia rice bowl kekinian, mie pedas level, nasi goreng sambal matah, dan pasta creamy.Camilan dan pastry: mulai dari croissant, cinnamon roll, roti bakar, waffle, hingga donat artisan.', '20k');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_cafe` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `komentar` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `id_user`, `id_cafe`, `rating`, `komentar`) VALUES
(4, 1, 8, 4, 'cafe ini sangat rekomendasi untuk nyantai'),
(5, 2, 16, 4, 'cafe ini sangat rekomendasi untuk ngumpul'),
(6, 2, 14, 4, 'cafe ini sangat rekomendasi untuk meeting'),
(7, 2, 9, 5, 'keren'),
(8, 2, 9, 4, 'bagus untuk ngumpul teman'),
(9, 2, 7, 5, 'keren sekali'),
(10, 2, 7, 5, 'waaah bagus kali'),
(11, 2, 9, 5, 'wah bagus'),
(12, 2, 7, 5, 'wow '),
(13, 2, 7, 4, 'gas kun'),
(14, 2, 7, 5, 'waaah'),
(15, 2, 7, 5, 'keren'),
(16, 7, 7, 5, 'keren banget tempatnya'),
(17, 7, 7, 4, 'wow tempatnya menakjubkan'),
(18, 3, 7, 5, 'wew'),
(19, 4, 7, 5, 'bagus');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'ziaaaaaaa', 'pelangi123@gmail.com', '$2b$10$gODOm7D8fY41QdGb75Ft1uHdrnPnZ8dXuMonmsykmubLm5N6SNbb.', 'admin'),
(2, 'falmi', 'falmi123@gmail.com', '$2b$10$nI8FMemEJpuxvgBPjcqR.eCnnVAfp1IUpLHH1rAiGCuYbdjlxbpkm', 'user'),
(3, 'zahra', 'zahra123@gmail.com', '$2b$10$DEz6r/d/vgSxtZ/SMGSBxecZVESoxCUVRRgDtytSIa4sIv4PcyHqK', 'user'),
(4, 'surya', 'surya123@gmail.com', '$2b$10$pEFP2QWJRRapcRe1IYS1MeIvdhrmVYnr0XwMDzymNjdfoNTyMNMfu', 'user'),
(5, 'ya', 'hallo@gmail.com', '$2b$10$Be1y2K6HxzsNInuDEy1FG.yj1PWWeQE8oMP2DmXZrdPxjPLOnZXjS', 'user'),
(6, 'ya', 'ya123@gmail.com', '$2b$10$LmUsvDDxdVnSEIsEuLvCWO.dOtKajDagqHA/ukPHQ9aV9wJ78IwOm', 'user'),
(7, 'patull', 'patul123@gmail.com', '$2b$10$vMC46Gi.sIgxs4SbqGMQJujpVaWRorCu6K71gW.UM5zQiRviTGJsi', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_cafe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `id_user`, `id_cafe`) VALUES
(3, 1, 15),
(6, 2, 9),
(7, 4, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cafe`
--
ALTER TABLE `cafe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_cafe` (`id_cafe`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_cafe` (`id_cafe`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cafe`
--
ALTER TABLE `cafe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`id_cafe`) REFERENCES `cafe` (`id`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`id_cafe`) REFERENCES `cafe` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
