import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ActionSuccessResult<T> = {
  success: true
  data: T
  id: string
}

export type ActionErrorResult = {
  success: false
  message: string
  id: string
}

export type ActionResult<T> = ActionSuccessResult<T> | ActionErrorResult

export const success = <T,>(data: T): ActionSuccessResult<T> => {
  return { success: true, data, id: crypto.randomUUID() }
}

export const error = (message: string): ActionErrorResult => {
  return { success: false, message, id: crypto.randomUUID() }
}

// Brazilian short date "12 mai 26" — vibe editorial Madureira
const MONTHS_PT = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
]

export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (isNaN(d.getTime())) return iso
  const day = d.getUTCDate().toString().padStart(2, "0")
  const month = MONTHS_PT[d.getUTCMonth()]
  const year = d.getUTCFullYear().toString().slice(-2)
  return `${day} ${month} ${year}`
}
