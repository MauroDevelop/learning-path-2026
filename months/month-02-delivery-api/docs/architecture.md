# Arquitectura del Proyecto Delivery API

Este proyecto sigue una **Arquitectura en Capas (Layered Architecture)** estricta, diseñada para separar la lógica de negocio de los detalles de infraestructura (Base de datos, Framework HTTP).

## 🏗 Diagrama de Flujo de Datos

El flujo de control siempre va desde el exterior hacia el interior, respetando la **Regla de Dependencia**:

```mermaid
graph TD
    %% Actores Externos
    User((👤 Cliente / Usuario))
    DB[(🗄️ Base de Datos)]

    %% Tu Sistema (Caja Principal)
    subgraph "Backend Delivery API"
        direction TB
        
        %% Componentes Principales
        Controller[📡 Controlador]
        Service[🧠 Servicio]
        Repo[🛠️ Repositorio]
        
        %% Notas explicativas simples
        note1[1. Recibe la petición HTTP y valida datos]
        note2[2. Aplica las reglas del negocio]
        note3[3. Se conecta con la base de datos]

        %% Conexiones visuales de las notas (Estilo punteado)
        Controller -.- note1
        Service -.- note2
        Repo -.- note3
    end

    %% Flujo de la Información (Flechas)
    User -->|Petición JSON| Controller
    Controller -->|Llama a| Service
    Service -->|Consulta a| Repo
    Repo -->|SQL| DB
    
    %% Retorno (Opcional, para entender que vuelve)
    DB -.->|Datos| Repo
    Repo -.->|Entidad| Service
    Service -.->|Respuesta| Controller
    Controller -.->|Respuesta JSON| User
```