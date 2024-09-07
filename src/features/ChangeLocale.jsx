import React from "react";
import { Select } from "../shared/ui/select/select";
import { useTranslation } from "react-i18next";

export const ChangeLocale = () => {
  const { i18n } = useTranslation();

  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
    console.log(i18n.language);
  };

  return <Select value={i18n.language} handleChange={handleChange} />;
};
