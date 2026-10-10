# CongruenceQuest — Module TRD
**Grade 8 · Congruence**
*(Technical companion to `CongruenceQuest_Grade8_PRD.md`, produced from `Intellia_Module_Blueprint_TRD.md`. Repo: `congruence-quest-main`. Recommended clone source: `reason-quest-main`, because it already contains the reasoning engine this module extends. If cloned from there, follow §1.5 to strip courtroom branding. The fallback clone source is `G2-Money-Money-main`, in which case the engine in §4.4 must be written from scratch.)*

---

## 1. Reference Analysis Notes — Gotcha Check

Check each fresh against whichever repo is actually cloned from, per platform blueprint §1:

1. **Dead/duplicate `src/features/*` folder.** Confirm `App.jsx`'s actual imports before copying anything.
2. **Hardcoded story-panel count.** This module uses the default **4 panels** — likely a no-op, but confirm against the actual clone source.
3. **Static vs. procedural question bank.** Build `data/questionBank.js` procedurally across the 10 concept generators in §4.1. Almost every question carries a figure, and several answer types go beyond 4-option MCQ (step ordering, three-way verdicts, statement building).
4. **Viewport-clipping bug.** Proactively apply the `100dvh` + `ResizeObserver` header-height fix.
5. **Leftover branding strings.** If cloned from `reason-quest-main`: remove the courtroom copy, "Geometry Court" wording, Tally the Owl as judge, Priyanka and Syafiq, and any `converse-and-counterexample` claim-bank code that this module does not use. Check `index.html`'s `<title>` and `README.md`. If cloned from `quad-quest-main` or `progression-quest-main`, strip their mascots and (for `progression-quest-main`) the 5th Simulate tab and multi-round station state back to the standard 4-tab single-pass architecture.
6. **Engine duplication across repos.** The reasoning engine (§4.4) is copied from `reason-quest-main` and extended. Each module ships as an independent repo, so a fix in one will not reach the other automatically; see §11.

**Module-specific risks to add:**
- **Correctness lives in computation, not authorship.** The module's central guarantees (which trios are congruence tests, which verdicts are right, which hidden parts are real) are checked by computation on constructions, never by what a question author believes.
- **Verdicts must be three-way and honest.** "Cannot tell" and "not congruent" are different answers; the generator must be able to *prove* each one.
- **Orientation.** Flipped copies must be rendered as true mirror images and still be classified congruent; a renderer that silently avoids flips would hide the very misconception this module targets.

## 2. Tech Stack

Unchanged from platform blueprint §2.1 — reuse verbatim. `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `vercel.json` — reuse as-is. No geometry or logic library is added; the engine in §4.4 is small, pure, and local.

## 3. Folder Structure

```
congruence-quest-main/
├── public/assets/{audio/, story/}
├── scripts/
│   ├── generate_audio.js         # MODIFY: new `phrases` array (§8)
│   └── clean_audio.js            # reuse as-is
├── src/
│   ├── assets/story/             # story_1.png ... story_4.png
│   ├── components/
│   │   ├── IntroScreen.jsx/.css  # MODIFY: title/copy only
│   │   ├── ProgressMap.jsx/.css  # reuse as-is
│   │   ├── shared/
│   │   │   ├── Mascot.jsx/.css              # reuse as-is (props swap to Echo the Mynah)
│   │   │   ├── FeedbackOverlay.jsx/.css     # reuse as-is
│   │   │   ├── FloatingNumbers.jsx/.css     # reuse as-is
│   │   │   └── CongruenceVisual.jsx         # NEW — §5.1
│   │   ├── gamification/
│   │   │   ├── KingdomMap.jsx/.css  # reuse as-is
│   │   │   └── StarRating.jsx       # reuse as-is
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx/.css  # MODIFY: import CongruenceVisual; add answer types (§5.2)
│   │   │   └── BossBattleModal.jsx/.css   # reuse as-is
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx/.css    # MODIFY: content only
│   │   │   ├── StoryPhase.jsx/.css     # MODIFY: content only
│   │   │   ├── SimulatePhase.jsx/.css  # MODIFY: 4 new station imports/labels (standard 4-tab architecture)
│   │   │   ├── PlayPhase.jsx/.css      # reuse as-is
│   │   │   └── ReflectPhase.jsx/.css   # MODIFY: 3 new recap questions (§6.3)
│   │   └── simulations/
│   │       ├── ThePinBoard.jsx          # NEW — Concept Discovery Lab — §6
│   │       ├── CutTheCopy.jsx           # NEW — Build-to-Target Challenge — §6
│   │       ├── TheFullRehearsal.jsx     # NEW — Multi-Step/Composite Construction — §6
│   │       ├── SpotTheBadMatch.jsx      # NEW — Error-Detective — §6
│   │       └── Stations.css             # MODIFY: extend with overlay, pin, overlap, and ordering-list classes
│   ├── config/
│   │   ├── worlds.config.js       # MODIFY: 10 topic-themed worlds — §4.1
│   │   ├── characters.config.js   # MODIFY: Li Ting / Haikal / Echo — §4.2
│   │   └── audio.config.js        # reuse as-is
│   ├── core/hooks/useViewport.js  # reuse as-is
│   ├── hooks/useAudio.js          # reuse as-is
│   ├── data/
│   │   ├── storyContent.js        # MODIFY: 4 story panels — §4.3
│   │   └── questionBank.js        # MODIFY: procedurally generated 100 Qs — §4.4
│   ├── utils/
│   │   ├── audio.js               # reuse as-is
│   │   ├── audioMap.js            # auto-generated — do not hand-edit
│   │   ├── narration.js           # MODIFY: topic-specific phase scripts — §8
│   │   ├── badgeEngine.js         # MODIFY: relabelled BADGES array only — §7
│   │   ├── scoring.js             # reuse as-is
│   │   ├── shuffle.js             # reuse as-is
│   │   ├── geoReasons.js          # COPY from reason-quest-main, extended — §4.4
│   │   ├── geoFacts.js            # COPY from reason-quest-main, extended — §4.4
│   │   ├── congruenceMath.js      # COPY from reason-quest-main, extended — §4.4
│   │   ├── congruenceDiagram.js   # NEW — constructions, rigid motions, overlap — §4.4
│   │   └── congruenceProblems.js  # NEW — generators and misconception functions — §4.4
│   ├── styles/
│   │   ├── design-tokens.css      # MODIFY: 10 new --world-N accent colors — §9
│   │   └── globals.css            # reuse as-is (apply viewport fix from §1.4 proactively)
│   ├── App.jsx                    # MODIFY only if the clone source's panel-count logic differs from 4 (§1.2)
│   ├── App.css / main.jsx / index.css   # reuse as-is
├── index.html / package.json / vite.config.js / tailwind.config.js / postcss.config.js / vercel.json / .oxlintrc.json / .gitignore
└── README.md                      # MODIFY: module-specific + art-brief (PRD §13)
```

## 4. Data Layer

### 4.1 `config/worlds.config.js`
Ten entries in the fixed shape, populated from PRD §9:

```js
export const WORLDS = [
  { id: 0, name: "Same Shape, Same Size", emoji: "🎭", accent: "var(--world-0)",
    description: "Congruent figures, including turned and flipped copies",
    conceptFocus: "congruent-figures-and-orientation",
    boss: { name: "The Mirror Mime", emoji: "🎭", reward: "Twin Badge" } },
  { id: 1, name: "Matching Parts", emoji: "📋", accent: "var(--world-1)",
    description: "Corresponding parts and congruence statements",
    conceptFocus: "corresponding-parts-and-statements",
    boss: { name: "The Scrambled Cast List", emoji: "📋", reward: "Casting Badge" } },
  { id: 2, name: "Use the Copy", emoji: "🖨️", accent: "var(--world-2)",
    description: "Find unknown lengths and angles from congruent figures",
    conceptFocus: "find-unknowns-from-congruent-figures",
    boss: { name: "The Prop Duplicator", emoji: "🖨️", reward: "Copy Badge" } },
  { id: 3, name: "Three Is Enough", emoji: "🚪", accent: "var(--world-3)",
    description: "Identify SSS, SAS, ASA, AAS, or RHS",
    conceptFocus: "identify-congruence-test",
    boss: { name: "The Three-Check Gatekeeper", emoji: "🚪", reward: "Test Badge" } },
  { id: 4, name: "Included or Not?", emoji: "🥸", accent: "var(--world-4)",
    description: "Included vs. non-included angles and sides",
    conceptFocus: "included-vs-non-included",
    boss: { name: "The Included Impostor", emoji: "🥸", reward: "Position Badge" } },
  { id: 5, name: "Not Enough Info", emoji: "📄", accent: "var(--world-5)",
    description: "SSA, AAA, and the verdicts: congruent, not congruent, cannot tell",
    conceptFocus: "insufficient-information",
    boss: { name: "The Missing Script Page", emoji: "📄", reward: "Verdict Badge" } },
  { id: 6, name: "Hidden Matches", emoji: "🌑", accent: "var(--world-6)",
    description: "Hidden matched parts in overlapping triangles",
    conceptFocus: "hidden-common-parts-overlapping",
    boss: { name: "The Shadow Stagehand", emoji: "🌑", reward: "Hidden Match Badge" } },
  { id: 7, name: "Order in the Argument", emoji: "🪢", accent: "var(--world-7)",
    description: "Order and complete a structured congruence argument",
    conceptFocus: "structured-congruence-argument",
    boss: { name: "The Tangled Curtain", emoji: "🪢", reward: "Argument Badge" } },
  { id: 8, name: "Hence…", emoji: "🗣️", accent: "var(--world-8)",
    description: "Deduce further results and prove simple properties",
    conceptFocus: "deductions-and-simple-proofs",
    boss: { name: "The Hence-Heckler", emoji: "🗣️", reward: "Deduction Badge" } },
  { id: 9, name: "The Grand Opening Night", emoji: "🎬", accent: "var(--world-9)",
    description: "Mixed review of every concept above",
    conceptFocus: "mixed-review",
    boss: { name: "The Opening Night Director", emoji: "🎬", reward: "Opening Night Trophy" } },
];
```

### 4.2 `config/characters.config.js`
```js
export const CHARACTERS = {
  liTing: { name: "Li Ting", role: "Trusts what looks the same", emoji: "👧🏻", colour: "var(--char-1)", mascotEmoji: "🐦" },
  haikal: { name: "Haikal", role: "Counts the matched parts", emoji: "🧑🏽", colour: "var(--char-2)", mascotEmoji: "🐦" },
  echo:   { name: "Echo the Mynah", role: "Mascot & mentor", emoji: "🐦", colour: "var(--mascot)", mascotEmoji: "🐦" },
};
export const MASCOT = { name: "Echo the Mynah", emoji: "🐦" };
```

### 4.3 `data/storyContent.js`
`STORY_PANELS` array, length 4, per PRD §8.2, fixed shape `{ panel, title, text, highlight, character, characterEmoji, imageBg, imageEmoji }`. Titles: "The Matching Pair," "Same Shape, Same Size — Even Flipped," "Three Is Enough (If They're the Right Three)," "Opening Night."

### 4.4 Reasoning Engine and Question Bank

The engine is copied from `reason-quest-main` and extended. The shared parts must stay **identical in keys and wording** with that repo (§11).

**`utils/geoReasons.js`** (copied, extended)

| Item | Purpose |
|---|---|
| `REASONS` | The closed list from `reason-quest-main`, including `sss`, `sas`, `asa`, `aas`, `rhs`, `corresponding-parts-congruent-triangles`, `common-side`, `common-angle`, `vertically-opposite-angles`, and the parallel-line angle reasons. Extended here with `given-equal-sides`, `given-equal-angles`, and `definition-of-midpoint` only if a world-8 proof needs it. |
| `REASON_DISPLAY` | Full-words wording (for narration) and the textbook abbreviation shown on screen, with the "(SAS)" style bracket for the test step. |
| `RULES` | For each reason key, its premises as a pattern and its conclusion. **The congruence tests have a positional premise:** `sas` requires two matched sides and the matched angle *between* them; `asa` requires two matched angles and the matched side between them; `aas` requires two matched angles and a matched side *not* between them; `rhs` requires a right angle in each triangle plus matched hypotenuses and one matched leg. `corresponding-parts-congruent-triangles` has a premise that a **congruence fact for those two triangles already exists earlier in the chain**, which is how the circularity flaw in PRD §3 becomes computable. |

**`utils/geoFacts.js`** (copied, extended)

| Function | Purpose |
|---|---|
| `Fact` | A typed record: matched sides, matched angles, right angles, common parts, congruence statements (with an explicit vertex correspondence), each with `provenance`. |
| `deriveClosure(givens)` | Forward-chains `RULES` until no new fact appears. Extended so congruence facts feed `corresponding-parts-congruent-triangles`. |
| `checkChain(chain, givens)` | The single validity authority. Returns `{ valid, failsAtStep, failureType }`, where `failureType` adds, for this module: `test-positions-wrong`, `statement-order-mismatch`, and `corresponding-parts-before-congruence` to the existing `unknown-reason`, `condition-not-met`, `conclusion-does-not-follow`, and `circular`. |
| `validOrderings(chain)` | Computes the dependency order of a chain; ordering questions are graded by validity, not by a single fixed sequence. |

**`utils/congruenceMath.js`** (copied, extended)

| Function | Purpose |
|---|---|
| `classifyMarks(marks)` | Returns `sss`, `sas`, `asa`, `aas`, `rhs`, `ssa-not-a-test`, `aaa-not-a-test`, or `insufficient` from the matched sides and angles and *where* each sits. Included vs. non-included is computed from the vertex positions, not stored as a label. |
| `findCounterexample(marks)` | For any marks that are not a test, constructs two **non-congruent** triangles satisfying the same marks. For `ssa-not-a-test` it constructs the ambiguous case (two triangles from the same two sides and non-included angle). For valid tests, samples constructions and confirms every one is congruent. |
| `verdict(marks, givenMeasures)` | Returns `congruent` (a test applies), `not-congruent` (some corresponding part is shown unequal in `givenMeasures`), or `cannot-tell` (not a test **and** `findCounterexample` succeeds). A call that would return `cannot-tell` without a counterexample is rejected as a generator bug. |
| `congruenceStatement(tri1, tri2, correspondence)` | Builds the statement with vertices in corresponding order; `vertexOrderMismatch` produces the wrong-order distractor. |
| `correspondingParts(statement)` | Returns the pairs of equal parts implied by a valid statement. |
| `areCongruent(triA, triB)` | Geometric check via sorted side lengths and angles (accepts reflections), used by every audit. |

**`utils/congruenceDiagram.js`** (new)

| Function | Purpose |
|---|---|
| `buildConstruction(spec, freeParams)` | Coordinates for a figure specification, including two triangles, a flipped or turned copy, and overlapping configurations. |
| `applyRigidMotion(construction, kind)` | Applies a slide, turn, or **true mirror flip** to a copy so orientation is genuinely varied; `areCongruent` must still hold afterwards. |
| `separateOverlapping(construction)` | Returns the two triangles of an overlapping figure as two separate, consistently labelled figures (vertex labels and orientation preserved), for World 6 and The Full Rehearsal. |
| `distortNotToScale(spec)` | Returns a different valid construction satisfying the same marks, so the drawing cannot be measured to get the answer. |
| `perturbationTest(spec, target)` | Builds several different constructions consistent with the marks and returns whether the target quantity (or the congruence itself) is the same in all of them. |
| `hiddenMatches(construction)` | Lists the unmarked matched parts of a figure (common side, common angle, vertically opposite angles, equal parallel-line angles) with their reason keys. |

**`utils/congruenceProblems.js`** (new)

| Function | Purpose |
|---|---|
| `generateOrientationItem()` | World 0: a congruent or non-congruent pair, with one copy slid, turned, or flipped via `applyRigidMotion`; the answer comes from `areCongruent`. |
| `generateStatementItem()` | World 1: builds the correspondence first, then the statement and the corresponding-part question from it. |
| `generateUnknownItem()` | World 2: unknown lengths and angles via `correspondingParts`; algebraic versions pick an integer `x` first and check every resulting length and angle is valid. |
| `generateTestItem()` / `generateIncludedItem()` | Worlds 3–4: marks come from a constructed pair, and the answer from `classifyMarks`; included vs. non-included distractors come from `misconception.*`. |
| `generateVerdictItem()` | World 5: uses `verdict`; SSA items are generated **only in the ambiguous configuration**, so a given-SSA item can never accidentally be determined. |
| `generateHiddenMatchItem()` | World 6: uses `hiddenMatches`, and runs a **necessity check**: with the hidden match removed, `classifyMarks` must no longer return a test. |
| `generateArgumentItem()` | World 7: builds a valid chain, validated by `checkChain`; ordering is graded with `validOrderings`. |
| `generateDeductionItem()` | World 8: "hence" deductions and short guided proofs (for example opposite sides of a parallelogram, or a diagonal creating congruent triangles); each is a valid chain. |
| `misconception.*` | Every distractor and every seeded flaw comes from here, never hand-authored: `flippedNotCongruent`, `lookSameAsEvidence`, `positionalCorrespondence`, `vertexOrderMismatch`, `asaVsAas`, `sasVsSsa`, `ssaAsTest`, `aaaAsTest`, `cannotTellAsNotCongruent`, `missedCommonSide`, `correspondingPartsBeforeCongruence`, `equalsInsteadOfCongruent`, `equalAreaAsCongruent`. |

**Clean-number and clean-geometry constraints (hard requirements, not inline magic numbers):**
- Side lengths are whole centimetres (for example 3 to 20) and angles are whole degrees in a safe range; every generated triangle satisfies the triangle inequality and has no near-zero angle.
- RHS items need only a hypotenuse longer than the matched leg; no displayed value requires a square root.
- Algebraic items give integer `x` and every resulting length and angle valid.
- A figure's marks must be sufficient for its question, except World 5's "cannot tell" items, where insufficiency is the point.

**`data/questionBank.js` generation:** one or more template functions per `conceptFocus` (10 slugs from §4.1), each producing the fixed output schema (unchanged): `{ id, districtId, category, visual, questionText, options, correctAnswer, explanation, hint1, hint2, visualData }`, with `visualData` carrying the figure specification, marks, correspondence, and any chain. Also export `DISTRICTS` (derived from `WORLDS`) so `PlayPhase.jsx`'s existing import is unmodified.

## 5. Component Specs

### 5.1 `CongruenceVisual.jsx`
Replaces the reference's domain visual component. Takes `{ type, data, compact }`. Supported `type` values:
- `"triangle-pair"` — two triangles with matching marks and an optional correspondence overlay (colour **and** text labels), rendering slid, turned, or flipped copies.
- `"overlap-figure"` — an overlapping figure with a "show separately" toggle that animates to the two separated triangles.
- `"correspondence-table"` — a vertex-correspondence table (A↔P, B↔Q, C↔R) built from the statement.
- `"argument-chain"` — a numbered argument with a reason line per step, including the test in brackets.
- `"pin-board"` — a triangle with pinned parts and a free vertex, for The Pin Board and for explanations of non-tests.

Every type carries a text description of its marks and correspondence (PRD §12); none relies on colour alone. `compact` shrinks rendering for inline use in `QuestionRenderer.jsx`.

### 5.2 Additional answer types
`QuestionRenderer.jsx` needs four formats beyond 4-option MCQ, all still conforming to the fixed schema so `PlayPhase.jsx` scoring is unchanged:
1. **Statement building:** the student arranges vertex letters to write a congruence statement.
2. **Three-way verdict:** congruent / not congruent / cannot tell, with a short justification choice.
3. **Step ordering:** shuffled steps with keyboard-operable "move up / move down" controls, graded with `validOrderings`.
4. **Reason and test selection:** each step is paired with a reason from `REASONS`.

## 6. Simulate Station Specs

All 4 follow the fixed per-station contract: `<StationComponent onComplete={fn} audioEnabled={bool} />`, self-contained internal state, live SVG visuals themed with `design-tokens.css` variables, a `station-success` panel with a "Complete Station ✓" CTA, and keyboard-operable +/− controls alongside any slider/drag interaction. Standard single-pass architecture.

| Component | Archetype | Student manipulates | Live feedback | Completion gate |
|---|---|---|---|---|
| `ThePinBoard.jsx` | Concept Discovery Lab | Chooses a trio of parts to "pin" (SSS, SAS, ASA, AAS, RHS, SSA, AAA) and drags a free vertex | `findCounterexample` runs live: if only one shape is possible the board shows "fixed — this trio is a test"; if two shapes are possible it displays both and says so in text | Free exploration that includes at least two valid tests and both non-tests, **plus one confirmation question** ("why could the SSA triangle take two shapes?") per the platform's default archetype |
| `CutTheCopy.jsx` | Build-to-Target Challenge | Chooses which three parts to measure and enters values (keyboard +/− steppers) to cut a copy of a hidden-measurement target | A live overlay shows "fits exactly" or "does not fit," computed with `areCongruent`; weak part choices can still miss, which is the point | A perfect fit achieved with a valid test on at least two targets; a "next flat" loop offers a fresh target |
| `TheFullRehearsal.jsx` | Multi-Step/Composite Construction | On an overlapping figure: separates the triangles (`separateOverlapping`), marks hidden matches (`hiddenMatches`), chooses the test, orders the argument, and states the "hence" conclusion | `checkChain` runs after each action and reports the first failing step and its `failureType` in plain words | A fully valid argument — targets PRD LOs 6, 7, and 8 |
| `SpotTheBadMatch.jsx` | Error-Detective | Taps the flawed step of a crew member's argument, then supplies the correction | The tapped step highlights; flaws are generated from `misconception.*` and confirmed to fail `checkChain` at exactly the seeded step | Correctly identifying the flawed step and supplying a valid fix |

Wire all 4 into `SimulatePhase.jsx`'s `STATIONS` array and station-index render switch; tab bar, footer navigation, progress dots, and `COMPLETE_SIM_STATION`/`ADVANCE_SIM_STATION` gating logic are reused verbatim from the reference.

### 6.3 `ReflectPhase.jsx` Recap Questions
Replace the 3 hard-coded recap questions with 3 targeting flipped copies and "looks the same" as evidence; SSA, AAA, and "cannot tell" vs. "not congruent"; and included vs. non-included parts and vertex order (PRD §8.5), matching the Error-Detective station's focus.

## 7. Gamification

`utils/scoring.js` (`calcXP`, `calcStars`) — reuse formulas as-is. `utils/badgeEngine.js` — reuse `checkBadges(state)` trigger logic as-is; only the `BADGES` array's display strings change, per PRD §10's rename table (First Cue, Smooth Scene Change, Standing Ovation Streak, Full Backstage Pass, Perfect Match, Encore!, Seasoned Stagehand, Lead Stage Manager Badge).

## 8. Audio Pipeline

`config/audio.config.js`, `utils/audio.js`, `hooks/useAudio.js`, `utils/audioMap.js` — reuse mechanics as-is.

Rewrite `utils/narration.js` function *bodies* (signatures unchanged, same list as earlier modules' TRDs) and `scripts/generate_audio.js`'s `phrases` array using PRD §11's rules: vertex labels letter by letter; `≅` always "is congruent to"; every statement narrated with its correspondence; tests spoken in words with the included/non-included placement stated; "included" and "non-included" explained on first use; the three verdicts spoken exactly and never shortened; flips and turns described in words; "shared side" for a common side; every reason narrated as "because" plus the full reason. Dynamic generation covers numbers and vertex-label variations in procedurally generated questions. After content lock: `npm run generate-audio` then `npm run clean-audio`.

## 9. Design Tokens

`styles/design-tokens.css` — reuse core palette/type/radii/shadows/transitions as-is. Regenerate only the `--world-0` through `--world-9` accent block, using a backstage-theatre palette distinct from the earlier modules' palettes:

| World | Accent (indicative) |
|---|---|
| 0 — Same Shape, Same Size | `#8E2C48` (velvet curtain) |
| 1 — Matching Parts | `#C9A24D` (marquee gold) |
| 2 — Use the Copy | `#3D5A80` (blueprint-paper blue) |
| 3 — Three Is Enough | `#6B705C` (dusty flat green) |
| 4 — Included or Not? | `#B5543A` (brick backdrop) |
| 5 — Not Enough Info | `#7A6C8F` (spotlight haze) |
| 6 — Hidden Matches | `#2E3A46` (backstage shadow) |
| 7 — Order in the Argument | `#A47148` (wooden stage floor) |
| 8 — Hence… | `#D08C2B` (follow-spot amber) |
| 9 — The Grand Opening Night | `#1B1426` (deep stage black — most dramatic, for the finale) |

## 10. Build, QA, and Delivery

1. **Question bank stress test** — ≥300 randomized generations (30,000 questions) across all 10 concept categories; assert no duplicate options, no malformed/`NaN`/`undefined` fields, no degenerate triangle, and every length and angle within the clean ranges in §4.4.
2. **Test-validity audit (module-specific, highest stakes)** — for every valid test, sample many constructions satisfying the same marks and confirm every one is congruent; for every non-test used in the bank (SSA, AAA), confirm `findCounterexample` returns two genuinely non-congruent triangles with the same marks.
3. **Verdict audit** — confirm every `congruent` item satisfies a test, every `not-congruent` item shows an unequal corresponding part in its marks, and every `cannot-tell` item has a computed counterexample; confirm no SSA item appears outside the ambiguous configuration.
4. **Statement-and-correspondence audit** — confirm every congruence statement and every corresponding-parts claim agrees with `areCongruent` under the stated correspondence, including for slid, turned, and flipped copies; confirm `vertexOrderMismatch` distractors are genuinely mismatched.
5. **Hidden-match necessity audit** — for every World 6 and Full Rehearsal figure, confirm each hidden match is derivable from the figure by a stated reason and that removing it makes `classifyMarks` stop returning a test.
6. **Chain-validity audit** — run `checkChain` on every generated correct argument and every accepted ordering and confirm all pass; run it on every seeded flaw and confirm each fails at exactly the intended step with the intended `failureType`, including `corresponding-parts-before-congruence` and `statement-order-mismatch`.
7. **Not-to-scale audit** — confirm every flagged figure is rendered from `distortNotToScale`, and that no drawn value reveals an answer.
8. **Cross-module vocabulary audit** — diff `REASONS`, `REASON_DISPLAY`, and the congruence test keys against `reason-quest-main` (and shared entries against `quad-quest-main`).
9. **Audio parity check** — every string passed to a narration helper has an exact match in `audioMap.js`, or is intentionally dynamic.
10. **Full user-journey walkthrough** — Wonder → Story (all 4 panels) → Simulate (all 4 stations completable, tab-gating correct) → Practice (World Map, all 4 modes, all 10 Boss Battles, badges, and all four extra answer types) → Reflect — zero console/page errors.
11. **Production build check** — `npm install && npm run build` succeeds from a clean extract.
12. **Accessibility spot-check** — fonts/touch targets at Secondary sizing; every figure has a text description of its marks and correspondence; marks are not colour-only; ordering and the overlap-separation step have keyboard controls.
13. **Delivery checklist** — zip excludes `node_modules/`/`dist/`; 4 story image placeholders with art-brief README; `README.md` updated and checked for leftover branding (§1.5); `.env.local.example` documents `VITE_ELEVENLABS_API_KEY` with no real key committed.

## 11. Risks

- **Test-validity and verdicts rest on `findCounterexample` and `verdict`.** A construction bug would make a non-test look like a test, or a determined SSA item look like "cannot tell." Give both functions their own unit tests with hand-written cases (including the textbook ambiguous SSA configuration) independent of the generators.
- **The ambiguous-SSA restriction is easy to lose.** If a later content edit adds an SSA item where the angle is opposite the longer side, the triangle is actually determined and the "cannot tell" answer would be wrong; the audit in §10.3 must keep running after any generator change.
- **Cross-repo engine drift with `reason-quest-main`.** The engine is duplicated, and there is no automatic check. A fix to `checkChain` or `classifyMarks` in one repo must be ported to the other; run the diff in §10.8 whenever either changes. If duplication becomes costly, consider a small shared package, which would be a platform-level decision.
- **Flip rendering.** A renderer that quietly avoids mirror flips would hide the module's central misconception; keep flipped copies in the generator mix and the audit in §10.4.
- **Overlap separation fidelity.** `separateOverlapping` must preserve labels and orientation exactly; a relabelling bug would make the separated figure disagree with the original and corrupt the correspondence.
- **Answer-type surface.** Four extra answer types increase interaction and accessibility testing compared with a plain MCQ module.
- **Overlap with ReasonQuest's World 8** (PRD §15.1) should be settled before build so the shared test keys and wording are fixed once.
- **Concept Discovery Lab tension, unresolved for this module** (PRD §15.5).
