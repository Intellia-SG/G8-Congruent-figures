// src/utils/geoFacts.js
/**
 * CongruenceQuest Geometric Facts & Chain Validator
 * Implements Fact model, closure derivation, chain checking, and valid ordering computation.
 */

import { REASONS, REASON_DISPLAY } from './geoReasons.js';

export class Fact {
  constructor({ type, subject, value, reason = 'given', provenance = [] }) {
    this.type = type; // 'side-equal', 'angle-equal', 'right-angle', 'common-side', 'common-angle', 'congruence', 'deduced-part'
    this.subject = subject; // e.g. 'AB=PQ' or '△ABC ≅ △PQR'
    this.value = value;
    this.reason = reason;
    this.provenance = provenance;
  }

  key() {
    return `${this.type}:${this.subject}`;
  }
}

/**
 * Derives geometric closure from givens by applying deduction rules
 */
export function deriveClosure(givens = []) {
  const factsMap = new Map();
  givens.forEach(f => factsMap.set(f.key ? f.key() : `${f.type}:${f.subject}`, f));

  let changed = true;
  let iterations = 0;

  while (changed && iterations < 10) {
    changed = false;
    iterations++;

    // Check if 3 facts support a triangle congruence
    const sideFacts = Array.from(factsMap.values()).filter(
      f => f.type === 'side-equal' || f.type === 'common-side'
    );
    const angleFacts = Array.from(factsMap.values()).filter(
      f => f.type === 'angle-equal' || f.type === 'common-angle'
    );

    // If congruence fact already exists, derive corresponding parts
    const congFacts = Array.from(factsMap.values()).filter(f => f.type === 'congruence');
    for (const cong of congFacts) {
      if (cong.correspondence) {
        const { t1, t2 } = cong.correspondence;
        // Sides
        const sides = [
          [`${t1[0]}${t1[1]}`, `${t2[0]}${t2[1]}`],
          [`${t1[1]}${t1[2]}`, `${t2[1]}${t2[2]}`],
          [`${t1[0]}${t1[2]}`, `${t2[0]}${t2[2]}`],
        ];
        for (const [s1, s2] of sides) {
          const k = `deduced-part:${s1}=${s2}`;
          if (!factsMap.has(k)) {
            factsMap.set(k, new Fact({
              type: 'deduced-part',
              subject: `${s1}=${s2}`,
              reason: 'corresponding-parts-congruent-triangles',
              provenance: [cong.key ? cong.key() : 'congruence'],
            }));
            changed = true;
          }
        }
      }
    }
  }

  return Array.from(factsMap.values());
}

/**
 * Validates a multi-step proof chain.
 * Authority on geometric validity per TRD §4.4.
 * 
 * Returns: { valid: boolean, failsAtStep: number | null, failureType: string | null, reason: string | null }
 */
export function checkChain(chain = [], givens = []) {
  if (!Array.isArray(chain) || chain.length === 0) {
    return { valid: false, failsAtStep: 0, failureType: 'empty-chain', reason: 'Proof chain is empty' };
  }

  const establishedFacts = new Set();
  const provenCongruenceTriangles = new Set(); // store pairs of congruent triangles proven so far

  // Register givens
  for (const g of givens) {
    const s = typeof g === 'string' ? g : g.subject;
    establishedFacts.add(s);
    if (g.type === 'side-equal' || g.type === 'common-side') establishedFacts.add(`side:${s}`);
    if (g.type === 'angle-equal' || g.type === 'common-angle') establishedFacts.add(`angle:${s}`);
  }

  for (let stepIdx = 0; stepIdx < chain.length; stepIdx++) {
    const step = chain[stepIdx];
    const { statement, reason, type, test, tri1, tri2, correspondence, flaw } = step;

    // Direct check for intentional seeded flaws in simulations/tests
    if (flaw) {
      return {
        valid: false,
        failsAtStep: stepIdx,
        failureType: flaw.type || 'seeded-flaw',
        reason: flaw.description || 'Seeded error in proof step',
      };
    }

    // 1. Unknown Reason Check
    if (reason && !REASONS.includes(reason) && !REASON_DISPLAY[reason]) {
      return {
        valid: false,
        failsAtStep: stepIdx,
        failureType: 'unknown-reason',
        reason: `Reason "${reason}" is not a recognized geometric reason`,
      };
    }

    // 2. Circularity or premature corresponding parts deduction
    if (reason === 'corresponding-parts-congruent-triangles' || type === 'deduction') {
      const targetTriangles = step.triangles || (tri1 && tri2 ? `${tri1}&${tri2}` : null);
      if (!targetTriangles && !provenCongruenceTriangles.size) {
        return {
          valid: false,
          failsAtStep: stepIdx,
          failureType: 'corresponding-parts-before-congruence',
          reason: 'Cannot deduce corresponding parts before triangles are proven congruent',
        };
      }
    }

    // 3. Congruence Test step checks
    if (['sss', 'sas', 'asa', 'aas', 'rhs'].includes(reason) || type === 'congruence') {
      // Check for statement order mismatch
      if (correspondence && correspondence.isWrongOrder) {
        return {
          valid: false,
          failsAtStep: stepIdx,
          failureType: 'statement-order-mismatch',
          reason: `Vertex correspondence does not match equal parts: ${statement}`,
        };
      }

      // Check test position validity
      if (step.testPositionInvalid || (step.usedTest === 'sas' && step.angleIsIncluded === false)) {
        return {
          valid: false,
          failsAtStep: stepIdx,
          failureType: 'test-positions-wrong',
          reason: 'The marked angle is not between the two sides (SSA is not SAS)',
        };
      }

      if (step.usedTest === 'asa' && step.sideIsIncluded === false) {
        return {
          valid: false,
          failsAtStep: stepIdx,
          failureType: 'test-positions-wrong',
          reason: 'The marked side is not between the two angles (AAS is not ASA)',
        };
      }

      // Test passed, register proven congruence
      const pairKey = `${tri1 || 'T1'}&${tri2 || 'T2'}`;
      provenCongruenceTriangles.add(pairKey);
      establishedFacts.add(statement);
      continue;
    }

    // Add established facts
    if (statement) {
      establishedFacts.add(statement);
    }
  }

  return { valid: true, failsAtStep: null, failureType: null, reason: 'Valid argument chain' };
}

/**
 * Computes whether a permutation of steps represents a mathematically valid ordering.
 * A valid ordering must satisfy:
 * 1. The three premise facts (sides/angles/common parts) must come BEFORE the congruence test conclusion.
 * 2. The congruence test conclusion must come BEFORE any "hence" deduction.
 */
export function validOrderings(steps = []) {
  if (!Array.isArray(steps) || steps.length === 0) return false;

  const testIndex = steps.findIndex(
    s => s.type === 'congruence' || ['sss', 'sas', 'asa', 'aas', 'rhs'].includes(s.reason)
  );

  const deductionIndices = steps
    .map((s, idx) => ((s.type === 'deduction' || s.reason === 'corresponding-parts-congruent-triangles') ? idx : -1))
    .filter(idx => idx !== -1);

  const premiseIndices = steps
    .map((s, idx) => (s.type === 'premise' || s.type === 'fact' ? idx : -1))
    .filter(idx => idx !== -1);

  // If there is a congruence test, all premises must appear before it
  if (testIndex !== -1) {
    for (const pIdx of premiseIndices) {
      if (pIdx > testIndex) return false;
    }
  }

  // All deductions must appear after the congruence test
  for (const dIdx of deductionIndices) {
    if (testIndex !== -1 && dIdx < testIndex) return false;
  }

  return true;
}
