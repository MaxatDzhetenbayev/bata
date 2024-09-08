import React, { useEffect, useState, useRef } from "react";
import style from "./Main.module.css";
import { motion } from "framer-motion";
import { playRandomAudio } from "../../shared/lib";

const buttonVariants = {
  view: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: -100 },
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

const Hands = ({ isActive, onHidden }) => {
  return (
    <section>
      <motion.img
        initial="hidden"
        animate={isActive ? "active" : "hidden"}
        variants={getHandsVariant("left")}
        transition={{ duration: 0.5, delay: isActive ? 0.5 : 0 }}
        src="/images/left-hand.png"
        alt=""
        onAnimationComplete={() => {
          if (!isActive) onHidden();
        }}
      />
      <motion.img
        initial="hidden"
        animate={isActive ? "active" : "hidden"}
        variants={getHandsVariant("right")}
        transition={{ duration: 0.5, delay: isActive ? 0.5 : 0 }}
        src="/images/right-hand.png"
        alt=""
        onAnimationComplete={() => {
          if (!isActive) onHidden();
        }}
      />
    </section>
  );
};

export const MainPage = () => {
  const [audioNumber, setAudioNumber] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [showHands, setShowHands] = useState(false);
  const [hideHands, setHideHands] = useState(false);
  const audioRef = useRef(null);
  const [lang, setLang] = useState("kz");

  useEffect(() => {
    if (audioRef.current) {
      setTimeout(() => {
        audioRef.current.load();
        audioRef.current.play();
      }, 1000);
    }
  }, [audioNumber]);

  const playApp = (lang) => {
    playRandomAudio(lang, setIsActive, setAudioNumber);
    setShowHands(true);
    setHideHands(false);
    setLang(lang);
  };

  useEffect(() => {
    window.localStorage.setItem("isActive", isActive);
    if (!isActive) {
      setHideHands(true);
    }
  }, [isActive]);

  return (
    <section className={style.content}>
      <video autoPlay muted loop className={style.backgroundVideo}>
        <source src="/video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <section className={style.wrapper}>
        <section className={style.button_group}>
          <motion.button
            className={style.btn}
            onClick={() => {
              playApp("kz");
            }}
            animate={isActive ? "hidden" : "view"}
            variants={buttonVariants}
            transition={{ duration: 0.5, delay: isActive ? 0 : 0.5 }}
            onAnimationComplete={() => {
              if (isActive) setShowHands(true);
            }}
          >
            Бата
          </motion.button>
          <motion.button
            className={style.btn}
            onClick={() => {
              playApp("en");
            }}
            animate={isActive ? "hidden" : "view"}
            variants={buttonVariants}
            transition={{ duration: 0.5, delay: isActive ? 0 : 0.5 }}
            onAnimationComplete={() => {
              if (isActive) setShowHands(true);
            }}
          >
            Bata
          </motion.button>
        </section>
        {/* Рендерить Hands только если showHands true и hideHands false */}
        {showHands && !hideHands && (
          <Hands
            isActive={isActive}
            onHidden={() => {
              setHideHands(true); // Полностью убрать Hands после анимации скрытия
            }}
          />
        )}
        <audio ref={audioRef}>
          <source src={`/audio/${lang}/${audioNumber}.mp3`} type="audio/mpeg" />
        </audio>
      </section>
    </section>
  );
};
