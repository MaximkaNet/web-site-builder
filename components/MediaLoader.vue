<template>
  <div class="loader">
    <img src="/assets/image-upload.png" alt="">
    <span>Uploading ...</span>
  </div>
</template>
<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;

  img {
    transform: scale(1.5);
    animation: loader 1s infinite;
  }
}

@keyframes loader {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(.8);
  }

  100% {
    transform: scale(1);
  }
}
</style>