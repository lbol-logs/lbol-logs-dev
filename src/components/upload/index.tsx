import Header from 'components/common/layouts/header';
import Footer from 'components/common/layouts/footer';
import Compatability from 'components/common/parts/compatability';
import Uploader from './uploader';

function Upload() {
  return (
    <>
      <Header />
      <main className="l-upload">
        <div className="l-inner">
          <section className="p-upload">
              <div className="p-upload__about">
                <Compatability />
              </div>
              <Uploader />
            </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Upload;