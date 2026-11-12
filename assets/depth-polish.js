// TEQNIKAL Studios — depth & polish layer (pointer-reactive 3D).
// Only writes CSS custom properties, so it never fights the app's own rendering.
(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduce || !fine) return;

  const root = document.documentElement;
  const TILT = [
    [".service", 2.2, 10],
    [".steps > div", 5, 14],
    [".citadel-preview", 4, 0],
    [".contact form", 3, 0],
  ];
  const GLOW = ".service, .steps > div, .studio-mission";
  const bound = new WeakSet();

  function bind(el, max, lift) {
    if (bound.has(el)) return;
    bound.add(el);
    let frame = 0;
    el.addEventListener("pointermove", event => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const box = el.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width;
        const y = (event.clientY - box.top) / box.height;
        el.style.setProperty("--dp-mx", `${(x * 100).toFixed(1)}%`);
        el.style.setProperty("--dp-my", `${(y * 100).toFixed(1)}%`);
        if (max) {
          el.style.setProperty("--dp-ry", `${((x - .5) * 2 * max).toFixed(2)}deg`);
          el.style.setProperty("--dp-rx", `${((.5 - y) * 2 * max).toFixed(2)}deg`);
          el.style.setProperty("--dp-z", `${lift}px`);
        }
      });
    });
    el.addEventListener("pointerleave", () => {
      ["--dp-rx", "--dp-ry", "--dp-z"].forEach(name => el.style.removeProperty(name));
    });
  }

  function scan() {
    for (const [selector, max, lift] of TILT) document.querySelectorAll(selector).forEach(el => bind(el, max, lift));
    document.querySelectorAll(GLOW).forEach(el => bind(el, 0, 0));
    if (document.querySelector(".hero")) root.classList.add("dp-tilt-ready");
  }

  // Hero parallax: the pattern and the copy drift on separate planes.
  let heroFrame = 0;
  addEventListener("pointermove", event => {
    if (heroFrame || scrollY > innerHeight) return;
    heroFrame = requestAnimationFrame(() => {
      heroFrame = 0;
      const hero = document.querySelector(".hero");
      if (!hero) return;
      hero.style.setProperty("--dp-px", `${((event.clientX / innerWidth - .5) * -18).toFixed(1)}px`);
      hero.style.setProperty("--dp-py", `${((event.clientY / innerHeight - .5) * -12).toFixed(1)}px`);
    });
  }, { passive: true });

  scan();
  const mount = document.getElementById("root");
  if (mount) {
    let queued = 0;
    new MutationObserver(() => {
      if (queued) return;
      queued = setTimeout(() => { queued = 0; scan(); }, 200);
    }).observe(mount, { childList: true, subtree: true });
  }
})();
