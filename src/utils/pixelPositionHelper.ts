export default function pixelPositionHelper(position: number, size: number) {
  return Math.round(position / size) * size;
}
