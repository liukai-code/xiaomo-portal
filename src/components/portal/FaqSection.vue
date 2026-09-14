<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

interface FaqItem {
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    question: '小墨是什么？',
    answer: '小墨是一个基于大语言模型的金融投资导学助手，帮助用户系统学习金融投资知识。它能理解自然语言提问，通过 17 个工具（含 10 个领域路由器）调用 60+ 种金融操作，结合实时数据为投资者提供行情查询、深度分析、研报解读等一站式服务，覆盖 A 股、港股、美股和基金。',
  },
  {
    question: '支持哪些数据源？',
    answer: '小墨接入 7 大数据源：腾讯行情（A 股/港股/美股实时报价）、东方财富（研报、龙虎榜、融资融券、资金流向、限售解禁、打板池等）、同花顺（EPS 预测、涨停揭秘、热榜、北向资金）、巨潮资讯（上市公司公告、互动易问答）、新浪财经（财务三表、期权数据）、百度股市通（K 线数据）、i 问财（自然语言选股）。数据涵盖行情、研报、资金面、新闻公告、板块概念、舆情、ETF 期权等 7 大类。',
  },
]

const openIndex = ref<number | null>(null)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section id="faq" class="portal-section">
    <div class="portal-container-narrow">
      <!-- Section header -->
      <div v-animate class="portal-section-header">
        <h2 class="portal-serif">常见问题</h2>
        <div class="portal-deco-bar" />
      </div>

      <!-- Accordion -->
      <div v-animate="200" class="portal-faq-list">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="portal-accordion-item"
        >
          <button
            class="portal-accordion-trigger"
            :class="{ open: openIndex === index }"
            @click="toggle(index)"
          >
            <span>{{ item.question }}</span>
            <ChevronDown :size="20" />
          </button>
          <div
            class="portal-accordion-content"
            :class="{ open: openIndex === index }"
          >
            <div>
              <div class="portal-accordion-body">
                {{ item.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portal-section-header {
  text-align: center;
  margin-bottom: 64px;
}

.portal-section-header h2 {
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: var(--portal-text);
}

@media (min-width: 768px) {
  .portal-section-header h2 {
    font-size: 48px;
  }
}

.portal-faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
