

export const MainDashboard = () => {
  return (
   
    <div className='pl-2 min-h-full w-full grid grid-cols-12'>
      <div className='col-span-9'>
         <div className='grid w-full grid-cols-8 gap-2'>
            <div className='col-span-2 bg-cyan-200 min-h-60 rounded-3xl p-3  uppercase'>
              out patient
              </div>
            <div className='col-span-2 bg-cyan-200 min-h-60 rounded-3xl  p-3 uppercase'>
              emergency/casualty
              </div>
            <div className='col-span-2 bg-cyan-200 min-h-60 rounded-3xl p-3  uppercase'>
              dialysis
              </div>
            <div className='col-span-2 bg-cyan-200 min-h-60 rounded-3xl p-3  uppercase'>
              investigation
              </div>
         </div>
          <div className='grid w-full grid-cols-8 gap-2 mt-2'>
            <div className='col-span-2 bg-cyan-200 min-h-60 rounded-3xl p-3  uppercase'>
              Operation Theatre
              </div>
            <div className='col-span-2 bg-cyan-200 min-h-60 rounded-3xl  p-3 uppercase'>
              Dietary & Nutrition
              </div>
            <div className='col-span-4 bg-cyan-200 min-h-60 rounded-3xl p-3  uppercase'>
              linen/laundry
              </div>
         </div>
         <div className='grid grid-cols-4 gap-2 mb-2 mt-2'>
             <div className='col-span-2 bg-green-200 min-h-110 rounded-3xl p-3  uppercase'>
              opd registration details
              </div>
             <div className='col-span-2 bg-green-200 min-h-110 rounded-3xl p-3  uppercase'>
              ipd registration details
              </div>
         </div>
         <div className='grid grid-cols-4 gap-2'>
             <div className='col-span-2 bg-green-200 min-h-50 rounded-3xl p-3  uppercase'>
              emergency registration details
              </div>
             <div className='col-span-2 bg-green-200 min-h-50 rounded-3xl p-3  uppercase'>
              daycare registration details
              </div>
         </div>
      </div>
      <div className='col-span-3 m-1'>
        <div className='bg-cyan-300 min-h-60 mx-1 mb-2 rounded-3xl p-3  uppercase'>
          in patient/daycare
          </div>
        <div className='bg-cyan-300 min-h-20 m-1 mb-2 rounded-3xl p-3  uppercase'>
          today enquiry
          </div>
        <div className='bg-cyan-300 min-h-20 m-1 mb-2 rounded-3xl p-3  uppercase'>
          nursery
          </div>
        <div className='bg-cyan-300 min-h-179 m-1 rounded-3xl p-3  uppercase'>
          Todays Doctors
          </div>
      </div>
        

        </div>
  )
}
