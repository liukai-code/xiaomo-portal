/**
 * 字体子集化构建脚本（自托管，消除 CJK 字体冷加载闪烁）
 *
 * 作用：扫描 src 与 index.html 里实际用到的字符，把 Noto Sans SC / Noto Serif SC
 * 压缩成「只含这些字符」的 woff2 子集，本地加载即可在首屏前就绪，肉眼无 FOUT。
 *
 * 用法：node scripts/build-font-subset.mjs
 * 注意：文案改动（新增汉字）后需重新运行本脚本，否则新字会回退到系统字体。
 *
 * 依赖：完整字体 OTF（.font-src/ 下，缺失时自动从 notofonts/noto-cjk 下载）
 */
import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import subsetFont from 'subset-font'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

// ---------- 1. 收集源码中实际出现的字符 ----------
const EXTS = new Set(['.vue', '.ts', '.tsx', '.js', '.html', '.css'])
const files = [join(root, 'index.html')]

function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) walk(p)
    else if (EXTS.has(extname(e))) files.push(p)
  }
}
walk(join(root, 'src'))

const charSet = new Set()
for (const f of files) {
  for (const ch of readFileSync(f, 'utf8')) charSet.add(ch)
}
const text = [...charSet].join('')

// ---------- 2. 字体清单（family / 字重 / 源文件名 / 输出名） ----------
const FONTS = [
  { family: 'Noto Sans SC', weight: 400, src: 'NotoSansCJKsc-Regular.otf', out: 'noto-sans-sc-400.woff2' },
  { family: 'Noto Sans SC', weight: 500, src: 'NotoSansCJKsc-Medium.otf', out: 'noto-sans-sc-500.woff2' },
  { family: 'Noto Sans SC', weight: 700, src: 'NotoSansCJKsc-Bold.otf', out: 'noto-sans-sc-700.woff2' },
  { family: 'Noto Sans SC', weight: 900, src: 'NotoSansCJKsc-Black.otf', out: 'noto-sans-sc-900.woff2' },
  { family: 'Noto Serif SC', weight: 400, src: 'NotoSerifCJKsc-Regular.otf', out: 'noto-serif-sc-400.woff2' },
  { family: 'Noto Serif SC', weight: 500, src: 'NotoSerifCJKsc-Medium.otf', out: 'noto-serif-sc-500.woff2' },
  { family: 'Noto Serif SC', weight: 600, src: 'NotoSerifCJKsc-SemiBold.otf', out: 'noto-serif-sc-600.woff2' },
  { family: 'Noto Serif SC', weight: 700, src: 'NotoSerifCJKsc-Bold.otf', out: 'noto-serif-sc-700.woff2' },
]

const FONT_SRC_DIR = join(root, '.font-src')
const OUT_DIR = join(root, 'src', 'assets', 'fonts')
mkdirSync(OUT_DIR, { recursive: true })

// ---------- 3. 缺失时下载完整字体 ----------
const BASE = 'https://raw.githubusercontent.com/notofonts/noto-cjk/main'
const SUBDIR = { 'Noto Sans SC': 'Sans', 'Noto Serif SC': 'Serif' }
for (const f of FONTS) {
  const local = join(FONT_SRC_DIR, f.src)
  if (existsSync(local) && statSync(local).size > 0) continue
  mkdirSync(FONT_SRC_DIR, { recursive: true })
  const url = `${BASE}/${SUBDIR[f.family]}/OTF/SimplifiedChinese/${f.src}`
  console.log(`下载 ${f.src} ...`)
  try {
    execFileSync('curl', ['-L', '-C', '-', '--retry', '30', '--retry-delay', '2', '--retry-all-errors', '-m', '120', '-o', local, url], { stdio: 'inherit' })
  } catch (e) {
    console.error(`下载失败：${f.src}（可手动放入 ${FONT_SRC_DIR}）`)
    process.exit(1)
  }
}

// ---------- 4. 子集化并生成 woff2 + @font-face ----------
let css = '/* 由 scripts/build-font-subset.mjs 自动生成，勿手改；文案改动后需重新运行 */\n'
for (const f of FONTS) {
  const buf = readFileSync(join(FONT_SRC_DIR, f.src))
  const sub = await subsetFont(buf, text, { targetFormat: 'woff2' })
  writeFileSync(join(OUT_DIR, f.out), sub)
  css += `@font-face {\n  font-family: '${f.family}';\n  font-style: normal;\n  font-weight: ${f.weight};\n  font-display: swap;\n  src: url('../assets/fonts/${f.out}') format('woff2');\n}\n`
  console.log(`${f.out}: ${(sub.length / 1024).toFixed(1)} KB`)
}

writeFileSync(join(root, 'src', 'styles', 'fonts.css'), css)
console.log(`\n完成：${charSet.size} 个唯一字符 → ${FONTS.length} 个子集字体，CSS 已写入 src/styles/fonts.css`)
