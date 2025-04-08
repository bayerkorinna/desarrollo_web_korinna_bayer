# Biblioteca Personal 

## Descripción

Según lo conversado y confirmado por correo, en lugar de seguir exactamente el enunciado original de la tarea, desarrollé este prototipo de una biblioteca personal en línea.

Esta aplicación web funciona como una biblioteca personal en línea para catalogar tu colección de libros físicos. El objetivo principal es ofrecer una interfaz intuitiva para registrar, gestionar y analizar tus libros, incluyendo información relevante como el estado de lectura, reseñas y la portada del libro.

Cada entrada de libro incluye la siguiente información:

- **Fecha de ingreso** a la colección  
- **Título** (obligatorio, máximo 200 caracteres)  
- **Autor** (obligatorio, máximo 100 caracteres)  
- **Género** (opcional)  
- **Estado de lectura** (leído/no leído)  
  - Si ha sido leído:
    - **Fecha de lectura**
    - **Reseña** con puntuación de 1.0 a 5.0 (con un decimal)
- **Imagen de la portada** (opcional)

(A futuro, la idea es poder escanear el código de barras del libro y que el formulario se rellene automáticamente con los datos disponibles.)

---

## Funcionalidades

### Portada
- Muestra los cinco libros añadidos más recientemente
- Cada entrada muestra información clave (como título, autor y estado)  
- Incluye botones de navegación hacia:
  - Añadir un nuevo libro
  - Ver la colección completa
  - Ver estadísticas de lectura

---

### Añadir Libros

Permite al usuario agregar un nuevo libro a su biblioteca personal.

**Campos del formulario:**

- **Título** *(obligatorio)*
- **Autor** *(obligatorio)*
- **Género** *(opcional)*
- **Estado de lectura**:
  - Si se marca como “leído”, el usuario también debe ingresar:
    - Fecha de lectura
    - Una **reseña** con puntuación entre 1.0 y 5.0
- **Imagen de la portada** *(opcional)*

Este formulario incluye distintos tipos de entradas como campos de texto, menús desplegables, casillas de verificación y subida de imágenes.

---

### Listado de Libros

- Muestra una lista completa de todos los libros registrados  
- Diseño similar al de la página principal, pero con información más detallada  
- Pensado para permitir en el futuro funcionalidades como filtrado, ordenamiento o búsqueda

---

### Estadísticas

Visualiza tus hábitos de lectura mediante gráficos:

- **Gráfico de barras** con la cantidad de libros leídos por mes  
- **Gráfico de pastel** con la distribución de géneros  
- **Gráfico de barras** con la cantidad de libros por puntuación

---
