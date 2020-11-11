import React, { useContext } from 'react'
import { StoreContext } from '../context/Context';
import './stamper.css'

const Stamper = () => {
  const { stamping } = useContext(StoreContext);
  return (<div className={`stamper ${stamping ? "active" : ""}`}>
    <div className="tip"></div>
  </div>)
}
export default Stamper