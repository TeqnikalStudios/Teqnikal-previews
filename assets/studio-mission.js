export function createStudioMission({ jsx, jsxs }, { useEffect, useRef }) {
  return function StudioMission() {
    const stage = useRef(null);
    useEffect(() => {
      const element = stage.current;
      if (!element) return;
      if (typeof IntersectionObserver === "undefined") {
        element.dataset.active = "true";
        return;
      }
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          element.dataset.active = "true";
          observer.disconnect();
        }
      }, { threshold: 0.25 });
      observer.observe(element);
      return () => observer.disconnect();
    }, []);

    const faces = ["front", "back", "right", "left", "top", "bottom"];
    return jsxs("section", {
      className: "studio-mission",
      "aria-labelledby": "studio-mission-title",
      children: [
        jsxs("div", {
          className: "studio-mission-copy",
          children: [
            jsx("p", { className: "studio-mission-label", children: "Our mission · Metro Detroit" }),
            jsxs("h2", {
              id: "studio-mission-title",
              children: ["Build a better website.", jsx("span", { children: "Get time back." })]
            }),
            jsx("p", {
              className: "studio-mission-intro",
              children: "We help businesses turn more website visits into real inquiries. We build the site, connect your forms, and automate follow-ups so fewer leads slip through while you’re busy doing the work."
            }),
            jsxs("div", {
              className: "studio-mission-actions",
              children: [
                jsx("a", { href: "#contact", children: "Start a project ↗" }),
                jsx("a", { href: "#services", children: "Explore services ↓" })
              ]
            })
          ]
        }),
        jsxs("div", {
          className: "studio-mission-stage",
          ref: stage,
          "aria-hidden": "true",
          children: [
            jsx("div", { className: "studio-mission-orbit" }),
            jsx("div", { className: "studio-mission-orbit studio-mission-orbit-outer" }),
            jsxs("div", {
              className: "studio-mission-rig",
              children: [
                jsx("div", { className: "studio-mission-core" }),
                ...faces.map(face => jsx("div", { className: "studio-mission-face " + face }, face))
              ]
            }),
            jsx("span", { className: "studio-mission-coordinate", children: "TEQNIKAL / SYSTEM 01" })
          ]
        })
      ]
    });
  };
}
