import Cover from 'components/sections/cover';
import Navbar from '../components/navbar';
import Footer from 'components/footer';
import Middle from 'components/sections/middle';
import Bottom from 'components/sections/bottom';

function Index() {
  return (
    <>
    <Navbar />
    <Cover />
    <Middle />
    <Bottom />
    <Footer />
    </>
  );
}

export default Index;