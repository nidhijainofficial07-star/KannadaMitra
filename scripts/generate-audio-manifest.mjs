
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { lessons } from '../src/data/lessons.js'
import {
  survivalPhrases,
  helpSayPhrases,
  cultureTips,
} from '../src/data/phrases.js'
import { dailyChallenges } from '../src/data/challenges.js'
import { conversationScenarios } from '../src/data/conversations.js'
import { quizQuestions } from '../src/data/quiz.js'
const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const projectDir = path.resolve(scriptDir, '..')
const manifestPath = path.join(scriptDir, 'kannada-audio-manifest.json')
const audioDir = path.join(projectDir, 'public', 'audio')

fs.mkdirSync(audioDir, { recursive: true })

// Collect only complete Kannada phrases that can be played directly.
const collectedTexts = new Set()

function addText(value) {
  if (typeof value !== 'string') return

  const text = value.trim()
  if (/[\u0C80-\u0CFF]/u.test(text)) {
    collectedTexts.add(text)
  }
}

function addLessonData() {
  for (const lesson of lessons) {
    addText(lesson.kannadaTitle)

    for (const phrase of lesson.phrases ?? []) {
      addText(phrase.kn)
    }
  }
}

function addPhraseData() {
  for (const phrase of [...survivalPhrases, ...helpSayPhrases]) {
    addText(phrase.kn)
  }

  // Culture tips may contain Kannada inside English explanations.
  for (const tip of cultureTips) {
    const matches = tip.text?.match(/[\u0C80-\u0CFF][\u0C80-\u0CFF\s।!?.,“”‘’()]*[\u0C80-\u0CFF]/gu) ?? []
    for (const match of matches) addText(match)
  }
}

function addChallengeData() {
  for (const challenge of dailyChallenges) {
    for (const option of challenge.options ?? []) {
      addText(option)
    }
  }
}

function addConversationData() {
  for (const scenario of Object.values(conversationScenarios)) {
    for (const step of Object.values(scenario.steps ?? {})) {
      addText(step.kn)

      for (const choice of step.choices ?? []) {
        addText(choice.label)
      }
    }
  }
}

function addQuizData() {
  for (const question of quizQuestions) {
    // Extract Kannada phrases embedded in English prompts and notes.
    for (const value of [question.prompt, question.note]) {
      const matches = value?.match(/[\u0C80-\u0CFF][\u0C80-\u0CFF\s।!?.,“”‘’()]*[\u0C80-\u0CFF]/gu) ?? []
      for (const match of matches) addText(match)
    }

    for (const option of question.options ?? []) {
      addText(option)
    }
  }
}

addLessonData()
addPhraseData()
addChallengeData()
addConversationData()
addQuizData()

// Preserve every existing text-to-file mapping so working audio is not renamed.
let previousManifest = []

if (fs.existsSync(manifestPath)) {
  try {
    previousManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  } catch {
    console.warn('Could not read the previous manifest; creating a new one.')
  }
}

const manifest = [...previousManifest]
const knownTexts = new Set(manifest.map((item) => item.text))
const usedFiles = new Set(manifest.map((item) => item.file))

let nextNumber = 1

for (const text of collectedTexts) {
  if (knownTexts.has(text)) continue

  let file

  if (text === 'ನಮಸ್ಕಾರ') {
    file = 'namaskara.mp3'
  } else if (text === 'ಧನ್ಯವಾದಗಳು') {
    file = 'thanks.mp3'
  } else {
    while (usedFiles.has(`kn-${String(nextNumber).padStart(3, '0')}.mp3`)) {
      nextNumber++
    }

    file = `kn-${String(nextNumber).padStart(3, '0')}.mp3`
    nextNumber++
  }

  manifest.push({ text, file })
  knownTexts.add(text)
  usedFiles.add(file)
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')

const audioMap = Object.fromEntries(
  manifest.map(({ text, file }) => [text, `/audio/${file}`]),
)

fs.writeFileSync(
  path.join(projectDir, 'src', 'data', 'audioManifest.js'),
  `// Generated automatically by scripts/generate-audio-manifest.mjs\nexport const audioFilesByText = ${JSON.stringify(audioMap, null, 2)}\n`,
  'utf8',
)

console.log(`Found ${collectedTexts.size} unique Kannada text entries.`)
console.log(`Manifest now contains ${manifest.length} entries.`)
console.log('Existing audio filenames have been preserved.')
console.log('Created/updated:')
console.log('  scripts/kannada-audio-manifest.json')
console.log('  src/data/audioManifest.js')
