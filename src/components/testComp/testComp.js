import React from 'react';
import { useTranslation } from 'react-i18next';

function TestComp() {
  const { t, i18n } = useTranslation();

  const handleClick = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  }

  return (
    <div style={{marginTop: "100px"}}>
      <button onClick={handleClick}>Change language</button>
      <p>{t('greeting')}</p>
    </div>
  );
}

export default TestComp;
