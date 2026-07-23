<script setup lang="ts">
import { Sparkles, ArrowRight, MessageSquare, Github } from 'lucide-vue-next'
</script>

<template>
  <section class="portal-hero">
    <!-- Background decorations -->
    <div class="portal-hero-bg">
      <div class="portal-hero-gradient" />
      <div class="portal-hero-blob portal-hero-blob-1 portal-blob" />
      <div class="portal-hero-blob portal-hero-blob-2 portal-blob portal-blob-delay-2" />
    </div>

    <div class="portal-hero-content">
      <!-- Badge -->
      <div v-animate class="portal-badge">
        <Sparkles :size="16" />
        <span>AI Agent · 实时行情 · 多源数据 · 深度分析</span>
      </div>

      <!-- Title -->
      <h1 v-animate="100" class="portal-hero-title portal-serif">
        让复杂的金融分析变得简单
      </h1>

      <!-- Subtitle -->
      <p v-animate="200" class="portal-hero-subtitle">
        自动规划分析流程，融合实时数据与专业工具，帮助你完成行情分析、估值研判与投资研究
      </p>

      <!-- CTA Buttons -->
      <div v-animate="300" class="portal-hero-actions">
        <a href="https://github.com/liukai-code/xiaomo-investment-agent" target="_blank" class="portal-btn-primary">
          <Github :size="20" />
          <span>GitHub</span>
          <ArrowRight :size="20" />
        </a>
        <a href="#features" class="portal-btn-outline">
          <MessageSquare :size="16" />
          了解更多
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portal-hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 128px 24px 80px;
  overflow: hidden;
}

.portal-hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.portal-hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(37, 99, 235, 0.04), var(--portal-bg));
}

.portal-hero-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(120px);
  opacity: 0.3;
}

.portal-hero-blob-1 {
  top: 80px;
  left: 40px;
  width: 384px;
  height: 384px;
  background: rgba(37, 99, 235, 0.07);
}

.portal-hero-blob-2 {
  bottom: 160px;
  right: 40px;
  width: 500px;
  height: 500px;
  background: rgba(27, 27, 24, 0.05);
}

.portal-hero-content {
  position: relative;
  z-index: 1;
  max-width: 896px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.portal-hero-title {
  font-size: 48px;
  font-weight: 600;
  letter-spacing: -1px;
  line-height: 1.1;
  color: var(--portal-text);
  margin-top: 40px;
}

@media (min-width: 768px) {
  .portal-hero-title {
    font-size: 72px;
  }
}

.portal-hero-subtitle {
  font-size: 18px;
  line-height: 1.8;
  color: var(--portal-text-muted);
  margin-top: 32px;
  max-width: 640px;
  font-weight: 300;
}

@media (min-width: 768px) {
  .portal-hero-subtitle {
    font-size: 22px;
  }
}

.portal-hero-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 48px;
}

@media (min-width: 640px) {
  .portal-hero-actions {
    flex-direction: row;
    gap: 20px;
  }
}
</style>
