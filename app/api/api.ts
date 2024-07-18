export const baseUrl = 'http://127.0.0.1:3000'

const garageUrl = `${baseUrl}/garage`
const engineUrl = `${baseUrl}/engide`

export let countAllCars = 0

export const getCars = async (page: number = 0, limit: number = 10) => {
  try {
    const response = await fetch(`${garageUrl}?_page=${page}&_limit=${limit}`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    countAllCars = Number(response.headers.get('X-Total-count'))

    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export const createCar = async (body: object) => {
  try {
    const response = await fetch(garageUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
  } catch (error) {
    console.error(error)
  }
}

export const updateCar = async (body: object, id: number) => {
  await fetch(`${garageUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const deleteCar = async (id: number) => {
  await fetch(`${garageUrl}/${id}`, {
    method: 'DELETE',
  })
}

export const startMotorAPI = async (id: number) =>
  (
    await fetch(`${engineUrl}?id=${id}&status=started`, { method: 'PATCH' })
  ).json()

export const stopMotorAPI = async (id: number) =>
  (
    await fetch(`${engineUrl}?id=${id}&status=stopped`, { method: 'PATCH' })
  ).json()

export const driveMotorAPI = async (id: number) => {
  const res = await fetch(`${engineUrl}?id=${id}&status=drive`, {
    method: 'PATCH',
  }).catch()
  return res.status !== 200 ? { success: false } : { ...(await res.json()) }
}
