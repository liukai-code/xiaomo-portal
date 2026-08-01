<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Calculator, BarChart3, PiggyBank, Workflow, Brain, Server, ListChecks, ChevronRight } from 'lucide-vue-next'

interface FeatureItem {
  title: string
  desc: string
  image: string
}

interface FeatureCategory {
  icon: typeof Bot
  badge: string
  badgeColor: string
  title: string
  desc: string
  items: FeatureItem[]
}

const features: FeatureCategory[] = [
  {
    icon: BarChart3,
    badge: '数据',
    badgeColor: 'background: rgba(22,163,74,0.1); color: #16a34a;',
    title: 'A 股数据全景',
    desc: '55 个数据端点，13 大数据源，覆盖行情、研报、龙虎榜、融资融券、解禁预警、行业轮动等',
    items: [
      { title: '行情数据', desc: '实时行情、K 线、分时图、逐笔成交', image: '/portal/feature-data.svg' },
      { title: '深度数据', desc: '龙虎榜、融资融券、北向资金、大宗交易', image: '/portal/feature-data.svg' },
    ],
  },
  {
    icon: Workflow,
    badge: '深度分析',
    badgeColor: 'background: rgba(234,88,12,0.1); color: #ea580c;',
    title: '多 Agent 深度分析',
    desc: '5 层 DAG 工作流，多 Agent 并行协作，多空辩论 + 风险评估，生成结构化投研报告',
    items: [
      { title: '并行数据采集', desc: '市场、基本面、新闻 3 个分析师并行工作', image: '/portal/feature-ai.svg' },
      { title: '多空辩论', desc: '多轮结构化辩论 + 风险三方评估', image: '/portal/feature-data.svg' },
    ],
  },
  {
    icon: ListChecks,
    badge: '规划',
    badgeColor: 'background: rgba(234,88,12,0.1); color: #ea580c;',
    title: '复杂任务自主规划',
    desc: '自动判断执行模式，复杂任务拆解为结构化步骤逐步执行，让多步分析有条不紊',
    items: [
      { title: '智能模式判断', desc: '规则判断 DIRECT / PARALLEL / PLANNING 三种执行模式', image: '/portal/feature-ai.svg' },
      { title: '计划可视化', desc: '执行计划实时推送到前端，用户可追踪每步进度', image: '/portal/feature-data.svg' },
    ],
  },
  {
    icon: Brain,
    badge: '记忆',
    badgeColor: 'background: rgba(168,85,247,0.1); color: #a855f7;',
    title: '智能对话记忆',
    desc: '多维用户画像自动学习，支持"记住我说的"显式记忆，跨会话持续理解你的投资偏好',
    items: [
      { title: '用户画像', desc: '投资风格、风险偏好、关注行业自动归纳', image: '/portal/feature-ai.svg' },
      { title: '上下文记忆', desc: '对话摘要压缩，长会话连贯不丢失', image: '/portal/feature-data.svg' },
    ],
  },
  {
    icon: Calculator,
    badge: '工具',
    badgeColor: 'background: rgba(37,99,235,0.1); color: #2563eb;',
    title: '专业金融工具',
    desc: '22 种金融计算器（复利、贷款、NPV、IRR、夏普比率等），支持 A 股/港股/美股实时行情',
    items: [
      { title: '金融计算', desc: '复利、NPV、IRR、夏普比率、BigDecimal 精度', image: '/portal/feature-ai.svg' },
      { title: '多市场行情', desc: 'A 股、港股、美股实时报价', image: '/portal/feature-data.svg' },
    ],
  },
  {
    icon: PiggyBank,
    badge: '养基宝',
    badgeColor: 'background: rgba(168,85,247,0.1); color: #a855f7;',
    title: '养基宝集成',
    desc: '基金组合跟踪，扫码登录，实时估值与指数行情一览，AI 可直接查询持仓数据',
    items: [
      { title: '组合跟踪', desc: '持仓基金实时估值，收益数据同步', image: '/portal/feature-ai.svg' },
      { title: '指数行情', desc: '主要指数实时行情概览', image: '/portal/feature-data.svg' },
    ],
  },
  {
    icon: Server,
    badge: '部署',
    badgeColor: 'background: rgba(14,165,233,0.1); color: #0ea5e9;',
    title: '一键部署 · 多用户支持',
    desc: 'Docker 容器化部署，支持多用户独立使用，对话记录互相隔离，一键上云即开即用',
    items: [
      { title: '容器化部署', desc: 'Docker 一键部署，开箱即用无需配置', image: '/portal/feature-data.svg' },
      { title: '多用户隔离', desc: '独立会话与记忆，多用户互不干扰', image: '/portal/feature-ai.svg' },
    ],
  },
]

const SLIDE_DURATION = 6000
const activeIndices = ref(features.map(() => 0))
const progresses = ref(features.map(() => 0))
const intervals = ref<(ReturnType<typeof setInterval> | null)[]>(features.map(() => null))

function startTimer(catIdx: number) {
  if (intervals.value[catIdx]) clearInterval(intervals.value[catIdx]!)
  intervals.value[catIdx] = setInterval(() => {
    if (progresses.value[catIdx] < 100) {
      progresses.value[catIdx] += (50 / SLIDE_DURATION) * 100
    }
    if (progresses.value[catIdx] >= 100) {
      progresses.value[catIdx] = 0
      const max = features[catIdx].items.length - 1
      activeIndices.value[catIdx] = activeIndices.value[catIdx] < max ? activeIndices.value[catIdx] + 1 : 0
    }
  }, 50)
}

function handleItemClick(catIdx: number, itemIdx: number) {
  activeIndices.value[catIdx] = itemIdx
  progresses.value[catIdx] = 0
  startTimer(catIdx)
}

onMounted(() => features.forEach((_, i) => startTimer(i)))
onUnmounted(() => intervals.value.forEach(ref => { if (ref) clearInterval(ref) }))
</script>

<template>
  <section id="features" class="portal-section">
    <div class="portal-container">
      <!-- Section header -->
      <div v-animate class="portal-section-header">
        <h2 class="portal-serif">核心功能</h2>
        <div class="portal-deco-bar" />
        <p>一站式金融投资助手，覆盖从数据查询到深度分析的完整链路</p>
      </div>

      <!-- Feature categories -->
      <div class="portal-features-list">
        <div
          v-for="(cat, catIdx) in features"
          :key="catIdx"
          class="portal-feature-row"
          :class="{ reverse: catIdx % 2 === 1 }"
        >
          <!-- Text side -->
          <div v-animate="100" class="portal-feature-text">
            <div>
              <span class="portal-feature-badge" :style="cat.badgeColor">
                <component :is="cat.icon" :size="16" />
                {{ cat.badge }}
              </span>
              <h3 class="portal-serif">{{ cat.title }}</h3>
              <p>{{ cat.desc }}</p>
            </div>

            <div class="portal-feature-items">
              <button
                v-for="(item, itemIdx) in cat.items"
                :key="itemIdx"
                class="portal-feature-item"
                :class="{ active: activeIndices[catIdx] === itemIdx }"
                @click="handleItemClick(catIdx, itemIdx)"
              >
                <div class="portal-feature-item-content">
                  <div>
                    <h4 :class="{ 'text-primary': activeIndices[catIdx] === itemIdx }">
                      {{ item.title }}
                    </h4>
                    <p>{{ item.desc }}</p>
                  </div>
                  <ChevronRight
                    :size="20"
                    :class="{ 'icon-active': activeIndices[catIdx] === itemIdx }"
                  />
                </div>
                <div
                  v-if="activeIndices[catIdx] === itemIdx"
                  class="portal-feature-progress"
                  :style="{ width: `${progresses[catIdx]}%` }"
                />
              </button>
            </div>
          </div>

          <!-- Image side -->
          <div v-animate="200" class="portal-feature-image">
            <div class="portal-feature-image-card">
              <div class="portal-feature-image-glow" />
              <img
                :src="cat.items[activeIndices[catIdx]].image"
                :alt="cat.items[activeIndices[catIdx]].title"
              />
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
  margin-bottom: 96px;
}

.portal-section-header h2 {
  font-size: 36px;
  font-weight: 600;
  letter-spacing: -0.5px;
  color: var(--portal-text);
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .portal-section-header h2 {
    font-size: 48px;
  }
}

.portal-section-header p {
  font-size: 18px;
  color: var(--portal-text-muted);
  max-width: 560px;
  margin: 32px auto 0;
  line-height: 1.8;
  font-weight: 300;
}

.portal-features-list {
  display: flex;
  flex-direction: column;
  gap: 160px;
}

.portal-feature-row {
  display: flex;
  flex-direction: column;
  gap: 64px;
  align-items: center;
}

@media (min-width: 1024px) {
  .portal-feature-row {
    flex-direction: row;
    gap: 96px;
  }

  .portal-feature-row.reverse {
    flex-direction: row-reverse;
  }
}

.portal-feature-text {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

@media (min-width: 1024px) {
  .portal-feature-text {
    width: 41.666%;
  }
}

.portal-feature-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.portal-feature-text h3 {
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: var(--portal-text);
  margin-top: 16px;
}

@media (min-width: 768px) {
  .portal-feature-text h3 {
    font-size: 36px;
  }
}

.portal-feature-text > div > p {
  font-size: 16px;
  color: var(--portal-text-muted);
  line-height: 1.8;
  font-weight: 300;
  margin-top: 16px;
}

.portal-feature-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.portal-feature-item-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.portal-feature-item h4 {
  font-size: 15px;
  font-weight: 600;
  color: rgba(27, 27, 24, 0.7);
  transition: color 0.2s;
}

.portal-feature-item h4.text-primary {
  color: var(--portal-text);
}

.portal-feature-item p {
  font-size: 13px;
  color: var(--portal-text-muted);
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.portal-feature-item .icon-active {
  color: var(--portal-text);
  transform: translateX(4px);
  transition: all 0.2s;
}

.portal-feature-item :deep(svg) {
  color: rgba(27, 27, 24, 0.2);
  flex-shrink: 0;
  margin-left: 12px;
  margin-top: 2px;
  transition: all 0.2s;
}

.portal-feature-item :deep(svg.icon-active) {
  color: var(--portal-text);
}

.portal-feature-image {
  width: 100%;
}

@media (min-width: 1024px) {
  .portal-feature-image {
    width: 58.333%;
  }
}

.portal-feature-image-card {
  position: relative;
  aspect-ratio: 16 / 10;
  background: rgba(242, 240, 233, 0.2);
  border-radius: 24px;
  border: 1px solid rgba(230, 227, 227, 0.5);
  padding: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  overflow: hidden;
  transition: transform 0.7s;
}

.portal-feature-image-card:hover {
  transform: scale(1.02);
}

.portal-feature-image-glow {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top right, rgba(27, 27, 24, 0.03), transparent);
  pointer-events: none;
}

.portal-feature-image-card img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
}
</style>
