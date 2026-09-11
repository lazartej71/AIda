# AIda – Asistente Institucional UTN FRT

**Trabajo Final – Tecnicatura Universitaria en Programación – UTN FRT**

Sistema de gestión de consultas y conocimiento académico con panel web y asistente conversacional basado en IA.

🔗 **Demo en vivo:** [https://aidautn.netlify.app](https://aidautn.netlify.app)

## Integrantes
- Lazarte, Jorge Exequiel
- Díaz, Juan Gabriel

## Descripción breve
AIda es una plataforma integral que centraliza la información académica de la UTN FRT (mesas de examen, inscripciones, correlativas, trámites, ingreso de nuevos estudiantes, calendario) y la pone a disposición de los estudiantes a través de un asistente conversacional inteligente, con citas de fuentes oficiales y derivación a personal humano cuando no se tiene certeza. Además, incluye un panel de gestión para Bedelía, Alumnado y Secretaría para cargar y actualizar la información, atender consultas derivadas y medir métricas de uso.

## Tecnologías utilizadas
- **HTML5 semántico**
- **CSS3** (variables, Flexbox, Grid, media queries) — desarrollado en el TP2
- **Bootstrap 5** (vía CDN) — interfaz refactorizada en el TP3
- **Git & GitHub** (control de versiones, ramas `main`/`dev`/`refactor/*`, Pull Requests)
- **Netlify** (deploy y hosting)

---

## TP2 — CSS puro (base del proyecto)

> El CSS original de esta etapa se conserva **comentado** (no eliminado) dentro de `css/styles.css`, como respaldo del trabajo realizado.

### ¿Dónde utilizaron Flexbox?
- En el **header** original, para distribuir el logo y la navegación horizontalmente.
- En el **hero** original, para alinear el texto de forma flexible.
- En el **footer**, para separar la información institucional del logo.

### ¿Dónde utilizaron Grid?
- En la sección **"Cómo funciona"**, donde las tarjetas se organizaban en una cuadrícula adaptable (`grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`).

### ¿Qué variables CSS crearon?
- Colores principales: `--color-primary`, `--color-primary-light`, `--color-primary-dark`
- Colores de fondo: `--color-bg`, `--color-bg-alt`
- Colores de texto: `--color-text`, `--color-text-light`
- Espaciados: `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`
- Otros: `--border-radius`, `--box-shadow`, `--transition`

Estas variables se siguen usando en el TP3, combinadas con las clases de Bootstrap (por ejemplo en `style="background-color: var(--color-primary)"`).

### ¿Cómo implementaron el Responsive Design (TP2)?
Se utilizaron breakpoints con `@media` (900px y 600px) para adaptar el header, el hero y los grids a tablet y celular, junto con unidades flexibles como `%`, `vh`, `fr` y `rem`.

---

## TP3 — Refactorización con Bootstrap

En esta etapa **no se agregaron funcionalidades nuevas**: se refactorizó la interfaz existente utilizando componentes y utilidades de **Bootstrap 5**, manteniendo el CSS propio del TP2 comentado como respaldo.

### Organización del trabajo (ramas)
Cada sector de la página se trabajó en una rama independiente, creada desde `dev`:

```
dev
├── refactor/navbar-hero      → Lazarte, Jorge Exequiel
├── refactor/secciones        → Díaz, Juan Gabriel
├── refactor/footer           → Díaz, Juan Gabriel
└── refactor/ajustes-globales → correcciones finales (favicon, imágenes, conflictos con Bootstrap)
```

Cada rama se integró a `dev` mediante Pull Request con revisión asignada, y finalmente `dev` se mergeó a `main`.

### Componentes de Bootstrap utilizados
- **Navbar** (`navbar`, `navbar-expand-lg`, `navbar-toggler`, `collapse`) con menú hamburguesa responsive.
- **Grid system** (`container`, `row`, `col-lg-*`, `row-cols-*`) para el hero, las cards y el panel institucional.
- **Cards** (`card`, `card-body`, `card-header`) para "Cómo funciona", el mockup del asistente y el panel.
- **Utilidades de Flexbox** (`d-flex`, `flex-wrap`, `flex-column flex-md-row`, `gap-*`) en la sección "Temas" y el footer.
- **Input group** (`input-group`, `form-control`) en el mockup del chat.
- **Botones** (`btn`, `btn-warning`, `btn-lg`, `rounded-pill`).
- **Utilidades de espaciado y color** (`py-5`, `mb-3`, `text-white`, `shadow-sm`, `bg-white`).

### Manejo de conflictos con clases nativas de Bootstrap
Durante la refactorización se detectaron nombres de clases propias que colisionaban con clases nativas de Bootstrap:
- `.container` (propia) pisaba los anchos responsive del `.container` de Bootstrap → se comentó.
- `.btn-primary` (propia) coincidía con el botón nativo de Bootstrap → se comentó para evitar conflictos de estilos.
- `.card` (propia) se mantuvo parcialmente activa a propósito, solo para agregar un efecto `hover` que Bootstrap no trae por defecto.

### Responsive Design (TP3)
El responsive ahora se apoya en el sistema mobile-first de Bootstrap en lugar de media queries propias:
- `col-lg-7`, `row-cols-1 row-cols-md-3`, `col-10 col-sm-6 col-lg-3` adaptan las columnas automáticamente según el ancho de pantalla.
- El navbar colapsa a un menú hamburguesa por debajo del breakpoint `lg`.
- `flex-column flex-md-row` reordena el footer de apilado (mobile) a horizontal (desktop).

---

## Estrategias de SEO implementadas
1. **Título único y descriptivo** en la etiqueta `<title>`.
2. **Meta descripción** clara y atractiva (`<meta name="description">`).
3. **Jerarquía de encabezados** correcta: `h1` → `h2` → `h3`.
4. **Etiquetas semánticas** (`nav`, `main`, `section`, `article`, `footer`) para mejorar la estructura del documento.
5. **Atributos `alt`** en todas las imágenes, describiendo su contenido.
6. *(Extra)* Etiquetas **Open Graph** (`og:title`, `og:description`, `og:type`) para una mejor presentación al compartir el sitio en redes sociales.

---

## Estructura del proyecto
```
AIda/
├── css/
│   └── styles.css
├── img/
│   ├── logoAIda.png
│   ├── PortadaAIda.jpg
│   └── favicon.png
├── index.html
└── README.md
```

## Deploy
El proyecto está desplegado de forma continua en **Netlify** a partir de la rama `main`:
👉 [https://aidautn.netlify.app](https://aidautn.netlify.app)