# CongruenceQuest — Module PRD
**Grade 8 · Congruence**
*(Produced from `Intellia_Module_Blueprint_PRD.md` — {{GRADE}} = Grade 8, {{TOPIC}} = Congruence, {{SPECIAL_INSTRUCTIONS}} = none supplied, defaults assumed throughout)*

---

## 1. Overview

CongruenceQuest teaches students what it means for two figures to be *exactly the same shape and size*, and how to show it with as little information as possible. Students learn to match corresponding parts (even when a copy is turned or flipped), write a congruence statement with the vertices in the right order, use congruent figures to find unknown lengths and angles, choose the right congruence test (SSS, SAS, ASA, AAS, RHS), recognise when three matched parts are *not* enough, spot matched parts that are hidden in overlapping figures, and build a short, valid congruence argument that ends in a "hence" conclusion. It is framed as a school-musical backstage crew: the crew must build matching pairs of stage flats, and every pair must be proven identical with the fewest measurements.

## 2. Background

This is the third Grade 8 (Secondary 2) module, following **QuadQuest** (Quadrilaterals) and **ReasonQuest** (Geometric Reasoning). It reuses `G2-Money-Money-main`'s five-phase architecture per platform convention.

**Relationship to existing modules:**
- **ReasonQuest** (Grade 8): its World 8 already introduces choosing a congruence criterion and making simple deductions. CongruenceQuest is the **full treatment** of that topic. The two share one reason vocabulary and one set of criterion keys (see the companion TRD). ReasonQuest also supplies the angle facts (vertically opposite, parallel-line angles) that CongruenceQuest uses to find hidden matched parts, so it is best played first. The overlap between ReasonQuest's World 8 and this module is raised as an open question in §15.1.
- **QuadQuest** (Grade 8): treats properties such as "opposite sides of a parallelogram are equal" as known facts. CongruenceQuest's last concept world *proves* a few of them with congruent triangles. Neither module requires the other.
- **MosaicQuest** (Grade 7): rotation and reflection appear here only as ways a congruent copy can be moved (slide, turn, flip); no transformation skills are taught.
- **EquationQuest** (Grade 7): a few items need a one-step or two-step equation to find an unknown length; no equation-solving is re-taught.

## 3. Standards Alignment

**Source and honest positioning:** congruence is a Secondary 2 topic in the Singapore sources I found. A Singapore Secondary 2 recap describes congruent figures as having exactly the same shape and size, with all corresponding lengths and angles equal, and lists the tests SSS, SAS, ASA, and RHS, with AAS listed alongside in other Singapore-curriculum material. The sources also say that only three matched pieces of information, not all six, are needed for triangles, and they name the usual confusions: mixing up congruence with similarity, and misidentifying included and non-included sides in ASA and AAS. This is **at grade level for Grade 8, so no scope-jump flag applies.**

**Boundary on proof writing (carried over from ReasonQuest):** reasoning is always **guided**. Students order steps, complete missing facts and reasons, choose tests, and spot flaws. They are not asked to write a full proof from a blank page.

**In-scope skills:**
- Defining congruent figures; identifying corresponding vertices, sides, and angles, including in copies that are turned or flipped.
- Writing a congruence statement with the vertices in matching order, and reading corresponding parts from it.
- Using congruent figures to find unknown lengths and angles, including with simple algebraic expressions.
- Choosing the congruence test (SSS, SAS, ASA, AAS, RHS) that a set of matched parts satisfies; telling an *included* angle or side from a *non-included* one.
- Recognising that SSA and AAA are **not** congruence tests, and giving a verdict of **congruent**, **not congruent**, or **cannot tell**.
- Finding matched parts that are not marked: a common (shared) side or angle, vertically opposite angles, and equal angles between parallel lines; separating overlapping triangles into two clear figures.
- Completing and ordering a structured congruence argument: three matched facts with reasons, the test, and the conclusion.
- Using a proved congruence to deduce more ("hence"), including a few simple proofs of properties of triangles and parallelograms.

**Adjacent skills treated as bridge only, not tested:**
- **Similarity** (scale factors, ratios of sides and areas) — a separate topic and a natural companion module. Congruence is never confused with similarity here, but similarity is not taught.
- **Congruence tests for figures other than triangles** — beyond recognising corresponding parts in congruent polygons.
- **Pythagoras' theorem and coordinate or vector arguments** — later topics. No question requires a square root.
- **Constructions and free-form proof writing** — out of scope.

**Domain conventions to encode as house style:**
- **Three is enough only if they are the right three.** The test names (SSS, SAS, ASA, AAS, RHS) are always tied to *which* parts are matched and *where* they sit.
- **A copy can be turned or flipped and still be congruent.** Only shape and size matter, not position or orientation.
- **The statement order is the correspondence.** `△ABC ≅ △PQR` means A↔P, B↔Q, C↔R, and every claim about corresponding parts is read from that order.
- **Three-way verdicts.** "Cannot tell" is never the same as "not congruent." A set of matched parts that is not enough leaves the question open unless a corresponding part is shown to be unequal.
- **No corresponding-parts reasoning before congruence is established.** Concluding that two sides are equal *because* the triangles are congruent is only valid after the congruence has been shown.
- **Marks are the evidence.** A figure may be marked "not drawn to scale"; looking the same is not evidence.
- Notation: `≅` for congruent and `=` for equal lengths or angles (never `=` between triangles); `△` for triangle; the test name is written in brackets at the end of the congruence step, for example "(SAS)".

## 4. Learning Objectives

By the end of this module, a student should be able to:
1. Explain that congruent figures have the same shape and size, and identify corresponding parts even when a copy is turned or flipped.
2. Write a congruence statement with vertices in matching order and read corresponding parts from it.
3. Use congruent figures to find unknown lengths and angles, including with simple algebraic expressions.
4. Choose the correct congruence test (SSS, SAS, ASA, AAS, or RHS) for a set of matched parts, distinguishing included from non-included parts.
5. Decide whether information is enough: recognise SSA and AAA as non-tests, and give a verdict of congruent, not congruent, or cannot tell.
6. Find matched parts that are not marked (common side or angle, vertically opposite angles, parallel-line angles) and separate overlapping triangles.
7. Complete and order a structured congruence argument with a reason for each fact.
8. Use a proved congruence to deduce further equal parts and prove simple properties.

Ordering runs foundational → applied (congruent figures → statements → unknowns → tests → included vs. non-included → not enough information → hidden matches → arguments → deductions), and drives the world sequence in §9.

## 5. Inherited Standards *(Section A of the platform blueprint — copied verbatim, unchanged)*

- **Five-phase architecture:** Wonder → Story → Simulate → Play ("Practice" in-UI) → Reflect.
- **Gamification:** XP per question, 0–3 stars per world, streak tracking, 8 fixed badge triggers (relabelled §10), 10 Boss Battles (5Q/3 lives).
- **Practice modes:** Guided (5Q, hints, untimed), Independent (10Q, no hints), Timed Challenge (8Q, 60s), Boss Battle (5Q, 3 lives).
- **Audio pipeline:** ElevenLabs Alice voice only, 6 emotional presets, pre-generated + dynamic narration, no browser TTS fallback, strict 1:1 narration/on-screen-text parity.
- **Question bank shape:** 10 worlds × 10 questions = 100, procedurally generated, ≥300-run stress test, fixed schema, World 9 (last, 0-indexed) is the mixed-review grand finale.
- **Product standards:** React/Vite/Tailwind/Framer Motion, pixel-faithful `design-tokens.css` reuse, enlarged Simulate/Practice fonts and touch targets, zip delivery with placeholder story art + art-brief README.
- **Simulate phase:** the standard 4 required, archetype-mapped stations.

## 6. Enhancement Requests / Special Instructions

None supplied. Defaults applied: 4-panel Story (justified §8.2), Singaporean-multicultural naming (§7), theme-specific mascot override with rationale (§7), and the standard 4-station Simulate design (§8.3). The Concept Discovery Lab confirmation-question tension is not re-resolved here (§15.5).

## 7. Module Identity

- **Module name:** **CongruenceQuest**
- **Story theme:** the backstage crew of a school musical. Every world is a build job: stage flats and props must come in **identical pairs**, left and right wing flats are mirror-image copies, and the crew can only afford to measure three things per pair. The throughline is "prove they match with the fewest, right measurements." The theme fits the topic closely: a left and a right flat are congruent even though one is flipped, two flats that "almost" match are the SSA trap, and overlapping set pieces share a hidden edge.
- **Named characters** (Singaporean-multicultural convention, first names only, distinct from earlier modules):
  - **Li Ting** — trusts a match because "they look the same."
  - **Haikal** — counts the matched parts and asks "which three, and where do they sit?"
- **Mascot: Echo the Mynah 🐦** *(override, with rationale)* — mynahs copy sounds exactly, which is a friendly picture of "an exact copy," and the common mynah is familiar in Singapore. It is distinct from every mascot used in earlier modules.

## 8. Five-Phase Journey Detail

### 8.1 Wonder
Single hook screen: *"Two stage flats look identical from the audience. You can only afford to measure three things. Which three measurements would guarantee that the two flats match exactly?"*

### 8.2 Story — 4 panels (default, not exceeded)

| # | Title | Concept delivered | Narrative beat |
|---|---|---|---|
| 1 | The Matching Pair | Hook: building a matching pair with the fewest measurements | Li Ting and Haikal are told to build a left and a right wing flat; Li Ting says "they look the same," and Haikal asks for proof. |
| 2 | Same Shape, Same Size — Even Flipped | Congruent figures, corresponding parts, and statement order | Echo shows that the left and right flats are flipped copies yet congruent, and why `△ABC ≅ △PQR` fixes which parts match. |
| 3 | Three Is Enough (If They're the Right Three) | The five tests, included vs. non-included, and the SSA and AAA traps | Haikal shows a flat that "almost matches" three measurements but is a different shape. |
| 4 | Opening Night | Worked application: an overlapping set piece with a hidden shared side, a structured argument, and a "hence" conclusion | The pair proves two overlapping panels match, deduces a missing length, and the show goes on. |

### 8.3 Simulate — 4 stations (archetype-mapped)
Summary (full technical spec in the companion TRD):

| Station | Archetype | Premise |
|---|---|---|
| The Pin Board | Concept Discovery Lab | Student "pins" a chosen set of three matched parts (for example SSS, SAS, SSA, or AAA) on a triangle and then tries to wiggle a free vertex; if the shape can only be one triangle, the pins form a test, and if it can take two different shapes the board shows both — builds felt intuition for why some trios are tests and others are not. |
| Cut the Copy | Build-to-Target Challenge | A target flat is shown with its measurements hidden. The student chooses which three parts to measure and enters values to cut a copy, and a live overlay shows whether the copy fits exactly. Valid choices produce a perfect fit; weak choices can still miss. A "next flat" loop gives a fresh target. |
| The Full Rehearsal | Multi-Step/Composite Construction | Given an overlapping set piece, the student separates the two triangles, marks the hidden matched parts, chooses the test, orders the argument with a reason for each fact, and states the "hence" conclusion — combining LOs 6, 7, and 8. |
| Spot the Bad Match | Error-Detective | A fellow crew member's argument contains one seeded flaw (for example SSA used as a test, vertices written in the wrong order, ASA and AAS swapped, equality assumed from looks, "not congruent" said when the correct verdict is "cannot tell," or a corresponding-parts conclusion used before congruence was shown); the student finds and fixes it. |

### 8.4 Play / Practice
Standard, unchanged mechanics (10 worlds × 10 questions, 4 modes). See world table in §9.

### 8.5 Reflect
3 new recap questions targeting the module's headline misconceptions: **thinking a flipped or turned copy is not congruent, or that "looking the same" is evidence**, **treating SSA or AAA as a test (or answering "not congruent" when the correct verdict is "cannot tell")**, and **mixing up included and non-included parts, or reading corresponding parts from the wrong vertex order**. Followed by the standard scorecard and a reflection prompt ("Which pair looked identical but needed one more measurement?").

## 9. World & Question Bank Table

*Shape: `{ id, name, emoji, accent, description, conceptFocus, boss: { name, emoji, reward } }`. World 9 (last) is the mixed-review grand finale per platform standard.*

| id | World | conceptFocus | Description | Boss | Reward |
|---|---|---|---|---|---|
| 0 | Same Shape, Same Size | `congruent-figures-and-orientation` | Congruent figures, including turned and flipped copies | The Mirror Mime 🎭 | Twin Badge |
| 1 | Matching Parts | `corresponding-parts-and-statements` | Corresponding parts and congruence statements | The Scrambled Cast List 📋 | Casting Badge |
| 2 | Use the Copy | `find-unknowns-from-congruent-figures` | Find unknown lengths and angles from congruent figures | The Prop Duplicator 🖨️ | Copy Badge |
| 3 | Three Is Enough | `identify-congruence-test` | Identify SSS, SAS, ASA, AAS, or RHS | The Three-Check Gatekeeper 🚪 | Test Badge |
| 4 | Included or Not? | `included-vs-non-included` | Included vs. non-included angles and sides | The Included Impostor 🥸 | Position Badge |
| 5 | Not Enough Info | `insufficient-information` | SSA, AAA, and the verdicts: congruent, not congruent, cannot tell | The Missing Script Page 📄 | Verdict Badge |
| 6 | Hidden Matches | `hidden-common-parts-overlapping` | Hidden matched parts in overlapping triangles | The Shadow Stagehand 🌑 | Hidden Match Badge |
| 7 | Order in the Argument | `structured-congruence-argument` | Order and complete a structured congruence argument | The Tangled Curtain 🪢 | Argument Badge |
| 8 | Hence… | `deductions-and-simple-proofs` | Deduce further results and prove simple properties | The Hence-Heckler 🗣️ | Deduction Badge |
| 9 | The Grand Opening Night | `mixed-review` | Mixed review of every concept above; hardest boss | The Opening Night Director 🎬 | Opening Night Trophy |

**Sample questions (illustrative, not the full 100):**

- **World 0:** *"Triangle P is a flipped copy of triangle Q. Are they congruent?"* → Yes ✓ (headline distractor: No, "because it faces the other way")
- **World 1:** *"Triangle ABC is congruent to triangle PQR, with A matching R, B matching P, and C matching Q. Which statement is correct?"* → `△ABC ≅ △RPQ` ✓ (distractor `△ABC ≅ △PQR`, which assumes matching by position)
- **World 2:** *"△ABC ≅ △DEF. AB = 9 cm and DE = (2x + 3) cm. Find x."* → `3` ✓ (distractor `6`, from solving 2x = 9 + 3)
- **World 3:** *"AB = DE, ∠B = ∠E, and BC = EF. Which test shows △ABC ≅ △DEF?"* → SAS ✓ (the angle is between the two sides)
- **World 4:** *"Two angles and a side are equal, and the side is *not* between the two angles. Which test is it?"* → AAS ✓ (headline distractor ASA)
- **World 5:** *"AB = DE, BC = EF, and ∠A = ∠D, where the angle is not between the sides. Are the triangles congruent?"* → "Cannot tell" ✓ (distractors: "Yes, by SAS," "No, they are not congruent")
- **World 6:** *"ABCD is a parallelogram with diagonal BD. Which matched part between △ABD and △CDB is true but not marked?"* → BD is a common side ✓
- **World 7:** *"Put these steps in a valid order: state the test, give three facts with reasons, then write the conclusion."* → a valid order ✓ (any order that respects the dependencies is accepted)
- **World 8:** *"△ABD ≅ △CDB. Hence, AD = ___, and why?"* → `CB`, "corresponding sides of congruent triangles" ✓
- **World 9:** mixed-type item combining a hidden common side (World 6) with a three-way verdict (World 5).

## 10. Gamification — Badge Renames

| Fixed trigger | Badge name |
|---|---|
| First correct answer | First Cue 🎬 |
| 5-answer streak | Smooth Scene Change 🎭 |
| 10-answer streak | Standing Ovation Streak 🔥 |
| All 4 Simulate stations complete | Full Backstage Pass 🎟️ |
| Any world scores 3 stars | Perfect Match ⭐⭐⭐ |
| Any Boss Battle won | Encore! 🏅 |
| 20+ questions answered in Practice | Seasoned Stagehand 🧰 |
| Full 5-phase journey complete | Lead Stage Manager Badge 🏆 |

## 11. Audio & Narration Content Rules

- Vertex labels are spoken letter by letter. `△ABC ≅ △PQR` is "triangle A, B, C is congruent to triangle P, Q, R," and `≅` is always "is congruent to," never "equals."
- Every congruence statement is narrated with its correspondence made audible ("A matches P, B matches Q, C matches R").
- Tests are spoken in words: "side, side, side"; "side, angle, side, with the angle *between* the sides"; "angle, side, angle, with the side *between* the angles"; "angle, angle, side, with the side *not* between the angles"; and "right angle, hypotenuse, side."
- "Included" and "non-included" are explained in plain language on first use per world.
- The three verdicts are always spoken as "congruent," "not congruent," and "cannot tell," and "cannot tell" is never shortened to "not congruent."
- A flipped or turned copy is always described in words ("flipped over," "turned"), and a "common side" is announced as "shared side."
- Every reason is narrated as "because" plus the full reason.

## 12. Accessibility

Standard enlarged fonts/touch targets in Simulate and Practice, calibrated toward the platform's Secondary sizing precedent. Every figure carries a text description of its marks and its correspondence ("side A B and side D E are marked equal; angle B and angle E are marked equal"). Flipped and turned copies are described in text, and the overlay animation in Cut the Copy and The Pin Board is paired with a text result ("fits exactly" or "two different triangles are possible"). Marks are never colour-only. Ordering and drag interactions need keyboard-operable equivalents, and the overlapping-triangle separation step offers a "show separately" button as well as dragging.

## 13. Assets Required

4 story images at the reference's standard placeholder dimensions, delivered as blank CSS-framed placeholders, with an art-brief README describing each panel (a lighthearted school-musical backstage setting):
1. A backstage workshop with a left and a right wing flat being built, Li Ting and Haikal at the worktable.
2. Echo the Mynah showing the left flat flipped over onto the right flat.
3. Haikal holding up a flat that "almost matches" while Echo points at the unmatched side.
4. Two overlapping set pieces on stage with the shared edge highlighted, the cast cheering.

## 14. Success Metrics / Acceptance Criteria

Standard fixed criteria (question-bank stress test, audio parity, clean build, full-journey walkthrough) plus module-specific:
- Every congruence-test claim is backed by computation: for each valid test, sampled constructions satisfying the same marks are all congruent; for each non-test (SSA, AAA), a real pair of non-congruent triangles satisfying the same marks is produced.
- Every "cannot tell" item has a computed pair of non-congruent triangles consistent with the marks; every "not congruent" item shows an unequal corresponding part in the marks; every "congruent" item satisfies a test. SSA items are only generated in the ambiguous configuration (so the verdict is never accidentally determined).
- Every congruence statement and every corresponding-parts claim agrees with the geometry under the stated correspondence, including for turned and flipped copies.
- Every hidden matched part is derivable from the figure by a stated reason, and removing it makes the test no longer apply (so no hidden match is decorative).
- Every argument in the bank passes a chain checker, no argument uses corresponding parts before the congruence is established, and each seeded flaw fails at exactly the intended step.
- No question can be answered by measuring the drawing.
- Reasons and test keys match the wording used in ReasonQuest and QuadQuest.
- All 4 Simulate stations are genuinely interactive, not static reveal-and-answer screens.

## 15. Assumptions & Open Questions

1. **Overlap with ReasonQuest's World 8:** that world already covers criterion choice and simple deductions. Recommend deciding whether to keep it as a short preview that points to this module, or trim it to avoid teaching the same content twice. The two modules use identical test keys and reason wording either way.
2. **Similarity is not covered.** A Congruence and Similarity pairing is common in textbooks, but similarity (scale factors, ratio of areas) is a separate skill set; it would be the natural next companion module.
3. **AAS and ASA:** Singapore materials list AAS alongside ASA, while some textbooks treat AAS as a consequence of ASA. This PRD teaches both tests and requires the student to say which one applies. Confirm against your target textbook.
4. **Proof layout and wording:** the "three facts, then the test in brackets, then the conclusion" layout matches the sources I found, but schools vary. Confirm the layout and the reason wording your target schools expect, and keep it identical to ReasonQuest.
5. **Concept Discovery Lab tension — not re-resolved here.** The Pin Board is naturally free-play, but with no special instruction it keeps the blueprint's standard archetype (free exploration plus one light confirmation question), consistent with most earlier modules.
6. **Guided proofs only,** as in ReasonQuest. Free-form proof writing would need a separate design.
7. **Character names and mascot** (Li Ting, Haikal, Echo the Mynah) are proposed defaults, not yet stakeholder-approved.
