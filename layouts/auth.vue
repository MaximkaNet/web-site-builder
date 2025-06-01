<template>
  <div class="auth-layout">
    <Topbar page-title="Authorization" />
    <div class="form-wrapper">
      <div class="form-container">
        <slot />
      </div>
      <div class="manual-animation-container">
        <!-- <span>TODO</span> -->
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.auth-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .form-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .form-container {
      width: 100%;
      max-width: 300px;
    }
  }
}

@media screen and (max-width: 768px) {
  .manual-animation-container {
    display: none;
  }
}
</style>