

// Quita tildes y pasa a minúsculas para que "trámite" y "tramite" coincidan igual
function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
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




//navbar para resaltar en la seccion que estamos

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

//  FUNCIONALIDAD: Cerrar el menú mobile al elegir una sección

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
  inicializarChat();
  inicializarWidgetChat();
  inicializarNavbarActivo();
  inicializarCierreMenuMobile();
});