import SubscriptionCard from '@/components/subcription/SubscriptionCard'
import React from 'react'

const plans = [
  {
    name: 'Executive Plan',
    label: 'Most popular plan',
    price: '#15,000',
    note: '7x more leads',
    features: [
      ['Listing', '500'],
      ['Support', '24/7'],
      ['Auto push up', 'Every 10 days'],
      ['View client Request', '✓'],
      ['Manual push up', '70'],
      ['Premium', '60'],
    ] as [string, string][], 
  },
  {
    label: 'Managers plan',
    // name: 'Executive Plan',
    price: '#10,000',
    note: '7x more leads',
    features: [
      ['Listing', '500'],
      ['Support', '24/7'],
      ['Auto push up', 'Every 10 days'],
      ['View client Request', '✓'],
      ['Manual push up', '70'],
      ['Premium', '60'],
    ] as [string, string][], 
  },
  {
    label: 'Enterprise Gold',
    // name: 'Executive Plan',
    price: '#100,000',
    note: 'The deal breaker package',
    features: [
      ['Listing', '3000'],
      // ['Support', '24/7'],
      ['Auto push up', 'Every 3 days'],
      ['View client Request', '✓'],
      ['Manual push up', '3000'],
      ['Premium', '350'],
      ['Premium Gold', '40'],
      ['Area Specialist', '3'],
      ['Sponsored Listing', '5'],
      ['Homepage Logo', ''],
      // ['Banner Ads', '1'],
      ['Facebook Ads', '3 Properties'],
    ] as [string, string][], 
  },
  {
    label: 'Maximum Exposure',
    name: 'Executive Plan',
    price: '#150,000',
    note: 'Enjoy premium package',
    features: [
      ['Listing', '3000'],
      // ['Support', '24/7'],
      ['Auto push up', 'Every 3 days'],
      ['View client Request', '✓'],
      ['Manual push up', '3000'],
      ['Premium', '350'],
      ['Premium Gold', '40'],
      ['Area Specialist', '3'],
      ['Sponsored Listing', '5'],
      ['Homepage Logo', '1'],
      ['Banner Ads', '1'],
      ['Facebook Ads', '3 Properties'],
    ] as [string, string][], 
  },
  {
    label: 'Enterprise Business',
    // name: 'Executive Plan',
    price: '#60,000',
    note: '20x more leads',
    features: [
      ['Listing', '2000'],
      // ['Support', '24/7'],
      ['Auto push up', 'Every 3 days'],
      ['View client Request', '✓'],
      ['Manual push up', '200'],
      ['Premium', '200'],
      ['Premium Gold', '20'],
      ['Area Specialist', '2'],
      ['Sponsored Listing', '1'],
    ] as [string, string][],
  },
  {
    label: 'Starter Pack',
    // name: 'Executive Plan',
    price: '#60,000',
    note: 'Get started',
    features: [
      ['Listing', '100'],
      // ['Support', '24/7'],
      ['Auto push up', 'Every 15 days'],
      ['View client Request', '✓'],
      ['Manual push up', '25'],
      ['Premium', '10'],
    ] as [string, string][], 
  },
  {
    label: 'President Plan',
    // name: 'Executive Plan',
    price: '#60,000',
    note: '10x more clients',
    features: [
      ['Listing', '500'],
      ['Support', '24/7'],
      ['Auto push up', 'Every 10 days'],
      ['View client Request', '✓'],
      ['Manual push up', '90'],
      ['Premium', '6=60'],
      // ['Premium Gold', '10'],
      // ['Area Specialist', '1'],
    ] as [string, string][], 
  },
  {
    label: 'President Plan',
    // name: 'Most popular plan',
    price: '#60,000',
    note: '10x more clients',
    features: [
      ['Listing', '500'],
      ['Support', '24/7'],
      ['Auto push up', 'Every 10 days'],
      ['View client Request', '✓'],
      ['Manual push up', '70'],
      ['Premium', '60'],
      ['Premium Gold', '10'],
      ['Area Specialist', '1'],
    ] as [string, string][], 
  },
  // Add more plans...
]

const topCards = [
  {}
]

const Subscription = () => {
  return (
    <div className="p-18 space-y-12 bg-gray-100 min-h-screen">
      {/* Section 1 */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800 text-center">Get the maximum exposure for your properties</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="bg-white shadow rounded-b-lg space-y-4 flex flex-col items-center justify-between"
            >
              <h3 className='font-bold text-lg px-6 pt-6' >Get the Maximum Exposure and get instant paying clients</h3>
              <img
                src="/meter-placeholder.png"
                alt="Meter"
                className="w-20 h-6 object-contain"
              />
              <div className="text-center text-sm text-white bg-secondary-red rounded-b w-full py-1 font-semibold">
                Subscribe to Enterprise platinum plan
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="text-gray-700 font-medium text-secondary-red">Choose duration</label>
          <select
            className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-secondary-red"
            defaultValue=""
          >
            <option disabled value="">
              No of months
            </option>
            <option value="1">1 month</option>
            <option value="6">6 months</option>
            <option value="12">12 months</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
          {plans.map((plan, index) => (
            <SubscriptionCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Subscription
