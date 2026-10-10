// src/components/simulations/CutTheCopy.jsx
import React, { useState } from 'react';
import './Stations.css';
import { areCongruent } from '../../utils/congruenceMath.js';

const TARGET_FLATS = [
  {
    id: 1,
    name: "Wing Flat 1 (Left Wing Framing)",
    sides: [6, 8, 10],
    angles: [37, 53, 90],
    testName: "SAS or SSS",
    role: "Stage-left proscenium wing baffle",
    hint: "Target flat dimensions: sides 6 cm, 8 cm, and hypotenuse 10 cm with right angle (90°).",
  },
  {
    id: 2,
    name: "Rooftop Prop 2 (Gable Scenery)",
    sides: [7, 7, 10],
    angles: [45, 45, 90],
    testName: "SAS or SSS",
    role: "Cottage rooftop triangular gable",
    hint: "Target is an isosceles right triangle with equal 7 cm timber legs and a 90° apex.",
  },
  {
    id: 3,
    name: "Backdrop Panel 3 (Skyline Peak)",
    sides: [8, 9, 10],
    angles: [49, 58, 73],
    testName: "SSS",
    role: "Distant mountain backdrop silhouette",
    hint: "Target has sides 8 cm, 9 cm, and 10 cm (all acute angles).",
  },
];

export default function CutTheCopy({ onComplete, _audioEnabled }) {
  const [flatIdx, setFlatIdx] = useState(0);
  const [chosenMode, setChosenMode] = useState('sss'); // 'sss' | 'sas'
  const target = TARGET_FLATS[flatIdx];

  // Cut values state
  const [side1, setSide1] = useState(6);
  const [side2, setSide2] = useState(8);
  const [side3OrAngle, setSide3OrAngle] = useState(10);
  const [checked, setChecked] = useState(false);
  const [fits, setFits] = useState(false);
  const [targetsSolved, setTargetsSolved] = useState(0);
  const [completed, setCompleted] = useState(false);

  function checkFit() {
    let studentSides = [];
    if (chosenMode === 'sss') {
      studentSides = [side1, side2, side3OrAngle];
    } else {
      // SAS: two sides + angle. We convert side1, side2, angle into third side via Law of Cosines
      const rad = (side3OrAngle * Math.PI) / 180;
      const c = Math.sqrt(side1 * side1 + side2 * side2 - 2 * side1 * side2 * Math.cos(rad));
      studentSides = [side1, side2, Math.round(c * 10) / 10];
    }

    const matches = areCongruent(studentSides, target.sides);
    setFits(matches);
    setChecked(true);

    if (matches) {
      const nextSolved = targetsSolved + 1;
      setTargetsSolved(nextSolved);
      if (nextSolved >= 2) {
        setCompleted(true);
      }
    }
  }

  function handleNextFlat() {
    const nextIdx = (flatIdx + 1) % TARGET_FLATS.length;
    setFlatIdx(nextIdx);
    setChecked(false);
    setFits(false);
    // Preset starting sliders near the new target
    const nextTarget = TARGET_FLATS[nextIdx];
    setSide1(nextTarget.sides[0] - 1);
    setSide2(nextTarget.sides[1]);
    setSide3OrAngle(chosenMode === 'sss' ? nextTarget.sides[2] + 1 : nextTarget.angles[2]);
  }

  // Dimension match helpers for Carpenter's Cut Sheet
  const side1Match = side1 === target.sides[0];
  const side2Match = side2 === target.sides[1];
  const target3Val = chosenMode === 'sss' ? target.sides[2] : target.angles[2];
  const side3Match = side3OrAngle === target3Val;

  return (
    <div className="station-container">
      {/* Header */}
      <div className="station-header">
        <span className="station-badge">✂️ Station B · Build-to-Target Challenge</span>
        <h2 className="station-title">Cut the Copy</h2>
        <p className="station-instruction">
          Measure and cut an identical duplicate of the target stage flat. Choose your measurement test, adjust the dimensions on the carpenter's workbench, and test the overlay!
        </p>
      </div>

      <div className="station-workspace">
        <div className="station-grid-2col">
          {/* Left Column: Blueprint Canvas & Carpenter's Cut Sheet */}
          <div className="station-col">
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div>
                <span style={{ fontWeight: 900, color: 'var(--gold)', fontSize: '1.25rem' }}>
                  {target.name}
                </span>
                <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', marginTop: '2px', fontWeight: 600 }}>
                  Role: {target.role}
                </div>
              </div>
              <div style={{ fontSize: '0.98rem', background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: '12px', fontWeight: 800 }}>
                Progress: <strong style={{ color: '#2ecc71' }}>{targetsSolved}/2 Solved</strong>
              </div>
            </div>

            {/* Architectural Blueprint Canvas */}
            <div className="station-canvas-card">
              <svg viewBox="0 0 440 190" style={{ width: '100%', height: '195px' }}>
                {/* Blueprint grid lines */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56, 189, 248, 0.12)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="440" height="190" fill="url(#grid)" />

                {/* Target blueprint outline (dashed cyan) */}
                <polygon
                  points="60,155 190,35 320,155"
                  fill="rgba(56, 189, 248, 0.15)"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                />
                <text x="170" y="26" fill="#38bdf8" fontSize="15" fontWeight="bold">Blueprint Target</text>

                {/* Dimensions labels on target */}
                <text x="95" y="90" fill="#7dd3fc" fontSize="14" fontWeight="bold">a = {target.sides[0]} cm</text>
                <text x="265" y="90" fill="#7dd3fc" fontSize="14" fontWeight="bold">b = {target.sides[1]} cm</text>
                <text x="170" y="174" fill="#7dd3fc" fontSize="14" fontWeight="bold">c = {target.sides[2]} cm</text>

                {/* Cut copy overlay */}
                <polygon
                  points={`60,155 ${60 + side1 * 16},${155 - side2 * 14} ${60 + (chosenMode === 'sss' ? side3OrAngle * 26 : 260)},155`}
                  fill={checked ? (fits ? "rgba(34, 197, 94, 0.45)" : "rgba(239, 68, 68, 0.4)") : "rgba(251, 191, 36, 0.3)"}
                  stroke={checked ? (fits ? "#22c55e" : "#ef4444") : "#fbbf24"}
                  strokeWidth="4"
                />
              </svg>
            </div>

            {/* Carpenter's Real-Time Cut Sheet Comparison Table */}
            <div className="station-info-card">
              <div className="station-info-title">
                <span>📋</span> Carpenter's Live Cut Sheet
              </div>
              <table className="spec-table">
                <thead>
                  <tr>
                    <th>Measurement</th>
                    <th>Blueprint Spec</th>
                    <th>Your Cut</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Side A</td>
                    <td>{target.sides[0]} cm</td>
                    <td>{side1} cm</td>
                    <td style={{ color: side1Match ? '#86efac' : '#fca5a5' }}>
                      {side1Match ? '✅ Exact Match' : side1 > target.sides[0] ? `+${side1 - target.sides[0]} cm long` : `${side1 - target.sides[0]} cm short`}
                    </td>
                  </tr>
                  <tr>
                    <td>Side B</td>
                    <td>{target.sides[1]} cm</td>
                    <td>{side2} cm</td>
                    <td style={{ color: side2Match ? '#86efac' : '#fca5a5' }}>
                      {side2Match ? '✅ Exact Match' : side2 > target.sides[1] ? `+${side2 - target.sides[1]} cm long` : `${side2 - target.sides[1]} cm short`}
                    </td>
                  </tr>
                  <tr>
                    <td>{chosenMode === 'sss' ? 'Side C' : 'Angle ∠C'}</td>
                    <td>{target3Val} {chosenMode === 'sss' ? 'cm' : '°'}</td>
                    <td>{side3OrAngle} {chosenMode === 'sss' ? 'cm' : '°'}</td>
                    <td style={{ color: side3Match ? '#86efac' : '#fca5a5' }}>
                      {side3Match ? '✅ Exact Match' : side3OrAngle > target3Val ? `+${side3OrAngle - target3Val} over` : `${side3OrAngle - target3Val} under`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Mode, Steppers, Actions, Feedback */}
          <div className="station-col">
            {/* Test Mode Selector */}
            <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
              <button
                type="button"
                className={`pin-chip ${chosenMode === 'sss' ? 'active' : ''}`}
                onClick={() => { setChosenMode('sss'); setChecked(false); }}
                style={{ flex: 1 }}
              >
                📐 Measure 3 Sides (SSS)
              </button>
              <button
                type="button"
                className={`pin-chip ${chosenMode === 'sas' ? 'active' : ''}`}
                onClick={() => { setChosenMode('sas'); setChecked(false); }}
                style={{ flex: 1 }}
              >
                📐 Measure 2 Sides + Angle (SAS)
              </button>
            </div>

            {/* Stepper Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
              <div className="stepper-row">
                <span className="stepper-label">Side A (cm):</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button type="button" className="stepper-btn" onClick={() => setSide1(s => Math.max(3, s - 1))} aria-label="Decrease side A">-</button>
                  <span className="stepper-value">{side1} cm</span>
                  <button type="button" className="stepper-btn" onClick={() => setSide1(s => Math.min(15, s + 1))} aria-label="Increase side A">+</button>
                </div>
              </div>

              <div className="stepper-row">
                <span className="stepper-label">Side B (cm):</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button type="button" className="stepper-btn" onClick={() => setSide2(s => Math.max(3, s - 1))} aria-label="Decrease side B">-</button>
                  <span className="stepper-value">{side2} cm</span>
                  <button type="button" className="stepper-btn" onClick={() => setSide2(s => Math.min(15, s + 1))} aria-label="Increase side B">+</button>
                </div>
              </div>

              <div className="stepper-row">
                <span className="stepper-label">
                  {chosenMode === 'sss' ? 'Side C (cm):' : 'Included Angle ∠C (°):'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => setSide3OrAngle(s => Math.max(chosenMode === 'sss' ? 3 : 20, s - (chosenMode === 'sss' ? 1 : 5)))}
                    aria-label="Decrease third measure"
                  >
                    -
                  </button>
                  <span className="stepper-value">
                    {side3OrAngle} {chosenMode === 'sss' ? 'cm' : '°'}
                  </span>
                  <button
                    type="button"
                    className="stepper-btn"
                    onClick={() => setSide3OrAngle(s => Math.min(chosenMode === 'sss' ? 20 : 120, s + (chosenMode === 'sss' ? 1 : 5)))}
                    aria-label="Increase third measure"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', width: '100%' }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={checkFit}
                style={{ flex: 1, padding: '12px 24px', fontSize: '1.12rem', fontWeight: 900 }}
              >
                Test Cut Overlay 📐
              </button>
              {fits && (
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleNextFlat}
                  style={{ flex: 1, padding: '12px 22px', fontSize: '1.12rem', fontWeight: 800 }}
                >
                  Next Stage Flat ➔
                </button>
              )}
            </div>

            {/* Live Feedback Banner */}
            {checked && (
              <div className={`station-feedback-box ${fits ? 'test' : 'ambiguous'}`}>
                {fits ? (
                  <>🎉 <strong>PERFECT OVERLAY FIT!</strong> The cut timber matches the blueprint target exactly. Congruence proven via {chosenMode.toUpperCase()}!</>
                ) : (
                  <>❌ <strong>DIMENSIONS MISMATCH:</strong> The cut piece does not match the stage flat. Inspect the cut sheet numbers and adjust your steppers!</>
                )}
              </div>
            )}

            {/* Station Success Panel */}
            {completed && (
              <div className="station-success-card">
                <div className="station-success-icon">🏆</div>
                <div className="station-success-title">Target Challenge Complete!</div>
                <p className="station-success-desc">
                  You've proven that measuring 3 specific parts (SSS or SAS) locks the exact shape and size of any timber stage flat!
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onComplete}
                  style={{ padding: '12px 32px', fontSize: '1.15rem', fontWeight: 900 }}
                >
                  Complete Station B ✓
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

