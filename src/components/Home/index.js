import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const apiConstantStatus = {
  INITIAL: 'initial',
  LOADER: 'loader',
  SUCCESS: 'success',
  FAILURE: 'failure',
}

const Home = () => {
  const [fetchData, setFetchData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiConstantStatus.INITIAL)
  const [reTry, setRetry] = useState(false)
  console.log(fetchData)

  useEffect(() => {
    setApiStatus(apiConstantStatus.LOADER)
    const getData = async () => {
      const url = 'https://apis.ccbp.in/te/courses'
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok === true) {
        const updateData = data.courses.map(e => ({
          id: e.id,
          logoUrl: e.logo_url,
          name: e.name,
        }))
        setFetchData(updateData)
        setApiStatus(apiConstantStatus.SUCCESS)
      } else {
        setApiStatus(apiConstantStatus.FAILURE)
      }
    }

    getData()
  }, [reTry])

  const renderListOfCoursesView = () => (
    <>
      <div className="l-container">
        <h1 className="main-heading">Courses</h1>
        <ul>
          {fetchData &&
            fetchData.map(eachItem => (
              <li key={eachItem.id}>
                <Link
                  to={`/courses/${eachItem.id}`}
                  style={{textDecoration: 'none'}}
                >
                  <div className="courses-card">
                    <img
                      src={eachItem.logoUrl}
                      alt={eachItem.name}
                      className="logo"
                    />
                    <p className="name">{eachItem.name}</p>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  )

  const loaderView = () => (
    <>
      <div data-testid="loader" className="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </>
  )

  const failureView = () => (
    <>
      <div className="f-page">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="f-img"
        />
        <h1 className="f-heading">Oops! Something Went Wrong</h1>
        <p className="f-p">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="f-btn"
          onClick={() => setRetry(prev => !prev)}
        >
          Retry
        </button>
      </div>
    </>
  )

  const renderCondition = () => {
    switch (apiStatus) {
      case apiConstantStatus.LOADER:
        return loaderView()
      case apiConstantStatus.SUCCESS:
        return renderListOfCoursesView()
      case apiConstantStatus.FAILURE:
        return failureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="h-page">{renderCondition()}</div>
    </>
  )
}

export default Home
