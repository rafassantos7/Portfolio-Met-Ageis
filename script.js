gsap.registerPlugin(TextPlugin, ScrollTrigger, ScrollToPlugin);

const nome = document.getElementById("nome");
const infs = document.querySelector(".apresentacao h2");
const imgShape = document.querySelector(".img-profissional");
const paineis = gsap.utils.toArray(".painel");

gsap.to(nome, {
  duration: 2,
  text: "Luis Alberto Oliveira",
  ease: "none"
});


gsap.from(infs, {
  opacity: 0,
  duration: 1,        // Definido um tempo padrão para o fade in
  delay: 2       // Pequeno atraso para dar um efeito mais fluido
});



gsap.set(".photo-shape", { perspective: 1000 });


const outerRX = gsap.quickTo(".photo-shape", "rotationX", { ease: "power3",duration: 0.5, });
const outerRY = gsap.quickTo(".photo-shape", "rotationY", { ease: "power3",duration: 0.5, });
const innerX = gsap.quickTo(".img-luis", "x", { ease: "power3",duration: 0.5, });
const innerY = gsap.quickTo(".img-luis", "y", { ease: "power3",duration: 0.5, });

imgShape.addEventListener("pointermove", (e) => {
 const rect = imgShape.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  outerRX(gsap.utils.interpolate(10, -10, y));
  outerRY(gsap.utils.interpolate(-10, 10, x));

  innerX(gsap.utils.interpolate(-20, 20, x));
  innerY(gsap.utils.interpolate(-20, 20, y));
});

imgShape.addEventListener("pointerleave", (e) => {
  outerRX(0);
  outerRY(0);
  innerX(0);
  innerY(0);
});



const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".informacoes",
        start: "top 80px",
        end: "+=4000",
        scrub: 1,
        pin: true,
        snap: {
            snapTo: "labels",
            duration: 0.5,
            ease: "power2.inOut"
        }
    }
});

tl.addLabel("experiencia");

tl.from(".certificacoes", {
    xPercent: 100
});

tl.addLabel("certificacoes");

tl.from(".premios", {
    yPercent: 100
});

tl.addLabel("premios");

tl.from(".extra", {
    xPercent: -100
});

tl.addLabel("extra");


const st = tl.scrollTrigger;

document.querySelectorAll("#nav-list a").forEach(link => {

    link.addEventListener("click", e => {

        const id = link.getAttribute("href").replace("#", "");

        if (!tl.labels[id]) return;

        e.preventDefault();

        const time = tl.labels[id];

        const progress = time / tl.duration();

        const scrollPosition =
            st.start + (st.end - st.start) * progress;

        gsap.to(window, {
            duration: 1,
            scrollTo: scrollPosition,
            ease: "power2.inOut"
        });

    });

});