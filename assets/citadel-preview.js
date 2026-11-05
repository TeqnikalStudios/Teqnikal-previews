const colors = ["#fc727a", "#ffbf74", "#6de4ba", "#74dafa"];
const project = ([x, y, z = 0]) => [320 + (x - y) * 22, 184 + (x + y) * 10 - z];
const points = vertices => vertices.map(vertex => project(vertex).join(",")).join(" ");

const buildings = Array.from({ length: 100 }, (_, index) => {
  const x = index % 10;
  const y = Math.floor(index / 10);
  if (x === 3 || x === 7 || y === 3 || y === 7) return null;
  const h = 15 + ((x * 37 + y * 43 + x * y * 7) % 66);
  return { x: x - 4.85, y: y - 4.85, h, color: colors[(x < 5 ? 0 : 1) + (y < 5 ? 0 : 2)] };
}).filter(Boolean);
buildings.push({ x: -.5, y: -.5, h: 124, color: colors[0], core: true });
buildings.sort((a, b) => a.x + a.y - b.x - b.y);

export function createCitadelPreview({ jsx, jsxs }, { useEffect, useRef }) {
  function tower({ x, y, h, color, core }) {
    const width = core ? .88 : .64;
    const corner = (a, b, z) => [x + a * width, y + b * width, z];
    const face = (vertices, fill, key) => jsx("polygon", {
      points: points(vertices), fill, stroke: color, strokeOpacity: .55, strokeWidth: .65
    }, key);
    const windows = Array.from({ length: Math.floor(h / 11) }, (_, i) => {
      const z = 6 + i * 11;
      const [x1, y1] = project(corner(.16, 1, z));
      const [x2, y2] = project(corner(.76, 1, z));
      return jsx("line", { x1, y1, x2, y2, stroke: color, strokeOpacity: i % 3 === 0 ? .95 : .48 }, i);
    });
    return jsxs("g", {
      children: [
        face([corner(0, 1, 0), corner(1, 1, 0), corner(1, 1, h), corner(0, 1, h)], "#211725", "west"),
        face([corner(1, 0, 0), corner(1, 1, 0), corner(1, 1, h), corner(1, 0, h)], "#141523", "east"),
        face([corner(0, 0, h), corner(1, 0, h), corner(1, 1, h), corner(0, 1, h)], core ? "#703344" : "#30253b", "roof"),
        ...windows,
        core && jsx("line", { x1: 320, x2: 320, y1: 48, y2: 16, className: "citadel-beacon" })
      ]
    }, x + "," + y);
  }

  return function CitadelPreview() {
    const stage = useRef(null);
    useEffect(() => {
      const element = stage.current;
      if (!element || typeof IntersectionObserver === "undefined") return;
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          element.dataset.active = "true";
          observer.disconnect();
        }
      }, { threshold: .25 });
      observer.observe(element);
      return () => observer.disconnect();
    }, []);

    const grid = Array.from({ length: 13 }, (_, i) => i - 6).flatMap(i =>
      [[[i, -6], [i, 6]], [[-6, i], [6, i]]].map((vertices, axis) =>
        jsx("polyline", { points: points(vertices), fill: "none", stroke: "#a481ab", strokeOpacity: .23 }, axis + "," + i)
      )
    );
    return jsxs("figure", {
      className: "citadel-preview",
      children: [
        jsxs("figcaption", {
          className: "citadel-caption",
          children: [jsx("strong", { children: "CITADEL" }), jsx("span", { children: "TEQNIKAL OS · CONCEPT PREVIEW" })]
        }),
        jsx("div", {
          ref: stage,
          className: "citadel-stage",
          children: jsxs("svg", {
            viewBox: "0 0 640 330", role: "img",
            "aria-label": "A neon isometric city with a central command tower and colored districts",
            children: [
              jsx("polygon", { points: points([[-6,-6],[6,-6],[6,6],[-6,6]]), fill: "#121121", stroke: "#5a405b" }),
              ...grid,
              ...[-1.85, 2.15].flatMap(i => [
                jsx("polyline", { points: points([[i,-5],[i,5]]), className: "citadel-route" }, "x" + i),
                jsx("polyline", { points: points([[-5,i],[5,i]]), className: "citadel-route" }, "y" + i)
              ]),
              ...buildings.map(tower),
              jsx("circle", { cx: 206, cy: 146, r: 3.5, className: "citadel-traffic citadel-traffic-east" }),
              jsx("circle", { cx: 446, cy: 191, r: 3.5, className: "citadel-traffic citadel-traffic-west" }),
              jsx("circle", { cx: 320, cy: 40, r: 3, className: "citadel-beacon-light" })
            ]
          })
        }),
        jsxs("div", {
          className: "citadel-footer",
          children: [
            jsx("span", { children: "Lead research · Website audits · Follow-ups" }),
            jsx("a", { href: "https://command.teqnikalstudios.com/", target: "_blank", rel: "noreferrer", children: "Open command center ↗" })
          ]
        })
      ]
    });
  };
}
