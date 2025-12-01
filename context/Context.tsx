import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Animal } from '../entities/Animal'

type AppContext = {
  animales: Animal[],
  addAnimal: (a: Animal) => void,
  addAnimales: (a: Animal[]) => void,
  delAnimal: (esp: String) => void,
}

const useAppContext = create<AppContext>()((set) => ({
  animales: [],
  addAnimal: (a) => set((state) => ({ animales: [...state.animales, a] })),
  addAnimales: (a) => set((state) => ({ animales: [...state.animales, ...a] })),
  delAnimal: (esp) => set((state) => ({ animales: state.animales.filter((item) => item.esp != esp) })),
}))



export default useAppContext;