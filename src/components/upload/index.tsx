import Header from 'components/common/layouts/header';
import Footer from 'components/common/layouts/footer';
import Compatability from 'components/common/parts/compatability';
import Uploader from './uploader';
import { useSearchParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

function Upload() {
  const [searchParams] = useSearchParams();
  useTranslation();

  let success = null;
  let error = null;

  // let error;
//   const err = searchParams.get('err');
//   const error = <Trans t(`errors.${err}`, { ns: ''})

//   <div className="p-upload__error">
//   {error}
// </div>
//               <div className="p-upload__error">
//               {error}
//             </div>

  return (
    <>
      <Header />
      <main className="l-upload">
        <div className="l-inner">
          <section className="p-upload">
              <div className="p-upload__about">
                <Compatability />
              </div>
              {success}
              {error}
              <Uploader />
            </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Upload;