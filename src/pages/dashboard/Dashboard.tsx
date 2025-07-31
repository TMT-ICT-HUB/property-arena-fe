import DashboardProductList from '@/components/dashboad/DashboardProductList'
import GraphCard from '@/components/dashboad/GraphCard'
import PropertyCard from '@/components/dashboad/PropertyCard'
import SubSection from '@/components/dashboad/SubSection'
import React from 'react'

const Dashboard: React.FC = () => {
  return (
    <div className="main grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 px-8">
        <div className="">
        {/* Row 1 */}
          <div className="flex flex-col gap-4">
          <div className="bg-dark-blue p-4 rounded-xl shadow flex flex-col gap-4">
            <div className="property-card-header text-white ">
              <h3 className='text-2xl font-bold'>Properties</h3>
              <p className='text-gray-500'>Sales summary</p>
            </div>
            <div className="grid gap-4 my-8 mx-2"
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
      <SubSection />
    </div>
  )
}

export default Dashboard
