export default function UnixTimestamp(date?: Date) {
  return date
    ? Math.floor(date.getTime() / 1000)
    : Math.floor(new Date().getTime() / 1000);
}
