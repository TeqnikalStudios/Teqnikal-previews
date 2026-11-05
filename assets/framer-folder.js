/* TEQNIKAL Studios: "Framer files" 3D folder of concept sites.
   Standalone add-on. It mounts a new section right after #work and does not touch the main bundle. */
(function () {
  "use strict";

  var DEMOS = [
    { brand: "Birchwood Lane", url: "https://capable-reflect-369603.framer.app/", kind: "Remodeling", city: "Ferndale", label: "Whole-home remodeling · Ferndale, MI",
      h: "Older homes, rebuilt to live in now.", sub: "Kitchens, baths and full gut renovations for the 1920s bungalows and colonials of south Oakland County.",
      cta: "Start a project", cta2: "See the work", svc: ["Kitchens", "Bathrooms", "Whole-home"],
      font: "'Young Serif',Georgia,serif", bg: "#F4F0E9", ink: "#2B231D", ac: "#56664A", on: "#F4F0E9", art: "arch" },
    { brand: "Copperline Electric", url: "https://faithful-assumptions-280767.framer.app/", kind: "Electrical", city: "Livonia", label: "Licensed electricians · Livonia, MI",
      h: "Power you don’t have to think about.", sub: "Panel upgrades, EV chargers and generator installs, done right the first time and inspected.",
      cta: "Book a visit", cta2: "Our services", svc: ["Panels", "EV chargers", "Generators"],
      font: "'Unbounded',Arial,sans-serif", fw: 700, ls: "-0.03em", bg: "#F3F3EF", ink: "#121417", ac: "#F5D000", on: "#121417", art: "bolt" },
    { brand: "Northbound", url: "https://charismatic-software-239713.framer.app/", kind: "HVAC", city: "Dearborn", label: "Heating & air · Dearborn, MI",
      h: "Warm by dinnertime. Cool by the weekend.", sub: "Same-day furnace and AC repair, honest replacement quotes and plans that keep it running.",
      cta: "Schedule service", cta2: "Get a quote", svc: ["Furnaces", "Cooling", "Maintenance"],
      font: "'Bricolage Grotesque',Arial,sans-serif", fw: 700, ls: "-0.04em", bg: "#F2F5F7", ink: "#0D1B2A", ac: "#C9431A", on: "#FFFFFF", art: "sun" },
    { brand: "Ridgeview Homes", url: "https://sustained-task-541456.framer.app/", kind: "Home builder", city: "Northville", label: "Custom home builder · Northville, MI",
      h: "Built for the next forty years.", sub: "Custom homes on your lot or ours, with a fixed price and a schedule you can hold us to.",
      cta: "Plan your home", cta2: "Floor plans", svc: ["Custom homes", "Floor plans", "Lots"],
      font: "'DM Serif Display',Georgia,serif", bg: "#F5F2EC", ink: "#1E2320", ac: "#2C4A3B", on: "#F5F2EC", art: "roof" },
    { brand: "Halfmoon Coffee", url: "https://lucky-methods-123685.framer.app/", kind: "Coffee shop", city: "Hamtramck", label: "Coffee & bakery · Hamtramck, MI",
      h: "Good coffee, slow mornings.", sub: "Small-batch roasts, cardamom buns and a long table by the window. Order ahead or stay a while.",
      cta: "Order ahead", cta2: "See the menu", svc: ["Coffee", "Bakery", "Beans"],
      font: "'Caprasimo',Georgia,serif", ls: "-0.01em", bg: "#F4ECE1", ink: "#2A1B14", ac: "#B4532A", on: "#F4ECE1", art: "moon" },
    { brand: "Hale & Fenkell", url: "https://inexpensive-insurance-541454.framer.app/", kind: "Commercial GC", city: "Detroit", label: "Commercial general contractor · Est. 1987",
      h: "We build the buildings Detroit works in.", sub: "Offices, clinics, schools and logistics space, delivered on a schedule you can plan around.",
      cta: "Request a quote", cta2: "Projects", svc: ["Offices", "Healthcare", "Industrial"],
      font: "'Big Shoulders Display',Impact,sans-serif", fw: 800, ls: "-0.01em", up: true, bg: "#0F1012", ink: "#E9E6DF", ac: "#FF5B14", on: "#0F1012", art: "beams", dark: true },
    { brand: "Chair No. 7", url: "https://thoughtful-habits-018200.framer.app/", kind: "Barbershop", city: "Ferndale", label: "Barbershop · Woodward Ave, Ferndale",
      h: "Clean lines. No rush.", sub: "Seven chairs, five barbers and a waiting bench that’s worth the wait. Book a chair in a minute.",
      cta: "Book a chair", cta2: "Prices", svc: ["Cuts", "Fades", "Hot towel shave"],
      font: "'Gloock',Georgia,serif", bg: "#141312", ink: "#EFE9DF", ac: "#C8231E", on: "#EFE9DF", art: "pole", dark: true },
    { brand: "Form & Fringe", url: "https://centered-reassurance-115025.framer.app/", kind: "Hair salon", city: "Royal Oak", label: "Hair salon · Royal Oak, MI",
      h: "Hair that grows out beautifully.", sub: "Precision cuts, lived-in colour and curl care from a team of six. Every first visit starts with a consult.",
      cta: "Book a consult", cta2: "Our stylists", svc: ["Cuts", "Colour", "Curl care"],
      font: "'Bodoni Moda',Georgia,serif", fw: 500, ls: "-0.02em", bg: "#FBF8F5", ink: "#2A2523", ac: "#D8B1A8", on: "#2A2523", art: "wave" }
  ];

  var FONT_FAMILIES = ["Young+Serif", "Unbounded:wght@700", "Bricolage+Grotesque:wght@700", "DM+Serif+Display",
    "Caprasimo", "Big+Shoulders+Display:wght@800", "Gloock", "Bodoni+Moda:wght@500"];

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  function vars(d) {
    return "--s-bg:" + d.bg + ";--s-ink:" + d.ink + ";--s-ac:" + d.ac + ";--s-on:" + d.on +
      ";--s-font:" + d.font + ";--s-fw:" + (d.fw || 400) + ";--s-ls:" + (d.ls || "-0.02em") +
      ";--s-tt:" + (d.up ? "uppercase" : "none");
  }

  function site(d, full) {
    return '<div class="tqf-site' + (d.dark ? " is-dark" : "") + (full ? " is-full" : "") + '" style="' + vars(d) + '">' +
      '<div class="tqf-nav"><b>' + esc(d.brand) + '</b><span class="tqf-links"><i></i><i></i><i></i></span><span class="tqf-pill">' + esc(d.cta) + "</span></div>" +
      '<div class="tqf-hero"><div class="tqf-copy"><p class="tqf-lab">' + esc(d.label) + "</p><h3>" + esc(d.h) + "</h3>" +
      (full ? '<p class="tqf-sub">' + esc(d.sub) + "</p>" : "") +
      '<div class="tqf-btns"><span class="tqf-b1">' + esc(d.cta) + '</span><span class="tqf-b2">' + esc(d.cta2) + "</span></div></div>" +
      '<div class="tqf-art tqf-art--' + d.art + '" aria-hidden="true"><span></span></div></div>' +
      (full ? '<div class="tqf-strip">' + d.svc.map(function (s, i) { return "<span><em>0" + (i + 1) + "</em>" + esc(s) + "</span>"; }).join("") + "</div>" : "") +
      "</div>";
  }

  function build() {
    var sec = document.createElement("section");
    sec.className = "tqf section";
    sec.id = "framer-files";
    sec.setAttribute("aria-labelledby", "tqf-title");

    var cards = DEMOS.map(function (d, i) {
      return '<button type="button" class="tqf-card" data-i="' + i + '" style="--i:' + i + ";--o:" + (i - (DEMOS.length - 1) / 2) + ";--a:" + Math.abs(i - (DEMOS.length - 1) / 2) + ";" + vars(d) + '" aria-label="Open the ' + esc(d.brand) + " " + esc(d.kind.toLowerCase()) + ' concept site">' +
        '<span class="tqf-tab"><em>' + pad(i + 1) + "</em>" + esc(d.kind) + "</span>" +
        '<span class="tqf-sheet">' + site(d, false) + "</span></button>";
    }).join("");

    sec.innerHTML =
      '<div class="section-heading tqf-head"><div><p class="eyebrow">FRAMER FILES <span class="revision-label">8 NEW CONCEPTS · BUILT IN FRAMER</span></p>' +
      '<h2 id="tqf-title">Open the folder.</h2></div>' +
      "<p>Eight concept sites for Metro Detroit trades, shops and studios. Pull one out to look closer.</p></div>" +
      '<div class="tqf-stage"><div class="tqf-folder">' +
      '<div class="tqf-back"><span class="tqf-ftab"></span></div>' +
      '<div class="tqf-cards" role="list">' + cards + "</div>" +
      '<div class="tqf-cover" aria-hidden="true"><span class="tqf-stamp">TEQNIKAL / FRAMER &mdash; 08 CONCEPT SITES<br><b>2026 &middot; METRO DETROIT</b></span><span class="tqf-cover-mark">T/S</span></div>' +
      '</div><p class="tqf-hint">' + '<span class="tqf-d">HOVER TO LIFT · CLICK A FILE TO OPEN IT</span><span class="tqf-m">SWIPE THROUGH · TAP A FILE TO OPEN IT</span>' + "</p></div>" +
      '<div class="tqf-modal" role="dialog" aria-modal="true" aria-label="Concept site preview" hidden>' +
      '<div class="tqf-scrim" data-close></div><div class="tqf-win">' +
      '<div class="tqf-bar"><span class="tqf-dots"><i></i><i></i><i></i></span><span class="tqf-url"></span>' +
      '<button type="button" class="tqf-x" data-close aria-label="Close preview">&times;</button></div>' +
      '<div class="tqf-view"></div>' +
      '<div class="tqf-foot"><p class="tqf-note"></p><div class="tqf-nav2">' +
      '<button type="button" data-step="-1" aria-label="Previous concept">&larr;</button>' +
      '<button type="button" data-step="1" aria-label="Next concept">&rarr;</button>' +
      '<a class="tqf-live" target="_blank" rel="noopener">View live site <span aria-hidden="true">&#8599;</span></a>' +
      '<a class="button tqf-go" href="#contact">Want one like this? <span aria-hidden="true">&rarr;</span></a></div></div></div></div>';
    return sec;
  }

  function loadFonts() {
    if (document.getElementById("tqf-fonts")) return;
    var chars = {};
    DEMOS.forEach(function (d) { (d.brand + d.h + d.h.toUpperCase() + d.brand.toUpperCase()).split("").forEach(function (c) { chars[c] = 1; }); });
    var l = document.createElement("link");
    l.id = "tqf-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?" + FONT_FAMILIES.map(function (f) { return "family=" + f; }).join("&") +
      "&display=swap&text=" + encodeURIComponent(Object.keys(chars).join(""));
    document.head.appendChild(l);
  }

  function wire(sec) {
    var folder = sec.querySelector(".tqf-folder");
    var stage = sec.querySelector(".tqf-stage");
    var modal = sec.querySelector(".tqf-modal");
    var view = modal.querySelector(".tqf-view");
    var url = modal.querySelector(".tqf-url");
    var note = modal.querySelector(".tqf-note");
    var live = modal.querySelector(".tqf-live");
    var current = 0, lastFocus = null;

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es, ob) {
        es.forEach(function (e) { if (e.isIntersecting) { loadFonts(); ob.disconnect(); } });
      }, { rootMargin: "700px 0px" }).observe(sec);
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) folder.classList.add("is-open"); });
      }, { threshold: 0.35 }).observe(stage);
    } else { loadFonts(); folder.classList.add("is-open"); }
    if (reduce) folder.classList.add("is-open");

    // gentle parallax tilt on desktop pointers
    if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      var raf = 0;
      stage.addEventListener("pointermove", function (e) {
        var r = stage.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          folder.style.setProperty("--ry", (x * 8).toFixed(2) + "deg");
          folder.style.setProperty("--rx", (14 - y * 6).toFixed(2) + "deg");
        });
      });
      stage.addEventListener("pointerleave", function () {
        folder.style.removeProperty("--ry"); folder.style.removeProperty("--rx");
      });
    }

    function show(i) {
      current = (i + DEMOS.length) % DEMOS.length;
      var d = DEMOS[current];
      view.innerHTML = site(d, true);
      url.textContent = pad(current + 1) + " / " + pad(DEMOS.length) + "  ·  " + d.brand + "  ·  " + d.kind + ", " + d.city;
      note.textContent = "Concept site for a fictional business, built in Framer by TEQNIKAL Studios.";
      live.href = d.url;
      live.setAttribute("aria-label", "View the live " + d.brand + " concept site (opens in a new tab)");
    }
    function open(i, from) {
      lastFocus = from || document.activeElement;
      show(i);
      modal.hidden = false;
      document.documentElement.classList.add("tqf-lock");
      requestAnimationFrame(function () { requestAnimationFrame(function () { modal.classList.add("is-in"); }); });
      modal.querySelector(".tqf-x").focus();
    }
    function close() {
      modal.classList.remove("is-in");
      document.documentElement.classList.remove("tqf-lock");
      setTimeout(function () { modal.hidden = true; }, reduce ? 0 : 260);
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    sec.querySelectorAll(".tqf-card").forEach(function (b) {
      b.addEventListener("click", function () { folder.classList.add("is-open"); open(+b.getAttribute("data-i"), b); });
    });
    modal.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest("[data-close]")) close();
      var s = t.closest("[data-step]");
      if (s) show(current + +s.getAttribute("data-step"));
      if (t.closest(".tqf-go")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (modal.hidden) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") show(current + 1);
      else if (e.key === "ArrowLeft") show(current - 1);
      else if (e.key === "Tab") {
        var f = modal.querySelectorAll("button, a[href]");
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  var section = null;
  function mount() {
    var work = document.getElementById("work");
    if (!work) return;
    if (section && section.isConnected && section.previousElementSibling === work) return;
    if (!section) { section = build(); wire(section); }
    work.insertAdjacentElement("afterend", section);
  }

  function start() {
    mount();
    var root = document.getElementById("root") || document.body;
    new MutationObserver(mount).observe(root, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
