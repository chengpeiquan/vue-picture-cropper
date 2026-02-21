import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...v: ClassValue[]) => twMerge(clsx(v))
