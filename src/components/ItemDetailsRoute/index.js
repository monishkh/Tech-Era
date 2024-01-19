import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiConstantStatus = {
  INITIAL: 'initial',
  LOADER: 'loader',
  SUCCESS: 'success',
  FAILURE: 'failure',
}

const ItemDetailsRoute = props => {
  const [fetchData, setFetchData] = useState()
  const [apiStatus, setApiStatus] = useState(apiConstantStatus.INITIAL)
  const [reTry, setRetry] = useState(false)
  console.log(fetchData)
  // get id of each item
  const {match} = props
  const {params} = match
  const {id} = params

  useEffect(() => {
    setApiStatus(apiConstantStatus.LOADER)
    const getData = async () => {
      const url = `https://apis.ccbp.in/te/courses/${id}`
      const response = await fetch(url)
      const data = await response.json()
      if (response.ok === true) {
        const updateData = {
          description: data.course_details.description,
          id: data.course_details.id,
          imageUrl: data.course_details.image_url,
          name: data.course_details.name,
        }
        setFetchData(updateData)
        setApiStatus(apiConstantStatus.SUCCESS)
      } else {
        setApiStatus(apiConstantStatus.FAILURE)
      }
    }

    getData()
  }, [id, reTry])

  const loaderView = () => (
    <>
      <div data-testid="loader" className="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </>
  )

  const successView = () => (
    <>
      <div className="item-card">
        <img
          src={fetchData && fetchData.imageUrl}
          alt={fetchData && fetchData.name}
          className="item-logo"
        />
        <div className="details">
          <h1 className="h">{fetchData && fetchData.name}</h1>
          <p className="p">{fetchData && fetchData.description}</p>
        </div>
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
        return successView()
      case apiConstantStatus.FAILURE:
        return failureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="item-page">{renderCondition()}</div>
    </>
  )
}

export default ItemDetailsRoute
