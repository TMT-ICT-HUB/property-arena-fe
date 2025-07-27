import DashboardProductList from '@/components/dashboad/DashboardProductList'
import GraphCard from '@/components/dashboad/GraphCard'
import PropertyCard from '@/components/dashboad/PropertyCard'
import SubSection from '@/components/dashboad/SubSection'
import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className="main w-[80vw] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="">
        {/* Row 1 */}
        <div className="grid grid-rows-3 gap-4">
          <div className="bg-dark-blue p-4 rounded shadow flex flex-col gap-4">
            <div className="grid gap-4"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(8rem, 1fr))',
              }}
              >
              <PropertyCard
                icon="🏠"
                number={45}
                heading="Total Sales"
                text="Listed this month"
              />
              <PropertyCard
                icon="📈"
                number={23}
                heading="Total Order"
                text="This quarter"
              />
              <PropertyCard
                icon="💰"
                number={12}
                heading="Properties Sold"
                text="Awaiting confirmation"
              />
              <PropertyCard
                icon="💰"
                number={12}
                heading="New Customer"
                text="Awaiting confirmation"
              />
            </div>
          </div>

          {/* Row 2 */}
          <DashboardProductList/>

          {/* Row 3 */}
          <GraphCard />
        </div>


      </div>
      {/* <div className="sub w-[15rem]">
        <div className="bg-dark-blue rounded shadow p-4 h-48">Square Card 1</div>
        <div className="bg-dark-blue rounded shadow p-4 h-48">Square Card 2</div>
        <div className="bg-dark-blue rounded shadow p-4 h-48">Square Card 3</div>
      </div> */}
      <SubSection />
    </div>
  )
}

export default Dashboard
