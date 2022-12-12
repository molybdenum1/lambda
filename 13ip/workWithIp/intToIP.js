function int2ip(ipInt) {
  return (
    (ipInt >>> 24) +
    "." +
    ((ipInt >> 16) & 255) +
    "." +
    ((ipInt >> 8) & 255) +
    "." +
    (ipInt & 255)
  );
}
export default int2ip;
