import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toTitleCase(str: string | null): string | null {
    if (str === null) {
        return null;
    }
    return str
        .toLowerCase()
        .split("")
        .map((char, index, arr) => {
            // Check if the current character is the first letter or follows a non-letter
            if (
                index === 0 || // First character
                /[^\p{L}]/u.test(arr[index - 1]) // Previous character is not a letter
            ) {
                return char.toUpperCase();
            }
            return char;
        })
        .join("");
}
