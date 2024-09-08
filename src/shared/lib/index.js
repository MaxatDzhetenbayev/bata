export const getRandomNumber = () => {
  return Math.floor(Math.random() * 15) + 1;
};

export const getAudioDuration = (audioNumber, lang) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(`/audio/${lang}/${audioNumber}.mp3`);

    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
    });

    audio.addEventListener("error", (event) => {
      reject(`Error loading audio file: ${event.message}`);
    });
  });
};

const bataTexts = {
  kz: {
    1: "...Тамам жұртқа бұзық болма, түзік бол деп жарлық шашып, жол салады екен",
    2: "Шәкірліктен ғибадаттың бәрі туады. Енді зинһар ғадаләт, шапағаттан босанбаңдар. Егер босансаң, иман да, адамдық та һаммасы босанады",
    3: "Өзің тірі болсаң да, көкірегің өлі болса, ақыл табуға сөз ұға алмайсың.",
    4: "Әуелі құдайға сыйынып, екінші өз қайратыңа сүйеніп, еңбегіңді сау, еңбек қылсаң, қара жер де береді, құр тастамайды.",
    5: "Құдайдан қорық, пендеден ұял, балаң бала болсын десең - оқыт, мал аяма!",
    6: "Кісіге біліміне қарай болыстық қыл татымсызға қылған болыстық өзі адамды бұзады.",
    7: "Қазаққа күзетші болайын деп, біз де ел болып, жұрт білгенді біліп, халық қатарына қосылудың қамын жейік деп ниеттеніп үйрену керек.",
    8: "Ғылымды, ақылды сақтайтұғын мінез деген сауыты болады. Сол мінез бұзылмасын!",
    9: "Есті кісілердің қатарында болғың келсе, күнінде бір мәртебе, болмаса жұмасында бір, ең болмаса айында бір, өзіңнен өзің есеп ал!",
    10: "Енді хақиқат сүйіп, шынды білмек құмарың бар болса, адамдыққа лайықты ықыласты құлағыңды қой.",
    11: "Егер ісім өнсін десең, ретін тап.",
    12: "Досы жоқпен сырлас Досы көппен сыйлас; Қайғысыздан сақ бол  Қайғылыға жақ бол.",
    13: "Біз жанымыздан ғылым шығара алмаймыз, жаралып, жасалып қойған нәрселерді сезбекпіз, көзбен көріп, ақылмен біліп.",
    14: "Әрбір хақиқатқа тырысып ижтиһатыңмен көзің жетсе, соны тұт, өлсең айрылма!",
    15: "Адамның адамшылығы істі бастағандығынан білінеді, қалайша бітіргендігінен емес.",
  },
  en: {
    1: "Allah exhorts everybody to be virtuous and live righteously.",
    2: "The desire to do good is born of the ability to be content with little. Do not lose your sense of justice and never tire of doing good. There can be neither faith nor humanity, loving kindness, without justice.",
    3: "If your body is alive but your soul is dead, words of reason will not reach you, and you will be incapable of earning your living by honest work.",
    4: "Put your faith in the Lord, and trust in your own powers and abilities. Even the hardest earth will yield good crops to honest and selfless toil.",
    5: "If you honor God and have any shame, if you want your son to be a real man, send him to school! Don't begrudge the expense!",
    6: "Render good to a wise man; a fool will only be spoilt by it. ",
    7: "We ought to educate ourselves, learn what other people know so as to become their equals and be a shield and a pillar for our people.",
    8: "human character is a vessel containing intelligence and knowledge. Develop your character therefore!",
    9: "If you wish to be counted among the intelligent, then ask yourself once a day, once a week, or at least once a month: 'How do I live?'",
    10: "If you are possessed by love of truth and a desire for learning, listen attentively and be diligent.",
    11: "If you want your labors to be successful, start the job in hand wisely.",
    12: "Be frank with those without friends; keep on good terms with those who have many. Beware of the careless man; be a shield to the destitute.",
    13: "Unable to invent science and learning, we can only behold and perceive the created world and understand its harmony by our reason.",
    14: "if you have succeeded in your pursuit of a truth, do not turn back from it even on pain of death.",
    15: "Judge a man's qualities by the intentions of his action and not by its outcome.",
  },
};

export const playRandomAudio = (lang, setIsActive, setAudioNumber) => {
  setIsActive(true);

  const randomAudioNumber = getRandomNumber();
  setAudioNumber(randomAudioNumber);

  window.localStorage.setItem("audioNumber", randomAudioNumber);
  window.localStorage.setItem("text", bataTexts[lang][randomAudioNumber]);
  getAudioDuration(randomAudioNumber, lang).then((duration) => {
    setTimeout(() => {
      setIsActive(false);
    }, duration * 1000);
  });
};
