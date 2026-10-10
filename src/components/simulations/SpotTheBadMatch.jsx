// src/components/simulations/SpotTheBadMatch.jsx
import React, { useState } from 'react';
import './Stations.css';

const CASES = [
  {
    id: 1,
    title: "Case 1: Li Ting's Timber Frame Argument",
    premise: "Li Ting is trying to prove that two stage flats △ABC and △PQR are identical for opening night.",
    steps: [
      { id: 0, text: "Step 1: Side AB = PQ = 8 cm (measured with tape)", isFlawed: false },
      { id: 1, text: "Step 2: Side BC = QR = 6 cm (measured with tape)", isFlawed: false },
      { id: 2, text: "Step 3: Angle ∠A = ∠P = 35° (non-included angle)", isFlawed: false },
      { id: 3, text: "Step 4: Therefore △ABC ≅ △PQR by the SSA criterion!", isFlawed: true, flawReason: "SSA is NOT a valid congruence test because the non-included side can swing into acute or obtuse triangles." },
      { id: 4, text: "Step 5: Hence AC = PR", isFlawed: false },
    ],
    fixOptions: [
      { text: "Replace Step 4: 'Cannot conclude congruence — SSA is an ambiguous trap; two different triangles can be formed!'", isCorrect: true },
      { text: "Replace Step 4 with 'Therefore △ABC ≅ △PQR by AAA criterion'", isCorrect: false },
      { text: "Replace Step 4 with 'Therefore the triangles are not congruent at all under any circumstances'", isCorrect: false },
    ],
  },
  {
    id: 2,
    title: "Case 2: Haikal's Overlap Argument",
    premise: "Haikal wrote a proof for two overlapping stage flats before final curtain call.",
    steps: [
      { id: 0, text: "Step 1: Hence side AB = PQ (corresponding sides of congruent triangles)", isFlawed: true, flawReason: "Circular proof: You cannot deduce that corresponding parts are equal before the triangles are proven congruent!" },
      { id: 1, text: "Step 2: Side BC = QR (given on blueprint)", isFlawed: false },
      { id: 2, text: "Step 3: Angle ∠B = ∠Q (given on blueprint)", isFlawed: false },
      { id: 3, text: "Step 4: Side AC = PR (given on blueprint)", isFlawed: false },
      { id: 4, text: "Step 5: Therefore △ABC ≅ △PQR (SAS)", isFlawed: false },
    ],
    fixOptions: [
      { text: "Move Step 1 to the end after Step 5, because 'Hence' deductions only follow AFTER congruence is proven!", isCorrect: true },
      { text: "Change the reason in Step 1 to 'by definition of parallel lines'", isCorrect: false },
      { text: "Delete Step 5 completely and keep Step 1 at the beginning", isCorrect: false },
    ],
  },
];

export default function SpotTheBadMatch({ onComplete, _audioEnabled }) {
  const [caseIdx, setCaseIdx] = useState(0);
  const [selectedStepIdx, setSelectedStepIdx] = useState(null);
  const [selectedFixIdx, setSelectedFixIdx] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [completedCases, setCompletedCases] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentCase = CASES[caseIdx];

  function handleSelectStep(idx) {
    setSelectedStepIdx(idx);
    setSelectedFixIdx(null);
    setFeedback(null);
  }

  function handleSelectFix(fixIdx) {
    setSelectedFixIdx(fixIdx);
    const chosenFix = currentCase.fixOptions[fixIdx];
    const isStepCorrect = currentCase.steps[selectedStepIdx]?.isFlawed;

    if (!isStepCorrect) {
      setFeedback({
        valid: false,
        message: "That step is mathematically sound. Look closer for a step that cites an invalid test or makes a premature 'Hence' deduction!",
      });
      return;
    }

    if (!chosenFix.isCorrect) {
      setFeedback({
        valid: false,
        message: "You correctly spotted the flawed step, but this proposed fix contains another geometric fallacy. Choose the watertight mathematical correction!",
      });
      return;
    }

    // Both step and fix are correct
    setFeedback({
      valid: true,
      message: `Bulls-eye! Flaw spotted and corrected. ${currentCase.steps[selectedStepIdx].flawReason}`,
    });

    const nextSolved = completedCases + 1;
    setCompletedCases(nextSolved);
    if (nextSolved >= CASES.length) {
      setCompleted(true);
    }
  }

  function handleNextCase() {
    setCaseIdx((caseIdx + 1) % CASES.length);
    setSelectedStepIdx(null);
    setSelectedFixIdx(null);
    setFeedback(null);
  }

  return (
    <div className="station-container">
      {/* Header */}
      <div className="station-header">
        <span className="station-badge">🔍 Station D · Error-Detective</span>
        <h2 className="station-title">Spot the Bad Match</h2>
        <p className="station-instruction">
          A backstage crew member's proof contains an insidious geometric flaw. Tap the flawed step, then select the watertight fix to save opening night!
        </p>
      </div>

      <div className="station-workspace">
        <div className="station-grid-2col">
          {/* Left Column: Detective Case Briefing & Proof Steps */}
          <div className="station-col">
            <div className="station-info-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 900, color: 'var(--gold)', fontSize: '1.25rem' }}>
                  {currentCase.title}
                </span>
                <span style={{ fontSize: '0.96rem', background: 'rgba(255,255,255,0.1)', padding: '5px 12px', borderRadius: '10px', fontWeight: 800 }}>
                  Case: <strong style={{ color: '#2ecc71' }}>{completedCases}/{CASES.length} Solved</strong>
                </span>
              </div>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.92)', margin: '4px 0 0', fontWeight: 600, lineHeight: 1.45 }}>
                {currentCase.premise}
              </p>
            </div>

            {/* Proof Steps List */}
            <div className="proof-steps-list">
              {currentCase.steps.map((st, i) => {
                const isSelected = selectedStepIdx === i;
                return (
                  <div
                    key={i}
                    className={`proof-step-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectStep(i)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Step ${i + 1}: ${st.text}`}
                  >
                    <span className="proof-step-text">{st.text}</span>
                    <span style={{ fontSize: '0.92rem', color: isSelected ? 'var(--gold)' : 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', marginLeft: '10px', fontWeight: 800 }}>
                      {isSelected ? "👉 Selected" : "Inspect Step"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detective's Handbook OR Fix Options & Feedback */}
          <div className="station-col">
            {selectedStepIdx !== null ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                <div className="station-info-card">
                  <span style={{ fontSize: '1.18rem', fontWeight: 900, color: 'var(--gold)' }}>
                    Diagnosing Step {selectedStepIdx + 1}:
                  </span>
                  <div style={{ fontSize: '1.02rem', color: '#fff', fontStyle: 'italic', padding: '6px 10px', background: 'rgba(255,255,255,0.06)', borderRadius: '8px' }}>
                    "{currentCase.steps[selectedStepIdx].text}"
                  </div>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fef08a', marginTop: '4px' }}>
                    Choose the Watertight Fix to Save the Production:
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentCase.fixOptions.map((opt, fixIdx) => {
                    const isFixSel = selectedFixIdx === fixIdx;
                    return (
                      <button
                        key={fixIdx}
                        type="button"
                        className={`sim-option-btn ${isFixSel ? (opt.isCorrect ? 'correct' : 'wrong') : ''}`}
                        onClick={() => handleSelectFix(fixIdx)}
                      >
                        {opt.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Detective Handbook Guide Fills Whitespace Beautifully */
              <div className="station-info-card">
                <div className="station-info-title">
                  <span>🕵️</span> Detective's Field Guide: 3 Backstage Fallacies
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                  <div style={{ padding: '8px 12px', background: 'rgba(231, 76, 60, 0.15)', borderRadius: '10px', borderLeft: '3px solid #ff7675' }}>
                    <div style={{ fontWeight: 800, color: '#ff7675', fontSize: '1.02rem' }}>
                      ⚠️ Fallacy 1: The SSA Swing Trap
                    </div>
                    <div style={{ fontSize: '0.94rem', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
                      Two sides and a non-included angle can swing into two distinct shapes (one acute, one obtuse). It cannot prove congruence!
                    </div>
                  </div>

                  <div style={{ padding: '8px 12px', background: 'rgba(241, 196, 15, 0.15)', borderRadius: '10px', borderLeft: '3px solid #f1c40f' }}>
                    <div style={{ fontWeight: 800, color: '#f1c40f', fontSize: '1.02rem' }}>
                      ⚠️ Fallacy 2: Premature CPCTC Deduction
                    </div>
                    <div style={{ fontSize: '0.94rem', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
                      Circular reasoning: You cannot claim "Hence, corresponding parts are equal" before the triangles have been proven congruent!
                    </div>
                  </div>

                  <div style={{ padding: '8px 12px', background: 'rgba(52, 152, 219, 0.15)', borderRadius: '10px', borderLeft: '3px solid #3498db' }}>
                    <div style={{ fontWeight: 800, color: '#74b9ff', fontSize: '1.02rem' }}>
                      ⚠️ Fallacy 3: The AAA Illusion
                    </div>
                    <div style={{ fontSize: '0.94rem', color: 'rgba(255,255,255,0.85)', marginTop: '2px' }}>
                      Three equal angles only prove the triangles share the same shape (Similarity), not the same size (Congruence)!
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', padding: '10px', color: 'var(--gold)', fontWeight: 800, fontSize: '1.02rem' }}>
                    👈 Tap any step in the proof on the left to inspect and fix it!
                  </div>
                </div>
              </div>
            )}

            {/* Feedback Box */}
            {feedback && (
              <div className={`station-feedback-box ${feedback.valid ? 'test' : 'ambiguous'}`}>
                {feedback.message}
              </div>
            )}

            {/* Next Case Button */}
            {feedback?.valid && completedCases < CASES.length && (
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleNextCase}
                style={{ padding: '12px 24px', fontSize: '1.12rem', width: '100%', fontWeight: 800 }}
              >
                Next Detective Case ➔
              </button>
            )}

            {/* Success Gate */}
            {completed && (
              <div className="station-success-card">
                <div className="station-success-icon">🕵️</div>
                <div className="station-success-title">Lead Detective Certified!</div>
                <p className="station-success-desc">
                  You've exposed the classic traps: ambiguous SSA swings and premature CPCTC deductions! The production is saved!
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onComplete}
                  style={{ padding: '12px 32px', fontSize: '1.15rem', fontWeight: 900 }}
                >
                  Complete Station D ✓
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

