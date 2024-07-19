import { CarItemProps } from '@/app/types/Car'
import CarImg from '../CarImg'
import { startMotorAPI, stopMotorAPI } from '@/app/api/api'

const CarItem = ({ car, removeCar, editCar }: CarItemProps) => {
  const createSlideInLeftStyle = (duration) => ({
    animation: `slide-in-left ${duration}s ease-in-out 0.25s 1 forwards`,
  })

  const startCar = async (id: number) => {
    try {
      await startMotorAPI(id)
    } catch (error) {}
  }

  const stopCar = async (id: number) => {
    try {
      await stopMotorAPI(id)
    } catch (error) {}
  }

  return (
    <div
      key={car.id}
      className='flex items-center border-b-2 border-gray-500 mb-2'
    >
      <div className='flex flex-col'>
        <button
          type='button'
          onClick={() => editCar(car)}
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          SELECT
        </button>
        <button
          type='button'
          onClick={() => removeCar(car.id)}
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          REMOVE
        </button>
      </div>
      <div className='flex flex-col'>
        <button
          type='button'
          onClick={() => startCar(car.id)}
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          A
        </button>
        <button
          type='button'
          onClick={() => stopCar(car.id)}
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          B
        </button>
      </div>
      <div className='flex-1'>
        <div>
          <h5 className='text-xl uppercase text-gray-700'>
            {car.id} {car.name}
          </h5>
        </div>
        <div>
          <div
            className=' translate-x-9'
            style={createSlideInLeftStyle(Math.floor(Math.random() * 10))}
          >
            <CarImg color={car.color} />
          </div>
        </div>
      </div>
      <div className='w-24 h-24  border-l-8 border-gray-500 border-dotted'></div>
    </div>
  )
}

export default CarItem
