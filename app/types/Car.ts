export interface Car {
  id: number
  name: string
  color: string
}

export interface CarItemProps {
  car: Car
  removeCar: (id: number) => Promise<void>
  editCar: (car: Car) => Promise<void>
}
