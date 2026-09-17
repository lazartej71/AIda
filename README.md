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
- **JavaScript (ES6+)** — interactividad y manipulación del DOM añadidas en el TP4
- **Git & GitHub** (control de versiones, ramas `main`/`dev`/`refactor/*`/`feature/*`, Pull Requests)
- **Netlify** (deploy y hosting)

---

## TP2 — CSS puro (base del proyecto)

> El CSS original de esta etapa se conserva **comentado** (no eliminado) dentro de `css/styles.css`, como respaldo del trabajo realizado.

### ¿Dónde utilizaron Flexbox?

**En el TP2** (código conservado comentado en `css/styles.css`):
- En el **header**, para distribuir el logo y la navegación horizontalmente.
- En el **hero**, para alinear el texto de forma flexible.
- En el **footer**, para separar la información institucional del logo.

**En la versión actual**, Flexbox sigue siendo la base del layout: la barra de navegación, el encabezado de cada sección (`.sec-head`), los ítems de la grilla de temas, las métricas de la portada y toda la consola del asistente (registro, chips y barra de entrada).

### ¿Dónde utilizaron Grid?

**En el TP2** (conservado comentado):
- En **"Cómo funciona"**, con `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))`.

**En la versión actual**, la grilla propia fue reemplazada por el sistema `row` / `col` de Bootstrap en las secciones de conceptos, temas y en el pie. El CSS Grid propio se conserva comentado y sigue en uso en el bloque de preguntas frecuentes, que se arma con `display: grid` y separadores de 1px.

### ¿Qué variables CSS crearon?

**En el TP2** se definió una paleta institucional (conservada comentada en el bloque `VARIABLES TP2` de `css/styles.css`):
- Colores: `--color-primary`, `--color-primary-light`, `--color-primary-dark`, `--color-accent`
- Fondos y texto: `--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-light`
- Espaciados: `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`
- Otros: `--border-radius`, `--box-shadow`, `--transition`, `--font-base`

**En la versión actual** esa paleta fue reemplazada por un sistema de tokens por tema, que permite cambiar entre modo claro y oscuro sin duplicar reglas:
- Superficies: `--bg`, `--bg-elev`, `--bg-elev-2`, `--bg-term`, `--bg-pie`
- Bordes: `--border`, `--border-soft`
- Texto: `--text`, `--text-dim`, `--text-faint`
- Acentos: `--accent`, `--accent-2`, `--accent-dim`, `--accent-glow`, `--nav-accent`
- Tipografías y medidas: `--mono`, `--serif`, `--maxw`, `--gutter`

Además se redefinen variables propias de Bootstrap (`--bs-body-bg`, `--bs-border-color`, `--bs-accordion-*`, entre otras) para tematizar sus componentes sin recurrir a `!important`.

### ¿Cómo implementaron el Responsive Design?

En el TP2 se usaron breakpoints con `@media` en 900px y 600px para adaptar el header, el hero y los grids.

En la versión actual el responsive se apoya en tres recursos combinados:
- Los breakpoints de **Bootstrap** (`row-cols-md-3`, `col-sm-6`, `navbar-expand-lg`), que resuelven el colapso del menú en hamburguesa y el reacomodo de las grillas.
- **Media queries propias** para lo que Bootstrap no cubre: la consola flotante a pantalla casi completa en celular, el apilado de la portada y los ajustes del pie.
- **Unidades fluidas**: `clamp()` para tipografías y espaciados, más `%`, `vh`, `vw`, `fr`, `rem` y `ch`.

La página se verifica en celular, tablet y computadora.

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

### Componentes y clases de Bootstrap utilizados
- **Navbar** (`navbar`, `navbar-expand-lg`, `navbar-brand`, `navbar-nav`, `navbar-toggler`, `navbar-collapse`, `collapse`) con menú hamburguesa responsive, usando el componente JS `bootstrap.Collapse`.
- **Grid system** (`container`, `row`, `col`, `row-cols-1`, `row-cols-md-3`, `row-cols-sm-2`, `row-cols-lg-3`, `col-12`, `col-sm-6`, `col-md`, `col-md-5`, `g-0`, `g-4`) en las secciones de conceptos, temas, panel y en el pie.
- **Accordion** (`accordion`, `accordion-item`, `accordion-header`, `accordion-button`, `accordion-collapse`) en preguntas frecuentes, generado dinámicamente por JavaScript.
- **Botones** (`btn`) como base del llamado a la acción de la portada.
- **Utilidades** (`d-flex`, `d-lg-none`, `ms-auto`, `order-lg-2`, `order-lg-3`, `py-2`, `py-lg-0`, `mb-0`, `list-unstyled`).

### Tematización mediante variables de Bootstrap
En lugar de sobrescribir los estilos de Bootstrap con `!important`, se **redefinen sus variables CSS** para adaptarlo a la identidad del proyecto:
- Globales: `--bs-body-bg`, `--bs-body-color`, `--bs-border-color`, `--bs-border-radius`, `--bs-font-sans-serif`, `--bs-link-color`.
- Del acordeón: `--bs-accordion-bg`, `--bs-accordion-btn-bg`, `--bs-accordion-active-bg`, `--bs-accordion-btn-icon` (se anula el chevron nativo y se reemplaza por un signo `+` que rota al abrir).

El `.container` de Bootstrap se conserva como clase, ajustando su `max-width` y su `padding-inline` a las medidas del diseño.

### Manejo de conflictos con clases nativas de Bootstrap
Durante la refactorización se detectaron colisiones entre clases propias y clases nativas de Bootstrap:
- `.container` (propia del TP2) pisaba los anchos responsive del `.container` de Bootstrap → se comentó.
- `.btn-primary` (propia) coincidía con el botón nativo → se comentó.
- `.card` (propia) convive con la nativa: al usarse dentro de `.cards .col`, se anulan explícitamente el borde, el radio y el `display: flex` que aporta Bootstrap, para conservar la grilla de líneas de 1px del diseño.

### Responsive Design (TP3)
- El navbar colapsa a menú hamburguesa por debajo del breakpoint `lg`.
- Las grillas se reacomodan con `row-cols-1 row-cols-md-3` (conceptos y panel) y `row-cols-1 row-cols-sm-2 row-cols-lg-3` (temas).
- El pie pasa de una columna en celular a tres en escritorio con `col-12 col-sm-6 col-md`.
- Se conservan media queries propias solo para lo que Bootstrap no cubre: la consola flotante y el apilado de la portada.

---

## TP4 — JavaScript y DOM

En esta etapa se incorporó **interactividad real** al sitio mediante JavaScript propio (`js/main.js`), sin modificar el diseño ni la identidad visual definidos en el TP3.

### Organización del trabajo (rama)
```
dev
├── feature/funcionalidades-javascript-chat
└── feature/funcionalidades-javascript-ux
```

Las ramas se crearon desde `dev` siguiendo la convención de nombres de tipo `feature/` indicada en la consigna, y se integran a `dev` mediante Pull Request. La primera incorporó el chat y la navegación; la segunda lo convirtió en widget flotante y sumó las funcionalidades de interfaz.

### Funcionalidades implementadas

**1. Chat virtual de AIda (widget flotante)**

El chat dejó de ser un mockup estático dentro de la página y pasó a ser un **widget flotante**, igual que los asistentes de los sitios institucionales reales. La sección "Asistente" conserva su lugar en el menú y su contenido, pero ahora invita a abrir el widget en vez de mostrar la conversación incrustada.

*Apertura y cierre*
- Botón flotante fijo abajo a la derecha, con el logo de AIda y la leyenda "Chat virtual".
- Se abre desde ese botón, desde el llamado a la acción de la sección "Asistente", y se cierra con la **tecla Escape** o con la cruz del encabezado.
- La visibilidad se controla con la propiedad `hidden` del elemento, y el estado se refleja en `aria-expanded` para lectores de pantalla.
- Al abrirse el foco pasa al campo de texto, y al cerrarse vuelve al botón flotante.

*Conversación*
- Captura el mensaje del usuario con eventos `click` y `keydown` (tecla Enter).
- Crea dinámicamente los mensajes en el DOM (`createElement`, `appendChild`, `textContent`) en lugar de tenerlos hardcodeados en el HTML.
- Devuelve una respuesta simulada según palabras clave de la consulta (mesa, inscripción, correlativa, trámite), coherente con la temática institucional del asistente.
- Las consultas se comparan **sin tildes ni mayúsculas** (`normalize("NFD")`), de modo que "trámite" y "tramite" se resuelven igual sin duplicar cada palabra clave.
- **Chips de consultas sugeridas**: cuatro botones con las preguntas más frecuentes que completan y envían la consulta de un toque.
- Si ninguna palabra clave coincide, responde que no tiene evidencia suficiente y deriva al panel institucional, aplicando la **política de abstención** que define el proyecto.

*Accesibilidad y responsive*
- El contenedor de mensajes es una región `aria-live="polite"` con `role="log"`, así los lectores de pantalla anuncian cada respuesta nueva.
- En pantallas chicas el widget ocupa casi toda la pantalla y el botón flotante se reduce al logo, para no tapar el contenido.

**2. Navbar activo según sección visible**
- Usa `IntersectionObserver` para detectar qué sección está en pantalla mientras el usuario hace scroll.
- Resalta el link correspondiente del menú agregando/quitando la clase `.active` con `classList`.

**3. Cierre automático del menú mobile**
- Al hacer click en un link del navbar en vista mobile, cierra el menú colapsable de Bootstrap automáticamente (`bootstrap.Collapse`), mejorando la usabilidad en pantallas chicas.

### APIs de JavaScript y DOM utilizadas
- `document.getElementById` / `document.querySelector` / `document.querySelectorAll`
- `addEventListener` (`click`, `keydown`)
- `document.createElement`, `appendChild`, `remove`, `textContent`
- `classList.add` / `classList.toggle`
- `setAttribute` / `removeAttribute` (`aria-expanded`, `aria-current`, `aria-checked`, `data-bs-theme`)
- Propiedad `hidden` y `focus()` para mostrar, ocultar y enfocar el chat
- `JSON.parse` para leer los datos de las preguntas desde el DOM
- `String.prototype.normalize` para comparar texto sin tildes
- `localStorage` para recordar el tema elegido
- `IntersectionObserver` (navbar activo y animaciones de aparición)
- `scrollIntoView` y `setTimeout`

### Una sola fuente de datos para las preguntas frecuentes
Las preguntas **no están duplicadas**. Viven en el bloque `<script type="application/ld+json">` del `head`, y el JavaScript las lee desde el DOM con `JSON.parse` para generar el acordeón.

La decisión tiene un motivo de SEO: si ese bloque se generara por JavaScript, los buscadores podrían no leerlo. Al dejarlo estático en el HTML, Google y Bing lo interpretan siempre, y el sitio conserva una única fuente de verdad: editar una pregunta ahí actualiza a la vez el acordeón visible y los datos estructurados.

### SEO y diseño (TP4)
Se conservan y amplían las estrategias de las etapas anteriores:
- Se mantienen `title`, `meta description`, `keywords`, `author` y las etiquetas Open Graph.
- Se suma **JSON-LD de tipo `FAQPage`** (Schema.org), que permite a los buscadores mostrar las preguntas como resultado enriquecido.
- Se conserva la jerarquía de encabezados (`h1` → `h2` → `h3` → `h4`) y el `alt` descriptivo en las cuatro imágenes.
- `theme-color` se actualiza por JavaScript al cambiar de tema, para que la barra del navegador en celular acompañe.

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
├── js/
│   └── main.js
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