import React from 'react';
import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation("/About/ns");
  return (
    <div className="bg-black/[.2] p-4 md:px-6">
      <h2 className="text-xl font-normal text-white">{t("About")}</h2>
    </div>
  );
}

export default About;
