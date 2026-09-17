// Quita tildes y pasa a minúsculas para que "trámite" y "tramite" coincidan igual
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function inicializarChat() {
  const chatInput = document.getElementById("chatInput");
  const chatSendBtn = document.getElementById("chatSendBtn");
  const chatMessages = document.getElementById("chatMessages");

  if (!chatInput || !chatSendBtn || !chatMessages) {
    return;
  }

  const respuestas = [
    { palabras: ["mesa", "examen"], texto: "Las mesas de examen se publican en el calendario académico. Podés consultar fechas exactas en el Panel institucional." },
    { palabras: ["inscripcion"], texto: "Las inscripciones se gestionan a través del sistema SIU Guaraní. Verificá las fechas vigentes en Bedelía." },
    { palabras: ["correlativa"], texto: "Las correlativas dependen del plan de estudios de tu carrera. Te recomiendo consultar el reglamento académico oficial." },
    { palabras: ["tramite", "certificado"], texto: "Los trámites administrativos se realizan en Alumnado. Si necesitás un certificado, podés solicitarlo desde el Panel institucional." },
  ];

  const respuestaPorDefecto = "No tengo evidencia suficiente para responder con certeza esa consulta. Te recomiendo derivarla al Panel institucional.";

  function obtenerRespuesta(consulta) {
    const consultaNormalizada = normalizarTexto(consulta);
    const coincidencia = respuestas.find((item) =>
      item.palabras.some((palabra) => consultaNormalizada.includes(palabra))
    );
    return coincidencia ? coincidencia.texto : respuestaPorDefecto;
  }

  function obtenerHoraActual() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");
    return `${horas}:${minutos}`;
  }

  function agregarMensaje(texto, tipo) {
    const mensaje = document.createElement("div");
    mensaje.classList.add("message", tipo);

    const burbuja = document.createElement("div");
    burbuja.classList.add("bubble");
    burbuja.textContent = texto;

    const hora = document.createElement("span");
    hora.classList.add("time");
    hora.textContent = obtenerHoraActual();

    mensaje.appendChild(burbuja);
    mensaje.appendChild(hora);
    chatMessages.appendChild(mensaje);

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function manejarEnvio() {
    const consulta = chatInput.value.trim();

    if (consulta === "") {
      return;
    }

    agregarMensaje(consulta, "sent");
    chatInput.value = "";

    setTimeout(() => {
      const respuesta = obtenerRespuesta(consulta);
      agregarMensaje(respuesta, "received");
    }, 700);
  }

  chatSendBtn.addEventListener("click", manejarEnvio);

  chatInput.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
      manejarEnvio();
    }
  });

  document.querySelectorAll("#chatSugerencias .chat-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      chatInput.value = chip.textContent.trim();
      manejarEnvio();
    });
  });
}

function inicializarWidgetChat() {
  const launcher = document.getElementById("chatLauncher");
  const widget = document.getElementById("chatWidget");
  const botonCerrar = document.getElementById("chatCerrar");
  const botonSeccion = document.getElementById("chatAbrirSeccion");
  const chatInput = document.getElementById("chatInput");

  if (!launcher || !widget) {
    return;
  }

  function abrir() {
    widget.hidden = false;
    launcher.setAttribute("aria-expanded", "true");

    if (chatInput) {
      chatInput.focus();
    }
  }

  function cerrar() {
    widget.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  }

  launcher.addEventListener("click", () => {
    if (widget.hidden) {
      abrir();
    } else {
      cerrar();
    }
  });

  if (botonCerrar) {
    botonCerrar.addEventListener("click", cerrar);
  }

  if (botonSeccion) {
    botonSeccion.addEventListener("click", abrir);
  }

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !widget.hidden) {
      cerrar();
    }
  });
}

const preguntasFrecuentes = [
  {
    pregunta: "¿Qué es AIda?",
    respuesta: "AIda es el asistente institucional de la UTN Facultad Regional Tucumán. Responde consultas sobre mesas de examen, inscripciones, correlativas y trámites académicos las 24 horas, citando siempre la fuente oficial y su fecha de actualización.",
  },
  {
    pregunta: "¿Cómo consulto las fechas de las mesas de examen?",
    respuesta: "Podés preguntárselo directamente al chat virtual. Las fechas exactas se resuelven por consulta a la base de datos institucional, no por generación de texto, así que la respuesta refleja el calendario académico vigente.",
  },
  {
    pregunta: "¿AIda puede ver mi historia académica?",
    respuesta: "No. En esta versión AIda responde únicamente sobre información pública institucional y no requiere que inicies sesión. Las consultas personalizadas por estudiante quedan fuera del alcance actual porque implican datos personales protegidos por la Ley 25.326.",
  },
  {
    pregunta: "¿Qué pasa si AIda no sabe la respuesta?",
    respuesta: "No inventa una respuesta. Si no tiene evidencia suficiente, deriva la consulta al panel institucional para que la responda una persona de Bedelía o Alumnado. Esa respuesta humana después se incorpora a la base de conocimiento.",
  },
  {
    pregunta: "¿La información está actualizada?",
    respuesta: "Sí. El personal de Bedelía, Alumnado y Secretaría carga y actualiza la información oficial desde el panel de gestión, con versionado y fecha de vigencia, de modo que cada dato indica desde cuándo rige.",
  },
];

function inicializarFaq() {
  const contenedor = document.getElementById("faqAccordion");

  if (!contenedor) {
    return;
  }

  preguntasFrecuentes.forEach((item, indice) => {
    const idCuerpo = `faqCuerpo${indice}`;

    const bloque = document.createElement("div");
    bloque.className = "accordion-item";

    const encabezado = document.createElement("h3");
    encabezado.className = "accordion-header";

    const boton = document.createElement("button");
    boton.className = "accordion-button collapsed fw-semibold";
    boton.type = "button";
    boton.dataset.bsToggle = "collapse";
    boton.dataset.bsTarget = `#${idCuerpo}`;
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-controls", idCuerpo);
    boton.textContent = item.pregunta;

    const cuerpo = document.createElement("div");
    cuerpo.className = "accordion-collapse collapse";
    cuerpo.id = idCuerpo;
    cuerpo.dataset.bsParent = "#faqAccordion";

    const contenido = document.createElement("div");
    contenido.className = "accordion-body text-body-secondary";
    contenido.textContent = item.respuesta;

    encabezado.appendChild(boton);
    cuerpo.appendChild(contenido);
    bloque.appendChild(encabezado);
    bloque.appendChild(cuerpo);
    contenedor.appendChild(bloque);
  });
}

function inicializarModoOscuro() {
  const boton = document.getElementById("temaToggle");
  const icono = document.getElementById("temaIcono");
  const texto = document.getElementById("temaTexto");
  const CLAVE = "aida-tema";

  function aplicarTema(tema) {
    document.documentElement.setAttribute("data-bs-theme", tema);

    if (icono && texto) {
      const esOscuro = tema === "dark";
      icono.textContent = esOscuro ? "☀️" : "🌙";
      texto.textContent = esOscuro ? "Modo claro" : "Modo oscuro";
    }
  }

  const guardado = localStorage.getItem(CLAVE);
  const prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
  aplicarTema(guardado || (prefiereOscuro ? "dark" : "light"));

  if (!boton) {
    return;
  }

  boton.addEventListener("click", () => {
    const temaActual = document.documentElement.getAttribute("data-bs-theme");
    const temaNuevo = temaActual === "dark" ? "light" : "dark";

    aplicarTema(temaNuevo);
    localStorage.setItem(CLAVE, temaNuevo);
  });
}

function inicializarNavbarActivo() {
  const secciones = document.querySelectorAll("main section[id], footer[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const idVisible = entrada.target.getAttribute("id");

          navLinks.forEach((link) => {
            const esActivo = link.getAttribute("href") === `#${idVisible}`;
            link.classList.toggle("active", esActivo);

            if (esActivo) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    { rootMargin: "-40% 0px -40% 0px" }
  );

  secciones.forEach((seccion) => observador.observe(seccion));
}

function inicializarCierreMenuMobile() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navMenu = document.getElementById("navMenu");

  if (!navMenu) {
    return;
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const menuAbierto = navMenu.classList.contains("show");
      if (menuAbierto) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        bsCollapse.hide();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarModoOscuro();
  inicializarFaq();
  inicializarChat();
  inicializarWidgetChat();
  inicializarNavbarActivo();
  inicializarCierreMenuMobile();
});
