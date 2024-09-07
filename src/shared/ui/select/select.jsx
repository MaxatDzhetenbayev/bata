import React from "react";
import style from "./Select.module.css";
import { langs } from "../../i18n";
export const Select = ({ value, handleChange }) => {
  return (
    <select className={style.select} value={value} onChange={handleChange}>
      {langs.map((lang) => (
        <option key={lang} className={style.option} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};
