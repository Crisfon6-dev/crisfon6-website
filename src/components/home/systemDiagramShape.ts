/** Geometry of the layered-system diagram (viewBox 640x460). No text: shapes only. */

export type DiagramElement = {
  id: string;
  d: string;
  kind: 'plane' | 'node' | 'line';
  /** Which drawing step it belongs to; steps are drawn in order. */
  step: number;
};

export const DIAGRAM_VIEWBOX = '0 0 640 460';
export const DIAGRAM_STEPS = 5;

const diamond = (cx: number, cy: number, hw: number, hh: number) =>
  `M${cx} ${cy - hh} L${cx + hw} ${cy} L${cx} ${cy + hh} L${cx - hw} ${cy} Z`;

const PLANE_Y = [80, 180, 280, 380] as const;

const NODES: readonly (readonly [number, number][])[] = [
  [
    [240, 80],
    [320, 64],
    [400, 80],
  ],
  [
    [250, 172],
    [320, 180],
    [390, 172],
  ],
  [
    [250, 280],
    [320, 264],
    [390, 280],
  ],
  [
    [270, 380],
    [370, 380],
  ],
];

export const DIAGRAM_ELEMENTS: readonly DiagramElement[] = [
  ...PLANE_Y.flatMap((cy, step): DiagramElement[] => [
    { id: `plane-${step}`, d: diamond(320, cy, 170, 62), kind: 'plane', step },
    ...NODES[step].map(
      ([x, y], i): DiagramElement => ({
        id: `node-${step}-${i}`,
        d: diamond(x, y, 18, 9),
        kind: 'node',
        step,
      })
    ),
  ]),
  {
    id: 'flow',
    d: 'M320 64 L320 180 L320 264 C320 310 270 330 270 380 L370 380 L470 420',
    kind: 'line',
    step: 4,
  },
];
