# KannadaMitra Final Hardening Plan

## Goal

Close the remaining checklist gaps without restructuring or redesigning the working application:

1. Add a confirmed **Reset learning progress** action.
2. Preserve the highest global quiz score when a later attempt scores lower.
3. Make streaks advance only after genuine learning activity, not merely opening the app.
4. Verify these changes without regressing onboarding, lessons, conversations, quizzes, revision, favourites, progress, or localStorage migration.

The existing purple/lavender/cream visual system, page structure, hash navigation, lazy loading, lesson library, and localStorage key remain unchanged.

## Confirmed Product Decisions

- Resetting progress keeps:
  - `started: true`
  - nickname
  - proficiency level
  - learning goal
  - daily target
- Resetting progress clears:
  - XP
  - streak and last activity date
  - completed lessons
  - confidence ratings
  - global and lesson quiz scores
  - quiz revision questions
  - difficult lesson phrases
  - favourites
  - completed conversation scenarios
  - daily mission state
  - completed daily challenges
  - achievements
- Reset is available only from the editing version of **Profile & Preferences**.
- Reset requires a custom confirmation dialog; it must never happen from a single accidental click.
- A new or reset learner starts with a `0`-day streak. The first qualifying learning activity starts day 1.
- A repeated lesson or conversation still counts as genuine daily practice for streak purposes, even when it does not award duplicate XP.
- Actions that count toward a streak:
  - completing or repeating a lesson
  - finishing a global quiz
  - finishing a lesson quiz
  - completing or repeating a conversation scenario
  - completing the daily real-life challenge
  - correctly mastering a quiz item or difficult phrase in Revision Zone
- Actions that do not count toward a streak:
  - opening the app
  - navigating between pages
  - editing profile preferences
  - changing a confidence rating
  - playing pronunciation audio
  - adding or removing favourites

## Current Baseline

Verified before implementation:

- Production build passes with 58 transformed modules and no warnings.
- All declared navigation targets exist in `validPages`.
- Lesson data contains exactly:
  - 8 categories
  - 40 lessons
  - 320 phrases
  - 5 lessons per category
  - 15 Beginner, 16 Intermediate, and 9 Advanced lessons
- Every lesson phrase has an ID, Kannada text, transliteration, English meaning, context, and usage guidance.
- No reset-progress action currently exists.
- `updateDailyStreak()` currently changes `lastActive` and streak during app initialization.
- The global quiz currently overwrites `quizScores.everyday.score` with the latest score, even if lower than the saved score.

## Implementation

### 1. Separate daily initialization from genuine streak activity

**Files:** `src/utils/storage.js`, `src/App.jsx`

Replace the current load-time streak behavior with two explicit operations:

#### `initializeDailyProgress(progress, now = new Date())`

- Generate a local-calendar date key in `YYYY-MM-DD` form.
- If `progress.daily.date` already matches today, return the progress unchanged.
- Otherwise replace only the daily mission object with:
  - today’s date
  - `learned: false`
  - `practised: false`
  - `quizzed: false`
  - `challenge: false`
- Do not modify `streak` or `lastActive`.
- Use this function when initializing React state in `App.jsx`.

#### `recordLearningActivity(progress, now = new Date())`

- Generate today’s local date key.
- If `lastActive` is today, return the progress without incrementing the streak.
- If `lastActive` is yesterday, increment the existing streak by one.
- Otherwise set the streak to one.
- Set `lastActive` to today.
- Ensure the daily mission object is initialized for today before returning.
- Accept an optional `now` argument so date-boundary behavior can be tested deterministically.

#### Initial-state change

- Change `initialProgress.streak` from `1` to `0`.
- Keep legacy saved streaks intact during `loadProgress()`.
- Existing users continue from their saved `streak` and `lastActive`; only future increments use genuine activity.

### 2. Record streak activity at the correct state transitions

**File:** `src/App.jsx`

For each qualifying action, first construct the updated progress object, then pass it through `recordLearningActivity()` before returning it from `setProgress`:

- `completeLesson`
- `completeConversation`
- `finishQuiz`
- `finishLessonQuiz`
- `completeChallenge`
- `masterRevision`
- `masterDifficultPhrase`

Preserve all current reward rules:

- A repeated lesson sets today’s `daily.learned` and records daily activity, but does not award another 25 XP.
- A repeated conversation sets today’s `daily.practised` and records daily activity, but does not award another 30 XP for the same scenario.
- A repeated challenge cannot award XP twice on the same day.
- Quiz XP continues to be based only on improvement over the saved best score.
- Revision mastery records activity but does not introduce a new XP reward.

Do not call `recordLearningActivity()` from onboarding, profile edits, confidence changes, favourites, navigation, or audio playback.

### 3. Preserve the global quiz best score

**Files:** `src/App.jsx`, optionally `src/utils/storage.js` if extracted as a pure helper

In `finishQuiz`:

- Read the previous saved score.
- Calculate XP from `Math.max(0, score - previousScore) * 10`, as today.
- Store `Math.max(previousScore, score)` as `quizScores.everyday.score`.
- Preserve the previous best-result date when the new score is lower.
- Save the new date when the learner ties or improves the best score only if the implementation intentionally treats the date as “last best attempt”; otherwise preserve the original best date. Use one rule consistently.
- Continue adding the current attempt’s incorrect question IDs to Revision Zone.
- Continue marking today’s quiz mission complete even when the score is lower.

For consistency, retain the existing lesson-quiz behavior that stores the maximum score.

### 4. Add a pure learning-progress reset helper

**File:** `src/utils/storage.js`

Add `resetLearningProgress(currentProgress, now = new Date())` that returns a new state object rather than mutating or directly writing localStorage.

The returned state must:

- Preserve `currentProgress.profile`.
- Preserve `started: true`.
- Restore all learning fields from `initialProgress`.
- Set streak to `0`.
- Set `lastActive` to `null`.
- Initialize `daily` with today’s date and all task flags false.
- Return fresh arrays/objects so later state updates cannot mutate `initialProgress`.

`App.jsx` will call this helper through a new `resetProgress` handler, clear `selectedLesson`, and navigate to `dashboard`. The existing `useEffect` persistence flow remains the single writer to localStorage.

### 5. Add the reset UI to Profile & Preferences

**Files:** `src/pages/Personalise.jsx`, `src/pages/Personalise.css`, `src/App.jsx`

When `Personalise` is rendered with `editing`:

- Add a visually separated **Learning data** or **Danger zone** section after the existing preference actions.
- Explain exactly what will be cleared and that profile preferences will remain.
- Add a secondary/destructive button labeled **Reset learning progress**.
- Do not show this section during first-time onboarding.
- Pass an `onResetProgress` callback from `App.jsx`.

The section should use the existing design language:

- cream/white card surface
- muted red/coral destructive treatment rather than a new visual system
- responsive stacking on mobile
- no reset control in the primary navigation

### 6. Add an accessible confirmation dialog

**Files:** `src/components/ConfirmDialog.jsx`, `src/components/ConfirmDialog.css`, `src/pages/Personalise.jsx`

Create a reusable confirmation component with:

- `open`
- `title`
- `description`
- `confirmLabel`
- `cancelLabel`
- `onConfirm`
- `onCancel`

Behavior:

- Render nothing when closed.
- Use `role="dialog"` and `aria-modal="true"`.
- Associate the title and description using `aria-labelledby` and `aria-describedby`.
- Focus the cancel button when opened so Enter does not immediately confirm a destructive action.
- Close on Escape.
- Close when the backdrop is clicked, but not when the dialog itself is clicked.
- Lock destructive execution behind the explicit **Reset progress** button.
- After confirming:
  - close the dialog
  - call `onResetProgress`
  - allow `App.jsx` to navigate to the clean dashboard
- Use existing `Icon` components and CSS tokens; do not add a UI dependency.
- Respect the existing reduced-motion rules.

### 7. Keep achievement persistence internally consistent

**File:** `src/utils/storage.js`

After reset, `achievements` must remain empty until new qualifying state is saved.

Confirm `saveProgress()` derives achievements only from post-reset state and does not merge stale achievements from a pre-reset object. The reset helper must supply `achievements: []`, and the next save must persist that empty list.

No new achievement types or XP rewards are added in this hardening pass.

## Edge Cases

- Confirming reset after opening a specific lesson must clear `selectedLesson`; returning to Learn must show the library rather than a stale lesson.
- Canceling the dialog must leave all state and localStorage unchanged.
- Refreshing while the dialog is open does not reset anything.
- Resetting with zero progress is safe and idempotent.
- Completing multiple qualifying activities on the same date increments the streak only once.
- Completing an activity on the next consecutive local-calendar day increments by exactly one.
- Returning after missing one or more local-calendar days starts a new one-day streak.
- Opening the app on a new day resets daily mission flags but does not change the streak.
- A lower global quiz retry:
  - does not lower the saved best score
  - does not award XP
  - still records current mistakes for revision
  - still marks the daily quiz task complete
  - still counts as daily streak activity
- localStorage parse failures continue to fall back safely to `initialProgress`.
- Existing v1 progress records without new fields continue to load through the current merge/migration logic.

## Verification

### Automated checks

1. Run `pnpm run build`.
2. Add or run a focused Node assertion script against exported pure storage helpers:
   - initial daily setup leaves streak unchanged
   - first activity produces streak 1
   - second same-day activity leaves streak at 1
   - consecutive-day activity increments the streak
   - activity after a gap resets the streak to 1
   - reset preserves profile and `started`
   - reset clears every learning array/object/counter
   - reset daily date is initialized and all flags are false
3. Validate global quiz best-score logic with:
   - no previous score
   - improved score
   - tied score
   - lower score
4. Re-run the existing lesson data integrity check:
   - 8 categories
   - 40 lessons
   - 320 phrases
   - no missing phrase fields

### Manual preview checks

1. **Reset cancellation**
   - Build some progress.
   - Open Profile & Preferences.
   - Open reset dialog.
   - Cancel with button, Escape, and backdrop.
   - Confirm nothing changes.
2. **Reset confirmation**
   - Confirm reset.
   - Verify dashboard shows 0 XP, 0-day streak, no lesson/scenario completion, no favourites, empty revision, and fresh daily mission.
   - Verify nickname, level, goal, and daily target remain.
   - Refresh and confirm the reset state persists.
3. **Quiz best score**
   - Save a high score.
   - Retry with a lower score.
   - Verify Progress still shows the high score and no duplicate XP is awarded.
4. **Streak**
   - Open/refresh without activity and confirm streak does not advance.
   - Complete a qualifying activity and confirm day 1.
   - Complete another activity the same day and confirm no second increment.
5. **Regression smoke test**
   - Welcome/onboarding for a fresh storage record
   - Dashboard mission and Phrase of the Day
   - Learn search/filter/open/next/previous/complete
   - Lesson quiz and retry
   - Branching conversation and replay
   - Favourites and Revision Zone
   - Profile edit and save
   - Mobile, tablet, and desktop dialog/profile layout
   - Browser console during reset, navigation, speech fallback, and refresh

## Acceptance Criteria

- Reset progress is discoverable under Profile & Preferences and cannot execute without explicit confirmation.
- Confirmed reset clears all learning data while preserving profile preferences and onboarding completion.
- Reset state persists after refresh.
- The saved global quiz best score never decreases.
- Streaks change only after one of the documented genuine learning actions.
- Same-day activities never increment the streak more than once.
- No duplicate XP paths are introduced.
- All existing routes and learning flows continue to build and function.
- Production build completes with no errors or warnings.

## Out of Scope

- Full account deletion or a second “erase all app data” action
- Backend synchronization or authentication
- Changes to the 40-lesson content library
- New achievements, XP values, or redesign of Progress
- Dark mode
- Automated browser-test infrastructure beyond focused state assertions and the documented manual preview pass
