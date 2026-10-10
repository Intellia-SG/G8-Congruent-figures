// src/utils/badgeEngine.js
// Badge definitions and unlock triggers for CongruenceQuest (PRD §10 & TRD §7)

export const BADGES = [
  { id: 'first_cue',           icon: '🎬', label: 'First Cue',                description: 'First correct answer in the backstage workshop!' },
  { id: 'smooth_scene_change', icon: '🎭', label: 'Smooth Scene Change',        description: '5-answer streak without missing a cue!' },
  { id: 'standing_ovation',    icon: '🔥', label: 'Standing Ovation Streak',    description: '10-answer streak! The audience is on their feet!' },
  { id: 'full_backstage_pass', icon: '🎟️', label: 'Full Backstage Pass',        description: 'Completed all 4 interactive simulation stations!' },
  { id: 'perfect_match',       icon: '⭐', label: 'Perfect Match',             description: 'Scored 3 stars in a Practice World!' },
  { id: 'encore_boss',         icon: '🏅', label: 'Encore!',                    description: 'Defeated a World Boss in battle!' },
  { id: 'seasoned_stagehand',  icon: '🧰', label: 'Seasoned Stagehand',         description: 'Answered over 20 questions in Practice!' },
  { id: 'lead_stage_manager',  icon: '🏆', label: 'Lead Stage Manager Badge',   description: 'Completed the full 5-phase CongruenceQuest journey!' },
];

export function checkBadges(state) {
  const unlocked = [];

  // First correct answer
  const totalCorrect = state.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  if (totalCorrect >= 1) unlocked.push('first_cue');

  // Streak checks
  if (state.maxStreak >= 5) unlocked.push('smooth_scene_change');
  if (state.maxStreak >= 10) unlocked.push('standing_ovation');

  // Simulation completion
  if (state.simStationsComplete && state.simStationsComplete.every(Boolean)) {
    unlocked.push('full_backstage_pass');
  }

  // 3-star district check (9 or 10 correct = 3 stars)
  if (state.districtScores && state.districtScores.some(score => score !== null && score >= 9)) {
    unlocked.push('perfect_match');
  }

  // Centurion / Seasoned stagehand (20+ questions)
  if (state.currentQuestion >= 20 || totalCorrect >= 20) {
    unlocked.push('seasoned_stagehand');
  }

  // Boss slayer
  if (state.bossDefeated) {
    unlocked.push('encore_boss');
  }

  // Full journey
  if (state.phaseComplete && Object.values(state.phaseComplete).every(Boolean)) {
    unlocked.push('lead_stage_manager');
  }

  return unlocked;
}
