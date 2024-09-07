import React, { useEffect, useState, useRef } from "react";
import style from "./Main.module.css";
import { motion } from "framer-motion";
import { playRandomAudio } from "../../shared/lib";
import { useTranslation } from "react-i18next";
const buttonVariants = {
  view: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 100 },
};

const getHandsVariant = (hand) => {
  return {
    active: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    hidden: {
      opacity: 0,
      y: 100,
      x: hand === "left" ? -100 : 100,
    },
  };
};

export const MainPage = () => {
  const [audioNumber, setAudioNumber] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const audioRef = useRef(null);
  const { i18n } = useTranslation();

  const handleChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    if (audioRef.current) {
      setTimeout(() => {
        audioRef.current.load();
        audioRef.current.play();
      }, 1000);
    }
  }, [audioNumber]);

  const playApp = (lang) => {
    handleChange(lang);
    playRandomAudio(lang, setIsActive, setAudioNumber);
  };

  useEffect(() => {
    window.localStorage.setItem("isActive", isActive);
  }, [isActive]);

  return (
    <section className={style.content}>
      <section className={style.wrapper}>
        <section className={style.button_group}>
          <motion.button
            className={style.btn}
            onClick={() => playApp("kz")}
            animate={isActive ? "hidden" : "view"}
            variants={buttonVariants}
            transition={{ duration: 0.5, delay: isActive ? 0 : 0.5 }}
          >
            Бата
          </motion.button>
          {/* <motion.button
            className={style.btn}
            onClick={() => playApp("en")}
            animate={isActive ? "hidden" : "view"}
            variants={buttonVariants}
            transition={{ duration: 0.5, delay: isActive ? 0 : 0.5 }}
          >
            bata in English
          </motion.button> */}
        </section>
        <section>
          <motion.img
            initial="hidden"
            animate={isActive ? "active" : "hidden"}
            variants={getHandsVariant("left")}
            transition={{ duration: 0.5, delay: isActive ? 0.5 : 0 }}
            src="/images/left-hand.png"
            alt=""
          />
          <motion.img
            initial="hidden"
            animate={isActive ? "active" : "hidden"}
            variants={getHandsVariant("right")}
            transition={{ duration: 0.5, delay: isActive ? 0.5 : 0 }}
            src="/images/right-hand.png"
            alt=""
          />
        </section>
        {/* <AnimatePresence>
          {isActive && (
            <motion.button
              initial="hidden"
              animate="view"
              exit="hidden"
              variants={imageVariants}
              transition={{ duration: 0.5, delay: isActive ? 0.5 : 0 }}
              className={style.view_hands}
            >
              <motion.img key="image" src="/images/hands.png" />
            </motion.button>
          )}
        </AnimatePresence> */}
        <audio ref={audioRef}>
          <source src={`/audio/${audioNumber}.mpeg`} type="audio/mpeg" />
        </audio>
      </section>
    </section>
  );
};
