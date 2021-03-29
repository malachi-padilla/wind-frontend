export function getMinutesLastOnline(date: string): number {
  const now: any = new Date();
  const before: any = new Date(date);
  const milliseconds = now - before;
  return Math.floor(milliseconds / 1000 / 60);
}
