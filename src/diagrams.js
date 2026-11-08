// Diagram specs for <DiagramFigure variant="..." />. All use a 300 x 316 viewBox.
//
// node: { x, y, w, h, title, sub?, shape?: "box" | "db", wave, titleSize?, subSize? }
// edge: { points: [[x, y], ...], arrow?: "end" | "both" | "none", wave }
//
// `wave` controls the draw order: every item in wave 0 draws first, then wave 1, and so on.

// Data warehouse pipeline: source -> CDC capture -> load -> transform -> warehouse.
const pipelineStages = [
  { title: "Source DB", sub: "OLTP", shape: "db" },
  { title: "CDC Capture", sub: "change log" },
  { title: "Load", sub: "raw / staging" },
  { title: "Transform", sub: "clean + model" },
  { title: "Data Warehouse", sub: "analytics", shape: "db" },
];

const pipeline = {
  label: "Data warehouse pipeline: source database, CDC capture, load, transform, data warehouse",
  nodes: pipelineStages.map((s, i) => ({ x: 60, y: i * 68, w: 180, h: 44, wave: i * 2, ...s })),
  edges: pipelineStages.slice(1).map((_, i) => ({
    points: [[150, i * 68 + 44], [150, (i + 1) * 68]],
    wave: i * 2 + 1,
  })),
};

// Microservices: gateway in front, each service owns its database, services talk through a message broker.
const services = [
  { name: "Orders", cx: 42, linkX: 78 },
  { name: "Payments", cx: 150, linkX: 186 },
  { name: "Inventory", cx: 258, linkX: 294 },
];

const microservices = {
  label: "Microservices: API gateway, three services that each own a database, connected by a message broker",
  nodes: [
    { x: 90, y: 0, w: 120, h: 40, title: "API Gateway", sub: "routing · auth", wave: 0 },
    ...services.map((s) => ({ x: s.cx - 42, y: 80, w: 84, h: 40, title: s.name, wave: 1 })),
    ...services.map((s) => ({
      x: s.cx - 28, y: 160, w: 56, h: 40, title: "DB", sub: s.name.toLowerCase(), shape: "db", wave: 3,
    })),
    { x: 0, y: 276, w: 300, h: 40, title: "Message Broker", sub: "events · pub/sub", wave: 3 },
  ],
  edges: [
    // Gateway routes to each service.
    { points: [[150, 40], [150, 60], [42, 60], [42, 80]], wave: 2 },
    { points: [[150, 40], [150, 80]], wave: 2 },
    { points: [[150, 40], [150, 60], [258, 60], [258, 80]], wave: 2 },
    // Each service talks only to its own database...
    ...services.map((s) => ({ points: [[s.cx, 120], [s.cx, 160]], wave: 4 })),
    // ...and to the others through events on the broker.
    ...services.map((s) => ({ points: [[s.linkX, 120], [s.linkX, 276]], arrow: "both", wave: 4 })),
  ],
};

export const diagrams = { pipeline, microservices };
