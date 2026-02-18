# Setup y Configuración del Entorno

Este documento describe cómo ejecutar el Mes 01 localmente y cómo configurar el entorno para los módulos avanzados.

---

## Quick Start

Sigue estos pasos para ejecutar el proyecto localmente:

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/MauroDevelop/learning-path-2026.git
```
### 2️⃣ Entrar al mes 01

```bash
cd learning-path-2026/month-01-foundations
```

### 3️⃣ Instalar dependencias

```bash
npm install
```

### 4️⃣ Ejecutar un módulo (ejemplo: módulo 08)

```bash
npm run dev:08
```

### 5️⃣ Ejecutar todos los tests

```bash
npm run test
```

##  Configuración de Variables de Entorno
Este proyecto requiere una conexión a base de datos para los módulos avanzados (Módulo 28 en adelante).
Crea un archivo `.env` en la raíz del proyecto y asegúrate de definir la variable `DATABASE_URL` con tus credenciales de MySQL local (ej: Laragon/XAMPP).

Ejemplo de `.env`:
```env
DATABASE_URL="mysql://root:@localhost:3306/mi_base_de_datos"
```
### Asegúrate de:

- Tener MySQL en ejecución

- Crear previamente la base de datos

- Mantener las credenciales locales seguras