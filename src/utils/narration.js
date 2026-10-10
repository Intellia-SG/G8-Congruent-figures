// src/utils/narration.js
/**
 * Narration script builder for CongruenceQuest
 * Strictly matches on-screen text 1:1, following PRD §11 rules.
 */

export const say       = (text) => ({ text, style: 'statement' });
export const ask       = (text) => ({ text, style: 'question' });
export const cheer     = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think     = (text) => ({ text, style: 'thinking' });
export const instruct  = (text) => ({ text, style: 'instruction' });
export const encourage = (text) => ({ text, style: 'encouragement' });

export function wonderNarration() {
  return [
    say("Welcome to CongruenceQuest! Let's investigate the backstage match mystery!"),
    say("Two stage flats look identical from the audience, but you can only afford to measure three things."),
    ask("Which three measurements would guarantee that the two flats match exactly?"),
    cheer("Let's investigate how corresponding parts and congruence tests work!"),
  ];
}

export function storyNarration(panel) {
  const scripts = [
    [
      say("Backstage at the school musical, Li Ting and Haikal need to construct identical twin stage flats for the left and right wings of the theatre."),
      say("Li Ting glances across the workshop and smiles: Look, they look identical to the audience!"),
      emphasize("But Haikal shakes his head: Looking identical from row ten is not enough! Every joint has to fit the backstage track. We need exact proof, but we only have time to take three measurements!"),
    ],
    [
      say("Echo the Mynah swoops down with a blueprint."),
      say("Two figures are congruent if they have the exact same shape and size, even if one flat is turned sideways or flipped over like a mirror reflection!"),
      emphasize("Writing triangle A B C is congruent to triangle P Q R tells us the exact correspondence: vertex A matches P, vertex B matches Q, and vertex C matches R. The vertex order is the law!"),
    ],
    [
      say("Haikal holds up two triangular timber frames. We do not need to measure all six parts! Three matching pieces are enough, but only if they are the right three."),
      think("Matching two sides and an angle that is not between them lets the frame swing into two different shapes! And three angles can make a tiny prop and a giant flat!"),
      say("The only five valid tests are side side side, side angle side, angle side angle, angle angle side, and right angle hypotenuse side."),
    ],
    [
      say("Curtain call is in ten minutes! Two large set pieces overlap across the centre stage, sharing a hidden centre beam."),
      say("Li Ting spots it: That shared beam is a common side for both triangles!"),
      cheer("Together, the crew builds a watertight three-step argument with geometric reasons, states the side angle side test in brackets, and deduces the missing timber length. The show goes on!"),
    ],
  ];

  return scripts[panel] || scripts[0];
}

export function simStationIntro(stationIdx) {
  const intros = [
    [
      instruct("Welcome to Station A — The Pin Board!"),
      instruct("Pin three chosen parts on the triangle frame. Wiggle the free vertex to see whether the frame is locked into one unique triangle, or can swing into multiple shapes!"),
    ],
    [
      instruct("Welcome to Station B — Cut the Copy!"),
      instruct("A target stage flat has hidden measurements. Choose your test, adjust the measurements with the steppers, and test if your cut copy fits the target flat overlay!"),
    ],
    [
      instruct("Welcome to Station C — The Full Rehearsal!"),
      instruct("Separate the overlapping stage panels, mark the hidden shared side, choose the congruence test, and arrange the complete proof chain in logical order!"),
    ],
    [
      instruct("Welcome to Station D — Spot the Bad Match!"),
      instruct("A fellow stagehand's argument contains a seeded geometric flaw. Tap the flawed step, identify why it fails, and select the valid mathematical correction!"),
    ],
  ];

  return intros[stationIdx] || intros[0];
}

export function playQuestionNarration(questionText) {
  return [
    ask(questionText)
  ];
}

export function playCorrectNarration(streak = 1) {
  if (streak >= 10) {
    return [cheer("Standing ovation! Ten in a row without missing a cue! 🔥")];
  }
  if (streak >= 5) {
    return [cheer("Smooth scene change! Five in a row! 🎭")];
  }
  if (streak >= 3) {
    return [cheer("Awesome! Three in a row! ⭐")];
  }
  return [cheer("Spot on! That's correct! 🎉")];
}

export function playWrongNarration() {
  return [
    think("Not quite — check the hint, inspect the marked parts carefully, and try again! 💡")
  ];
}

export function playHint1Narration() {
  return [
    encourage("Here's your first clue! Count how many sides and how many angles are marked equal.")
  ];
}

export function playHint2Narration() {
  return [
    encourage("Here's your final hint! Check whether the angle is between the two sides, or whether the side is between the two angles.")
  ];
}

export function districtCompleteNarration() {
  return [
    cheer("World Complete! Spectacular job on this congruence world! 🌟")
  ];
}

export function bossStartNarration() {
  return [
    emphasize("The Boss Battle begins! Answer correctly to defeat the boss and claim your backstage badge!")
  ];
}

export function bossWinNarration() {
  return [
    cheer("Encore! You defeated the boss and claimed the World Badge! 👑")
  ];
}

export function reflectNarration() {
  return [
    say("Welcome to the Reflect Phase! Let's review the headline congruence misconceptions and check your scorecard! 📓")
  ];
}

export function reflectCompleteNarration() {
  return [
    cheer("Outstanding! You have mastered triangle congruence tests, corresponding parts, and geometric deduction! You are a true Stage Master! 🏆")
  ];
}
