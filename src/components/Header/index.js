import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <>
    <div className="header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
          alt="website logo"
          style={{width: '180px', marginLeft: '150px'}}
          className="website logo"
        />
      </Link>
    </div>
  </>
)

export default Header
