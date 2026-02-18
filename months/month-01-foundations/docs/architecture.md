## Estándar de Arquitectura (Layered Architecture)
A partir del Módulo 25, los modulos siguen una **Arquitectura en Capas** . Este diseño busca separar las reglas de negocio de las herramientas externas (Express, Bases de Datos).

### Estructura de Carpetas
Cada módulo o funcionalidad debe respetar la siguiente organización dentro de `src/`:

```text
src/
├── core/                       # CAPA DE DOMINIO (El "Qué")
│   ├── entities/               # ➜ Clases puras que definen los datos (ej: User.ts, Product.ts)
│   └── interfaces/             # ➜ Contratos que deben cumplir los repositorios (Inversión de Dependencias)
│
├── services/                   # CAPA DE APLICACIÓN (El "Cómo")
│   └── [Name]Service.ts        # ➜ Lógica de negocio, validaciones y casos de uso.
│                               #    Solo se comunica con 'core' y nunca toca la BD directamente.
│
├── infrastructure/             # CAPA DE INFRAESTRUCTURA (Detalles Técnicos)
│   ├── controllers/            # ➜ Manejo de HTTP (req, res). Traduce peticiones web a llamadas de servicio.
│   └── repositories/           # ➜ Implementación real de la BD (Memoria, FS, SQL). Cumple las interfaces de 'core'.
│
├── middlewares/                # Validaciones transversales (Autenticación, Zod, Errores)
└── index.ts                    # PUNTO DE ENTRADA (Composition Root)
                                # ➜ Aquí se crean las instancias y se inyectan las    
                                dependencias manualmente.
```

### Capas Definidas

#### **1. Capa de Dominio (Core)**
Contiene las reglas de negocio esenciales del sistema, representadas a través de:
- Entidades de dominio
- Interfaces (contratos) de repositorios

Esta capa es independiente de cualquier detalle técnico o framework y no debería depender de código externo.

---

#### **2. Capa de Aplicación (Services)**
Implementa los casos de uso y la lógica de negocio que corresponde a las reglas del dominio. Se comunica con la Capa de Dominio a través de interfaces, y con la infraestructura mediante inyección de dependencias, sin conocer implementaciones específicas (por ejemplo, bases de datos o frameworks).

Responsabilidades principales:
- Orquestar operaciones de negocio
- Aplicar validaciones
- Asegurar flujo correcto entre dominios y repositorios

---

#### **3. Capa de Infraestructura**
Contiene implementaciones concretas de detalles técnicos externos al dominio, tales como:
- Servidor HTTP (Express)
- Repositorios de datos concretos (Prisma, filesystem, memoria)
- Integraciones con librerías y servicios externos

Es la única capa que depende de frameworks y herramientas, y su responsabilidad es traducir las abstracciones de las capas superiores a acciones concretas.

---

#### **4. Composition Root**
Es el punto de entrada a la aplicación donde se:
- Configuran instancias de clases
- Se construyen las dependencias
- Se inyectan servicios y repositorios concretos

Generalmente está representado por el archivo principal (p. ej. `index.ts`) y actúa como ensamblador del sistema.

---

### Beneficios de esta Arquitectura

- **Separación de responsabilidades:** Cada capa tiene un rol claramente definido.
- **Desacoplamiento:** Las capas superiores no dependen de detalles concretos de infraestructura.
- **Testabilidad:** Las piezas pueden probarse de manera aislada usando mocks y stubs.
- **Escalabilidad:** Facilita la extensión de la aplicación sin afectar otras partes.

Este enfoque permite construir aplicaciones limpias, mantenibles y robustas, alineadas con las mejores prácticas modernas de ingeniería de software.
