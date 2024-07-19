export const baseUrl = 'http://127.0.0.1:3000'

const garageUrl = `${baseUrl}/garage`
const engineUrl = `${baseUrl}/engine`
const winnersUrl = `${baseUrl}/winners`

export let countAllCars = 0
export let countAllWinners = 0

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

export const getCarId = async (id: number) => {
  try {
    const response = await fetch(`${garageUrl}/${id}`, {
      method: 'GET',
    })
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

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

export const getWinners = async (page: number = 0, limit = 10) => {
  try {
    const response = await fetch(
      `${winnersUrl}?_page=${page}&_limit=${limit}`,
      { method: 'GET' }
    )
    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    countAllWinners = Number(response.headers.get('X-Total-count'))

    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export const getWinnerAPI = async (id: number) =>
  (await fetch(`${winnersUrl}/${id}`, { method: 'GET' })).json()

export const createWinnerAPI = async (body: object) => {
  await fetch(winnersUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const deleteWinnerAPI = async (id: number) => {
  await fetch(`${winnersUrl}/${id}`, {
    method: 'DELETE',
  })
}

export const updateWinnerAPI = async (body: object, id: number) => {
  await fetch(`${winnersUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
