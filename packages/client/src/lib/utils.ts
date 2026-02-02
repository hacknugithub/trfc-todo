import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine class names with Tailwind CSS merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}