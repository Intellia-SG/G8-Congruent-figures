// src/components/simulations/ThePinBoard.jsx
import React, { useState } from 'react';
import './Stations.css';

const PIN_TRIOS = [
  {
    id: 'sss',
    label: 'SSS (3 Sides)',
    sides: 3,
    angles: 0,
    isTest: true,
    ruleTitle: 'Side-Side-Side (SSS) Criterion',
    ruleText: 'Three fixed timber beams bolted together form a completely rigid frame. A triangle cannot deform without changing at least one side length.',
    stageMetaphor: 'Backstage standard: When Haikal cuts 3 beams to exact lengths, every copy will fit the mounting bracket identically.',
  },
  {
    id: 'sas',
    label: 'SAS (2 Sides + Included Angle)',
    sides: 2,
    angles: 1,
    includedAngle: true,
    isTest: true,
    ruleTitle: 'Side-Angle-Side (SAS) Criterion',
    ruleText: 'The included angle locks the hinge angle between the two fixed sides. This pins the distance between their outer endpoints, leaving only ONE possible third side.',
    stageMetaphor: 'Clamping two timber legs at a fixed angle fixes the span for the stage brace with zero wiggle room.',
  },
  {
    id: 'asa',
    label: 'ASA (2 Angles + Included Side)',
    sides: 1,
    angles: 2,
    includedSide: true,
    isTest: true,
    ruleTitle: 'Angle-Side-Angle (ASA) Criterion',
    ruleText: 'The baseline length is fixed, and the two angles specify the exact trajectories of the two rising beams. Two straight lines can intersect at only ONE point.',
    stageMetaphor: 'Li Ting sets the base rail and aims two spotlights at specified angles; the beams cross at a unique point in space.',
  },
  {
    id: 'aas',
    label: 'AAS (2 Angles + Non-Included Side)',
    sides: 1,
    angles: 2,
    includedSide: false,
    isTest: true,
    ruleTitle: 'Angle-Angle-Side (AAS) Criterion',
    ruleText: 'Since the angles of a triangle always sum to 180°, knowing two angles automatically calculates the third (180° - ∠1 - ∠2). This mathematically reduces AAS to ASA!',
    stageMetaphor: 'Even with a non-included side, the third angle is automatically locked by the 180° rule.',
  },
  {
    id: 'rhs',
    label: 'RHS (Right Angle + Hypotenuse + Leg)',
    sides: 2,
    angles: 1,
    isRightAngle: true,
    hasHypotenuseAndLeg: true,
    isTest: true,
    ruleTitle: 'Right-Angle Hypotenuse Leg (RHS) Criterion',
    ruleText: 'In a right triangle, the Pythagorean theorem (a² + b² = c²) dictates that knowing the hypotenuse and one leg uniquely fixes the remaining leg. Equivalent to SSS!',
    stageMetaphor: 'Right-angled stage wings are squared with a carpenter\'s 90° square, guaranteeing identical duplicates.',
  },
  {
    id: 'ssa',
    label: 'SSA (2 Sides + Non-Included Angle)',
    sides: 2,
    angles: 1,
    includedAngle: false,
    isTest: false,
    ruleTitle: '⚠️ The SSA Ambiguity Trap (NOT a Congruence Test)',
    ruleText: 'When the angle is NOT between the two sides, the free arm can swing like a pendulum across the baseline, cutting it at TWO different locations: one acute (B₁) and one obtuse (B₂)!',
    stageMetaphor: 'Crucial warning: Two stage flats built with identical SSA measurements can end up with completely different shapes!',
  },
  {
    id: 'aaa',
    label: 'AAA (3 Angles, No Sides)',
    sides: 0,
    angles: 3,
    isTest: false,
    ruleTitle: '⚠️ The AAA Similarity Trap (NOT a Congruence Test)',
    ruleText: 'Knowing all 3 angles fixes the proportions and shape of the triangle, but does NOT determine its size! Triangles can be enlarged or shrunk infinitely like a film projector.',
    stageMetaphor: 'A miniature model flat and a full-size stage flat have identical angles, but are NOT congruent because sizes differ.',
  },
];

export default function ThePinBoard({ onComplete, _audioEnabled }) {
  const [selectedTrio, setSelectedTrio] = useState(PIN_TRIOS[1]); // start with SAS
  const [wiggle, setWiggle] = useState(0); // slider -15 to 15
  const [explored, setExplored] = useState(new Set(['sas']));
  const [, setConfirmAnswered] = useState(false);
  const [confirmSelected, setConfirmSelected] = useState(null);
  const [completed, setCompleted] = useState(false);

  function handleSelectTrio(trio) {
    setSelectedTrio(trio);
    const nextExplored = new Set(explored);
    nextExplored.add(trio.id);
    setExplored(nextExplored);
  }

  const isAmbiguous = selectedTrio.id === 'ssa';
  const isScaleOnly = selectedTrio.id === 'aaa';
  const isTest = selectedTrio.isTest;

  // Criteria for completion: explored at least 2 valid tests AND both non-tests (ssa & aaa)
  const testsExploredCount = Array.from(explored).filter(id => PIN_TRIOS.find(p => p.id === id)?.isTest).length;
  const hasExploredSSA = explored.has('ssa');
  const hasExploredAAA = explored.has('aaa');
  const canShowConfirmation = testsExploredCount >= 2 && hasExploredSSA && hasExploredAAA;

  function handleAnswerConfirmation(optIdx) {
    setConfirmSelected(optIdx);
    if (optIdx === 0) {
      setConfirmAnswered(true);
      setCompleted(true);
    }
  }

  return (
    <div className="station-container">
      {/* Header */}
      <div className="station-header">
        <span className="station-badge">📌 Station A · Concept Discovery Lab</span>
        <h2 className="station-title">The Pin Board</h2>
        <p className="station-instruction">
          Pin three parts onto the timber frame. Wiggle the free vertex to discover whether the frame is rigidly locked into exactly ONE triangle, or swings into multiple shapes!
        </p>
      </div>

      <div className="station-workspace">
        {/* Trio Selector Chips */}
        <div className="station-controls-row">
          {PIN_TRIOS.map(trio => {
            const isSel = selectedTrio.id === trio.id;
            const isExp = explored.has(trio.id);
            return (
              <button
                key={trio.id}
                type="button"
                className={`pin-chip ${isSel ? 'active' : ''} ${isExp ? 'explored' : ''}`}
                onClick={() => handleSelectTrio(trio)}
                aria-label={`Select pin trio: ${trio.label}`}
              >
                {trio.id.toUpperCase()} {isExp ? '✓' : ''}
              </button>
            );
          })}
        </div>

        <div className="station-grid-2col">
          {/* Left Column: Interactive Visual Canvas & Wiggle Slider */}
          <div className="station-col">
            <div className="station-canvas-card">
              <svg viewBox="0 0 440 200" style={{ width: '100%', height: '210px', overflow: 'visible' }}>
                {/* Background grid markings for drafting feel */}
                <line x1="20" y1="160" x2="420" y2="160" stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4 4" />

                {isAmbiguous ? (
                  /* SSA Ambiguous Double Render with swinging arc */
                  <>
                    {/* Fixed base line */}
                    <line x1="50" y1="150" x2="380" y2="150" stroke="#718096" strokeWidth="2.5" strokeDasharray="5 5" />
                    
                    {/* Side b (AC) */}
                    <line x1="50" y1="150" x2="210" y2="40" stroke="#38bdf8" strokeWidth="4" />
                    <text x="110" y="85" fill="#38bdf8" fontSize="15" fontWeight="bold">Side b = 8 cm</text>

                    {/* Swinging Arm Arc (radius 110 from C) */}
                    <path
                      d="M 130,150 A 110,110 0 0,0 310,150"
                      fill="none"
                      stroke="rgba(251, 191, 36, 0.65)"
                      strokeWidth="2.5"
                      strokeDasharray="5 5"
                    />

                    {/* Position 1: Acute Triangle B1 */}
                    <line x1="210" y1="40" x2="310" y2="150" stroke="#22c55e" strokeWidth="4" />
                    <line x1="50" y1="150" x2="310" y2="150" stroke="#22c55e" strokeWidth="3" />

                    {/* Position 2: Obtuse Triangle B2 */}
                    <line x1="210" y1="40" x2="130" y2="150" stroke="#ef4444" strokeWidth="4" strokeDasharray="6 4" />
                    <line x1="50" y1="150" x2="130" y2="150" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" />

                    {/* Vertex Pins */}
                    <circle cx="50" cy="150" r="7" fill="#f59e0b" />
                    <circle cx="210" cy="40" r="7" fill="#38bdf8" />
                    <circle cx="310" cy="150" r="7" fill="#22c55e" />
                    <circle cx="130" cy="150" r="7" fill="#ef4444" />

                    {/* Labels */}
                    <text x="35" y="174" fill="#f59e0b" fontSize="16" fontWeight="bold">A (30° pinned)</text>
                    <text x="210" y="26" fill="#fff" fontSize="17" fontWeight="bold">C</text>
                    <text x="305" y="174" fill="#22c55e" fontSize="15" fontWeight="bold">B₁ (Acute Flat)</text>
                    <text x="95" y="174" fill="#ef4444" fontSize="15" fontWeight="bold">B₂ (Obtuse Flat)</text>
                    <text x="225" y="105" fill="#f59e0b" fontSize="14" fontWeight="bold">Swinging Arm (6 cm)</text>
                  </>
                ) : isScaleOnly ? (
                  /* AAA Similarity Scale Render */
                  <>
                    {/* Small Flat */}
                    <polygon points="50,150 115,55 170,150" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="3.5" />
                    <circle cx="50" cy="150" r="6" fill="#38bdf8" />
                    <circle cx="115" cy="55" r="6" fill="#38bdf8" />
                    <circle cx="170" cy="150" r="6" fill="#38bdf8" />
                    <text x="50" y="175" fill="#38bdf8" fontSize="15" fontWeight="bold">Small Flat (Scale 1.0)</text>

                    {/* Large Flat */}
                    <polygon points="230,150 330,20 410,150" fill="rgba(251, 191, 36, 0.2)" stroke="#fbbf24" strokeWidth="3.5" />
                    <circle cx="230" cy="150" r="6" fill="#fbbf24" />
                    <circle cx="330" cy="20" r="6" fill="#fbbf24" />
                    <circle cx="410" cy="150" r="6" fill="#fbbf24" />
                    <text x="250" y="175" fill="#fbbf24" fontSize="15" fontWeight="bold">Large Flat (Scale 1.6)</text>

                    <text x="140" y="194" fill="#e2e8f0" fontSize="14" fontWeight="bold">
                      Angles match (45°, 60°, 75°), but sizes differ! Not Congruent.
                    </text>
                  </>
                ) : (
                  /* Rigid Locked Test Render */
                  <>
                    {/* Triangle body */}
                    <polygon
                      points={`60,150 ${190 + wiggle},40 340,150`}
                      fill="rgba(34, 197, 94, 0.22)"
                      stroke="#22c55e"
                      strokeWidth="4"
                    />

                    {/* RHS Right Angle Marker */}
                    {selectedTrio.id === 'rhs' && (
                      <path d="M 60,130 L 80,130 L 80,150" fill="none" stroke="#fbbf24" strokeWidth="2.5" />
                    )}

                    {/* Angle arc at vertex A */}
                    {(selectedTrio.id === 'sas' || selectedTrio.id === 'asa' || selectedTrio.id === 'aas') && (
                      <path d="M 90,150 A 30,30 0 0,0 80,132" fill="none" stroke="#fbbf24" strokeWidth="3" />
                    )}

                    {/* Side hash tick marks */}
                    <line x1="120" y1="92" x2="130" y2="98" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="260" y1="92" x2="270" y2="98" stroke="#38bdf8" strokeWidth="3" />

                    {/* Vertices */}
                    <circle cx="60" cy="150" r="7" fill="#f59e0b" />
                    <circle cx={190 + wiggle} cy="40" r="7" fill="#22c55e" />
                    <circle cx="340" cy="150" r="7" fill="#f59e0b" />

                    {/* Vertex Labels */}
                    <text x="45" y="174" fill="#fff" fontSize="16" fontWeight="bold">A</text>
                    <text x={175 + wiggle} y="26" fill="#22c55e" fontSize="16" fontWeight="bold">Locked Vertex C</text>
                    <text x="345" y="174" fill="#fff" fontSize="16" fontWeight="bold">B</text>

                    {/* Status watermark */}
                    <text x="140" y="110" fill="rgba(34, 197, 94, 0.85)" fontSize="15" fontWeight="bold">
                      🔒 RIGID FRAME LOCKED
                    </text>
                  </>
                )}
              </svg>
            </div>

            {/* Wiggle Slider (for locked test) */}
            {isTest && (
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.06)', padding: '10px 18px', borderRadius: '14px', boxSizing: 'border-box' }}>
                <span style={{ fontSize: '1.08rem', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap' }}>
                  Wiggle frame:
                </span>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  value={wiggle}
                  onChange={e => setWiggle(Number(e.target.value))}
                  style={{ flex: 1, accentColor: 'var(--gold)', height: '10px', cursor: 'pointer' }}
                  aria-label="Wiggle vertex slider"
                />
                <span style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--gold)', minWidth: '45px', textAlign: 'right' }}>
                  {wiggle > 0 ? `+${wiggle}°` : `${wiggle}°`}
                </span>
              </div>
            )}

            {/* Explored Progress Bar & Mini Tracker */}
            <div className="station-info-card" style={{ padding: '12px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--gold)' }}>
                  Discovery Checklist ({explored.size}/7 Explored)
                </span>
                <span style={{ fontSize: '0.92rem', color: '#86efac', fontWeight: 800 }}>
                  {canShowConfirmation ? "✓ Ready to Certify" : "Explore 2 tests + SSA + AAA"}
                </span>
              </div>
              <div className="criterion-mini-grid">
                {PIN_TRIOS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    className={`criterion-mini-pill ${selectedTrio.id === p.id ? 'active' : ''} ${explored.has(p.id) ? 'tested' : ''}`}
                    onClick={() => handleSelectTrio(p)}
                  >
                    <span>{p.id.toUpperCase()}</span>
                    <span>{explored.has(p.id) ? (p.isTest ? '🔒' : '⚠️') : '○'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Feedback, Deep Dive Explanation, Confirmation or Success */}
          <div className="station-col">
            {/* Live Feedback Status Banner */}
            <div className={`station-feedback-box ${isTest ? 'test' : isAmbiguous ? 'ambiguous' : 'info'}`}>
              {isTest ? (
                <>🔒 <strong>LOCKED (Valid Congruence Test):</strong> Only ONE triangle can possibly be formed! Every stage flat built with {selectedTrio.id.toUpperCase()} will be an identical match.</>
              ) : isAmbiguous ? (
                <>⚠️ <strong>AMBIGUOUS TRAP (NOT a Congruence Test):</strong> Two completely different triangles can be formed with these identical measurements! SSA cannot guarantee a match.</>
              ) : (
                <>📐 <strong>SIMILARITY ONLY (NOT a Congruence Test):</strong> AAA fixes the angles and shape, but side lengths can scale up or down indefinitely like a projector.</>
              )}
            </div>

            {/* Geometric Rule & Backstage Application Card */}
            <div className="station-info-card">
              <div className="station-info-title">
                <span>📘</span> {selectedTrio.ruleTitle}
              </div>
              <p className="station-info-body">
                {selectedTrio.ruleText}
              </p>
              <div style={{ marginTop: '4px', padding: '8px 12px', background: 'rgba(255, 193, 7, 0.1)', borderRadius: '10px', borderLeft: '3px solid var(--gold)', fontSize: '0.96rem', color: '#fef08a', fontWeight: 600 }}>
                🎭 {selectedTrio.stageMetaphor}
              </div>
            </div>

            {/* Confirmation Question Gate */}
            {canShowConfirmation && !completed && (
              <div className="confirm-question-card">
                <span className="confirm-question-title">
                  🧠 Backstage Discovery Certification: Why can the SSA frame take two different shapes?
                </span>
                {[
                  "The non-included side swings in a circular arc, intersecting the baseline at two points (one acute, one obtuse)",
                  "Because all triangles must have angles that sum to 360 degrees",
                  "Because timber flats cannot be measured with right angles",
                ].map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`sim-option-btn ${confirmSelected === i ? (i === 0 ? 'correct' : 'wrong') : ''}`}
                    onClick={() => handleAnswerConfirmation(i)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Success Completion Panel */}
            {completed && (
              <div className="station-success-card">
                <div className="station-success-icon">🎟️</div>
                <div className="station-success-title">The Pin Board Mastered!</div>
                <p className="station-success-desc">
                  You've mathematically verified why SSS, SAS, ASA, AAS, and RHS rigidly lock a triangle, while SSA swings ambiguously and AAA allows infinite scaling!
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onComplete}
                  style={{ padding: '12px 32px', fontSize: '1.15rem', fontWeight: 900 }}
                >
                  Complete Station A ✓
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

