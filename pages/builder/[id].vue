<template>
  <div class="builder-container">
    <div class="manual-wrapper" v-if="manual">
      <EditableText class="manual-title" data-placeholder="Manual title ..." v-model="manual.head.title" />
      <EditableText class="manual-description" data-placeholder="Description ..." v-model="manual.head.description"
        multiline />
      <div class="sections">
        <div class="section" v-for="section, index in manual.sections">
          <aside>
            <div class="counter">{{ index + 1 }}.</div>
            <div class="actions">
              <IconButton type="delete" fill-mode="bordered" @click="store.removeSection(index)">
                <img src="/assets/delete.png" alt="Delete image">
              </IconButton>
              <IconButton type="regular" fill-mode="bordered" @click="store.moveSection(index, -1)">
                <img :src="ArrowIcon" alt="Up arrow">
              </IconButton>
              <IconButton type="regular" fill-mode="bordered" @click="store.moveSection(index, 1)">
                <img :src="ArrowIcon" alt="Down arrow">
              </IconButton>
            </div>
          </aside>
          <div class="content">
            <EditableText class="section-title" data-placeholder="Section title ..."
              v-model="manual.sections[index].title" />
            <EditableText class="section-description" data-placeholder="Description ..."
              v-model="manual.sections[index].description" multiline />
            <Media class="media" v-model="manual.sections[index].media" :index="index" @remove="store.removeMedia"
              @upload="store.uploadMedia" />
          </div>
        </div>
        <PrimaryButton @click="store.addSection()">Add section</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from '~/assets/arrow.svg?url'

useHead({
  title: 'Builder'
})

definePageMeta({
  layout: 'builder',
  middleware: ['auth', 'builder']
})

const store = useBuilderStore()

const { manual } = storeToRefs(store)

// Watch the manual updates and call update function
watch(manual, async (value) => {
  await store.save()
}, { deep: true })

</script>

<style lang="scss" scoped>
.manual-wrapper {
  font-family: Calibri;
  max-width: 800px;

  margin: 0 auto;
  padding: 0 15px;
  padding-bottom: 20px;
}

.manual-title {
  font-size: 2em;
  padding: 5px;
}

.manual-description {
  font-size: 1.4em;
  padding: 5px;
  color: #363636;
}

.sections {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .section {
    display: flex;
    gap: 5px;

    background-color: $surface;

    padding: 15px;
    border-radius: 15px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    .content {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;

      .section-title {
        font-size: 1.2em;
        padding: 5px;
      }

      .section-description {
        font-size: 1em;
        padding: 5px;
        color: #363636;
      }

      .media {
        width: 100%;
      }
    }

    aside {
      display: flex;
      flex-direction: column;

      @media screen and (max-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
      }

      .counter {
        font-size: 1.2em;
        padding: 5px;
        text-align: end;
      }

      .actions {
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;

        @media screen and (max-width: 768px) {
          flex-direction: row;
          padding-top: 0px;
        }

        button {
          padding: 10px;

          img {
            width: 12px;
            height: 12px;
          }

          &:nth-child(2) {
            rotate: 180deg;
          }
        }
      }
    }
  }
}
</style>