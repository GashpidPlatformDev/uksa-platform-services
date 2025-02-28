import Footer from 'components/footer';
import Navbar from 'components/navbar';

const Regularcontent = ({children, mode=''}) => {
    return(
        <>
        <Navbar />
        <div className={'regular-container'}>
            <div className={`content ${mode || ''}`}>
                {children}
            </div>
        </div>
        <Footer />
        </>
    )
}
export default Regularcontent;