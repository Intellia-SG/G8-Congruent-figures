// src/data/storyContent.js
// 4 story panels per PRD §8.2 & TRD §4.3
export const STORY_PANELS = [
  {
    panel: 0,
    title: "The Matching Pair",
    text: "Backstage at the school musical, Li Ting and Haikal need to construct identical twin stage flats for the left and right wings of the theatre. Li Ting glances across the workshop and smiles: 'Look, they look identical to the audience!' But Haikal shakes his head: 'Looking identical from row ten isn't enough! Every joint has to fit the backstage track. We need exact proof — but we only have time to take three measurements!'",
    highlight: "Prove they match with the fewest, right measurements!",
    character: "Haikal & Li Ting",
    characterEmoji: "🧑🏽",
    imageBg: "radial-gradient(ellipse at center, rgba(142,44,72,0.4) 0%, #0a0a2e 100%)",
    imageEmoji: "🎭",
  },
  {
    panel: 1,
    title: "Same Shape, Same Size — Even Flipped",
    text: "Echo the Mynah swoops down with a blueprint. 'Two figures are congruent if they have the exact same shape and size — even if one flat is turned sideways or flipped over like a mirror reflection!' Echo traces the vertices: 'Writing △ABC ≅ △PQR tells us the exact correspondence: vertex A matches P, vertex B matches Q, and vertex C matches R. The vertex order is the law!'",
    highlight: "Flipped or turned copies are still congruent! The statement order △ABC ≅ △PQR fixes the match.",
    character: "Echo the Mynah",
    characterEmoji: "🐦",
    imageBg: "radial-gradient(ellipse at center, rgba(201,162,77,0.4) 0%, #0a0a2e 100%)",
    imageEmoji: "📋",
  },
  {
    panel: 2,
    title: "Three Is Enough (If They're the Right Three)",
    text: "Haikal holds up two triangular timber frames. 'We don't need to measure all six parts! Three matching pieces are enough — but ONLY if they are the right three.' He wiggles a joint: 'Matching two sides and a non-between angle (SSA) lets the frame swing into two different shapes! And three angles (AAA) can make a tiny prop and a giant flat! The only five valid tests are SSS, SAS, ASA, AAS, and RHS.'",
    highlight: "Three is enough only if they are the right three! Beware SSA and AAA traps.",
    character: "Haikal",
    characterEmoji: "🧑🏽",
    imageBg: "radial-gradient(ellipse at center, rgba(107,112,92,0.4) 0%, #0a0a2e 100%)",
    imageEmoji: "🚪",
  },
  {
    panel: 3,
    title: "Opening Night",
    text: "Curtain call is in ten minutes! Two large set pieces overlap across the centre stage, sharing a hidden centre beam. Li Ting spots it: 'That shared beam is a common side for both triangles!' Together, the crew builds a watertight three-step argument with geometric reasons, states the SAS test in brackets, and deduces the missing timber length. With every prop proven identical, the spotlight turns on!",
    highlight: "Spot hidden shared edges, build the proof chain, and deduce the missing measures!",
    character: "Li Ting",
    characterEmoji: "👧🏻",
    imageBg: "radial-gradient(ellipse at center, rgba(27,20,38,0.6) 0%, #0a0a2e 100%)",
    imageEmoji: "🎬",
  },
];
