
export const survivalPhrases = [
  // Basics
  { id: 'hello', category: 'Basics', kn: 'ನಮಸ್ಕಾರ', tr: 'Namaskaara', en: 'Hello / Greetings' },
  { id: 'thanks', category: 'Basics', kn: 'ಧನ್ಯವಾದಗಳು', tr: 'Dhanyavaadagalu', en: 'Thank you' },
  { id: 'please', category: 'Basics', kn: 'ದಯವಿಟ್ಟು', tr: 'Dayavittu', en: 'Please' },
  { id: 'yes', category: 'Basics', kn: 'ಹೌದು', tr: 'Howdu', en: 'Yes' },
  { id: 'no', category: 'Basics', kn: 'ಇಲ್ಲ', tr: 'Illa', en: 'No' },
  { id: 'sorry', category: 'Basics', kn: 'ಕ್ಷಮಿಸಿ', tr: 'Kshamisi', en: 'Sorry / Excuse me' },
  { id: 'thank-you-very-much', category: 'Basics', kn: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು', tr: 'Tumbaa dhanyavaadagalu', en: 'Thank you very much' },

  // Communication
  { id: 'understand', category: 'Help', kn: 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.', tr: 'Nanage arthavaagalilla.', en: 'I did not understand.' },
  { id: 'slow', category: 'Help', kn: 'ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.', tr: 'Swalpa nidhaanavaagi maataadi.', en: 'Please speak a little slowly.' },
  { id: 'repeat', category: 'Help', kn: 'ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.', tr: 'Mattomme heli.', en: 'Please say it again.' },
  { id: 'english', category: 'Help', kn: 'ನಿಮಗೆ ಇಂಗ್ಲಿಷ್ ಗೊತ್ತಾ?', tr: 'Nimage English gottaa?', en: 'Do you know English?' },
  { id: 'learning-kannada', category: 'Help', kn: 'ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ.', tr: 'Naanu Kannada kaliyuttiddene.', en: 'I am learning Kannada.' },
  { id: 'write-it', category: 'Help', kn: 'ಇದನ್ನು ಬರೆದು ಕೊಡುತ್ತೀರಾ?', tr: 'Idannu baredu kodutteeraa?', en: 'Could you write this down?' },

  // Emergency
  { id: 'help', category: 'Emergency', kn: 'ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ!', tr: 'Dayavittu sahaaya maadi!', en: 'Please help!' },
  { id: 'hospital', category: 'Emergency', kn: 'ಆಸ್ಪತ್ರೆ ಎಲ್ಲಿದೆ?', tr: 'Aaspatre ellide?', en: 'Where is the hospital?' },
  { id: 'police', category: 'Emergency', kn: 'ಪೊಲೀಸರನ್ನು ಕರೆಯಿರಿ.', tr: 'Police-rannu kareyiri.', en: 'Please call the police.' },
  { id: 'ambulance', category: 'Emergency', kn: 'ಆಂಬುಲೆನ್ಸ್ ಕರೆಯಿರಿ.', tr: 'Ambulance kareyiri.', en: 'Please call an ambulance.' },
  { id: 'lost', category: 'Emergency', kn: 'ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ.', tr: 'Naanu daari tappiddene.', en: 'I am lost.' },
  { id: 'phone-lost', category: 'Emergency', kn: 'ನನ್ನ ಫೋನ್ ಕಳೆದುಹೋಗಿದೆ.', tr: 'Nanna phone kaleduhogide.', en: 'My phone is lost.' },

  // Food and essentials
  { id: 'water', category: 'Food', kn: 'ನನಗೆ ನೀರು ಬೇಕು.', tr: 'Nanage neeru beku.', en: 'I need water.' },
  { id: 'food', category: 'Food', kn: 'ನನಗೆ ಊಟ ಬೇಕು.', tr: 'Nanage oota beku.', en: 'I need food.' },
  { id: 'washroom', category: 'Places', kn: 'ಶೌಚಾಲಯ ಎಲ್ಲಿದೆ?', tr: 'Shouchaalaya ellide?', en: 'Where is the washroom?' },
  { id: 'price', category: 'Shopping', kn: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?', tr: 'Idara bele eshtu?', en: 'How much does this cost?' },
  { id: 'bill', category: 'Shopping', kn: 'ಬಿಲ್ ಕೊಡಿ, ದಯವಿಟ್ಟು.', tr: 'Bill kodi, dayavittu.', en: 'Please give me the bill.' },
  { id: 'upi', category: 'Shopping', kn: 'ಯುಪಿಐ ಮೂಲಕ ಕೊಡಬಹುದಾ?', tr: 'UPI moolaka kodabahudaa?', en: 'Can I pay using UPI?' },

  // Transport
  { id: 'bus-stop', category: 'Transport', kn: 'ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', tr: 'Bus nildaana ellide?', en: 'Where is the bus stop?' },
  { id: 'stop-here', category: 'Transport', kn: 'ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.', tr: 'Ille nillisi.', en: 'Please stop here.' },
  { id: 'how-long', category: 'Transport', kn: 'ಎಷ್ಟು ಸಮಯ ಆಗುತ್ತದೆ?', tr: 'Eshtu samaya aaguttade?', en: 'How long will it take?' },
  { id: 'fare', category: 'Transport', kn: 'ಬಾಡಿಗೆ ಎಷ್ಟು?', tr: 'Baadige eshtu?', en: 'How much is the fare?' },

  // College and everyday life
  { id: 'name', category: 'Everyday', kn: 'ನಿಮ್ಮ ಹೆಸರು ಏನು?', tr: 'Nimma hesaru enu?', en: 'What is your name?' },
  { id: 'how-are-you', category: 'Everyday', kn: 'ಹೇಗಿದ್ದೀರಾ?', tr: 'Hegiddeeraa?', en: 'How are you?' },
  { id: 'nice-to-meet', category: 'Everyday', kn: 'ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು.', tr: 'Nimmannu bhetiyaagi santoshavaayitu.', en: 'Nice to meet you.' },
  { id: 'college', category: 'College', kn: 'ಕಾಲೇಜು ಎಲ್ಲಿದೆ?', tr: 'College ellide?', en: 'Where is the college?' },
  { id: 'classroom', category: 'College', kn: 'ತರಗತಿ ಎಲ್ಲಿ ನಡೆಯುತ್ತದೆ?', tr: 'Taragati elli nadeyuttade?', en: 'Where is the class held?' },
]

export const cultureTips = [
  {
    title: 'A warm greeting',
    text: '“ನಮಸ್ಕಾರ” (Namaskaara) works at any time of day. A small nod or joined palms makes it especially warm.',
  },
  {
    title: 'Polite or casual?',
    text: 'Use “ನೀವು” (neevu) with elders, teachers, and strangers. “ನೀನು” (neenu) is casual and best kept for close friends or children.',
  },
  {
    title: 'Soften a request',
    text: 'Add “ದಯವಿಟ್ಟು” (dayavittu, please), or use polite verb endings such as “ಮಾಡಿ” (maadi), when asking a shopkeeper, driver, or server for help.',
  },
  {
    title: 'Local connection',
    text: 'Even a simple Kannada greeting is appreciated. People will often happily help when they know you are learning.',
  },
  {
    title: 'Listen for familiar words',
    text: 'Listen for words such as “ಹೌದು” (howdu, yes), “ಇಲ್ಲ” (illa, no), and “ಧನ್ಯವಾದಗಳು” (dhanyavaadagalu, thank you) in everyday conversations.',
  },
  {
    title: 'Use polite language first',
    text: 'When unsure which form to use, start with polite expressions. You can become more casual as you get to know someone.',
  },
]

export const helpSayPhrases = [
  // Directions
  { id: 'directions-straight', intent: 'Directions', kn: 'ನೇರವಾಗಿ ಹೋಗಿ.', tr: 'Neravaagi hogi.', en: 'Go straight.' },
  { id: 'directions-where', intent: 'Directions', kn: 'ಇದು ಎಲ್ಲಿದೆ?', tr: 'Idu ellide?', en: 'Where is this?' },
  { id: 'directions-near', intent: 'Directions', kn: 'ಇದು ಹತ್ತಿರ ಇದೆಯಾ?', tr: 'Idu hattira ideyaa?', en: 'Is it nearby?' },
  { id: 'directions-station', intent: 'Directions', kn: 'ರೈಲು ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', tr: 'Railu nildaana ellide?', en: 'Where is the railway station?' },
  { id: 'directions-way', intent: 'Directions', kn: 'ನನಗೆ ದಾರಿ ತೋರಿಸುತ್ತೀರಾ?', tr: 'Nanage daari torisutteeraa?', en: 'Could you show me the way?' },

  // Shopping
  { id: 'shopping-price', intent: 'Shopping', kn: 'ಇದರ ಬೆಲೆ ಎಷ್ಟು?', tr: 'Idara bele eshtu?', en: 'How much does this cost?' },
  { id: 'shopping-less', intent: 'Shopping', kn: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.', tr: 'Swalpa kadime maadi.', en: 'Please reduce the price a little.' },
  { id: 'shopping-colour', intent: 'Shopping', kn: 'ಬೇರೆ ಬಣ್ಣ ಇದೆಯಾ?', tr: 'Bere banna ideyaa?', en: 'Is there another colour?' },
  { id: 'shopping-size', intent: 'Shopping', kn: 'ದೊಡ್ಡ ಸೈಜ್ ಇದೆಯಾ?', tr: 'Dodda size ideyaa?', en: 'Is there a larger size?' },
  { id: 'shopping-bag', intent: 'Shopping', kn: 'ಚೀಲ ಕೊಡಿ, ದಯವಿಟ್ಟು.', tr: 'Cheela kodi, dayavittu.', en: 'Please give me a bag.' },

  // Transport
  { id: 'transport-stop', intent: 'Transport', kn: 'ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.', tr: 'Ille nillisi.', en: 'Please stop here.' },
  { id: 'transport-bus', intent: 'Transport', kn: 'ಈ ಬಸ್ ಮೆಜೆಸ್ಟಿಕ್‌ಗೆ ಹೋಗುತ್ತದೆಯಾ?', tr: 'Ee bus Majestic-ge hoguttadeyaa?', en: 'Does this bus go to Majestic?' },
  { id: 'transport-time', intent: 'Transport', kn: 'ಎಷ್ಟು ಸಮಯ ಆಗುತ್ತದೆ?', tr: 'Eshtu samaya aaguttade?', en: 'How long will it take?' },
  { id: 'transport-fare', intent: 'Transport', kn: 'ಬಾಡಿಗೆ ಎಷ್ಟು?', tr: 'Baadige eshtu?', en: 'How much is the fare?' },
  { id: 'transport-ticket', intent: 'Transport', kn: 'ಒಂದು ಟಿಕೆಟ್ ಕೊಡಿ.', tr: 'Ondu ticket kodi.', en: 'Please give me one ticket.' },

  // Greetings
  { id: 'greeting-well', intent: 'Greetings', kn: 'ಹೇಗಿದ್ದೀರಾ?', tr: 'Hegiddeeraa?', en: 'How are you?' },
  { id: 'greeting-name', intent: 'Greetings', kn: 'ನಿಮ್ಮ ಹೆಸರು ಏನು?', tr: 'Nimma hesaru enu?', en: 'What is your name?' },
  { id: 'greeting-meet', intent: 'Greetings', kn: 'ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು.', tr: 'Nimmannu bhetiyaagi santoshavaayitu.', en: 'Nice to meet you.' },
  { id: 'greeting-learning', intent: 'Greetings', kn: 'ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ.', tr: 'Naanu Kannada kaliyuttiddene.', en: 'I am learning Kannada.' },

  // Asking for help
  { id: 'help-lost', intent: 'Ask for help', kn: 'ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ.', tr: 'Naanu daari tappiddene.', en: 'I am lost.' },
  { id: 'help-understand', intent: 'Ask for help', kn: 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.', tr: 'Nanage arthavaagalilla.', en: 'I did not understand.' },
  { id: 'help-slow', intent: 'Ask for help', kn: 'ಸ್ವಲ್ಪ ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ.', tr: 'Swalpa nidhaanavaagi maataadi.', en: 'Please speak a little slowly.' },
  { id: 'help-repeat', intent: 'Ask for help', kn: 'ಮತ್ತೊಮ್ಮೆ ಹೇಳಿ.', tr: 'Mattomme heli.', en: 'Please say it again.' },
  { id: 'help-english', intent: 'Ask for help', kn: 'ನಿಮಗೆ ಇಂಗ್ಲಿಷ್ ಗೊತ್ತಾ?', tr: 'Nimage English gottaa?', en: 'Do you know English?' },
  { id: 'help-please', intent: 'Ask for help', kn: 'ದಯವಿಟ್ಟು ಸಹಾಯ ಮಾಡಿ!', tr: 'Dayavittu sahaaya maadi!', en: 'Please help!' },

  // Food
  { id: 'food-water', intent: 'Food', kn: 'ನನಗೆ ನೀರು ಬೇಕು.', tr: 'Nanage neeru beku.', en: 'I need water.' },
  { id: 'food-order', intent: 'Food', kn: 'ನನಗೆ ಒಂದು ದೋಸೆ ಬೇಕು.', tr: 'Nanage ondu dose beku.', en: 'I would like one dosa.' },
  { id: 'food-bill', intent: 'Food', kn: 'ಬಿಲ್ ಕೊಡಿ, ದಯವಿಟ್ಟು.', tr: 'Bill kodi, dayavittu.', en: 'Please give me the bill.' },

  // College and everyday life
  { id: 'college-class', intent: 'College', kn: 'ತರಗತಿ ಎಲ್ಲಿ ನಡೆಯುತ್ತದೆ?', tr: 'Taragati elli nadeyuttade?', en: 'Where is the class held?' },
  { id: 'college-notes', intent: 'College', kn: 'ನಿಮ್ಮ ನೋಟ್ಸ್ ಕೊಡುತ್ತೀರಾ?', tr: 'Nimma notes kodutteeraa?', en: 'Could you share your notes?' },
  { id: 'everyday-meet', intent: 'Everyday life', kn: 'ನಂತರ ಭೇಟಿಯಾಗೋಣ.', tr: 'Nantara bhetiyaagona.', en: 'Let us meet later.' },
]
