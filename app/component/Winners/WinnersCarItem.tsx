import { CarItemProps } from '@/app/types/Car'
import CarImg from '../CarImg'

const WinnersCarItem = ({ car }: CarItemProps) => {
  return (
    <div
      key={car.id}
      className='flex items-center justify-between border-b-2 border-gray-500 mb-2'
    >
      <h5 className='text-2xl uppercase text-gray-700'>{car.id}</h5>
      <div>
        <CarImg color={car.color} />
      </div>
      <h5 className='text-2xl uppercase text-gray-700'>{car.name}</h5>
      <h5 className='text-2xl uppercase text-gray-700'>{car.wins}</h5>
      <h5 className='text-2xl uppercase text-gray-700'>{car.time}</h5>
    </div>
  )
}

export default WinnersCarItem
