-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-12-2023 a las 04:10:32
-- Versión del servidor: 11.0.2-MariaDB
-- Versión de PHP: 8.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administracion`
--

CREATE TABLE `administracion` (
  `ID_MENSUALIDAD` int(11) NOT NULL,
  `FECHA` datetime NOT NULL,
  `CC.PROPIETARIO` int(11) NOT NULL,
  `MONTO_PAGO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartamentos`
--

CREATE TABLE `apartamentos` (
  `N_APARTAMENTO` char(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apartamentos_has_propietarios`
--

CREATE TABLE `apartamentos_has_propietarios` (
  `APARTAMENTOS_N_APARTAMENTO` char(6) NOT NULL,
  `PROPIETARIOS_CC.PROPIETARIO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles`
--

CREATE TABLE `detalles` (
  `idDETALLES` int(11) NOT NULL,
  `Factura_Id_Factura` int(11) NOT NULL,
  `SANCIONES_idSANCIONES` int(11) NOT NULL,
  `ADMINISTRACION_ID_MENSUALIDAD` int(11) NOT NULL,
  `ZONAS_SOCIALES_idZONAS_SOCIALES` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `Id_Factura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietarios`
--

CREATE TABLE `propietarios` (
  `CC.PROPIETARIO` int(11) NOT NULL,
  `NOMBRE` varchar(45) DEFAULT NULL,
  `EMAIL` varchar(45) DEFAULT NULL,
  `PASSWORD` blob DEFAULT NULL,
  `FECHA_DE_NACIMIENTO` DATE DEFAULT NULL,
  `N.CELULAR` varchar(45) DEFAULT NULL,
  `GENERO` varchar(45) DEFAULT NULL,
  `CODIGO_CONFIRMACION_EMAIL` varchar(36) DEFAULT NULL,
  `verificado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `propietarios_has_facturas`
--

CREATE TABLE `propietarios_has_facturas` (
  `PROPIETARIOS_CC.PROPIETARIO` int(11) NOT NULL,
  `FACTURA_idFACTURA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sanciones`
--

CREATE TABLE `sanciones` (
  `idSANCIONES` int(11) NOT NULL,
  `FECHA` datetime NOT NULL,
  `TIPODE_SANCION` varchar(45) NOT NULL,
  `ID_PROPIETARIO` int(11) NOT NULL,
  `DESCRIPCION` varchar(450) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas_sociales`
--

CREATE TABLE `zonas_sociales` (
  `idZONAS_SOCIALES` int(11) NOT NULL,
  `FECHA` datetime NOT NULL,
  `ZONAS_SOCIALEScol` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administracion`
--
ALTER TABLE `administracion`
  ADD PRIMARY KEY (`ID_MENSUALIDAD`);

--
-- Indices de la tabla `apartamentos`
--
ALTER TABLE `apartamentos`
  ADD PRIMARY KEY (`N_APARTAMENTO`);

--
-- Indices de la tabla `apartamentos_has_propietarios`
--
ALTER TABLE `apartamentos_has_propietarios`
  ADD KEY `APARTAMENTOS_N_APARTAMENTO` (`APARTAMENTOS_N_APARTAMENTO`),
  ADD KEY `PROPIETARIOS_CC.PROPIETARIO` (`PROPIETARIOS_CC.PROPIETARIO`);

--
-- Indices de la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD PRIMARY KEY (`idDETALLES`,`Factura_Id_Factura`,`SANCIONES_idSANCIONES`,`ADMINISTRACION_ID_MENSUALIDAD`,`ZONAS_SOCIALES_idZONAS_SOCIALES`),
  ADD KEY `fk_DETALLES_Factura1_idx` (`Factura_Id_Factura`),
  ADD KEY `fk_DETALLES_SANCIONES1_idx` (`SANCIONES_idSANCIONES`),
  ADD KEY `fk_DETALLES_ADMINISTRACION1_idx` (`ADMINISTRACION_ID_MENSUALIDAD`),
  ADD KEY `fk_DETALLES_ZONAS_SOCIALES1_idx` (`ZONAS_SOCIALES_idZONAS_SOCIALES`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`Id_Factura`);

--
-- Indices de la tabla `propietarios`
--
ALTER TABLE `propietarios`
  ADD PRIMARY KEY (`CC.PROPIETARIO`);

--
-- Indices de la tabla `propietarios_has_facturas`
--
ALTER TABLE `propietarios_has_facturas`
  ADD PRIMARY KEY (`FACTURA_idFACTURA`,`PROPIETARIOS_CC.PROPIETARIO`),
  ADD KEY `fk_PROPIETARIOS_has_SERVICIOS_SERVICIOS1_idx` (`FACTURA_idFACTURA`),
  ADD KEY `fk_PROPIETARIOS_has_SERVICIOS_PROPIETARIOS1_idx` (`PROPIETARIOS_CC.PROPIETARIO`);

--
-- Indices de la tabla `sanciones`
--
ALTER TABLE `sanciones`
  ADD PRIMARY KEY (`idSANCIONES`);

--
-- Indices de la tabla `zonas_sociales`
--
ALTER TABLE `zonas_sociales`
  ADD PRIMARY KEY (`idZONAS_SOCIALES`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `apartamentos_has_propietarios`
--
ALTER TABLE `apartamentos_has_propietarios`
  ADD CONSTRAINT `apartamentos_has_propietarios_ibfk_1` FOREIGN KEY (`APARTAMENTOS_N_APARTAMENTO`) REFERENCES `apartamentos` (`N_APARTAMENTO`),
  ADD CONSTRAINT `apartamentos_has_propietarios_ibfk_2` FOREIGN KEY (`PROPIETARIOS_CC.PROPIETARIO`) REFERENCES `propietarios` (`CC.PROPIETARIO`);

--
-- Filtros para la tabla `detalles`
--
ALTER TABLE `detalles`
  ADD CONSTRAINT `fk_DETALLES_ADMINISTRACION1` FOREIGN KEY (`ADMINISTRACION_ID_MENSUALIDAD`) REFERENCES `administracion` (`ID_MENSUALIDAD`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_DETALLES_Factura1` FOREIGN KEY (`Factura_Id_Factura`) REFERENCES `factura` (`Id_Factura`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_DETALLES_SANCIONES1` FOREIGN KEY (`SANCIONES_idSANCIONES`) REFERENCES `sanciones` (`idSANCIONES`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_DETALLES_ZONAS_SOCIALES1` FOREIGN KEY (`ZONAS_SOCIALES_idZONAS_SOCIALES`) REFERENCES `zonas_sociales` (`idZONAS_SOCIALES`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `propietarios_has_facturas`
--
ALTER TABLE `propietarios_has_facturas`
  ADD CONSTRAINT `fk_PROPIETARIOS_has_SERVICIOS_PROPIETARIOS1` FOREIGN KEY (`PROPIETARIOS_CC.PROPIETARIO`) REFERENCES `propietarios` (`CC.PROPIETARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_PROPIETARIOS_has_SERVICIOS_SERVICIOS1` FOREIGN KEY (`FACTURA_idFACTURA`) REFERENCES `factura` (`Id_Factura`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;