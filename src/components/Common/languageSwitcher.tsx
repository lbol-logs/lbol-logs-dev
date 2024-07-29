import globals from 'configs/globals';

function LanguageSwitcher() {
  return (
    <>
      {globals.en} / {globals.ja}
    </>
  );
};

export default LanguageSwitcher;