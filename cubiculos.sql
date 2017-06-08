-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2017 a las 20:33:44
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cubiculos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartados`
--
-- Creación: 07-06-2017 a las 13:36:45
--

CREATE TABLE `apartados` (
  `id` int(11) NOT NULL,
  `cubiculo` char(2) COLLATE utf8_spanish_ci NOT NULL,
  `hora` char(5) COLLATE utf8_spanish_ci NOT NULL,
  `fecha` char(10) COLLATE utf8_spanish_ci NOT NULL,
  `ncontrol` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `estado` varchar(10) COLLATE utf8_spanish_ci NOT NULL DEFAULT 'libre'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `apartados`
--

INSERT INTO `apartados` (`id`, `cubiculo`, `hora`, `fecha`, `ncontrol`, `estado`) VALUES
(3, '03', '13:00', '07/06/2017', '13170321', 'liberado'),
(6, '03', '15:00', '07/06/2017', '13170321', 'liberado'),
(10, '07', '12:00', '07/06/2017', '13170321', 'apartado'),
(11, '07', '13:00', '07/06/2017', '13170321', 'apartado'),
(13, '06', '15:00', '08/06/2017', '13170321', 'apartado'),
(14, '06', '13:00', '08/06/2017', '13170321', 'liberado'),
(15, '08', '10:00', '08/06/2017', '13170285', 'liberado'),
(16, '03', '12:00', '08/06/2017', '13170251', 'liberado'),
(17, '02', '16:00', '08/06/2017', '13170251', 'apartado'),
(18, '08', '14:00', '08/06/2017', '13170285', 'apartado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--
-- Creación: 07-06-2017 a las 04:09:44
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `ncontrol` varchar(10) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `carrera` varchar(50) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `ncontrol`, `nombre`, `carrera`) VALUES
(1, '13170321', 'Pedro', 'Sistemas'),
(2, '13170285', 'Joseline', 'Sistemas'),
(3, '13170251', 'Julio', 'Sistemas');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `apartados`
--
ALTER TABLE `apartados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `apartados`
--
ALTER TABLE `apartados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
