import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
/* Userd to merge tailwind css and 
  use condition is user friendly manner */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
