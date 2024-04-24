# Informe #2 nestjs
- Juan Jose Diaz
- Luis Charria
- Mateo Silva
---

Esta es una descripción detallada de lo que hace cada endpoint.

## Module Client_Professional

### Controller `appointment`

- **Creación de citas**
  - Método: `POST /appointment/:client_id/:professional_id`
  - Descripción: Permite a un cliente programar una cita con un profesional.
  - Requiere autenticación de cliente y roles de cliente.
  
- **Listar todas las citas**
  - Método: `GET /appointment`
  - Descripción: Obtiene todas las citas programadas.
  - Requiere autenticación.

- **Obtener detalles de una cita**
  - Método: `GET /appointment/:id`
  - Descripción: Obtiene detalles de una cita específica por su ID.
  - Requiere autenticación.

- **Eliminar una cita**
  - Método: `DELETE /appointment/:id`
  - Descripción: Permite al cliente cancelar una cita.
  - Requiere autenticación de cliente y roles de cliente.

---

### Controller `questions`

- **Hacer una pregunta**
  - Método: `POST /questions/:client_id/:professional_id`
  - Descripción: Permite a un cliente hacer una pregunta a un profesional.
  - Requiere autenticación de cliente y roles de cliente.
  
- **Listar todas las preguntas**
  - Método: `GET /questions`
  - Descripción: Obtiene todas las preguntas realizadas.
  - Requiere autenticación.

- **Obtener detalles de una pregunta**
  - Método: `GET /questions/:id`
  - Descripción: Obtiene detalles de una pregunta específica por su ID.
  - Requiere autenticación.

- **Eliminar una pregunta**
  - Método: `DELETE /questions/:id`
  - Descripción: Permite al cliente eliminar una pregunta.
  - Requiere autenticación de cliente y roles de cliente.

---

### Controller `reviews`

- **Listar todas las reseñas**
  - Método: `GET /reviews`
  - Descripción: Obtiene todas las reseñas realizadas.
  - Requiere autenticación.

- **Registrar una reseña**
  - Método: `POST /reviews/client/:id_client/profesional/:id_professional`
  - Descripción: Permite a un cliente dejar una reseña para un profesional.
  - Requiere autenticación de cliente.

- **Eliminar una reseña**
  - Método: `DELETE /reviews/:id_review`
  - Descripción: Permite al cliente eliminar una reseña que haya dejado.
  - Requiere autenticación.

---

## Modulo Client

### Controller `clients`

- **Crear un cliente**
  - Método: `POST /clients`
  - Descripción: Permite crear un nuevo cliente.
  
- **Listar todos los clientes**
  - Método: `GET /clients`
  - Descripción: Obtiene una lista de todos los clientes.

- **Obtener detalles de un cliente**
  - Método: `GET /clients/:id`
  - Descripción: Obtiene detalles de un cliente específico por su ID.

- **Actualizar un cliente**
  - Método: `PATCH /clients/:id`
  - Descripción: Permite actualizar la información de un cliente.

- **Eliminar un cliente**
  - Método: `DELETE /clients/:id`
  - Descripción: Permite eliminar un cliente.

---

## Modulo professional

### Controller `professionals`

- **Crear un profesional**
  - Método: `POST /professionals`
  - Descripción: Permite crear un nuevo profesional.

- **Listar todos los profesionales**
  - Método: `GET /professionals`
  - Descripción: Obtiene una lista de todos los profesionales.

- **Obtener detalles de un profesional**
  - Método: `GET /professionals/:id`
  - Descripción: Obtiene detalles de un profesional específico por su ID.

- **Actualizar un profesional**
  - Método: `PATCH /professionals/:id`
  - Descripción: Permite actualizar la información de un profesional.

- **Eliminar un profesional**
  - Método: `DELETE /professionals/:id`
  - Descripción: Permite eliminar un profesional.

- **Agregar un servicio a un profesional**
  - Método: `POST /professionals/service/:id_professional/:id_service`
  - Descripción: Permite a un profesional agregar un servicio a su lista de servicios ofrecidos.

- **Agregar una especialidad a un profesional**
  - Método: `POST /professionals/specialities/:id_professional/:id_speciality`
  - Descripción: Permite a un profesional agregar una especialidad a su lista de especialidades.

- **Agregar una ciudad a un profesional**
  - Método: `POST /professionals/city/:id_city/professional/:id_professional`
  - Descripción: Permite a un profesional agregar una ciudad a su lista de ciudades atendidas.

- **Listar servicios de un profesional**
  - Método: `GET /professionals/services/:id_professional`
  - Descripción: Obtiene una lista de servicios ofrecidos por un profesional.

- **Listar especialidades de un profesional**
  - Método: `GET /professionals/specialities/:id_professional`
  - Descripción: Obtiene una lista de especialidades de un profesional.

- **Buscar profesionales por ciudad**
  - Método: `GET /professionals/city/:city_name`
  - Descripción: Obtiene una lista de profesionales que ofrecen servicios en una ciudad específica.

---

### Controller `services`

- **Crear un servicio**
  - Método: `POST /services`
  - Descripción: Permite crear un nuevo servicio.

- **Listar todos los servicios**
  - Método: `GET /services`
  - Descripción: Obtiene una lista de todos los servicios.

- **Obtener detalles de un servicio**
  - Método: `GET /services/:id`
  - Descripción: Obtiene detalles de un servicio específico por su ID.

- **Buscar servicios por título**
  - Método: `GET /services/title/:title`
  - Descripción: Obtiene una lista de servicios que coinciden con un título específico.

- **Buscar servicios por precio**
  - Método: `GET /services/price/:price`
  - Descripción: Obtiene una lista de servicios que coinciden con un precio específico.

- **Buscar servicios por ciudad**
  - Método: `GET /services/city/:city_name`
  - Descripción: Obtiene una lista de servicios disponibles en una ciudad específica.

- **Buscar servicios por departamento**
  - Método: `GET /services/department/:department_name`
  - Descripción: Obtiene una lista de servicios disponibles en un departamento específico.

- **Actualizar un servicio**
  - Método: `PATCH /services/:id`
  - Descripción: Permite actualizar la información de un servicio.

- **Eliminar un servicio**
  -

 Método: `DELETE /services/:id`
  - Descripción: Permite eliminar un servicio.

---

### Controller `specialities`

- **Crear una especialidad**
  - Método: `POST /specialities`
  - Descripción: Permite crear una nueva especialidad.

- **Listar todas las especialidades**
  - Método: `GET /specialities`
  - Descripción: Obtiene una lista de todas las especialidades.

- **Obtener detalles de una especialidad**
  - Método: `GET /specialities/:id`
  - Descripción: Obtiene detalles de una especialidad específica por su ID.

- **Actualizar una especialidad**
  - Método: `PATCH /specialities/:id`
  - Descripción: Permite actualizar la información de una especialidad.

- **Eliminar una especialidad**
  - Método: `DELETE /specialities/:id`
  - Descripción: Permite eliminar una especialidad.

---

## Modulo Seed

### Controller `seed`

- **Sembrar datos**
  - Método: `POST /seed`
  - Descripción: Permite sembrar datos en la base de datos.

---



### Módulo `auth`

- **Registro y inicio de sesión de clientes**
  - Método: `POST /auth/client/register` y `POST /auth/client/login`
  - Descripción: Permite a los clientes registrarse e iniciar sesión.

- **Registro e inicio de sesión de profesionales**
  - Método: `POST /auth/professional/register` y `POST /auth/professional/login`
  - Descripción: Permite a los profesionales registrarse e iniciar sesión.

- **Acceso a rutas privadas**
  - Método: `GET /auth/client/private` y `GET /auth/professional/private`
  - Descripción: Permite a los usuarios autenticados acceder a rutas privadas según sus roles.

---


## Authentication

- **Objetivo**: La estrategia de autenticación JWT se encarga de validar los tokens JWT proporcionados en las solicitudes entrantes y extraer la información de usuario autenticado para su uso en las rutas protegidas.

- **Implementación**: 
  - La estrategia se implementa mediante la clase `JwtStrategy`, que extiende la clase `PassportStrategy` de `@nestjs/passport` y utiliza la estrategia JWT de `passport-jwt`.
  - Se define el método `validate` para verificar y decodificar el token JWT, obteniendo la carga útil (payload) que contiene la información de usuario.
  - Se utilizan los repositorios de TypeORM para buscar tanto en la entidad `Client` como en la entidad `Professional` según el ID proporcionado en el payload del token.
  - Si se encuentra un usuario en cualquiera de los repositorios, se devuelve como usuario autenticado. En caso contrario, se lanza una excepción `UnauthorizedException`.

- **Configuración**:
  - Se configura el origen del token JWT en las solicitudes entrantes utilizando el método `jwtFromRequest` con `ExtractJwt.fromAuthHeaderAsBearerToken()`.
  - Se establece la opción `ignoreExpiration` en `false` para asegurar que se valide la expiración del token.
  - Se define la clave secreta utilizada para firmar y verificar el token, obtenida del servicio de configuración (`ConfigService`), con una clave predeterminada en caso de que la configuración no esté disponible.

### Protección de Rutas

- **Guardias Utilizados**:
  - Se utiliza el `AuthGuard` de `@nestjs/passport` para proteger las rutas que requieren autenticación.
  - Además del `AuthGuard`, se emplea el `RolesGuard` para validar los roles de usuario autorizados para acceder a las rutas protegidas.

- **Protección de Rutas**:
  - Las rutas que requieren autenticación están decoradas con `@UseGuards(AuthGuard(), RolesGuard)` para asegurar que solo los usuarios autenticados con los roles adecuados puedan acceder a ellas.
  - Esto garantiza que solo los usuarios autenticados puedan acceder a las funcionalidades protegidas de la aplicación y que se apliquen las restricciones de roles definidas.

---

## Autorizacion

---

### Decorador `@Roles`

- **Objetivo**: El decorador `@Roles` se utiliza para asignar roles a las rutas y acciones en la aplicación. Permite especificar qué roles de usuario tienen acceso a una determinada funcionalidad.

- **Implementación**:
  - Se define el decorador `@Roles` utilizando `SetMetadata` de `@nestjs/common`.
  - El decorador acepta un número variable de argumentos de tipo `Role`, que son roles definidos en el archivo `role.enum`.

- **Uso**:
  - Se aplica el decorador `@Roles` a los controladores o métodos de controladores que requieren roles específicos para acceder.
  - Se proporcionan los roles necesarios como argumentos al decorador para especificar los roles permitidos para acceder a la funcionalidad.

### Guardia `RolesGuard`

- **Objetivo**: El guardia `RolesGuard` se encarga de autorizar a los usuarios según los roles asignados a las rutas mediante el decorador `@Roles`.

- **Implementación**:
  - El guardia implementa la interfaz `CanActivate` de `@nestjs/common`.
  - Utiliza el `Reflector` para obtener los roles asignados a una ruta utilizando el `ROLES_KEY` definido en el decorador.
  - Verifica si el usuario actual tiene al menos uno de los roles requeridos para acceder a la funcionalidad.
  - Retorna `true` si el usuario tiene permiso para acceder, y `false` en caso contrario.

- **Proceso de Autorización**:
  - El guardia obtiene los roles requeridos para una ruta específica.
  - Recupera el usuario actual de la solicitud HTTP.
  - Verifica si el usuario tiene al menos uno de los roles requeridos para acceder a la funcionalidad.
  - Retorna `true` si el usuario tiene los roles necesarios, y `false` si no los tiene.

### Protección de Rutas

- **Aplicación del Guardia**:
  - Se utiliza el guardia `RolesGuard` para proteger las rutas que requieren roles específicos para acceder.
  - El guardia se aplica a las rutas utilizando el decorador `@Roles` con los roles requeridos como argumentos.

- **Ejemplo de Protección de Rutas**:
  - Las rutas se protegen especificando los roles necesarios utilizando `@Roles(Role.Professional)`.
  - Esto asegura que solo los usuarios con el rol de profesional tengan acceso a las funcionalidades protegidas por esa ruta.


