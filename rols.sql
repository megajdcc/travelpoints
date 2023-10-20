

INSERT INTO `rols` (`id`, `nombre`, `created_at`, `updated_at`) VALUES
(1, 'Desarrollador', '2022-11-28 19:17:42', '2022-11-28 19:17:42'),
(8, 'Coordinador', '2023-03-22 12:56:24', '2023-03-22 12:56:24'),
(7, 'Promotor', '2023-03-22 12:55:36', '2023-03-22 12:55:36'),
(5, 'Administrador', '2022-12-10 00:10:36', '2022-12-10 00:10:36'),
(6, 'Viajero', '2022-12-10 00:10:36', '2023-04-18 21:03:46'),
(9, 'Lider', '2023-03-22 12:58:29', '2023-03-22 12:58:29'),
(10, 'Negocio', '2023-05-18 11:48:33', '2023-05-18 11:48:33'),
(11, 'Shop Manager', '2023-06-14 21:40:47', '2023-06-14 21:40:47');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `rols`
--
ALTER TABLE `rols`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `rols`
--
ALTER TABLE `rols`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
