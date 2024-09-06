import i18next from 'i18next';
import { useTranslation, Trans } from 'react-i18next';
import Header from 'components/common/layouts/header';
import Footer from 'components/common/layouts/footer';
import Compatability from 'components/common/parts/compatability';

function Upload() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <main className="l-upload">
        <div className="l-inner">
          <section className="p-upload">
              <div className="p-upload__about">
                <Compatability />
              </div>
            </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Upload;