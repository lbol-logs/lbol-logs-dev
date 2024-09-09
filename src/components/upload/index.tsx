import Header from 'components/common/layouts/header';
import Footer from 'components/common/layouts/footer';
import Compatability from 'components/common/parts/compatability';
import Uploader from './uploader';
import { Link, useSearchParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Suspense, useContext } from 'react';
import Loading from 'components/common/layouts/loading';
import { CommonContext } from 'contexts/commonContext';
import useVersion from 'hooks/useVersion';

function Upload() {
  const { version } = useContext(CommonContext);
  const [searchParams] = useSearchParams();
  useVersion(version);
  useTranslation();

  let _success = null;
  let _error = null;

  const error = searchParams.get('error');
  if (error) {
    let props = {};
    const url = searchParams.get('url');
    if (url) {
      const components = { log: <Link to={decodeURIComponent(url)}>{}</Link> };
      props = { components };
    }
    const version = searchParams.get('version');
    if (version) {
      const values = { version };
      props = { values };
    }

    _error = (
      <div className="p-upload__error">
        <Trans
          i18nKey={`errors.${error}`}
          ns="site"
          {...props}
        />
      </div>
    );
  }
  else {
    const success = searchParams.get('success');
    if (success) {
      const components = { log: <Link to={decodeURIComponent(success)}>{}</Link> };

      _success = (
        <div className="p-upload__success">
          <Trans
            i18nKey="success"
            ns="site"
            components={components}
          />
        </div>
      );
    }
  }

  return (
    <>
      <Header />
      <main className="l-upload">
        <div className="l-inner">
          <section className="p-upload">
              <div className="p-upload__about">
                <Compatability />
              </div>
              {_success}
              {_error}
              <Suspense fallback={<Loading />}>
              <Uploader />
              </Suspense>
            </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Upload;