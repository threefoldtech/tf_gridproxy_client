export function capitalize(value: string) {
  return value[0].toLocaleUpperCase() + value.slice(1)
}

export function min(value: number, min: number): boolean {
  return value >= min
}
