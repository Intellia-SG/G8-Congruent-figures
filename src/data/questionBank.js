// src/data/questionBank.js
/**
 * CongruenceQuest Question Bank
 * Procedurally generated 100 questions (10 worlds × 10 questions)
 * Aligned with PRD §9 and TRD §4.4.
 */

import { WORLDS } from '../config/worlds.config.js';
import {
  generateOrientationItem,
  generateStatementItem,
  generateUnknownItem,
  generateTestItem,
  generateIncludedItem,
  generateVerdictItem,
  generateHiddenMatchItem,
  generateArgumentItem,
  generateDeductionItem,
  generateMixedItem,
} from '../utils/congruenceProblems.js';

export const DISTRICTS = WORLDS.map(w => ({
  id: w.id,
  name: w.name,
  icon: w.emoji,
  color: w.accent,
  description: w.description,
  conceptFocus: w.conceptFocus,
  boss: w.boss,
}));

export function buildQuestionBank() {
  const bank = [];

  const worldGenerators = [
    generateOrientationItem, // World 0: congruent-figures-and-orientation
    generateStatementItem,   // World 1: corresponding-parts-and-statements
    generateUnknownItem,     // World 2: find-unknowns-from-congruent-figures
    generateTestItem,        // World 3: identify-congruence-test
    generateIncludedItem,    // World 4: included-vs-non-included
    generateVerdictItem,     // World 5: insufficient-information
    generateHiddenMatchItem, // World 6: hidden-common-parts-overlapping
    generateArgumentItem,    // World 7: structured-congruence-argument
    generateDeductionItem,   // World 8: deductions-and-simple-proofs
    generateMixedItem,       // World 9: mixed-review
  ];

  for (let w = 0; w < 10; w++) {
    const generator = worldGenerators[w];
    for (let q = 0; q < 10; q++) {
      const item = generator(q);
      item.districtId = w;
      bank.push(item);
    }
  }

  return bank;
}

const questionBank = buildQuestionBank();
export default questionBank;
