import Footer from 'components/footer';
import Navbar from 'components/navbar';

function Subpage({children, mode}) {
    return(
        <>
        <Navbar />
        <div className='subpage-container'>
            <div className={`subpage-primary-card ${mode || ''}`}>
                {children}
            </div>
        </div>
        <div className={`footer-divider ${mode || ''}`} />
        <Footer />
        </>
    )
}
export default Subpage;