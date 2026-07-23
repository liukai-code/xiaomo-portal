<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Star } from 'lucide-vue-next'

const REPO_URL = 'https://github.com/liukai-code/xiaomo-investment-agent'
const API_URL = 'https://api.github.com/repos/liukai-code/xiaomo-investment-agent'

const stars = ref<number | null>(null)
const isHovered = ref(false)

onMounted(async () => {
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    stars.value = data.stargazers_count
  } catch (error) {
    console.error('Error fetching GitHub stars:', error)
  }
})
</script>

<template>
  <a
    :href="REPO_URL"
    target="_blank"
    rel="noopener noreferrer"
    class="github-stars-btn"
    :class="{ hovered: isHovered }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Gradient background -->
    <div class="github-stars-gradient" />

    <!-- Star icon -->
    <div class="github-stars-icon">
      <Star
        :size="16"
        :fill="isHovered ? 'currentColor' : 'none'"
      />
    </div>

    <!-- Text -->
    <span class="github-stars-text">Star on GitHub</span>

    <!-- Separator + Count -->
    <template v-if="stars !== null">
      <span class="github-stars-separator" />
      <span class="github-stars-count">{{ stars?.toLocaleString() }}</span>
    </template>
  </a>
</template>

<style scoped>
.github-stars-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px;
  border-radius: 9999px;
  background: rgba(249, 249, 247, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.github-stars-btn:hover {
  border-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
}

.github-stars-btn:active {
  transform: scale(0.98);
}

.github-stars-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(139, 92, 246, 0.08), rgba(236, 72, 153, 0.08), rgba(6, 182, 212, 0.08));
  background-size: 400% 100%;
  animation: gradient-x 15s ease infinite;
  transition: opacity 0.5s;
}

.github-stars-btn:hover .github-stars-gradient {
  background: linear-gradient(90deg, rgba(139, 92, 246, 0.15), rgba(236, 72, 153, 0.15), rgba(6, 182, 212, 0.15));
  background-size: 400% 100%;
}

.github-stars-icon {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  color: rgba(234, 179, 8, 0.7);
  transition: all 0.3s;
}

.github-stars-btn:hover .github-stars-icon {
  color: rgba(234, 179, 8, 1);
  transform: rotate(180deg);
}

.github-stars-text {
  position: relative;
  z-index: 1;
  font-size: 13px;
  font-weight: 500;
  color: var(--portal-text);
}

.github-stars-separator {
  position: relative;
  z-index: 1;
  width: 1px;
  height: 12px;
  background: rgba(0, 0, 0, 0.15);
  transition: background 0.3s;
}

.github-stars-btn:hover .github-stars-separator {
  background: rgba(0, 0, 0, 0.25);
}

.github-stars-count {
  position: relative;
  z-index: 1;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--portal-text);
}

@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
