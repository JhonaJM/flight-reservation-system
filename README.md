# flight-reservation-system
# flight-reservation-system
Este proyecto está desarrollado utilizando una arquitectura de microservicios con NodeJS y NestJS, siguiendo buenas prácticas y principios SOLID. A continuación, se detallan los aspectos clave del proyecto:

## Estructura del Proyecto
El proyecto está estructurado en varios microservicios para gestionar diferentes aspectos de una aplicación compleja.

![alt text](image.png)

## Tecnologías Utilizadas
NodeJS: Plataforma para la ejecución de código JavaScript del lado del servidor.
NestJS: Framework de NodeJS para la creación de aplicaciones eficientes y escalables en TypeScript.
NATS: Sistema de mensajería y comunicación diseñado para entornos de alta disponibilidad y rendimiento. Su eficacia se fundamenta en un robusto balanceador de carga, que optimiza la distribución de mensajes entre los microservicios, lo que es fundamental para resolver desafios de configuracion ente multiples servicios.
Docker: Plataforma de contenedores que facilita el empaquetado, envío y ejecución de aplicaciones en entornos aislados.
PostgreSQL: Sistema de gestión de bases de datos relacional utilizado para almacenar y administrar datos de manera eficiente.
Stripe: Plataforma de pagos en línea que facilita la aceptación de pagos y la gestión de operaciones financieras de forma segura y eficiente.


##Dev

1. Clonar el proyecto
2. Crear un .env basado en el .env.template
3. Ejecutar el comando `docker compose up --build`
##Dev

1. Clonar el proyecto
2. Crear un .env basado en el .env.template
3. Ejecutar el comando `docker compose up --build`

