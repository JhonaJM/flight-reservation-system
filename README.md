  

# flight-reservation-system
Este proyecto está desarrollado utilizando una arquitectura de microservicios con **NodeJS** y **NestJS**, siguiendo buenas prácticas y principios SOLID. A continuación, se detallan los aspectos clave del proyecto:
## Estructura del Proyecto

El proyecto está estructurado en varios microservicios para gestionar diferentes aspectos de una aplicación compleja.

- **Client-gateway**: Gestiona el punto de entrada del

- **Flight-service** Gestiona la información relacionada con los vuelos.

- **Reservation-service**: Gestiona la informacion de las reservas relacionada con los segmentos, pasajeros del vuelo y sus estados tales como pendiente, emitido, cancelado.

- **Payment-service**: Gestiona el procesamiento de pagos mediante integración con Stripe.
![Arquitectura del proyecto](https://i.ibb.co/R2sTpKS/CLIENTES-2.png)

## Tecnologías Utilizadas

- **NodeJS**: Plataforma para la ejecución de código JavaScript del lado del servidor.

- **NestJS**: Framework de NodeJS para la creación de aplicaciones eficientes y escalables en TypeScript.

- **NATS**: Sistema de mensajería y comunicación diseñado para entornos de alta disponibilidad y rendimiento. Su eficacia se fundamenta en un robusto balanceador de carga, que optimiza la distribución de mensajes entre los microservicios, lo que es fundamental para resolver desafios de configuracion ente multiples servicios.

- **Docker**: Plataforma de contenedores que facilita el empaquetado, envío y ejecución de aplicaciones en entornos aislados.

- **PostgreSQL**: Sistema de gestión de bases de datos relacional utilizado para almacenar y administrar datos de manera eficiente.

- **Stripe**: Plataforma de pagos en línea que facilita la aceptación de pagos y la gestión de operaciones financieras de forma segura y eficiente.

## Principios y Buenas Prácticas

***Principio de Responsabilidad Única (Single Responsibility Principle***)
Cada microservicio se centra en una única responsabilidad dentro del sistema, asegurando que cada componente sea fácil de entender, mantener y escalar.

***Uso de NATS para Comunicación entre Microservicios***
NATS se utiliza como protocolo de comunicación entre microservicios debido a sus características de alta velocidad, bajo acoplamiento y facilidad de integración con NestJS.

***Implementación del Patrón SAGA***

Para gestionar transacciones entre microservicios con bases de datos separadas, se ha implementado el patrón SAGA. Este enfoque permite mantener la consistencia de los datos a través de múltiples operaciones distribuidas.
# Modelo de datos
Se seleccionó PostgreSQL por su soporte robusto para datos relacionales, lo cual es fundamental para estructuras complejas como las de reservas de vuelos que implican múltiples relaciones entre entidades (vuelos, segmentos, pasajeros, etc.). Esto garantiza la integridad referencial y facilita consultas complejas.

**Principios SOLID y Buena Práctica:**
El diseño del esquema sigue principios como SRP (Single Responsibility Principle) al separar claramente las responsabilidades entre modelos, facilitando la extensibilidad y mantenibilidad del sistema.


## FlightDatabase
### Tabla Flight:
Almacena información esencial de un vuelo como el código de la aerolínea, ciudades de salida y llegada, número de vuelo, horarios, fecha de vuelo, asientos disponibles, moneda y precio.
Se definiero indices en las ciudades de salida `departureCity` y ciudades de llegada `arrivalCity` para optimizar consultas frecuentes, ya que es frecuente este tipo de busquedas en este tipo de negocio.

## ReservationDatabase
### Tabla Reservation:
Contiene detalles clave de una reserva como el identificador único (generado automáticamente), localizador PNR, estado de la reserva, moneda, monto total, ID de cargo de Stripe (opcional), URL del recibo, fecha de creación y actualización.
Se utiliza un enum (`ReservationStatus`) para gestionar el estado de la reserva, facilitando la comprensión y manipulación del estado de la reserva.
### Tabla Segments
Representa segmentos individuales de vuelo asociados a una reserva, incluyendo detalles como el ID del vuelo (`Flight Table`), código de aerolínea, ciudades de salida y llegada, moneda y precio. Mantiene relacion con la reserva permitiendo una relacion clara entre segmentos y reserva.
### Tabla Passengers
Guarda información de cada pasajero como nombres, apellidos, tipo de identificación, número de documento y código de tipo. Mantiene una relacion con la reserva permitiendo una asociacion clara entre la reserva, pasajero y segmentos.
### Tabla TicketInformation
Almacena detalles específicos de los boletos asociados a una reserva, como el número de boleto. Permite guardar los datos de un boleto posterior a su emisión.
### Consideraciones para clonar el proyecto
- Instalar Docker
- Acceder a [Stripe](https://stripe.com/es) (plataforma de pagos)
- Acceder a  [hookdeck](https://hookdeck.com/) para generar puerta de enlace para el payment-service con Stripe
# Dev
1.  Clonar el repositorio
2.  Crear un `.env` basado en el `.env.template` por cada microservicio
3. Instalar las dependencias por cada microservicio `npm install`
4. Ejecutar el comando  `docker compose up --build` en la raiz del proyecto para que todos los microservicios y bases de datos inicienn.
![Contener con el proyecto en ejecución](https://i.ibb.co/9Vgz13R/Whats-App-Image-2024-07-16-at-02-50-50.jpg)

5. Ejecutar el comando  `hookdeck  listen  3003  stripe-to-localhost` para poder escuchar el `charge.succeeded ` del pago y actualizar el estado de la reserva.
# Resultados

> uso de postam

### Registro de vuelos
![enter image description here](https://i.ibb.co/W61Sgmc/save-flight.png)

### Busqueda de vuelos paginados
![enter image description here](https://i.ibb.co/xsYyvnm/fin-flights.png)
### Reserva un vuelo
![enter image description here](https://i.ibb.co/Rh38Wk0/RESERVATION.png)
### Pago y emision de una reserva
![enter image description here](https://i.ibb.co/JxfTGSj/pay-reservation.png)
![enter image description here](https://i.ibb.co/xC6kpsb/pay-sucess.png)
