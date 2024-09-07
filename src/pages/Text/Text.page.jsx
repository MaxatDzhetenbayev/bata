import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import style from "./Text.module.css";

const textVariants = {
  view: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 100 },
};

export const TextPage = () => {
  const { t } = useTranslation();

  const [audioNumber, setAudioNumber] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const handleStorageChange = () => {
      const audioNumber = window.localStorage.getItem("audioNumber");
      const isActive = JSON.parse(window.localStorage.getItem("isActive"));
      const text = window.localStorage.getItem("text");

      setText(text);
      setAudioNumber(audioNumber);
      setIsActive(isActive);
    };

    window.addEventListener("storage", handleStorageChange);

    handleStorageChange();

    const handleLanguageChange = () => {
      handleStorageChange();
    };

    window.addEventListener("languageChanged", handleLanguageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("languageChanged", handleLanguageChange);
    };
  }, []);

  console.log(isActive);

  return (
    <section className={style.content}>
      <div className={style.wrapper}>
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate={isActive == true ? "view" : "hidden"}
          transition={{ duration: 0.2 }}
          className={style.text}
        >
          {text}
        </motion.h1>
      </div>
    </section>
  );
};
