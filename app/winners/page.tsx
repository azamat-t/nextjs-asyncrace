'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import CarItem from '../component/Home/CarItem'
import { Car, CarItemProps } from '../types/Car'
import { countAllWinners, getCarId, getWinners } from '../api/api'
import { getRandomColor, getRandomName } from '../utils/util'
import WinnersCarItem from '../component/Winners/WinnersCarItem'

export default function Home() {
  const [data, setData] = useState<Car[]>([])
  const [page, setPage] = useState(1)

  const fetchData = async () => {
    try {
      const data = await getWinners(page, 10)
      data.map(async (item) => {
        const newData = await getCarId(item.id)
        item.name = newData.name
        item.color = newData.color
      })
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  return (
    <main className='flex min-h-screen flex-col p-24'>
      <h5 className='text-2xl uppercase text-gray-700'>WINNERS</h5>
      <div className='flex items-center justify-between '>
        <h5 className='text-2xl uppercase text-gray-700 text-center'>#</h5>
        <h5 className='text-2xl uppercase text-gray-700 text-center'>CAR</h5>
        <h5 className='text-2xl uppercase text-gray-700 text-center'>NAME</h5>
        <h5 className='text-2xl uppercase text-gray-700 text-center'>WINS</h5>
        <h5 className='text-2xl uppercase text-gray-700 text-center'>TIME</h5>
      </div>
      <hr className='h-px my-8 bg-purple-700 border-0 dark:bg-gray-700' />
      {data.length > 0 &&
        data.map((car) => <WinnersCarItem key={car.id} car={car} />)}
      <hr className='h-px my-8 bg-purple-700 border-0 dark:bg-gray-700' />
      <div className='flex justify-between'>
        <h5 className='text-2xl uppercase text-gray-700 '>
          Cars ({countAllWinners})
        </h5>
        <div className='flex justify-center items-center'>
          <button
            type='button'
            onClick={() => {
              if (page > 1) setPage(page - 1)
            }}
            className=' text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
          >
            PREV {page > 1 && page - 1}
          </button>
          <h5 className='text-xl uppercase text-gray-700 mx-8'>#{page}</h5>
          <button
            type='button'
            onClick={() => {
              if (data.length > 9) setPage(page + 1)
            }}
            className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
          >
            NEXT {data.length > 9 && page + 1}
          </button>
        </div>
      </div>
    </main>
  )
}
