// src/components/simulations/TheFullRehearsal.jsx
import React, { useState } from 'react';
import './Stations.css';
import { checkChain } from '../../utils/geoFacts.js';

export default function TheFullRehearsal({ onComplete, _audioEnabled }) {
  const [isSeparated, setIsSeparated] = useState(false);
  const [commonSideMarked, setCommonSideMarked] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [henceSelected, setHenceSelected] = useState(false);
  const [stepOrder, setStepOrder] = useState([0, 1, 2, 3, 4]); // permutation of proof steps
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);

  const proofSteps = [
    { id: 0, text: "AB = CD (given on stage blueprint)", type: 'fact', reason: 'given', badge: 'EVIDENCE 1' },
    { id: 1, text: "AD = CB (given on stage blueprint)", type: 'fact', reason: 'given', badge: 'EVIDENCE 2' },
    { id: 2, text: "BD = BD (common shared beam)", type: 'fact', reason: 'common-side', badge: 'SHARED EDGE' },
    { id: 3, text: "∴ △ABD ≅ △CDB (SSS criterion)", type: 'congruence', reason: 'sss', tri1: 'ABD', tri2: 'CDB', badge: 'CRITERION' },
    { id: 4, text: "Hence, ∠A = ∠C (corr. angles of ≅ △s)", type: 'deduction', reason: 'corresponding-parts-congruent-triangles', badge: 'DEDUCTION' },
  ];

  function moveStep(idx, dir) {
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= stepOrder.length) return;
    const nextOrder = [...stepOrder];
    const temp = nextOrder[idx];
    nextOrder[idx] = nextOrder[targetIdx];
    nextOrder[targetIdx] = temp;
    setStepOrder(nextOrder);
    setFeedback(null);
  }

  function validateFullRehearsal() {
    if (!commonSideMarked) {
      setFeedback({ valid: false, message: "Missing Evidence: Mark the hidden common shared edge BD first!" });
      return;
    }
    if (selectedTest !== 'SSS') {
      setFeedback({ valid: false, message: "Test Mismatch: Since all 3 pairs of corresponding sides are equal, the correct test is SSS!" });
      return;
    }
    if (!henceSelected) {
      setFeedback({ valid: false, message: "Incomplete: Don't forget to include the final 'Hence, ∠A = ∠C' deduction!" });
      return;
    }

    // Run checkChain on the ordered steps
    const currentChain = stepOrder.map(idx => proofSteps[idx]);
    checkChain(currentChain, [
      { type: 'side-equal', subject: 'AB=CD' },
      { type: 'side-equal', subject: 'AD=CB' },
      { type: 'common-side', subject: 'BD=BD' },
    ]);

    // Test must come after all 3 facts (indices 0, 1, 2)
    const testPos = stepOrder.indexOf(3);
    const hencePos = stepOrder.indexOf(4);
    const factsBeforeTest = [stepOrder.indexOf(0), stepOrder.indexOf(1), stepOrder.indexOf(2)].every(pos => pos < testPos);
    const henceAfterTest = testPos < hencePos;

    if (!factsBeforeTest) {
      setFeedback({
        valid: false,
        message: "Logical Order Error: All 3 evidence statements (AB=CD, AD=CB, BD=BD) must be stated BEFORE stating the congruence test!",
      });
      return;
    }

    if (!henceAfterTest) {
      setFeedback({
        valid: false,
        message: "Logical Order Error: The 'Hence' deduction can only be deduced AFTER congruence is proven!",
      });
      return;
    }

    setFeedback({ valid: true, message: "Bravo! Flawless logical proof chain approved with zero errors!" });
    setCompleted(true);
  }

  return (
    <div className="station-container">
      {/* Header */}
      <div className="station-header">
        <span className="station-badge">🎭 Station C · Multi-Step Construction</span>
        <h2 className="station-title">The Full Rehearsal</h2>
        <p className="station-instruction">
          Construct an end-to-end geometric proof for opening night! Separate the overlapping set pieces, uncover the hidden shared beam, choose the test, and arrange the proof chain.
        </p>
      </div>

      <div className="station-workspace">
        <div className="station-grid-2col">
          {/* Left Column: Overlapping Set Diagram & Clues Panel */}
          <div className="station-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ fontWeight: 900, color: 'var(--gold)', fontSize: '1.2rem' }}>
                Stage Flat: Quadrilateral ABCD
              </span>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setIsSeparated(!isSeparated)}
                style={{ padding: '6px 16px', fontSize: '0.98rem', fontWeight: 800 }}
              >
                {isSeparated ? "🔗 Combine Set" : "✂️ Separate Triangles"}
              </button>
            </div>

            {/* Stage Flat Diagram Canvas */}
            <div className="station-canvas-card">
              {!isSeparated ? (
                <svg viewBox="0 0 440 180" style={{ width: '100%', height: '185px' }}>
                  {/* Quadrilateral body */}
                  <polygon points="60,145 150,35 340,35 250,145" fill="rgba(124, 92, 191, 0.25)" stroke="#a78bfa" strokeWidth="3.5" />
                  
                  {/* Shared Diagonal Beam BD */}
                  <line
                    x1="150" y1="35" x2="250" y2="145"
                    stroke={commonSideMarked ? "#22c55e" : "#fbbf24"}
                    strokeWidth={commonSideMarked ? "5" : "3"}
                    strokeDasharray={commonSideMarked ? "0" : "5 5"}
                  />

                  {/* Hash marks on AB and CD */}
                  <line x1="98" y1="84" x2="108" y2="92" stroke="#38bdf8" strokeWidth="3" />
                  <line x1="288" y1="84" x2="298" y2="92" stroke="#38bdf8" strokeWidth="3" />

                  {/* Double Hash marks on AD and CB */}
                  <line x1="145" y1="140" x2="151" y2="150" stroke="#f472b6" strokeWidth="3" />
                  <line x1="153" y1="140" x2="159" y2="150" stroke="#f472b6" strokeWidth="3" />
                  <line x1="235" y1="30" x2="241" y2="40" stroke="#f472b6" strokeWidth="3" />
                  <line x1="243" y1="30" x2="249" y2="40" stroke="#f472b6" strokeWidth="3" />

                  {/* Vertices */}
                  <circle cx="60" cy="145" r="6" fill="#fff" />
                  <circle cx="150" cy="35" r="6" fill="#fff" />
                  <circle cx="340" cy="35" r="6" fill="#fff" />
                  <circle cx="250" cy="145" r="6" fill="#fff" />

                  {/* Vertex Labels */}
                  <text x="40" y="155" fill="#fff" fontSize="16" fontWeight="bold">A</text>
                  <text x="145" y="24" fill="#fff" fontSize="16" fontWeight="bold">B</text>
                  <text x="350" y="32" fill="#fff" fontSize="16" fontWeight="bold">C</text>
                  <text x="255" y="160" fill="#fff" fontSize="16" fontWeight="bold">D</text>

                  {commonSideMarked && (
                    <text x="175" y="95" fill="#22c55e" fontSize="14" fontWeight="bold" transform="rotate(45, 175, 95)">
                      Common Beam BD ✓
                    </text>
                  )}
                </svg>
              ) : (
                <svg viewBox="0 0 440 180" style={{ width: '100%', height: '185px' }}>
                  {/* Left Triangle ABD */}
                  <polygon points="45,145 115,35 185,145" fill="rgba(231, 111, 81, 0.3)" stroke="#f97316" strokeWidth="3.5" />
                  <text x="30" y="155" fill="#fff" fontSize="15" fontWeight="bold">A</text>
                  <text x="110" y="24" fill="#fff" fontSize="15" fontWeight="bold">B</text>
                  <text x="190" y="155" fill="#fff" fontSize="15" fontWeight="bold">D</text>
                  <line x1="115" y1="35" x2="185" y2="145" stroke="#22c55e" strokeWidth="4.5" />
                  <text x="155" y="90" fill="#22c55e" fontSize="13" fontWeight="bold">BD</text>

                  {/* Right Triangle CDB (flipped to reveal congruence) */}
                  <polygon points="255,35 325,145 395,35" fill="rgba(42, 157, 143, 0.3)" stroke="#14b8a6" strokeWidth="3.5" />
                  <text x="240" y="30" fill="#fff" fontSize="15" fontWeight="bold">D</text>
                  <text x="320" y="165" fill="#fff" fontSize="15" fontWeight="bold">B</text>
                  <text x="400" y="30" fill="#fff" fontSize="15" fontWeight="bold">C</text>
                  <line x1="255" y1="35" x2="325" y2="145" stroke="#22c55e" strokeWidth="4.5" />
                  <text x="275" y="95" fill="#22c55e" fontSize="13" fontWeight="bold">DB</text>
                </svg>
              )}
            </div>

            {/* Clues & Proof Actions Box */}
            <div className="station-info-card">
              <div className="station-info-title">
                <span>📐</span> Stage Clues & Hidden Matches
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  type="button"
                  className={`pin-chip ${commonSideMarked ? 'active' : ''}`}
                  onClick={() => setCommonSideMarked(true)}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {commonSideMarked ? "✓ Hidden Shared Beam (BD = BD) Identified" : "🔍 Uncover Hidden Shared Beam BD"}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.9)' }}>
                    Congruence Test:
                  </span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['SSS', 'SAS', 'ASA', 'AAS', 'RHS'].map(t => (
                      <button
                        key={t}
                        type="button"
                        className={`pin-chip ${selectedTest === t ? 'active' : ''}`}
                        onClick={() => setSelectedTest(t)}
                        style={{ padding: '6px 14px', minHeight: '34px', fontSize: '0.94rem' }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className={`pin-chip ${henceSelected ? 'active' : ''}`}
                  onClick={() => setHenceSelected(true)}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {henceSelected ? "✓ Final Deduction 'Hence, ∠A = ∠C' Added" : "🎯 Add Final Deduction 'Hence, ∠A = ∠C'"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Re-order Proof Steps & Run Audit */}
          <div className="station-col">
            <div className="station-info-card" style={{ padding: '12px 18px' }}>
              <div style={{ fontSize: '1.15rem', color: 'var(--gold)', fontWeight: 900 }}>
                Arrange Proof Chain: Evidence ➔ Test ➔ Deduction
              </div>
              <div style={{ fontSize: '0.96rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                Use ▲ and ▼ to order the proof statements logically before curtain call.
              </div>
            </div>

            <div className="proof-steps-list">
              {stepOrder.map((stepId, orderIdx) => {
                const step = proofSteps[stepId];
                return (
                  <div key={step.id} className="proof-step-item">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.82rem', padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,193,7,0.2)', color: 'var(--gold)', fontWeight: 900 }}>
                        {step.badge}
                      </span>
                      <span className="proof-step-text">
                        {orderIdx + 1}. {step.text}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexShrink: 0, marginLeft: '10px' }}>
                      <button
                        type="button"
                        className="stepper-btn"
                        style={{ width: '36px', height: '36px', fontSize: '1.1rem' }}
                        onClick={() => moveStep(orderIdx, -1)}
                        disabled={orderIdx === 0}
                        aria-label={`Move step ${orderIdx + 1} up`}
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        className="stepper-btn"
                        style={{ width: '36px', height: '36px', fontSize: '1.1rem' }}
                        onClick={() => moveStep(orderIdx, 1)}
                        disabled={orderIdx === stepOrder.length - 1}
                        aria-label={`Move step ${orderIdx + 1} down`}
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Run Audit Button */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={validateFullRehearsal}
              style={{ padding: '12px 28px', fontSize: '1.15rem', fontWeight: 900, width: '100%' }}
            >
              Run Rehearsal Proof Audit 🎬
            </button>

            {/* Validation Feedback Banner */}
            {feedback && (
              <div className={`station-feedback-box ${feedback.valid ? 'test' : 'ambiguous'}`}>
                {feedback.message}
              </div>
            )}

            {/* Success Gate */}
            {completed && (
              <div className="station-success-card">
                <div className="station-success-icon">🌟</div>
                <div className="station-success-title">Full Rehearsal Approved!</div>
                <p className="station-success-desc">
                  You've constructed an airtight geometric proof chain: 3 given & hidden facts ➔ SSS criterion ➔ CPCTC deduction!
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onComplete}
                  style={{ padding: '12px 32px', fontSize: '1.15rem', fontWeight: 900 }}
                >
                  Complete Station C ✓
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

