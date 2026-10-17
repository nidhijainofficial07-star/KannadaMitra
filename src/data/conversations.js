
const retryStep = {
  speaker: 'KannadaMitra',
  kn: 'ಪರವಾಗಿಲ್ಲ! ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
  tr: 'Paravaagilla! Matte prayatnisi.',
  en: "No worries! Try again. Think about what the other person just asked.",
  choices: [
    {
      label: 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ',
      sub: 'Try again',
      next: 'retryTarget',
      correct: true,
    },
  ],
}


export const conversationScenarios = {
  food: {
    title: 'Ordering breakfast', setting: 'Neighbourhood café', goal: 'Order and customise a meal',
    steps: {
      start: { speaker: 'Café staff', kn: 'ನಮಸ್ಕಾರ! ನಿಮಗೆ ಏನು ಬೇಕು?', tr: 'Namaskaara! Nimage enu beku?', en: 'Hello! What would you like?', choices: [
        { label: 'ನನಗೆ ಒಂದು ದೋಸೆ ಬೇಕು.', sub: 'I would like one dosa.', next: 'followup', correct: true },
        { label: 'ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', sub: 'Where is the bus stop?', next: 'retry', correct: false },
      ] },
      followup: { speaker: 'Café staff', kn: 'ಖಾರ ಬೇಕಾ?', tr: 'Khaara bekaa?', en: 'Would you like it spicy?', choices: [
        { label: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಖಾರ ಮಾಡಿ.', sub: 'Make it a little less spicy.', next: 'finish', correct: true },
        { label: 'ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ.', sub: 'I did not understand.', next: 'clarify', correct: true },
      ] },
      clarify: { speaker: 'Café staff', kn: 'ಖಾರ ಕಡಿಮೆ ಮಾಡಲಾ?', tr: 'Khaara kadime maadalaa?', en: 'Shall I make it less spicy?', choices: [{ label: 'ಹೌದು, ದಯವಿಟ್ಟು.', sub: 'Yes, please.', next: 'finish', correct: true }] },
      finish: { speaker: 'Café staff', kn: 'ಆಯಿತು. ಇನ್ನೇನಾದರೂ ಬೇಕಾ?', tr: 'Aayitu. Innenadaru bekaa?', en: 'Done. Anything else?', choices: [{ label: 'ಬೇಡ, ಧನ್ಯವಾದಗಳು.', sub: 'No, thank you.', next: 'done', correct: true }] },
      retry: retryStep,
    },
  },
  transport: {
    title: 'Taking an auto', setting: 'Outside a metro station', goal: 'Reach your destination and confirm the fare',
    steps: {
      start: { speaker: 'Auto driver', kn: 'ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?', tr: 'Ellige hogabeku?', en: 'Where do you need to go?', choices: [
        { label: 'ಈ ವಿಳಾಸಕ್ಕೆ ಹೋಗಬೇಕು.', sub: 'I need to go to this address.', next: 'followup', correct: true },
        { label: 'ಮೆನು ಕೊಡುತ್ತೀರಾ?', sub: 'Could I have the menu?', next: 'retry', correct: false },
      ] },
      followup: { speaker: 'Auto driver', kn: 'ಮೂರು ನೂರು ರೂಪಾಯಿ ಆಗುತ್ತದೆ.', tr: 'Mooru nooru rupaayi aaguttade.', en: 'It will cost three hundred rupees.', choices: [
        { label: 'ಮೀಟರ್ ಹಾಕಿ, ದಯವಿಟ್ಟು.', sub: 'Please use the meter.', next: 'finish', correct: true },
        { label: 'ಸರಿ, ಹೋಗೋಣ.', sub: 'Okay, let us go.', next: 'finish', correct: true },
      ] },
      finish: { speaker: 'Auto driver', kn: 'ಇಲ್ಲಿ ನಿಲ್ಲಿಸಬೇಕಾ?', tr: 'Illi nillisabekaa?', en: 'Should I stop here?', choices: [{ label: 'ಹೌದು, ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.', sub: 'Yes, please stop here.', next: 'done', correct: true }] },
      retry: retryStep,
    },
  },
  shopping: {
    title: 'Buying at a market', setting: 'Local market stall', goal: 'Ask the price and buy politely',
    steps: {
      start: { speaker: 'Shopkeeper', kn: 'ಏನು ಬೇಕು?', tr: 'Enu beku?', en: 'What do you need?', choices: [
        { label: 'ಒಂದು ಕಿಲೋ ಟೊಮೇಟೊ ಬೇಕು.', sub: 'I need one kilogram of tomatoes.', next: 'followup', correct: true },
        { label: 'ರೈಲು ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?', sub: 'Where is the railway station?', next: 'retry', correct: false },
      ] },
      followup: { speaker: 'Shopkeeper', kn: 'ಒಂದು ಕಿಲೋ ಅರವತ್ತು ರೂಪಾಯಿ.', tr: 'Ondu kilo aravattu rupaayi.', en: 'One kilogram is sixty rupees.', choices: [
        { label: 'ಸ್ವಲ್ಪ ಕಡಿಮೆ ಮಾಡಿ.', sub: 'Please reduce it a little.', next: 'finish', correct: true },
        { label: 'ಸರಿ, ಒಂದು ಕಿಲೋ ಕೊಡಿ.', sub: 'Okay, give me one kilogram.', next: 'finish', correct: true },
      ] },
      finish: { speaker: 'Shopkeeper', kn: 'ಚೀಲ ಬೇಕಾ?', tr: 'Cheela bekaa?', en: 'Do you need a bag?', choices: [{ label: 'ಹೌದು, ದಯವಿಟ್ಟು.', sub: 'Yes, please.', next: 'done', correct: true }] },
      retry: retryStep,
    },
  },
  college: {
    title: 'Asking a classmate', setting: 'College corridor', goal: 'Find your class and connect with a classmate',
    steps: {
      start: { speaker: 'Classmate', kn: 'ನಮಸ್ಕಾರ, ನೀವು ಹೊಸಬರಾ?', tr: 'Namaskaara, neevu hosabaraa?', en: 'Hello, are you new?', choices: [
        { label: 'ಹೌದು, ನಾನು ಮೊದಲ ವರ್ಷದ ವಿದ್ಯಾರ್ಥಿ.', sub: 'Yes, I am a first-year student.', next: 'followup', correct: true },
        { label: 'ಬಿಲ್ ಕೊಡಿ.', sub: 'Give me the bill.', next: 'retry', correct: false },
      ] },
      followup: { speaker: 'Classmate', kn: 'ನಿಮ್ಮ ತರಗತಿ ಯಾವುದು?', tr: 'Nimma taragati yaavudu?', en: 'Which is your class?', choices: [
        { label: 'ಕಂಪ್ಯೂಟರ್ ಸೈನ್ಸ್ ತರಗತಿ ಎಲ್ಲಿ?', sub: 'Where is the Computer Science class?', next: 'finish', correct: true },
        { label: 'ನನಗೆ ಗೊತ್ತಿಲ್ಲ.', sub: 'I do not know.', next: 'finish', correct: true },
      ] },
      finish: { speaker: 'Classmate', kn: 'ನಾನು ದಾರಿ ತೋರಿಸುತ್ತೇನೆ.', tr: 'Naanu daari torisuttene.', en: 'I will show you the way.', choices: [{ label: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು.', sub: 'Thank you very much.', next: 'done', correct: true }] },
      retry: retryStep,
    },
  },
  everyday: {
    title: 'Meeting a neighbour', setting: 'Your apartment entrance', goal: 'Introduce yourself and make small talk',
    steps: {
      start: { speaker: 'Neighbour', kn: 'ನಮಸ್ಕಾರ, ನೀವು ಹೊಸದಾಗಿ ಬಂದಿದ್ದೀರಾ?', tr: 'Namaskaara, neevu hosadaagi bandiddeeraa?', en: 'Hello, have you moved in recently?', choices: [
        { label: 'ಹೌದು, ನಾನು ಪಕ್ಕದ ಮನೆಯಲ್ಲಿ ವಾಸಿಸುತ್ತೇನೆ.', sub: 'Yes, I live next door.', next: 'followup', correct: true },
        { label: 'ಒಂದು ಟಿಕೆಟ್ ಕೊಡಿ.', sub: 'Give me one ticket.', next: 'retry', correct: false },
      ] },
      followup: { speaker: 'Neighbour', kn: 'ನಿಮ್ಮ ಹೆಸರು ಏನು?', tr: 'Nimma hesaru enu?', en: 'What is your name?', choices: [
        { label: 'ನನ್ನ ಹೆಸರು ಕಿರಣ್.', sub: 'My name is Kiran.', next: 'finish', correct: true },
        { label: 'ನನಗೆ ಸ್ವಲ್ಪ ಕನ್ನಡ ಗೊತ್ತು.', sub: 'I know a little Kannada.', next: 'finish', correct: true },
      ] },
      finish: { speaker: 'Neighbour', kn: 'ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿ ಸಂತೋಷವಾಯಿತು.', tr: 'Nimmannu bhetiyaagi santoshavaayitu.', en: 'Nice to meet you.', choices: [{ label: 'ನನಗೂ ಸಂತೋಷವಾಯಿತು.', sub: 'Nice to meet you too.', next: 'done', correct: true }] },
      retry: retryStep,
    },
  },
  emergency: {
    title: 'Asking for urgent help', setting: 'A busy public place', goal: 'Explain that you are lost and get help',
    steps: {
      start: { speaker: 'Passer-by', kn: 'ಏನಾಯಿತು?', tr: 'Enaayitu?', en: 'What happened?', choices: [
        { label: 'ನಾನು ದಾರಿ ತಪ್ಪಿದ್ದೇನೆ.', sub: 'I am lost.', next: 'followup', correct: true },
        { label: 'ನನಗೆ ಒಂದು ದೋಸೆ ಬೇಕು.', sub: 'I would like one dosa.', next: 'retry', correct: false },
      ] },
      followup: { speaker: 'Passer-by', kn: 'ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗಬೇಕು?', tr: 'Neevu ellige hogabeku?', en: 'Where do you need to go?', choices: [
        { label: 'ನನಗೆ ಈ ವಿಳಾಸಕ್ಕೆ ಹೋಗಬೇಕು.', sub: 'I need to go to this address.', next: 'finish', correct: true },
        { label: 'ನನ್ನ ಕುಟುಂಬಕ್ಕೆ ಕರೆ ಮಾಡಬೇಕು.', sub: 'I need to call my family.', next: 'finish', correct: true },
      ] },
      finish: { speaker: 'Passer-by', kn: 'ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ.', tr: 'Naanu nimage sahaaya maaduttene.', en: 'I will help you.', choices: [{ label: 'ತುಂಬಾ ಧನ್ಯವಾದಗಳು.', sub: 'Thank you very much.', next: 'done', correct: true }] },
      retry: retryStep,
    },
  },
  home: {
    title: 'Receiving a delivery', setting: 'Phone call from the entrance', goal: 'Guide a delivery person to your door',
    steps: {
      start: { speaker: 'Delivery person', kn: 'ನಿಮ್ಮ ಮನೆ ಎಲ್ಲಿ?', tr: 'Nimma mane elli?', en: 'Where is your home?', choices: [
        { label: 'ಎರಡನೇ ಮಹಡಿ, ಫ್ಲಾಟ್ ಇಪ್ಪತ್ತು.', sub: 'Second floor, flat twenty.', next: 'followup', correct: true },
        { label: 'ಜ್ವರಕ್ಕೆ ಔಷಧ ಬೇಕು.', sub: 'I need fever medicine.', next: 'retry', correct: false },
      ] },
      followup: { speaker: 'Delivery person', kn: 'ನಾನು ಮೇಲಕ್ಕೆ ಬರಬೇಕಾ?', tr: 'Naanu melakke barabekaa?', en: 'Should I come upstairs?', choices: [
        { label: 'ಹೌದು, ಮೇಲಕ್ಕೆ ಬನ್ನಿ.', sub: 'Yes, please come upstairs.', next: 'finish', correct: true },
        { label: 'ನಾನು ಕೆಳಗೆ ಬರುತ್ತೇನೆ.', sub: 'I will come downstairs.', next: 'finish', correct: true },
      ] },
      finish: { speaker: 'Delivery person', kn: 'ಪಾರ್ಸೆಲ್ ಇಲ್ಲಿದೆ.', tr: 'Parcel illide.', en: 'Here is the parcel.', choices: [{ label: 'ಧನ್ಯವಾದಗಳು.', sub: 'Thank you.', next: 'done', correct: true }] },
      retry: retryStep,
    },
  },
  health: {
    title: 'At a pharmacy', setting: 'Neighbourhood pharmacy', goal: 'Explain a symptom and ask about medicine',
    steps: {
      start: { speaker: 'Pharmacist', kn: 'ನಿಮಗೆ ಏನು ಬೇಕು?', tr: 'Nimage enu beku?', en: 'What do you need?', choices: [
        { label: 'ತಲೆನೋವಿಗೆ ಮಾತ್ರೆ ಬೇಕು.', sub: 'I need a tablet for a headache.', next: 'followup', correct: true },
        { label: 'ಬೇರೆ ಬಣ್ಣ ಇದೆಯಾ?', sub: 'Is there another colour?', next: 'retry', correct: false },
      ] },
      followup: { speaker: 'Pharmacist', kn: 'ಜ್ವರ ಇದೆಯಾ?', tr: 'Jvara ideyaa?', en: 'Do you have a fever?', choices: [
        { label: 'ಇಲ್ಲ, ತಲೆನೋವು ಮಾತ್ರ.', sub: 'No, only a headache.', next: 'finish', correct: true },
        { label: 'ಹೌದು, ಸ್ವಲ್ಪ ಜ್ವರ ಇದೆ.', sub: 'Yes, I have a slight fever.', next: 'finish', correct: true },
      ] },
      finish: { speaker: 'Pharmacist', kn: 'ಊಟದ ನಂತರ ತೆಗೆದುಕೊಳ್ಳಿ.', tr: 'Ootada nantara tegedukolli.', en: 'Take it after food.', choices: [{ label: 'ಸರಿ, ಧನ್ಯವಾದಗಳು.', sub: 'Okay, thank you.', next: 'done', correct: true }] },
      retry: retryStep,
    },
  },
}
