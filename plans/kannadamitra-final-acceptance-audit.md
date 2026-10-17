# KannadaMitra Final Acceptance Audit Plan

## Objective

Validate the current KannadaMitra implementation against every item in the supplied acceptance checklist, fix only defects uncovered by the audit, and produce a final evidence-based status report.

The app remains a frontend-only React/Vite application using `localStorage` and the browser Web Speech API. No backend, paid API, routing rewrite, design refresh, or content expansion is in scope.

## Confirmed Baseline

Repository inspection already confirms:

- 8 lesson categories with exactly 5 lessons each.
- 40 lessons and 320 phrase records, with 8 phrases per lesson.
- Every lesson phrase has Kannada script, transliteration, English meaning, context, and usage guidance.
- Beginner, Intermediate, and Advanced lesson levels are present.
- 8 branching conversation scenarios and a 5-question global quiz are present.
- No duplicate lesson/phrase IDs or incomplete phrase records were found.
- Welcome, onboarding, dashboard, lesson library/reader, conversations, quizzes, progress, profile, challenge, revision, favourites, phrase finder, and survival phrasebook are wired from `App.jsx`.
- Search, category filtering, difficulty filtering, pronunciation fallback, persistence, activity-based streaks, best-score preservation, and confirmed reset logic are implemented.
- Page-level JSX/CSS separation and responsive breakpoints are present.

This baseline is evidence for the audit, not a substitute for runtime verification.

## Audit and Implementation Steps

### 1. Validate content structure and completeness

Run a deterministic Node-based data audit over `src/data/lessons.js`, `src/data/conversations.js`, `src/data/quiz.js`, and `src/data/phrases.js`.

Verify:

- Exactly 8 categories, 40 lessons, and 320 lesson phrases.
- Each category contains 5 lessons.
- Every lesson has a valid category, difficulty level, title, Kannada title, description, and 8 phrases.
- Every phrase has non-empty Kannada, transliteration, English meaning, context, and usage guidance.
- IDs are unique and all quiz/revision references resolve.
- Conversation branches point to valid next steps and every scenario has at least one valid completion path.
- No placeholder markers such as TODO, lorem ipsum, “coming soon,” or empty content remain.

If a structural defect is found, correct the smallest relevant data record or reference without rewriting unrelated language content.

### 2. Exercise all core navigation and page states

Use the existing Figma Make preview and its already-running Vite server; do not start another development server.

Test from a clean `localStorage` state:

1. Welcome page renders and “Let’s Begin” opens onboarding.
2. Onboarding can be completed with a nickname, level, goal, and daily target.
3. Onboarding can be skipped and still reaches a usable dashboard.
4. Header navigation opens Home, Learn, Practise, Quiz, and Progress.
5. Profile, Challenge, Revision, Favourites, Help Me Say This, and Survival Kannada open through their visible entry points.
6. Empty states are intentional and actionable rather than blank pages.
7. Hash navigation and browser refresh preserve a valid, usable app state.

For every visible button encountered, verify that it either performs its labeled action or is intentionally disabled with a clear reason. Fix only reproducible broken handlers, invalid state transitions, or dead navigation.

### 3. Validate lesson-library and lesson-reader behavior

Verify:

- All 8 category cards expose their 5 lessons.
- Search matches lesson titles, Kannada text, transliteration, and English meanings.
- Category and difficulty filters work individually and together.
- Clearing filters restores all lessons.
- Opening a lesson displays Kannada, transliteration, English meaning, context, and tone/usage guidance.
- Previous, next, and phrase-dot navigation stay within bounds and select the correct phrase.
- Marking a lesson complete records completion and awards XP only on first completion.
- Re-practising a completed lesson logs daily learning without duplicating completion XP.
- Confidence choices persist and appear on the Progress page.
- Goal-based dashboard recommendations point to a real lesson.

### 4. Validate quizzes, conversations, revision, favourites, and audio

#### Quizzes

- Complete the global quiz with correct and incorrect answers.
- Confirm per-question feedback, final score, revision capture, result actions, and retry.
- Confirm a lower retry cannot overwrite a higher saved best score or remove XP.
- Complete a lesson quiz and verify equivalent score, feedback, retry, best-score, and difficult-phrase behavior.

#### Conversations

- Exercise at least one correct branch, one incorrect/recovery branch, and one alternate meaningful branch.
- Confirm all 8 scenarios can reach completion.
- Confirm first completion awards XP and replay does not duplicate XP.

#### Revision and favourites

- Add a difficult lesson phrase, verify it appears in Revision, and master/remove it.
- Miss a global quiz question, verify it enters Revision, then answer it correctly and confirm removal.
- Add and remove favourites from Survival Kannada and Help Me Say This.
- Confirm the Favourites page reflects persisted changes and has a useful empty state.

#### Pronunciation

- In a browser with speech synthesis, confirm the speaker action requests Kannada (`kn-IN`) pronunciation.
- In an unsupported environment, confirm the control is disabled and exposes the “audio unavailable” fallback label/title without throwing.

### 5. Validate progress, personalization, and persistence

Verify with controlled state transitions:

- XP changes only for eligible first-time or improved-score actions.
- Streak starts at zero before activity, becomes one after genuine learning activity, does not increment twice on the same day, increments on a consecutive day, and restarts after a missed day.
- Daily mission flags change only after the corresponding lesson, conversation, or quiz action.
- Visible achievements unlock only when their stated criteria are actually met.
- Progress statistics derive from stored completion, score, scenario, favourite, XP, and streak data rather than hard-coded success values.
- Profile nickname, proficiency, learning goal, and daily target can be edited and persist after refresh.
- Lesson confidence and dashboard recommendations reflect saved profile/progress data.
- Canceling Reset Progress keeps all data.
- Confirming Reset Progress clears local learning data and returns to the Welcome page.
- Refreshing after reset does not restore deleted progress.

If any visible statistic or achievement label does not match its underlying rule, align the display and persistence logic to one shared criterion.

### 6. Responsive and accessibility-focused visual pass

Review representative pages at:

- Mobile: approximately 375px wide.
- Tablet: approximately 768px wide.
- Desktop: approximately 1440px wide.

Cover Welcome, Dashboard, Learn library, lesson reader, Conversation, Quiz result, Progress, and Profile/reset dialog.

Check:

- No horizontal overflow, clipped content, overlapping controls, or unreadable text.
- Navigation remains reachable and usable at each size.
- Dialog actions fit and remain distinguishable on mobile.
- Disabled, selected, correct, incorrect, and focused states remain understandable.
- Interactive controls retain accessible labels where icon-only.
- Keyboard Escape closes the reset dialog, and cancel/backdrop interactions do not reset data.

Apply only localized responsive or accessibility fixes if a failure is observed; preserve the existing purple/lavender/cream visual system.

### 7. Technical verification

Run:

1. Targeted data-integrity scripts for counts, required fields, unique IDs, and conversation references.
2. Targeted storage-state checks for initialization, same-day activity, consecutive-day streaks, broken streaks, quiz best scores, and reset behavior.
3. `pnpm build` as the repository’s production verification command.
4. A source scan for broken imports, placeholder markers, and accidental `console.log`, `console.warn`, or `console.error` calls.
5. Preview console inspection only if a concrete runtime failure appears during the interaction pass.

Do not start a second dev server. Do not run broad formatting unless an edited file requires it.

## Kannada Language Review Boundary

The audit will verify that Kannada, transliteration, and English fields are complete, consistently wired, and free of obvious structural mismatches. It will not claim native-speaker or professional linguistic certification.

Final checklist reporting must mark “Kannada phrases and translations have been reviewed” as requiring native-speaker sign-off unless the user separately confirms that review has occurred. No bulk language rewrites should be made during this technical audit.

## Final Deliverable

Return the checklist with one of three statuses for every line:

- **Passed** — verified with concrete repository or runtime evidence.
- **Fixed and passed** — a defect was found, corrected, and reverified.
- **External sign-off required** — reserved for native-language review or another criterion that cannot be honestly certified in the available environment.

Also report:

- Files changed, if any.
- Commands/checks run and their results.
- Any remaining blocker with its impact.

## Completion Criteria

The audit is complete when:

- Every code-verifiable checklist item has direct evidence and no known failing behavior.
- Any discovered in-scope defect has been fixed and rechecked.
- The production build succeeds.
- No broken imports or observed console errors remain.
- Native Kannada review is explicitly reported as externally confirmed or still awaiting sign-off; it is never assumed.
