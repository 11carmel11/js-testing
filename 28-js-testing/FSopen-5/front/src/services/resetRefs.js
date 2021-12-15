export default function resetRefs(...refs) {
  refs.forEach((ref) => {
    ref.current.value = "";
  });
}
