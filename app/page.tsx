'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import CarImg from './component/CarImg'
import CarItem from './component/Home/CarItem'
import { Car, CarItemProps } from './types/Car'
import {
  countAllCars,
  createCar,
  deleteCar,
  getCars,
  updateCar,
} from './api/api'
import { getRandomColor, getRandomName } from './utils/util'

export default function Home() {
  const [data, setData] = useState<Car[]>([])
  const [page, setPage] = useState(1)
  const [newName, setNewName] = useState('')
  const [newColor, setNewColor] = useState('#000000')
  const [editId, setEditId] = useState<null | number>(null)
  const [editName, setEditName] = useState('')
  const [editColor, setEditColor] = useState('#000000')

  const fetchData = async () => {
    try {
      const data = await getCars(page, 10)
      setData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const generateCars = async () => {
    try {
      for (let i = 0; i < 100; i++) {
        const name = getRandomName()
        const color = getRandomColor()

        await createCar({ name, color })
      }
      await fetchData()
    } catch (error) {}
  }

  const createNewCar = async (name: string, color: string) => {
    try {
      if (newName !== '' && newColor !== '') {
        await createCar({ name, color })
        await fetchData()
        setNewName('')
        setNewColor('#000000')
      }
    } catch (error) {}
  }

  const editCar = async () => {
    try {
      if (editName !== '' && editColor !== '' && !!editId) {
        await updateCar({ name: editName, color: editColor }, editId)
        await fetchData()
        setEditName('')
        setEditColor('#000000')
        setEditId(null)
      }
    } catch (error) {}
  }

  const removeCar = async (id: number) => {
    try {
      await deleteCar(id)
      await fetchData()
    } catch (error) {}
  }

  return (
    <main className='flex min-h-screen flex-col p-24'>
      <div className='w-full flex justify-between mb-5'>
        <button
          type='button'
          className='flex text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          RACE
          <Image
            src='/play.svg'
            alt='Vercel Logo'
            className='dark:invert ml-2'
            width={20}
            height={20}
            priority
          />
        </button>
        <button
          type='button'
          className='flex text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          RESET
          <Image
            src='/undo.svg'
            alt='Vercel Logo'
            className='dark:invert ml-2'
            width={20}
            height={20}
            priority
          />
        </button>
        <div className='flex items-center'>
          <input
            type='text'
            id='small-input'
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />

          <input
            type='color'
            required
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className='w-14'
          />
          <button
            type='button'
            onClick={() => createNewCar(newName, newColor)}
            className=' text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
          >
            CREATE
          </button>
        </div>
        <div className='flex items-center'>
          <input
            type='text'
            id='small-input'
            required
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />

          <input
            type='color'
            required
            value={editColor}
            onChange={(e) => setEditColor(e.target.value)}
            className='w-14'
          />
          <button
            type='button'
            onClick={() => editCar()}
            className=' text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
          >
            UPDATE
          </button>
        </div>

        <button
          type='button'
          onClick={generateCars}
          className='text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900'
        >
          GENERATE CARS
        </button>
      </div>
      <hr className='h-px my-8 bg-purple-700 border-0 dark:bg-gray-700' />
      {data.length > 0 &&
        data.map((car) => (
          <CarItem
            key={car.id}
            car={car}
            removeCar={(id: number) => removeCar(id)}
            editCar={(car: Car) => {
              setEditId(car.id)
              setEditName(car.name)
              setEditColor(car.color)
            }}
          />
        ))}
      <hr className='h-px my-8 bg-purple-700 border-0 dark:bg-gray-700' />
      <div className='flex justify-between'>
        <h5 className='text-2xl uppercase text-gray-700 '>
          Cars ({countAllCars})
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
