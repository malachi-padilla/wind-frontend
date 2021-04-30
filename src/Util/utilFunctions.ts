export function getMinutesLastOnline(date: string): number {
  const now: any = new Date();
  const before: any = new Date(date);
  const milliseconds = now - before;
  return Math.floor(milliseconds / 1000 / 60);
}

export function hideEmail(email: string): string {
  const emailName: any = [];
  const splitEmail = email.split('@');
  emailName.push(splitEmail[0]);
  const hiddenChars: any = [];
  for (let i = 0; i < emailName.toString().length; i++) {
    hiddenChars.push('*');
  }
  const newEmail = hiddenChars.concat('@', splitEmail[1]);
  return newEmail;
}
export function isOnline(date) {
  if (getMinutesLastOnline(date) < 10) {
    return true;
  } else {
    false;
  }
}
