<template>
  <footer class="portal-footer">
    <div class="portal-container">
      <div class="portal-footer-inner">
        <div class="portal-footer-brand">
          <div class="portal-footer-logo">
            <img src="/portal/logo.png" alt="小墨" />
          </div>
          <span class="portal-serif">小墨</span>
        </div>
        <div class="portal-footer-info">
          <p class="portal-footer-copy">&copy; 2025 小墨金融 AI 助手. All rights reserved.</p>
          <a href="https://beian.miit.gov.cn/" target="_blank" class="portal-footer-icp">陕ICP备2026019107号-1</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.portal-footer {
  padding: 64px 24px;
  border-top: 1px solid var(--portal-border);
}

.portal-footer-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

@media (min-width: 768px) {
  .portal-footer-inner {
    flex-direction: row;
    justify-content: space-between;
  }
}

.portal-footer-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.portal-footer-logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.portal-footer-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portal-footer-brand span {
  font-size: 20px;
  font-weight: 600;
  color: var(--portal-text);
}

.portal-footer-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

@media (min-width: 768px) {
  .portal-footer-info {
    align-items: flex-end;
  }
}

.portal-footer-copy {
  font-size: 14px;
  color: var(--portal-text-muted);
}

.portal-footer-icp {
  font-size: 12px;
  color: var(--portal-text-muted);
  text-decoration: none;
  transition: color 0.2s;
}

.portal-footer-icp:hover {
  color: var(--portal-text);
}
</style>
