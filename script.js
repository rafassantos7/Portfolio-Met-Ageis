gsap.registerPlugin(
    TextPlugin,
    ScrollTrigger,
    ScrollToPlugin
);

const nome = document.getElementById("nome");
const infs = document.querySelector(".apresentacao h2");
const imgShape = document.querySelector(".img-profissional");

/* =========================
   NOME
========================= */

gsap.to(nome, {
    duration: 2,
    text: "Luis Alberto Oliveira",
    ease: "none"
});

/* =========================
   SUBTÍTULO
========================= */

gsap.from(infs, {
    opacity: 0,
    duration: 1,
    delay: 2
});

/* =========================
   EFEITO FOTO
========================= */

gsap.set(".photo-shape", {
    perspective: 1000
});

const outerRX = gsap.quickTo(
    ".photo-shape",
    "rotationX",
    {
        ease: "power3",
        duration: 0.5
    }
);

const outerRY = gsap.quickTo(
    ".photo-shape",
    "rotationY",
    {
        ease: "power3",
        duration: 0.5
    }
);

const innerX = gsap.quickTo(
    ".img-luis",
    "x",
    {
        ease: "power3",
        duration: 0.5
    }
);

const innerY = gsap.quickTo(
    ".img-luis",
    "y",
    {
        ease: "power3",
        duration: 0.5
    }
);

if (imgShape) {
    imgShape.addEventListener(
        "pointermove",
        (e) => {
            const rect =
                imgShape.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) /
                rect.width;

            const y =
                (e.clientY - rect.top) /
                rect.height;

            outerRX(
                gsap.utils.interpolate(
                    10,
                    -10,
                    y
                )
            );

            outerRY(
                gsap.utils.interpolate(
                    -10,
                    10,
                    x
                )
            );

            innerX(
                gsap.utils.interpolate(
                    -20,
                    20,
                    x
                )
            );

            innerY(
                gsap.utils.interpolate(
                    -20,
                    20,
                    y
                )
            );
        }
    );

    imgShape.addEventListener(
        "pointerleave",
        () => {
            outerRX(0);
            outerRY(0);

            innerX(0);
            innerY(0);
        }
    );
}

/* =========================
   EXPERIÊNCIA
========================= */

const experienciaTrack =
    document.querySelector(
        ".experiencia-track"
    );

const experienciaPanel =
    document.querySelector(
        ".experiencia"
    );

let overflowExperiencia = 0;

/*
 * Calcula o tamanho real
 * do conteúdo da experiência.
 */

function calcularExperiencia() {
    if (
        !experienciaTrack ||
        !experienciaPanel
    ) {
        return;
    }

    overflowExperiencia =
        Math.max(
            experienciaTrack.scrollHeight -
            experienciaPanel.clientHeight +
            40,
            0
        );
}

calcularExperiencia();

/* =========================
   ESTADO INICIAL
========================= */

gsap.set(".experiencia", {
    xPercent: 0,
    yPercent: 0
});

gsap.set(".ferramentas", {
    xPercent: 100,
    yPercent: 0
});

gsap.set(".certificacoes", {
    xPercent: 100,
    yPercent: 0
});

gsap.set(".premios", {
    xPercent: 0,
    yPercent: 100
});

gsap.set(".extra", {
    xPercent: -100,
    yPercent: 0
});

/* =========================
   TIMELINE
========================= */

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".informacoes",
        start: "top top",
        /*
         * Cinco etapas.
         *
         * Usamos mais espaço de scroll
         * para deixar a navegação confortável.
         */
        end: () => {
            return "+=" +
                (
                    window.innerHeight * 6
                );
        },

        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,

        /* =========================
           SNAP
        ========================= */

        snap: {
            snapTo: (progress) => {
                const labels =
                    tl.labels;

                const tempos =
                    Object.values(labels);

                if (!tempos.length) {
                    return progress;
                }

                const time =
                    progress *
                    tl.duration();

                const inicioExperiencia =
                    labels.experiencia;

                const inicioFerramentas =
                    labels.ferramentas;

                /*
                 * Durante a experiência,
                 * o usuário pode ler os cards
                 * livremente.
                 */

                if (
                    time >= inicioExperiencia &&
                    time < inicioFerramentas
                ) {

                    return progress;

                }

                /*
                 * Nas demais seções,
                 * procura a label mais próxima.
                 */

                const maisProximo =
                    tempos.reduce(
                        (prev, curr) => {
                            return Math.abs(
                                curr - time
                            ) <
                            Math.abs(
                                prev - time
                            )
                                ? curr
                                : prev;
                        }
                    );

                return (
                    maisProximo /
                    tl.duration()
                );
            },

            duration: {
                min: 0.4,
                max: 0.7
            },

            delay: 0.1,
            ease: "power2.inOut"
        }
    }
});

/* =========================
   EXPERIÊNCIA
========================= */

tl.addLabel("experiencia");

/*
 * A experiência usa o espaço necessário
 * para que os cards sejam lidos.
 */

tl.to(
    ".experiencia-track",
    {
        y: () => {
            return -overflowExperiencia;

        },

        ease: "none",

        duration: () => {

            return Math.max(
                overflowExperiencia / 600,
                2
            );
        }
    }
);

/* =========================
   FERRAMENTAS
========================= */

tl.to(
    ".ferramentas",
    {
        xPercent: 0,
        ease: "power2.inOut",
        duration: 0.6
    }
);

tl.addLabel("ferramentas");

/* =========================
   CERTIFICAÇÕES
========================= */

tl.to(
    ".certificacoes",
    {
        xPercent: 0,
        ease: "power2.inOut",
        duration: 1
    }
);

tl.addLabel("certificacoes");

/* =========================
   PRÊMIOS
========================= */

tl.to(
    ".premios",
    {
        yPercent: 0,
        ease: "power2.inOut",
        duration: 1
    }
);

tl.addLabel("premios");

/* =========================
   EXTRA
========================= */

tl.to(
    ".extra",
    {
        xPercent: 0,
        ease: "power2.inOut",
        duration: 1
    }
);

tl.addLabel("extra");

const extraGalleryTrack =
    document.querySelector(".extra-gallery-track");

const extraGallerySet =
    extraGalleryTrack?.querySelector(".extra-gallery-set");

if (
    extraGalleryTrack &&
    extraGallerySet
) {
    const duplicateSet =
        extraGallerySet.cloneNode(true);

    duplicateSet.setAttribute("aria-hidden", "true");
    duplicateSet.querySelectorAll("img").forEach(image => {
        image.alt = "";
    });
    extraGalleryTrack.append(duplicateSet);
}

/* =========================
   NAVEGAÇÃO
========================= */

const st =
    tl.scrollTrigger;

document
    .querySelectorAll("#nav-list a")
    .forEach(link => {
        link.addEventListener(
            "click",
            (e) => {
                const href =
                    link.getAttribute(
                        "href"
                    );

                /*
                 * Links externos ou
                 * sem âncora não são
                 * tratados.
                 */

                if (
                    !href ||
                    !href.startsWith("#")
                ) {
                    return;
                }

                const id =
                    href.substring(1);

                /* =========================
                   INÍCIO
                ========================= */

                if (id === "inicio") {
                    e.preventDefault();

                    gsap.to(window, {
                        duration: 1.2,
                        scrollTo: {
                            y: 0,
                            autoKill: false
                        },
                        ease: "power2.inOut"
                    });

                    return;
                }

                /* =========================
                   VERIFICA LABEL
                ========================= */

                if (
                    tl.labels[id] === undefined
                ) {
                    return;
                }

                e.preventDefault();

                /* =========================
                   ATUALIZA SCROLLTRIGGER
                ========================= */

                ScrollTrigger.refresh();

                /*
                 * Usa o método nativo do
                 * ScrollTrigger para converter
                 * a label em posição real
                 * da página.
                 */

                const scrollPosition =
                    st.labelToScroll(id);

                /* =========================
                   SCROLL
                ========================= */

                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {

                        y: scrollPosition,

                        autoKill: false

                    },
                    ease: "power2.inOut"
                });
            }
        );
    });

/* =========================
   REFRESH
========================= */

window.addEventListener(
    "load",
    () => {
        calcularExperiencia();
        ScrollTrigger.refresh();
    }
);

window.addEventListener(
    "resize",
    () => {

        calcularExperiencia();

        ScrollTrigger.refresh();

    }
);