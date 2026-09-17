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
- **Cards** (`card`, `card-body`, `card-header`) para "Cómo funciona", el chat del asistente y el panel.
- **Utilidades de Flexbox** (`d-flex`, `flex-wrap`, `flex-column flex-md-row`, `gap-*`) en la sección "Temas" y el footer.
- **Input group** (`input-group`, `form-control`) en el campo de consulta del chat.
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
- `document.getElementById` / `document.querySelectorAll`
- `addEventListener` (`click`, `keydown`)
- `document.createElement`, `appendChild`, `textContent`
- `classList.add` / `classList.remove` / `classList.toggle`
- `setAttribute` / `removeAttribute` (`aria-expanded`, `aria-current`)
- Propiedad `hidden` y `focus()` para mostrar, ocultar y enfocar el widget
- `String.prototype.normalize` para comparar texto sin tildes
- `IntersectionObserver`
- `setTimeout`

### SEO y diseño (TP4)
No se modificó ningún meta tag, la jerarquía de encabezados ni los atributos `alt` existentes. Las nuevas funcionalidades usan las variables de color y las clases de Bootstrap ya definidas, manteniendo la identidad visual del sitio.

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