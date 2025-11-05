import type { ReactNode } from "react";

export function getIcon<T extends Record<string, ReactNode>, K extends keyof T>(
  icons: T,
  type: K,
): T[K] | null {
  return icons[type] ?? null;
}
