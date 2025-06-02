<template>
  <div class="home-layout">
    <div class="background-wrapper">
      <InteractiveBackground />
    </div>
    <div class="page-wrapper">
      <Topbar page-title="Instruction builder">
        <div class="auth-buttons">
          <PrimaryButton @click="navigateTo('/auth/signup')">Sign up</PrimaryButton>
          <IconButton @click="navigateTo('/auth/login')" type="primary" fill-mode="bordered">
            <span>Log in</span>
          </IconButton>
        </div>
      </Topbar>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.home-layout {
  width: 100vw;
  height: 100vh;

  // display: flex;
  // flex-direction: column;
  position: relative;

  .background-wrapper {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    overflow: hidden;
  }

  .page-wrapper {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    pointer-events: none;
    display: flex;
    flex-direction: column;
  }
}

.auth-buttons {
  display: flex;
  gap: 10px;

  pointer-events: auto;

  @media screen and (max-width: 500px) {
    display: none;
  }
}
</style>