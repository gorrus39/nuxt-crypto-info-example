# Nuxt Crypto Info Example

Простой и гибкий проект на Nuxt.js для отображения истории цен криптовалют, таких как Bitcoin к USD. Позволяет выбирать разные платформы для получения данных, делать запросы за криптовалютами и отображать интерактивные графики.

---

## Возможности

- Отображение истории цен криптовалют с визуализацией на графиках
- Поддержка выбора различных платформ (например, бирж) для получения данных
- Гибкое и простое добавление новых платформ без изменения базового кода
- Хранение данных в базе PostgreSQL (через Docker)

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant DB as Database
    participant Platform as Remote Source Platform

    Client->>Server: Request data (GET)
    Server->>DB: Query  data
    alt Data is available
        DB-->>Server: Return  data
        Server-->>Client: Return data
    else Data not available
        DB-->>Server: Data not found
        Server-->>Client: Notify data not available
    end

    Client->>Server: Submit request for new data (POST)
    Server->>Platform: Fetch data from platform API
    Platform-->>Server: Return new data
    Server->>DB: Store new data
    Server-->>Client: Return fetched data

```
