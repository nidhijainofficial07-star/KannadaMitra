export const dailyChallenges = [
  {
    id: 'bus-stop',
    setting: 'At a bus stop',
    prompt: 'Ask someone where the bus stop is.',
    options: ['ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', 'ಬಿಲ್ ಕೊಡಿ, ದಯವಿಟ್ಟು.', 'ನಿಮ್ಮ ಹೆಸರು ಏನು?'],
    answer: 0,
    transliteration: 'Bus nildaana ellide?',
    meaning: 'Where is the bus stop?',
  },
  {
    id: 'water',
    setting: 'At a restaurant',
    prompt: 'Politely say that you need water.',
    options: ['ನನಗೆ ನೀರು ಬೇಕು.', 'ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.', 'ಬೇರೆ ಬಣ್ಣ ಇದೆಯಾ?'],
    answer: 0,
    transliteration: 'Nanage neeru beku.',
    meaning: 'I need water.',
  },
  {
    id: 'shopping-price',
    setting: 'At a local market',
    prompt: 'Ask how much an item costs.',
    options: ['ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.', 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?', 'ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?'],
    answer: 1,
    transliteration: 'Idara bele eshtu?',
    meaning: 'How much does this cost?',
  },
  {
    id: 'introduction',
    setting: 'Meeting a classmate',
    prompt: 'Tell them you are learning Kannada.',
    options: ['ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ.', 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.', 'ತರಗತಿ ಎಲ್ಲಿ ನಡೆಯುತ್ತದೆ?'],
    answer: 0,
    transliteration: 'Naanu Kannada kaliyuttiddene.',
    meaning: 'I am learning Kannada.',
  },
]

export function getDailyChallenge() {
  const dayNumber = Math.floor(Date.now() / 86400000)
  return dailyChallenges[dayNumber % dailyChallenges.length]
}
