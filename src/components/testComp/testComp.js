import React from 'react';

import { useTranslation } from 'react-i18next';
function TestComp() {
  const { t } = useTranslation();
  return ( 
 
     <h1>{t('weather.title')}</h1>
  );
}

export default TestComp;
