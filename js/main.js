// Quita tildes y pasa a minúsculas para que "trámite" y "tramite" coincidan igual
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const respuestasChat = [
  { palabras: ["mesa", "examen"], texto: "Las mesas de examen se publican en el calendario académico. Podés consultar fechas exactas en el Panel institucional.", fuente: "Calendario académico" },
  { palabras: ["inscripcion"], texto: "Las inscripciones se gestionan a través del sistema SIU Guaraní. Verificá las fechas vigentes en Bedelía.", fuente: "SIU Guaraní" },
  { palabras: ["correlativa"], texto: "Las correlativas dependen del plan de estudios de tu carrera. Te recomiendo consultar el reglamento académico oficial.", fuente: "Reglamento académico" },
  { palabras: ["tramite", "certificado"], texto: "Los trámites administrativos se realizan en Alumnado. Si necesitás un certificado, podés solicitarlo desde el Panel institucional.", fuente: "Alumnado" },
];

const respuestaPorDefecto = {
  texto: "No tengo evidencia suficiente para responder con certeza esa consulta. Te recomiendo derivarla al Panel institucional.",
  fuente: "",
};

const saludoChat =
  "Hola, soy AIda. Puedo ayudarte con mesas de examen, inscripciones, correlativas y trámites. ¿Qué necesitás?";

function obtenerRespuesta(consulta) {
  const consultaNormalizada = normalizarTexto(consulta);
  const coincidencia = respuestasChat.find((item) =>
    item.palabras.some((palabra) => consultaNormalizada.includes(palabra))
  );
  return coincidencia || respuestaPorDefecto;
}

function obtenerHoraActual() {
  const ahora = new Date();
  const horas = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");
  return `${horas}:${minutos}`;
}

// Monta una consola dentro de raiz: se usa tanto en la sección como en el widget flotante
function montarConsola(raiz) {
  if (!raiz) {
    return null;
  }

  const entrada = raiz.querySelector(".consola-entrada input");
  const enviar = raiz.querySelector(".consola-entrada button");
  const registro = raiz.querySelector(".consola-registro");

  if (!entrada || !enviar || !registro) {
    return null;
  }

  function agregarMensaje(texto, tipo, fuente) {
    const mensaje = document.createElement("div");
    mensaje.classList.add("msg", tipo);

    const meta = document.createElement("div");
    meta.className = "msg-meta";

    const quien = document.createElement("span");
    quien.className = "msg-quien";
    quien.textContent = tipo === "msg-consulta" ? "vos" : "aida";

    const hora = document.createElement("span");
    hora.textContent = obtenerHoraActual();

    meta.appendChild(quien);
    meta.appendChild(hora);

    const cuerpo = document.createElement("div");
    cuerpo.className = "msg-cuerpo";
    cuerpo.textContent = texto;

    if (fuente) {
      const cita = document.createElement("span");
      cita.className = "msg-fuente";
      cita.textContent = `fuente: ${fuente} · actualización: pendiente de carga`;
      cuerpo.appendChild(cita);
    }

    mensaje.appendChild(meta);
    mensaje.appendChild(cuerpo);
    registro.appendChild(mensaje);
    registro.scrollTop = registro.scrollHeight;
  }

  function manejarEnvio() {
    const consulta = entrada.value.trim();

    if (consulta === "") {
      return;
    }

    agregarMensaje(consulta, "msg-consulta");
    entrada.value = "";

    const redactando = document.createElement("p");
    redactando.className = "redactando";
    redactando.textContent = "redactando";
    registro.appendChild(redactando);
    registro.scrollTop = registro.scrollHeight;

    setTimeout(() => {
      redactando.remove();
      const respuesta = obtenerRespuesta(consulta);
      agregarMensaje(respuesta.texto, "msg-respuesta", respuesta.fuente);
    }, 700);
  }

  agregarMensaje(saludoChat, "msg-respuesta");

  enviar.addEventListener("click", manejarEnvio);

  entrada.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
      manejarEnvio();
    }
  });

  raiz.querySelectorAll(".consola-chips .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      entrada.value = chip.textContent.trim();
      manejarEnvio();
    });
  });

  return { entrada };
}

function inicializarChat() {
  const enSeccion = montarConsola(document.getElementById("consolaSeccion"));
  const heroCta = document.getElementById("heroCta");

  if (heroCta && enSeccion) {
    heroCta.addEventListener("click", () => {
      document.getElementById("asistente").scrollIntoView({ behavior: "smooth" });
      enSeccion.entrada.focus({ preventScroll: true });
    });
  }
}

function inicializarWidgetFlotante() {
  const launcher = document.getElementById("chatLauncher");
  const panel = document.getElementById("chatFlotante");

  if (!launcher || !panel) {
    return;
  }

  const consola = montarConsola(panel);
  const cerrarBtn = panel.querySelector(".widget-cerrar");

  function abrir() {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");

    if (consola) {
      consola.entrada.focus();
    }
  }

  function cerrar() {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  }

  launcher.addEventListener("click", () => {
    if (panel.hidden) {
      abrir();
    } else {
      cerrar();
    }
  });

  if (cerrarBtn) {
    cerrarBtn.addEventListener("click", cerrar);
  }

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !panel.hidden) {
      cerrar();
    }
  });
}

// Las preguntas se leen del bloque JSON-LD del head: una sola fuente de verdad,
// que ademas queda estatica en el HTML para que la lean los buscadores.
function leerPreguntasFrecuentes() {
  const bloque = document.querySelector('script[type="application/ld+json"]');

  if (!bloque) {
    return [];
  }

  try {
    const datos = JSON.parse(bloque.textContent);

    if (datos["@type"] !== "FAQPage" || !Array.isArray(datos.mainEntity)) {
      return [];
    }

    return datos.mainEntity.map((item) => ({
      pregunta: item.name,
      respuesta: item.acceptedAnswer ? item.acceptedAnswer.text : "",
    }));
  } catch (error) {
    return [];
  }
}

function inicializarFaq() {
  const contenedor = document.getElementById("faqAccordion");

  if (!contenedor) {
    return;
  }

  leerPreguntasFrecuentes().forEach((item, indice) => {
    const idCuerpo = `faqCuerpo${indice}`;
    const numero = String(indice + 1).padStart(2, "0");

    const bloque = document.createElement("div");
    bloque.className = "accordion-item faq-item";

    const encabezado = document.createElement("h3");
    encabezado.className = "accordion-header";

    const boton = document.createElement("button");
    boton.className = "accordion-button collapsed faq-boton";
    boton.type = "button";
    boton.dataset.bsToggle = "collapse";
    boton.dataset.bsTarget = `#${idCuerpo}`;
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-controls", idCuerpo);

    const n = document.createElement("span");
    n.className = "n";
    n.textContent = numero;

    const titulo = document.createElement("span");
    titulo.textContent = item.pregunta;

    boton.appendChild(n);
    boton.appendChild(titulo);
    encabezado.appendChild(boton);

    const colapso = document.createElement("div");
    colapso.className = "accordion-collapse collapse";
    colapso.id = idCuerpo;
    colapso.dataset.bsParent = "#faqAccordion";

    const cuerpo = document.createElement("div");
    cuerpo.className = "accordion-body faq-cuerpo";
    cuerpo.textContent = item.respuesta;

    colapso.appendChild(cuerpo);
    bloque.appendChild(encabezado);
    bloque.appendChild(colapso);
    contenedor.appendChild(bloque);
  });
}

function inicializarModoOscuro() {
  const boton = document.getElementById("temaToggle");
  const CLAVE = "aida-tema";

  function aplicarTema(tema) {
    document.documentElement.setAttribute("data-bs-theme", tema);

    if (boton) {
      boton.setAttribute("aria-checked", String(tema === "dark"));
    }

    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
      meta.setAttribute("content", tema === "dark" ? "#0d0d0d" : "#f2f2ee");
    }
  }

  // El oscuro es el tema principal: solo se sale de ahi por eleccion explicita
  aplicarTema(localStorage.getItem(CLAVE) || "dark");

  if (!boton) {
    return;
  }

  boton.addEventListener("click", () => {
    const actual = document.documentElement.getAttribute("data-bs-theme");
    const nuevo = actual === "dark" ? "light" : "dark";

    aplicarTema(nuevo);
    localStorage.setItem(CLAVE, nuevo);
  });
}

function inicializarCierreMenuMobile() {
  const navMenu = document.getElementById("navMenu");

  if (!navMenu) {
    return;
  }

  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
      }
    });
  });
}

function inicializarNavbarActivo() {
  const secciones = document.querySelectorAll("section[id], footer[id]");
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

function inicializarReveal() {
  const elementos = document.querySelectorAll(".reveal");

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("in");
          obs.unobserve(entrada.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );

  elementos.forEach((elemento) => observador.observe(elemento));
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarModoOscuro();
  inicializarReveal();
  inicializarCierreMenuMobile();
  inicializarFaq();
  inicializarChat();
  inicializarWidgetFlotante();
  inicializarNavbarActivo();
});
