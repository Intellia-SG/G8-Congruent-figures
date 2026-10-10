// src/utils/geoReasons.js
/**
 * CongruenceQuest Geometric Reasons & Vocabulary
 * Standardised closed list aligned with Singapore Secondary 2 curriculum, ReasonQuest, and PRD/TRD specs.
 */

export const REASONS = [
  // Congruence Tests
  'sss',
  'sas',
  'asa',
  'aas',
  'rhs',

  // Corresponding parts of congruent figures
  'corresponding-parts-congruent-triangles',

  // Structural & Given reasons
  'given',
  'given-equal-sides',
  'given-equal-angles',
  'common-side',
  'common-angle',
  'vertically-opposite-angles',
  'definition-of-midpoint',

  // Parallel line angle facts
  'alternate-angles-parallel',
  'corresponding-angles-parallel',
  'co-interior-angles-parallel',

  // Angle sum facts
  'angle-sum-triangle',
  'angles-on-straight-line',
  'base-angles-isosceles',

  // Quadrilateral & Deduction reasons
  'opposite-sides-parallelogram',
  'opposite-angles-parallelogram',
];

export const REASON_DISPLAY = {
  'sss': {
    full: 'side, side, side criterion',
    abbrev: '(SSS)',
    condition: 'Three pairs of corresponding sides are equal',
    narration: 'because of the side, side, side congruence criterion',
    category: 'congruence',
  },
  'sas': {
    full: 'side, angle, side criterion',
    abbrev: '(SAS)',
    condition: 'Two pairs of sides and the INCLUDED angle between them are equal',
    narration: 'because of the side, angle, side criterion, with the angle between the sides',
    category: 'congruence',
  },
  'asa': {
    full: 'angle, side, angle criterion',
    abbrev: '(ASA)',
    condition: 'Two pairs of angles and the INCLUDED side between them are equal',
    narration: 'because of the angle, side, angle criterion, with the side between the angles',
    category: 'congruence',
  },
  'aas': {
    full: 'angle, angle, side criterion',
    abbrev: '(AAS)',
    condition: 'Two pairs of angles and a NON-INCLUDED corresponding side are equal',
    narration: 'because of the angle, angle, side criterion, with the side not between the angles',
    category: 'congruence',
  },
  'rhs': {
    full: 'right angle, hypotenuse, side criterion',
    abbrev: '(RHS)',
    condition: 'Both triangles have 90° angles, equal hypotenuses, and one pair of equal legs',
    narration: 'because of the right angle, hypotenuse, side criterion',
    category: 'congruence',
  },
  'corresponding-parts-congruent-triangles': {
    full: 'corresponding parts of congruent triangles',
    abbrev: 'corr. sides/∠s of ≅ △s',
    condition: 'Triangles have already been proven congruent earlier in the argument',
    narration: 'because corresponding parts of congruent triangles are equal',
    category: 'congruence',
  },
  'common-side': {
    full: 'common (shared) side',
    abbrev: 'common side',
    condition: 'Both triangles share the identical line segment',
    narration: 'because both triangles share the same side',
    category: 'structural',
  },
  'common-angle': {
    full: 'common (shared) angle',
    abbrev: 'common angle',
    condition: 'Both triangles share the identical angle vertex and arms',
    narration: 'because both triangles share the same angle',
    category: 'structural',
  },
  'vertically-opposite-angles': {
    full: 'vertically opposite angles',
    abbrev: 'vert. opp. ∠s',
    condition: 'Angles are opposite each other where two straight lines intersect',
    narration: 'because vertically opposite angles are equal',
    category: 'angles',
  },
  'alternate-angles-parallel': {
    full: 'alternate angles (parallel lines)',
    abbrev: 'alt. ∠s, // lines',
    condition: 'Lines MUST be marked parallel (Z-shape across transversal)',
    narration: 'because alternate angles are equal when lines are parallel',
    category: 'parallel',
  },
  'corresponding-angles-parallel': {
    full: 'corresponding angles (parallel lines)',
    abbrev: 'corr. ∠s, // lines',
    condition: 'Lines MUST be marked parallel (F-shape across transversal)',
    narration: 'because corresponding angles are equal when lines are parallel',
    category: 'parallel',
  },
  'co-interior-angles-parallel': {
    full: 'co-interior angles (parallel lines)',
    abbrev: 'int. ∠s, // lines',
    condition: 'Lines MUST be marked parallel; interior angles sum to 180°',
    narration: 'because co-interior angles sum to 180 degrees when lines are parallel',
    category: 'parallel',
  },
  'given': {
    full: 'given information',
    abbrev: 'given',
    condition: 'Explicitly marked or stated in the problem specification',
    narration: 'because it is given in the problem statement',
    category: 'givens',
  },
  'given-equal-sides': {
    full: 'given equal sides',
    abbrev: 'given',
    condition: 'Sides marked equal with tick marks',
    narration: 'because the sides are marked equal in the diagram',
    category: 'givens',
  },
  'given-equal-angles': {
    full: 'given equal angles',
    abbrev: 'given',
    condition: 'Angles marked equal with angle arcs',
    narration: 'because the angles are marked equal in the diagram',
    category: 'givens',
  },
  'definition-of-midpoint': {
    full: 'definition of midpoint',
    abbrev: 'midpoint def.',
    condition: 'Point divides a segment into two equal halves',
    narration: 'because the midpoint divides the segment into two equal lengths',
    category: 'structural',
  },
  'angle-sum-triangle': {
    full: 'angle sum of a triangle',
    abbrev: '∠ sum of △',
    condition: 'Three interior angles of any triangle sum to 180°',
    narration: 'because interior angles of a triangle sum to 180 degrees',
    category: 'triangles',
  },
  'angles-on-straight-line': {
    full: 'adjacent angles on a straight line',
    abbrev: 'adj. ∠s on a str. line',
    condition: 'Adjacent angles on a straight line sum to 180°',
    narration: 'because adjacent angles on a straight line sum to 180 degrees',
    category: 'lines',
  },
  'base-angles-isosceles': {
    full: 'base angles of an isosceles triangle',
    abbrev: 'base ∠s of isos. △',
    condition: 'Angles opposite equal sides in a triangle are equal',
    narration: 'because base angles opposite equal sides of an isosceles triangle are equal',
    category: 'triangles',
  },
  'opposite-sides-parallelogram': {
    full: 'opposite sides of a parallelogram',
    abbrev: 'opp. sides of //gram',
    condition: 'Opposite sides of a parallelogram are equal and parallel',
    narration: 'because opposite sides of a parallelogram are equal',
    category: 'parallelogram',
  },
  'opposite-angles-parallelogram': {
    full: 'opposite angles of a parallelogram',
    abbrev: 'opp. ∠s of //gram',
    condition: 'Opposite angles of a parallelogram are equal',
    narration: 'because opposite angles of a parallelogram are equal',
    category: 'parallelogram',
  },
};

export const RULES = {
  'sss': {
    requiredMatches: { sides: 3, angles: 0 },
    positionalCheck: 'three-sides',
    conclusion: 'congruence',
  },
  'sas': {
    requiredMatches: { sides: 2, angles: 1 },
    positionalCheck: 'angle-included-between-sides',
    conclusion: 'congruence',
  },
  'asa': {
    requiredMatches: { sides: 1, angles: 2 },
    positionalCheck: 'side-included-between-angles',
    conclusion: 'congruence',
  },
  'aas': {
    requiredMatches: { sides: 1, angles: 2 },
    positionalCheck: 'side-non-included-opposite-angle',
    conclusion: 'congruence',
  },
  'rhs': {
    requiredMatches: { rightAngle: true, hypotenuse: true, leg: true },
    positionalCheck: 'right-hypotenuse-side',
    conclusion: 'congruence',
  },
  'corresponding-parts-congruent-triangles': {
    requiresCongruenceFirst: true,
    conclusion: 'equal-part-deduction',
  },
};
