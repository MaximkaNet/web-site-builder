<template>
  <svg ref="svg" width="100%" height="100%" view-box="0 0 100 100" @click="handleClick($event, 'destroy')"
    @contextmenu.prevent="handleClick($event, 'create')">
    <circle :cx="item.x" :cy="item.y" :r="item.r" :fill="item.color" v-for="item in circles" />
  </svg>
</template>
<script setup lang="ts">
interface Circle {
  x: number;
  y: number;
  r: number;
  color: string;
  vx: number;
  vy: number;
  lifeTime: number;
}

type Action = 'destroy' | 'create';

const width = ref(0)
const height = ref(0)
const svg = ref<HTMLElement | null>(null)
const circles = ref<Circle[]>([])
const colors = ['#ff4c4c', '#4cff9a', '#4caaff', '#ffd24c', '#b84cff']

const CIRCLES_REQUIER_LARGE_SCREEN = 30
const CIRCLES_REQUIER_SMALL_SCREEN = 10

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createCircle(x = random(0, width.value), y = random(0, height.value), radius: number) {
  circles.value.push({
    x,
    y,
    vx: random(-1.5, 1.5),
    vy: random(-1.5, 1.5),
    r: radius,
    color: colors[Math.floor(Math.random() * colors.length)],
    lifeTime: random(500, 1200)
  });
}

function destroyCircle(x: number, y: number, radius: number) {
  for (let i = circles.value.length - 1; i >= 0; i--) {
    const c = circles.value[i];
    const dx = c.x - x;
    const dy = c.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      circles.value.splice(i, 1);
    }
  }
}

const handleClick = (event: Event, action: Action) => {
  const _event: MouseEvent = event as MouseEvent

  if (action == 'create') {
    createCircle(_event.clientX, _event.clientY, random(30, 70))
  } else if (action == 'destroy') {
    destroyCircle(_event.clientX, _event.clientY, 80)
  }
}


const update = () => {
  // Clear died circles
  circles.value = circles.value.filter(({ lifeTime }) => lifeTime > 0)

  const require_circles = width.value > 500 ? CIRCLES_REQUIER_LARGE_SCREEN : CIRCLES_REQUIER_SMALL_SCREEN

  // Create circle if
  if (circles.value.length < require_circles) {
    const radius = random(30, 70)

    const x = random(radius / 2, width.value - radius / 2)
    const y = random(radius / 2, height.value - radius / 2)

    createCircle(x, y, radius)
  }

  for (let i = 0; i < circles.value.length; i++) {
    const c1 = circles.value[i];

    // Movement
    c1.x += c1.vx;
    c1.y += c1.vy;

    // Life time
    c1.lifeTime -= 1

    // Borders
    if (c1.x - c1.r < 0 || c1.x + c1.r > width.value) c1.vx *= -1;
    if (c1.y - c1.r < 0 || c1.y + c1.r > height.value) c1.vy *= -1;

    // Overlaps
    for (let j = i + 1; j < circles.value.length; j++) {
      const c2 = circles.value[j];
      const dx = c1.x - c2.x;
      const dy = c1.y - c2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = c1.r + c2.r;
      if (dist < minDist) {
        const angle = Math.atan2(dy, dx);
        const overlap = 0.5 * (minDist - dist);
        c1.x += Math.cos(angle) * overlap;
        c1.y += Math.sin(angle) * overlap;
        c2.x -= Math.cos(angle) * overlap;
        c2.y -= Math.sin(angle) * overlap;

        // Просте відштовхування швидкостей
        const tempVx = c1.vx;
        const tempVy = c1.vy;
        c1.vx = c2.vx;
        c1.vy = c2.vy;
        c2.vx = tempVx;
        c2.vy = tempVy;
      }
    }
  }
}

function animate() {
  update();
  requestAnimationFrame(animate)
}

onMounted(() => {
  if (svg.value) {
    const rect = svg.value.getBoundingClientRect()

    width.value = rect.width
    height.value = rect.height

    animate()
  }
})
</script>