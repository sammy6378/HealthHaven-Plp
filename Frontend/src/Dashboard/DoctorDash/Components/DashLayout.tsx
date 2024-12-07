import React from 'react'
import Header from '../Components/Header';
import Appointments from '../Components/Appointments';
import FlowChart from '../Components/Flowchart';
import Share from '../Components/Share';


function DashLayout() {
  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
          <Header />
          <Appointments />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
          <FlowChart />
          <Share />
        </div>
    </>
  )
}

export default DashLayout
