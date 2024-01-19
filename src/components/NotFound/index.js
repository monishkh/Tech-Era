import './index.css'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="nf-page">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt=" not found"
        className="not-found-img"
      />
      <h1 className="nf-heading">Page Not Found</h1>
      <p className="nf-p">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </>
)

export default NotFound
