export const getRandomNumber = () => {
  return Math.floor(Math.random() * 15) + 1;
};

export const getAudioDuration = (audioNumber) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(`/audio/${audioNumber}.mpeg`);

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
    6: "Кісіге біліміне қарай болыстық қыл;\n татымсызға қылған болыстық өзі адамды бұзады.",
    7: "Қазаққа күзетші болайын деп, біз де ел болып, жұрт білгенді біліп, халық қатарына қосылудың қамын жейік деп ниеттеніп үйрену керек.",
    8: "Ғылымды, ақылды сақтайтұғын мінез деген сауыты болады. Сол мінез бұзылмасын!",
    9: "Есті кісілердің қатарында болғың келсе, күнінде бір мәртебе, болмаса жұмасында бір, ең болмаса айында бір, өзіңнен өзің есеп ал!",
    10: "Енді хақиқат сүйіп, шынды білмек құмарың бар болса, адамдыққа лайықты ықыласты құлағыңды қой.",
    11: "Егер ісім өнсін десең, ретін тап.",
    12: "Досы жоқпен сырласДосы \n көппен сыйлас;  \n Қайғысыздан сақ бол \n Қайғылыға жақ бол.",
    13: "Біз жанымыздан ғылым шығара алмаймыз, жаралып, жасалып қойған нәрселерді сезбекпіз, көзбен көріп, ақылмен біліп.",
    14: "Әрбір хақиқатқа тырысып ижтиһатыңмен көзің жетсе, соны тұт, өлсең айрылма!",
    15: "Адамның адамшылығы істі бастағандығынан білінеді, қалайша бітіргендігінен емес.",
  },
  en: {
    1: "...He commands all people not to be wicked, but to be just, and shows them the way.",
    2: "From apprenticeship comes all forms of piety. Therefore, never abandon justice and mercy. If you do, you will abandon both faith and humanity.",
    3: "Even if you are alive, but your soul is dead, you won't be able to grasp wisdom.",
    4: "First, rely on God, then trust in your own strength and work hard. If you work diligently, even the barren land will not leave you empty-handed.",
    5: "Fear God, be ashamed before people; if you want your child to become a person — educate them, spare no expense!",
    6: "Help people according to their knowledge; aiding the undeserving corrupts the person.",
    7: "To become a guardian for the Kazakhs, we too must become a nation, learn, and join the ranks of other peoples.",
    8: "Knowledge and wisdom are contained in a vessel called character. Do not let this character be destroyed!",
    9: "If you want to be among wise people, every day, or at least once a week, or at the very least once a month, take account of yourself!",
    10: "If you have a desire to love truth and strive for knowledge, direct your attention, worthy of humanity, towards the truth.",
    11: "If you want your work to progress, find a way.",
    12: "Share your thoughts with those who have no friends; respect those who have many; beware of those who know no sorrow; be close to those who suffer.",
    13: "We cannot create knowledge ourselves, but we can perceive and comprehend things that already exist, seeing them with our eyes and understanding them with our minds.",
    14: "If you have grasped the truth through perseverance and effort, hold on to it, do not let go even at the brink of death!",
    15: "A person's humanity is evident in how they start a task, not in how they finish it.",
  },
};

export const playRandomAudio = (lang, setIsActive, setAudioNumber) => {
  setIsActive(true);

  const randomAudioNumber = getRandomNumber();
  setAudioNumber(randomAudioNumber);

  window.localStorage.setItem("audioNumber", randomAudioNumber);
  window.localStorage.setItem("text", bataTexts[lang][randomAudioNumber]);

  getAudioDuration(randomAudioNumber).then((duration) => {
    setTimeout(() => {
      setIsActive(false);
    }, duration * 1000);
  });
};
