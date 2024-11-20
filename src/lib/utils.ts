import { clsx, type ClassValue } from "clsx";
import _slugify from "slugify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string) {
  return _slugify(str, { lower: true });
}
