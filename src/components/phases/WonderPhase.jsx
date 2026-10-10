// src/components/phases/WonderPhase.jsx
import React, { useEffect } from 'react';
import './WonderPhase.css';
import Mascot from '../shared/Mascot.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { wonderNarration } from '../../utils/narration.js';

const PARTICLES = ['🎭', '📐', '△', '≅', '✨', '🎬', '🎟️', '💡', '🐦', '⭐'];

export default function WonderPhase({ state, dispatch }) {
  const { narrate, stopAll } = useAudio(state?.audioEnabled ?? true);

  useEffect(() => {
    const segs = wonderNarration();
    narrate(segs);
    return () => stopAll();
  }, [narrate, stopAll]);

  function handleInvestigate() {
    stopAll();
    dispatch({ type: 'COMPLETE_PHASE', payload: 'wonder' });
    dispatch({ type: 'SET_PHASE', payload: 'story' });
  }

  return (
    <div className="wonder-wrap">
      {/* Floating particles */}
      <div className="wonder-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="wonder-particle"
            style={{
              left: `${5 + (i * 9.5) % 90}%`,
              top: `${5 + (i * 7.5) % 80}%`,
              animationDelay: `${i * 0.6}s`,
              fontSize: `${1.1 + (i % 3) * 0.4}rem`,
            }}
          >
            {p}
          </span>
        ))}
      </div>

      <div className="wonder-content anim-slide-up">
        {/* Main hook card */}
        <div className="wonder-card glass-card">
          <div className="wonder-stadium-icon" aria-hidden="true">🎭</div>
          <h1 className="wonder-title headline">The Backstage Match Mystery!</h1>

          <div className="wonder-number-display">
            <span className="number-display wonder-num">Twin Stage Flats ➔ Measure Only 3 Parts ➔ Guaranteed Match?</span>
          </div>

          <div className="wonder-question-card">
            <p className="body-text wonder-q">
              Two stage flats look <strong className="wonder-em">identical from the audience</strong>.
            </p>
            <p className="body-text wonder-q">
              You can only afford to measure <strong className="wonder-em">three things</strong>. Which three measurements would <span className="wonder-highlight">guarantee that the two flats match exactly</span>?
            </p>
          </div>

          {/* Mascot */}
          <div className="wonder-mascot-row">
            <Mascot mood="curious" message="Let's investigate which three measurements prove two figures are congruent!" size="sm" />
          </div>

          <button className="btn btn-primary btn-lg wonder-cta" onClick={handleInvestigate}>
            Investigate Backstage 🔍
          </button>
        </div>
      </div>
    </div>
  );
}
