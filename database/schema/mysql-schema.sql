/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `academia_videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `academia_videos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` longtext COLLATE utf8_unicode_ci,
  `titulo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `amenidad_negocio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenidad_negocio` (
  `amenidad_id` bigint unsigned NOT NULL,
  `negocio_id` bigint unsigned NOT NULL,
  KEY `amenidad_negocio_amenidad_id_foreign` (`amenidad_id`),
  KEY `amenidad_negocio_negocio_id_foreign` (`negocio_id`),
  CONSTRAINT `amenidad_negocio_amenidad_id_foreign` FOREIGN KEY (`amenidad_id`) REFERENCES `amenidads` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `amenidad_negocio_negocio_id_foreign` FOREIGN KEY (`negocio_id`) REFERENCES `negocios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `amenidads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenidads` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `amenidads_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `atraccions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atraccions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `duracion_sugerida` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `sitio_web` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `destino_id` bigint unsigned NOT NULL,
  `lat` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lng` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `incluye` json DEFAULT NULL,
  `descripcion` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `atraccions_destino_id_foreign` (`destino_id`),
  CONSTRAINT `atraccions_destino_id_foreign` FOREIGN KEY (`destino_id`) REFERENCES `destinos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cargo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `negocio_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cargos_negocio_id_foreign` (`negocio_id`),
  CONSTRAINT `cargos_negocio_id_foreign` FOREIGN KEY (`negocio_id`) REFERENCES `negocios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `carrito_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito_productos` (
  `cliente_id` bigint unsigned NOT NULL,
  `producto_id` bigint unsigned NOT NULL,
  `cantidad` int NOT NULL DEFAULT '1',
  `precio_unitario` decimal(8,2) NOT NULL,
  `monto` decimal(8,2) NOT NULL,
  `tienda_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `vid` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `isChino` tinyint(1) NOT NULL DEFAULT '0',
  KEY `carrito_productos_cliente_id_foreign` (`cliente_id`),
  KEY `carrito_productos_producto_id_foreign` (`producto_id`),
  KEY `carrito_productos_tienda_id_foreign` (`tienda_id`),
  CONSTRAINT `carrito_productos_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carrito_productos_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carrito_productos_tienda_id_foreign` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `categoria_faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_faqs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `icono` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categoria_faqs_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `categoria_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_productos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categoria_productos_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `ciudads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudads` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ciudad` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `estado_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ciudads_estado_id_foreign` (`estado_id`),
  CONSTRAINT `ciudads_estado_id_foreign` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `comisions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comisions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `rol_id` bigint unsigned NOT NULL,
  `comision` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comisions_rol_id_foreign` (`rol_id`),
  CONSTRAINT `comisions_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `consumo_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumo_productos` (
  `producto_id` bigint unsigned NOT NULL,
  `consumo_id` bigint unsigned NOT NULL,
  `cantidad` int NOT NULL DEFAULT '0',
  `monto` decimal(8,2) NOT NULL,
  `vid` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  KEY `consumo_productos_producto_id_foreign` (`producto_id`),
  KEY `consumo_productos_consumo_id_foreign` (`consumo_id`),
  CONSTRAINT `consumo_productos_consumo_id_foreign` FOREIGN KEY (`consumo_id`) REFERENCES `consumos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `consumo_productos_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `consumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `consumos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cliente_id` bigint unsigned NOT NULL,
  `empleado_id` bigint unsigned DEFAULT NULL,
  `total` decimal(8,2) NOT NULL,
  `paypal_id` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `paypal` json DEFAULT NULL,
  `tps` decimal(8,2) DEFAULT NULL,
  `divisa_id` bigint unsigned DEFAULT NULL,
  `comentado` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `tienda_id` bigint unsigned DEFAULT NULL,
  `ordencj` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `monto_envio` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `consumos_cliente_id_foreign` (`cliente_id`),
  KEY `consumos_divisa_id_foreign` (`divisa_id`),
  KEY `consumos_empleado_id_foreign` (`empleado_id`),
  KEY `consumos_tienda_id_foreign` (`tienda_id`),
  CONSTRAINT `consumos_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `consumos_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `consumos_empleado_id_foreign` FOREIGN KEY (`empleado_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `consumos_tienda_id_foreign` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cupon_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cupon_usuario` (
  `usuario_id` bigint unsigned NOT NULL,
  `cupon_id` bigint unsigned NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `cupon_usuario_usuario_id_foreign` (`usuario_id`),
  KEY `cupon_usuario_cupon_id_foreign` (`cupon_id`),
  CONSTRAINT `cupon_usuario_cupon_id_foreign` FOREIGN KEY (`cupon_id`) REFERENCES `cupons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cupon_usuario_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `cupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cupons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `condiciones` text COLLATE utf8_unicode_ci NOT NULL,
  `restricciones` text COLLATE utf8_unicode_ci NOT NULL,
  `imagen` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `expide` datetime NOT NULL,
  `vence` datetime NOT NULL,
  `disponibles` int NOT NULL,
  `precio` decimal(8,2) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `divisa_id` bigint unsigned NOT NULL,
  `negocio_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `certificados_divisa_id_foreign` (`divisa_id`),
  KEY `certificados_negocio_id_foreign` (`negocio_id`),
  CONSTRAINT `certificados_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `certificados_negocio_id_foreign` FOREIGN KEY (`negocio_id`) REFERENCES `negocios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `datos_pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datos_pagos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `metodo_pago` tinyint NOT NULL DEFAULT '1',
  `divisa_id` bigint unsigned DEFAULT NULL,
  `pais_id` bigint unsigned DEFAULT NULL,
  `ciudad_id` bigint unsigned DEFAULT NULL,
  `nombre_banco` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `direccion_banco` text COLLATE utf8_unicode_ci,
  `titular` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `iban` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `swift` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `numero_cuenta` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fichero_acreditativo_cuenta` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `usuario_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `datos_pagos_divisa_id_foreign` (`divisa_id`),
  KEY `datos_pagos_pais_id_foreign` (`pais_id`),
  KEY `datos_pagos_ciudad_id_foreign` (`ciudad_id`),
  KEY `datos_pagos_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `datos_pagos_ciudad_id_foreign` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `datos_pagos_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `datos_pagos_pais_id_foreign` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `datos_pagos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `destinos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `destinos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `iata_id` bigint unsigned DEFAULT NULL,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `ciudad_id` bigint unsigned DEFAULT NULL,
  `estado_id` bigint unsigned NOT NULL,
  `descripcion` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `lat` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lng` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `titulo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '0',
  `about_travel` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `destinos_iata_id_foreign` (`iata_id`),
  KEY `destinos_ciudad_id_foreign` (`ciudad_id`),
  KEY `destinos_estado_id_foreign` (`estado_id`),
  CONSTRAINT `destinos_ciudad_id_foreign` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `destinos_estado_id_foreign` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `destinos_iata_id_foreign` FOREIGN KEY (`iata_id`) REFERENCES `iatas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `divisas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `principal` tinyint(1) NOT NULL DEFAULT '0',
  `tasa` decimal(8,2) DEFAULT '0.00',
  `iso` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `simbolo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `divisas_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint unsigned NOT NULL,
  `negocio_id` bigint unsigned NOT NULL,
  `cargo_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empleados_usuario_id_foreign` (`usuario_id`),
  KEY `empleados_negocio_id_foreign` (`negocio_id`),
  KEY `empleados_cargo_id_foreign` (`cargo_id`),
  CONSTRAINT `empleados_cargo_id_foreign` FOREIGN KEY (`cargo_id`) REFERENCES `cargos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `empleados_negocio_id_foreign` FOREIGN KEY (`negocio_id`) REFERENCES `negocios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `empleados_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `estado_cuentas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_cuentas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `saldo` decimal(8,2) NOT NULL DEFAULT '0.00',
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `divisa_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `estado_cuentas_divisa_id_foreign` (`divisa_id`),
  CONSTRAINT `estado_cuentas_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `estado` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `pais_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `estados_pais_id_foreign` (`pais_id`),
  CONSTRAINT `estados_pais_id_foreign` FOREIGN KEY (`pais_id`) REFERENCES `pais` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `eventos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `contenido` longtext COLLATE utf8_unicode_ci NOT NULL,
  `fecha_inicio` datetime NOT NULL,
  `status` tinyint NOT NULL,
  `recurrente` tinyint(1) NOT NULL DEFAULT '0',
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `recurrencia` json DEFAULT NULL,
  `all_dia` tinyint(1) NOT NULL DEFAULT '0',
  `tipo_recurrencia` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `connection` text COLLATE utf8_unicode_ci NOT NULL,
  `queue` text COLLATE utf8_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faqs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `pregunta` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `respuesta` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoria_id` bigint unsigned NOT NULL,
  `usuario_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `faqs_pregunta_unique` (`pregunta`),
  KEY `faqs_categoria_id_foreign` (`categoria_id`),
  KEY `faqs_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `faqs_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_faqs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `faqs_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `forma_pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forma_pagos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forma_pagos_nombre_unique` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `formas_pago_negocio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formas_pago_negocio` (
  `forma_id` bigint unsigned NOT NULL,
  `negocio_id` bigint unsigned NOT NULL,
  KEY `formas_pago_negocio_forma_id_foreign` (`forma_id`),
  KEY `formas_pago_negocio_negocio_id_foreign` (`negocio_id`),
  CONSTRAINT `formas_pago_negocio_forma_id_foreign` FOREIGN KEY (`forma_id`) REFERENCES `forma_pagos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `formas_pago_negocio_negocio_id_foreign` FOREIGN KEY (`negocio_id`) REFERENCES `negocios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `horario_reservacions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horario_reservacions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `negocio_id` bigint unsigned NOT NULL,
  `dia` tinyint NOT NULL,
  `hora` time NOT NULL,
  `condicion` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `floor_plan` tinyint(1) NOT NULL DEFAULT '0',
  `lugares` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `horario_reservacions_negocio_id_foreign` (`negocio_id`),
  CONSTRAINT `horario_reservacions_negocio_id_foreign` FOREIGN KEY (`negocio_id`) REFERENCES `negocios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `dia` tinyint NOT NULL,
  `apertura` json DEFAULT NULL,
  `cierre` json DEFAULT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `doble_turno` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `iatas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `iatas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `codigo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `aeropuerto` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `estado_id` bigint unsigned DEFAULT NULL,
  `ciudad_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iatas_codigo_unique` (`codigo`),
  KEY `iatas_estado_id_foreign` (`estado_id`),
  KEY `iatas_ciudad_id_foreign` (`ciudad_id`),
  CONSTRAINT `iatas_ciudad_id_foreign` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `iatas_estado_id_foreign` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `imagens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `imagen` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `portada` tinyint(1) DEFAULT '0',
  `logo` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `invitacions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invitacions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mensaje` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `usuario_id` bigint unsigned NOT NULL,
  `status` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invitacions_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `invitacions_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint unsigned NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `comentario` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `likes_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `likes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `lotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lotes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fecha_llegada` date NOT NULL,
  `cantidad` int NOT NULL,
  `codigo_lada` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero_inicial` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero_final` varchar(5) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monto` decimal(8,2) NOT NULL DEFAULT '5.00',
  `divisa_id` bigint unsigned DEFAULT NULL,
  `tps` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `usuario_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lotes_divisa_id_foreign` (`divisa_id`),
  KEY `lotes_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `lotes_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `lotes_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `mensajes_vonages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes_vonages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `msisdn` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `to` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `messageId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keyword` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message-timestamp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timestamp` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nonce` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `concat` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `concat-ref` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `concat-total` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `concat-part` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `udh` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `mesas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mesas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `sillas` int NOT NULL,
  `horario_reservacion_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mesas_horario_reservacion_id_foreign` (`horario_reservacion_id`),
  CONSTRAINT `mesas_horario_reservacion_id_foreign` FOREIGN KEY (`horario_reservacion_id`) REFERENCES `horario_reservacions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimientos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `estado_cuenta_id` bigint unsigned NOT NULL,
  `monto` decimal(8,2) NOT NULL,
  `tipo_movimiento` smallint NOT NULL DEFAULT '1',
  `balance` decimal(8,2) NOT NULL,
  `concepto` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `divisa_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `movimientos_estado_cuenta_id_foreign` (`estado_cuenta_id`),
  KEY `movimientos_divisa_id_foreign` (`divisa_id`),
  CONSTRAINT `movimientos_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `movimientos_estado_cuenta_id_foreign` FOREIGN KEY (`estado_cuenta_id`) REFERENCES `estado_cuentas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `negocio_categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `negocio_categorias` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `categoria` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8_unicode_ci,
  `imagen` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `negocio_categorias_categoria_unique` (`categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `negocios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `negocios` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `breve` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `comision` decimal(8,2) NOT NULL,
  `emails` json NOT NULL,
  `sitio_web` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `direccion` text COLLATE utf8_unicode_ci NOT NULL,
  `codigo_postal` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `vistas` bigint NOT NULL DEFAULT '0',
  `ultima_recarga` datetime DEFAULT NULL,
  `floor_plan` tinyint(1) NOT NULL DEFAULT '0',
  `acepta_reservas` tinyint(1) NOT NULL DEFAULT '0',
  `lat` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `lng` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `tipo_comision` tinyint NOT NULL DEFAULT '1',
  `status` varchar(191) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1',
  `categoria_id` bigint unsigned DEFAULT NULL,
  `ciudad_id` bigint unsigned DEFAULT NULL,
  `estado_id` bigint unsigned DEFAULT NULL,
  `usuario_id` bigint unsigned NOT NULL,
  `solicitud_id` bigint unsigned DEFAULT NULL,
  `divisa_id` bigint unsigned DEFAULT NULL,
  `iata_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `precios` json DEFAULT NULL,
  `tipo_menu` tinyint DEFAULT NULL,
  `menu` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tps_referido` decimal(8,2) DEFAULT NULL,
  `publicado` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `negocios_categoria_id_foreign` (`categoria_id`),
  KEY `negocios_ciudad_id_foreign` (`ciudad_id`),
  KEY `negocios_estado_id_foreign` (`estado_id`),
  KEY `negocios_usuario_id_foreign` (`usuario_id`),
  KEY `negocios_solicitud_id_foreign` (`solicitud_id`),
  KEY `negocios_divisa_id_foreign` (`divisa_id`),
  KEY `negocios_iata_id_foreign` (`iata_id`),
  CONSTRAINT `negocios_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `negocio_categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `negocios_ciudad_id_foreign` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `negocios_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `negocios_estado_id_foreign` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `negocios_iata_id_foreign` FOREIGN KEY (`iata_id`) REFERENCES `iatas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `negocios_solicitud_id_foreign` FOREIGN KEY (`solicitud_id`) REFERENCES `solicituds` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `negocios_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `notifiable_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `notifiable_id` bigint unsigned NOT NULL,
  `data` text COLLATE utf8_unicode_ci NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `notifications_notifiable_type_notifiable_id_index` (`notifiable_type`,`notifiable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `opinions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opinions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `calificacion` decimal(8,2) NOT NULL,
  `opinion` text COLLATE utf8_unicode_ci NOT NULL,
  `titulo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `asistencia` varchar(191) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `acompanante` int DEFAULT NULL,
  `certificacion` tinyint(1) NOT NULL,
  `preguntas` json DEFAULT NULL,
  `model_id` bigint unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `usuario_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `opinions_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `opinions_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `paginas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paginas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contenido` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `header` json DEFAULT NULL,
  `ruta` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '0',
  `is_termino` tinyint(1) NOT NULL DEFAULT '1',
  `is_politica` tinyint(1) NOT NULL DEFAULT '1',
  `usuario_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `icono` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `showHeader` tinyint(1) NOT NULL DEFAULT '0',
  `is_contacto` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `paginas_nombre_unique` (`nombre`),
  UNIQUE KEY `paginas_ruta_unique` (`ruta`),
  KEY `paginas_usuario_id_foreign` (`usuario_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pais` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `codigo` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lada` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pais` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `pais_origen_viajero`;
/*!50001 DROP VIEW IF EXISTS `pais_origen_viajero`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pais_origen_viajero` AS SELECT 
 1 AS `pais`,
 1 AS `ventas`*/;
SET character_set_client = @saved_cs_client;
DROP TABLE IF EXISTS `panels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `panels` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `panel` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `panels_panel_unique` (`panel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `panel_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `permisos_panel_id_foreign` (`panel_id`),
  CONSTRAINT `permisos_panel_id_foreign` FOREIGN KEY (`panel_id`) REFERENCES `panels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `permisos_asignados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos_asignados` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `permiso_id` bigint unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `permisos_asignados_permiso_id_foreign` (`permiso_id`),
  CONSTRAINT `permisos_asignados_permiso_id_foreign` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `categoria_id` bigint unsigned NOT NULL,
  `precio` decimal(18,2) NOT NULL,
  `descripcion` longtext COLLATE utf8_unicode_ci,
  `caracteristicas` json DEFAULT NULL,
  `envio` json DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `breve` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tipo_producto` tinyint NOT NULL DEFAULT '1',
  `archivo` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `divisa_id` bigint unsigned DEFAULT NULL,
  `isChino` tinyint(1) NOT NULL DEFAULT '0',
  `pid` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cj` json DEFAULT NULL,
  `variants` json DEFAULT NULL,
  `enviable` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `productos_categoria_id_foreign` (`categoria_id`),
  KEY `productos_divisa_id_foreign` (`divisa_id`),
  CONSTRAINT `productos_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `productos_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `publicacions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicacions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `contenido` longtext COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `recomendacions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recomendacions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint NOT NULL,
  `usuario_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `recomendacions_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `recomendacions_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `reds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `icono` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `model_id` bigint NOT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `reservacions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservacions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `observacion` text COLLATE utf8_unicode_ci,
  `personas` int NOT NULL,
  `status` tinyint NOT NULL,
  `negocio_id` bigint unsigned NOT NULL,
  `usuario_id` bigint unsigned NOT NULL,
  `operador_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservacions_negocio_id_foreign` (`negocio_id`),
  KEY `reservacions_usuario_id_foreign` (`usuario_id`),
  KEY `reservacions_operador_id_foreign` (`operador_id`),
  CONSTRAINT `reservacions_negocio_id_foreign` FOREIGN KEY (`negocio_id`) REFERENCES `negocios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reservacions_operador_id_foreign` FOREIGN KEY (`operador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reservacions_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `retiros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `retiros` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint unsigned NOT NULL,
  `monto` decimal(8,2) NOT NULL,
  `status` tinyint NOT NULL,
  `comprobante` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nota` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `divisa_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `retiros_usuario_id_foreign` (`usuario_id`),
  KEY `retiros_divisa_id_foreign` (`divisa_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `reunions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reunions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `titulo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `usuario_id` bigint unsigned NOT NULL,
  `model_id` bigint unsigned DEFAULT NULL,
  `model_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `recurrente` tinyint(1) NOT NULL DEFAULT '0',
  `recurrencia` json DEFAULT NULL,
  `all_dia` tinyint(1) NOT NULL,
  `tipo_recurrencia` tinyint DEFAULT NULL,
  `archivo` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nota` text COLLATE utf8mb4_unicode_ci,
  `estado` tinyint NOT NULL DEFAULT '0',
  `participantes` json DEFAULT NULL,
  `recordatorio` json DEFAULT NULL,
  `tipo` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reunions_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `reunions_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `rol_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_permisos` (
  `rol_id` bigint unsigned NOT NULL,
  `permiso_id` bigint unsigned NOT NULL,
  `actions` json NOT NULL,
  KEY `rol_permisos_rol_id_foreign` (`rol_id`),
  KEY `rol_permisos_permiso_id_foreign` (`permiso_id`),
  CONSTRAINT `rol_permisos_permiso_id_foreign` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rol_permisos_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `seguidors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seguidors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint NOT NULL,
  `usuario_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seguidors_usuario_id_foreign` (`usuario_id`),
  CONSTRAINT `seguidors_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8_unicode_ci,
  `payload` text COLLATE utf8_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sistema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sistema` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8_unicode_ci,
  `terminos` longtext COLLATE utf8_unicode_ci,
  `logotipo_fondo_claro` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `logotipo_fondo_oscuro` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `paypal_id` text COLLATE utf8_unicode_ci,
  `paypal_secrect` text COLLATE utf8_unicode_ci,
  `production_paypal` tinyint(1) NOT NULL DEFAULT '0',
  `paypal` tinyint(1) NOT NULL DEFAULT '0',
  `divisa_id` bigint unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `banner_principal` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `empresa_digital` tinyint(1) NOT NULL DEFAULT '0',
  `negocio` json DEFAULT NULL,
  `cjdropshipping` json DEFAULT NULL,
  `porcentaje_referido` int DEFAULT '5',
  PRIMARY KEY (`id`),
  KEY `sistema_divisa_id_foreign` (`divisa_id`),
  CONSTRAINT `sistema_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `solicituds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicituds` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8_unicode_ci NOT NULL,
  `breve` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `categoria_id` bigint unsigned DEFAULT NULL,
  `comision` decimal(8,2) NOT NULL,
  `tipo_comision` tinyint NOT NULL DEFAULT '1',
  `url` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `telefono` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `sitio_web` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `direccion` text COLLATE utf8_unicode_ci NOT NULL,
  `codigo_postal` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `ciudad_id` bigint unsigned DEFAULT NULL,
  `estado_id` bigint unsigned DEFAULT NULL,
  `lat` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `lng` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `foto` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `situacion` varchar(191) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1',
  `comentario` text COLLATE utf8_unicode_ci,
  `usuario_id` bigint unsigned NOT NULL,
  `divisa_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `iata_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `solicituds_categoria_id_foreign` (`categoria_id`),
  KEY `solicituds_ciudad_id_foreign` (`ciudad_id`),
  KEY `solicituds_estado_id_foreign` (`estado_id`),
  KEY `solicituds_usuario_id_foreign` (`usuario_id`),
  KEY `solicituds_divisa_id_foreign` (`divisa_id`),
  KEY `solicituds_iata_id_foreign` (`iata_id`),
  CONSTRAINT `solicituds_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `negocio_categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `solicituds_ciudad_id_foreign` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `solicituds_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `solicituds_estado_id_foreign` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `solicituds_iata_id_foreign` FOREIGN KEY (`iata_id`) REFERENCES `iatas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `solicituds_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `sucursals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `ciudad_id` bigint unsigned DEFAULT NULL,
  `estado_id` bigint unsigned NOT NULL,
  `direccion` text COLLATE utf8_unicode_ci NOT NULL,
  `lat` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `lng` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `iata_id` bigint unsigned DEFAULT NULL,
  `model_id` bigint NOT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sucursals_ciudad_id_foreign` (`ciudad_id`),
  KEY `sucursals_estado_id_foreign` (`estado_id`),
  KEY `sucursals_iata_id_foreign` (`iata_id`),
  CONSTRAINT `sucursals_ciudad_id_foreign` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `sucursals_estado_id_foreign` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sucursals_iata_id_foreign` FOREIGN KEY (`iata_id`) REFERENCES `iatas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tarjetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjetas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `lote_id` bigint unsigned NOT NULL,
  `numero` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `aplicada` tinyint(1) NOT NULL DEFAULT '0',
  `validada` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tarjetas_numero_unique` (`numero`),
  KEY `tarjetas_lote_id_foreign` (`lote_id`),
  CONSTRAINT `tarjetas_lote_id_foreign` FOREIGN KEY (`lote_id`) REFERENCES `lotes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `telefonos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefonos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `telefono` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `is_whatsapp` tinyint(1) NOT NULL DEFAULT '0',
  `principal` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tienda_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tienda_producto` (
  `producto_id` bigint unsigned NOT NULL,
  `tienda_id` bigint unsigned NOT NULL,
  `cantidad` int NOT NULL DEFAULT '0',
  KEY `tienda_producto_producto_id_foreign` (`producto_id`),
  KEY `tienda_producto_tienda_id_foreign` (`tienda_id`),
  CONSTRAINT `tienda_producto_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tienda_producto_tienda_id_foreign` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `tiendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiendas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `divisa_id` bigint unsigned DEFAULT NULL,
  `fisica` tinyint(1) NOT NULL DEFAULT '0',
  `iata_id` bigint unsigned DEFAULT NULL,
  `ciudad_id` bigint unsigned DEFAULT NULL,
  `estado_id` bigint unsigned DEFAULT NULL,
  `lat` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lng` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `direccion` varchar(191) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tiendas_nombre_unique` (`nombre`),
  KEY `tiendas_divisa_id_foreign` (`divisa_id`),
  KEY `tiendas_iata_id_foreign` (`iata_id`),
  KEY `tiendas_ciudad_id_foreign` (`ciudad_id`),
  KEY `tiendas_estado_id_foreign` (`estado_id`),
  CONSTRAINT `tiendas_ciudad_id_foreign` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tiendas_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tiendas_estado_id_foreign` FOREIGN KEY (`estado_id`) REFERENCES `estados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `tiendas_iata_id_foreign` FOREIGN KEY (`iata_id`) REFERENCES `iatas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apellido` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_nacimiento` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `genero` tinyint NOT NULL DEFAULT '1',
  `codigo_postal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `direccion` mediumtext COLLATE utf8mb4_unicode_ci,
  `imagen` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_password` tinyint(1) NOT NULL DEFAULT '0',
  `bio` mediumtext COLLATE utf8mb4_unicode_ci,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lenguaje` smallint DEFAULT NULL,
  `twitter` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `facebook` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `instagram` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rol_id` bigint unsigned DEFAULT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ultimo_login` timestamp NULL DEFAULT NULL,
  `codigo_referidor` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `ciudad_id` bigint unsigned DEFAULT NULL,
  `lider_id` bigint unsigned DEFAULT NULL,
  `coordinador_id` bigint unsigned DEFAULT NULL,
  `tarjeta_id` bigint unsigned DEFAULT NULL,
  `destino_id` bigint unsigned DEFAULT NULL,
  `portada` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `porcentaje_perfil` decimal(8,2) NOT NULL DEFAULT '0.00',
  `nivel` json DEFAULT NULL,
  `lider_business` tinyint(1) NOT NULL DEFAULT '0',
  `comision_promotores` smallint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_codigo_referidor_unique` (`codigo_referidor`),
  KEY `users_rol_id_foreign` (`rol_id`),
  KEY `users_ciudad_id_foreign` (`ciudad_id`),
  KEY `users_lider_id_foreign` (`lider_id`),
  KEY `users_coordinador_id_foreign` (`coordinador_id`),
  KEY `users_tarjeta_id_foreign` (`tarjeta_id`),
  KEY `users_destino_id_foreign` (`destino_id`),
  CONSTRAINT `users_ciudad_id_foreign` FOREIGN KEY (`ciudad_id`) REFERENCES `ciudads` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_coordinador_id_foreign` FOREIGN KEY (`coordinador_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_destino_id_foreign` FOREIGN KEY (`destino_id`) REFERENCES `destinos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_lider_id_foreign` FOREIGN KEY (`lider_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `rols` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `users_tarjeta_id_foreign` FOREIGN KEY (`tarjeta_id`) REFERENCES `tarjetas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `usuario_permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_permisos` (
  `action` json NOT NULL,
  `usuario_id` bigint unsigned NOT NULL,
  `permiso_id` bigint unsigned NOT NULL,
  KEY `usuario_permisos_usuario_id_foreign` (`usuario_id`),
  KEY `usuario_permisos_permiso_id_foreign` (`permiso_id`),
  CONSTRAINT `usuario_permisos_permiso_id_foreign` FOREIGN KEY (`permiso_id`) REFERENCES `permisos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuario_permisos_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `usuario_referencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_referencia` (
  `codigo` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `usuario_id` bigint unsigned NOT NULL,
  `referido_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `usuario_referencia_usuario_id_foreign` (`usuario_id`),
  KEY `usuario_referencia_referido_id_foreign` (`referido_id`),
  CONSTRAINT `usuario_referencia_referido_id_foreign` FOREIGN KEY (`referido_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuario_referencia_usuario_id_foreign` FOREIGN KEY (`usuario_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `var`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `var` (
  `video_academia_id` bigint unsigned NOT NULL,
  `rol_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `var_video_academia_id_foreign` (`video_academia_id`),
  KEY `var_rol_id_foreign` (`rol_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `vav`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vav` (
  `video_academia_id` bigint unsigned NOT NULL,
  `video_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `vav_video_academia_id_foreign` (`video_academia_id`),
  KEY `vav_video_id_foreign` (`video_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `divisa_id` bigint unsigned DEFAULT NULL,
  `monto` decimal(8,2) NOT NULL,
  `comision` decimal(8,2) DEFAULT NULL,
  `tps` decimal(8,2) DEFAULT NULL,
  `tps_referente` decimal(8,2) DEFAULT NULL,
  `certificado` tinyint(1) NOT NULL DEFAULT '0',
  `empleado_id` bigint unsigned DEFAULT NULL,
  `cliente_id` bigint unsigned NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `personas` int NOT NULL DEFAULT '1',
  `tipo_comision` tinyint DEFAULT NULL,
  `reservacion_id` bigint unsigned DEFAULT NULL,
  `cantidad` int NOT NULL DEFAULT '0',
  `tps_bonificados` decimal(8,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `ventas_divisa_id_foreign` (`divisa_id`),
  KEY `ventas_empleado_id_foreign` (`empleado_id`),
  KEY `ventas_cliente_id_foreign` (`cliente_id`),
  KEY `ventas_reservacion_id_foreign` (`reservacion_id`),
  CONSTRAINT `ventas_cliente_id_foreign` FOREIGN KEY (`cliente_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ventas_divisa_id_foreign` FOREIGN KEY (`divisa_id`) REFERENCES `divisas` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ventas_empleado_id_foreign` FOREIGN KEY (`empleado_id`) REFERENCES `empleados` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `ventas_reservacion_id_foreign` FOREIGN KEY (`reservacion_id`) REFERENCES `reservacions` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `youtube` tinyint(1) NOT NULL DEFAULT '0',
  `model_id` bigint unsigned NOT NULL,
  `model_type` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `websockets_statistics_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `websockets_statistics_entries` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `app_id` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `peak_connection_count` int NOT NULL,
  `websocket_message_count` int NOT NULL,
  `api_message_count` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50001 DROP VIEW IF EXISTS `pais_origen_viajero`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `pais_origen_viajero` AS select `p`.`pais` AS `pais`,count(`v`.`id`) AS `ventas` from (((((`pais` `p` join `estados` `e` on((`p`.`id` = `e`.`pais_id`))) join `ciudads` `c` on((`e`.`id` = `c`.`estado_id`))) join `users` `u` on((`c`.`id` = `u`.`ciudad_id`))) join `rols` `r` on((`u`.`rol_id` = `r`.`id`))) join `ventas` `v` on((`u`.`id` = `v`.`cliente_id`))) where (`r`.`nombre` = 'Viajero') group by `p`.`pais` order by `ventas` desc limit 5 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (282,'0000_00_00_000000_create_websockets_statistics_entries_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (283,'2013_10_12_000000_create_rols_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (284,'2014_10_12_000000_create_users_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (285,'2014_10_12_100000_create_password_resets_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (286,'2019_08_19_000000_create_failed_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (287,'2019_12_14_000001_create_personal_access_tokens_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (288,'2021_03_01_032536_create_jobs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (289,'2021_03_01_033808_create_sessions_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (290,'2021_03_08_171321_create_notifications_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (291,'2021_09_23_193336_create_permisos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (292,'2022_07_25_091154_create_pais_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (293,'2022_07_25_091303_create_estados_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (294,'2022_07_25_091416_create_ciudades_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (295,'2022_07_30_173117_create_categoria_faqs_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (296,'2022_08_01_113733_create_negocio_categorias_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (297,'2022_08_02_134332_create_solicituds_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (298,'2022_11_22_105333_create_divisas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (299,'2022_12_03_135113_create_estado_cuentas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (300,'2022_12_03_135613_create_movimientos_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (301,'2022_12_06_083940_create_iatas_table',1);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (302,'2022_12_07_164801_create_telefonos_table',2);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (303,'2022_12_08_161326_create_imagens_table',3);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (308,'2022_12_08_175739_create_destinos_table',4);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (309,'2022_12_08_181246_create_atraccions_table',4);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (310,'2022_12_12_080621_create_horarios_table',5);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (312,'2022_12_12_135301_create_eventos_table',6);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (314,'2022_12_14_212639_update_solicituds_table',7);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (324,'2022_12_14_222433_create_negocios_table',8);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (326,'2022_12_25_142508_update_solicituds_table',9);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (327,'2022_12_29_195250_create_likes_table',10);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (330,'2023_01_05_175912_create_opinions_table',11);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (331,'2023_01_06_203709_create_cargos_table',12);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (333,'2023_01_06_233949_create_empleados_table',13);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (336,'2023_01_09_010249_create_permisos_asignados_table',14);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (337,'2023_01_09_012655_create_panels_table',14);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (338,'2023_01_15_153314_create_amenidads_table',15);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (339,'2023_01_15_170637_create_forma_pagos_table',15);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (340,'2023_01_17_115625_update_negocios_table',16);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (341,'2023_01_17_141249_create_reds_table',17);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (342,'2023_01_17_205043_create_videos_table',18);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (343,'2023_01_19_012451_create_publicacions_table',19);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (344,'2023_01_19_171753_create_certificados_table',20);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (345,'2023_01_21_005350_create_ventas_table',21);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (346,'2023_01_22_131949_create_horario_reservacions_table',22);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (347,'2023_01_23_151726_update_horario_reservacions_table',23);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (349,'2023_01_23_203859_create_reservacions_table',24);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (351,'2023_01_25_182019_update_ventas_table',25);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (354,'2023_01_27_173020_sistema',26);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (355,'2023_02_02_141059_create_recomendacions_table',27);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (356,'2023_02_02_173543_create_seguidors_table',28);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (357,'2023_02_05_004807_rename_certificados_table',29);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (358,'2023_02_06_161312_create_cupon_usuario_table',30);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (359,'2023_02_09_160605_update_opinions_table',31);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (360,'2023_02_13_145922_create_categoria_productos_table',32);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (363,'2023_02_13_150158_create_tiendas_table',33);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (364,'2023_02_13_150755_create_productos_table',33);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (365,'2023_02_16_154002_update_productos_table',34);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (366,'2023_02_16_193808_update_ventas_table',35);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (367,'2023_02_16_195132_create_consumos_table',36);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (368,'2023_02_17_122801_update_productos_table',37);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (369,'2023_02_17_142956_update_tiendas_table',38);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (370,'2023_02_17_162328_update_consumos_table',39);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (371,'2023_02_18_165929_update_opinions_table',40);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (376,'2023_02_20_152123_update_productos_table',41);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (379,'2023_02_21_160712_create_carrito_productos_table',42);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (380,'2023_02_24_021612_update_consumos_table',43);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (381,'2023_02_24_224127_update_negocio_table',44);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (382,'2023_02_26_015428_update_horarios_table',45);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (383,'2023_02_27_132901_update_negocios_table',46);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (384,'2023_02_28_014557_update_sistemas_table',47);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (386,'2023_03_04_125222_create_sucursals_table',48);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (389,'2023_03_09_130847_update_sistema_table',49);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (390,'2023_03_10_144012_update_eventos_table',49);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (391,'2023_03_21_155608_create_comisions_table',50);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (392,'2023_04_14_155822_update_usuario_referencia_table',51);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (395,'2023_04_16_000259_create_datos_pagos_table',52);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (396,'2023_04_20_162829_create_retiros_table',53);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (397,'2023_04_21_155528_update_movimientos_table',54);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (399,'2023_04_29_180506_update_users_table',55);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (400,'2023_05_03_155509_update_negocios_table',56);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (401,'2023_05_05_232933_update_users_table',57);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (405,'2023_05_15_150022_create_academia_videos_table',58);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (406,'2023_05_16_155115_create_vav_table',58);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (407,'2023_05_16_162730_create_var_table',58);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (408,'2023_05_20_165935_update_sistemas_table',59);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (411,'2023_05_25_182405_update_productos_table',60);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (413,'2023_05_27_010323_update_carrito_productos_table',61);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (414,'2023_05_27_042720_update_consumo_productos_table',62);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (415,'2023_05_27_154346_update_consumos_table',63);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (416,'2023_05_29_002515_update_carrito_productos_table',64);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (417,'2023_05_29_141335_update_consumos_table',65);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (418,'2023_05_30_213831_update_destinos_table',66);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (421,'2023_06_01_011226_create_paginas_table',67);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (423,'2023_06_02_145754_update_paginas_table',68);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (424,'2023_06_08_210544_update_ventas_table',69);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (426,'2023_06_10_193907_update_destinos_travel',70);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (434,'2023_06_12_164152_create_lotes_table',71);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (435,'2023_06_12_172403_create_tarjetas_table',71);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (436,'2023_06_23_173741_update_tarjetas_table',72);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (437,'2023_06_26_153017_update_lotes_table',73);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (438,'2023_06_28_024849_update_tarjetas_table',74);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (439,'2023_06_29_023547_create_mensajes_vonages_table',75);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (440,'2023_07_04_213953_update_sistemas_table',76);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (441,'2023_07_09_164700_update_users_table',77);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (442,'2023_07_20_182716_update_negocios_table',78);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (446,'2023_07_21_224008_create_reunions_table',79);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (448,'2023_07_26_234133_update_users_table',80);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (452,'2023_07_31_184906_update_users_table',81);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (453,'2023_08_15_023822_update_retiros_table',82);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (454,'2023_08_28_181824_update_users_table',83);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (458,'2023_09_02_165749_create_invitacions_table',84);
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES (459,'2023_09_02_193107_update_personal_access_tokens_table',84);
