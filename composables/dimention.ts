export const useDimention = () => {
  const dimention = ref({ width: 0, height: 0 });

  const updateSize = () => {
    dimention.value = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  onMounted(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateSize);
  });

  return dimention;
};
