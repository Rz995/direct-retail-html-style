---
name: direct-retail-html-style
description: 按直营信息站已确认的蓝色、系统字体、深浅色及紧凑布局生成或修改单文件 HTML。用于要求与一图看懂或直营信息站视觉一致的页面，业务结构按需求调整；不自动接入真实数据或发布。
---

# 直营 HTML 统一风格 · v1.0.0

以 `assets/theme.css` 为唯一颜色与组件样式源。先读 [视觉规范](references/visual-spec.md)，再查看 `assets/template.html` 的结构。不要拿真实周报数据、人员名册、服务地址或既有报表 ID 当默认示例。

## 生成

- 业务内容、板块数量与页面结构听从用户；保持字体、颜色、层级、间距及控件语言一致。不要强迫每个页面都有四张卡、排行、侧边栏。
- 普通 HTML：从模板取需要的组件，交付内联 CSS/JS 的单文件；不依赖公网字体/CDN。模板演示数据必须替换或明确保留演示标记，未知值用“—”，不可补造。
- `assets/theme.css` 是样式源，`assets/template.html` 引用 `/* STYLE_BUNDLE */`；`assets/demo.js` 仅供演示交互，业务页面应替换其演示数据/行为。用 `python3 scripts/build_template.py --output /指定路径/统一风格样板.html` 可重建样板。
- 若上传信息站或接真实 API，另读 [可选数据接入](references/data-integration.md)。普通离线页不需要加载该说明。不可假定鉴权、字段、单位或 query 格式。
- 默认 Chrome 81：flex 间距用 margin、grid 可用 gap；不依赖 :has、color-mix、inset、Array.at、structuredClone、原生 dialog.showModal；不靠修改 UA 宣称兼容。
- 没有每五分钟刷新；日更数据首次载入与手动刷新即可。用户要求自动更新时再定义策略，保留日期选择和当前视图。

## 交付前

读 [验收清单](references/acceptance.md)，实际打开最终单文件检查浅色/深色、桌面/窄屏、日期与交互。区分静态审查、现代浏览器验证和 Chrome 81 真机结果。交付 HTML、可复用样式来源及必要的未完成项；只有已授权才上传/推送，skill 不自行扩大授权。

本 skill 的可复制提示词在 [通用提示词](references/prompt.md)。修改风格时先改样式源和视觉规范，再重建样板；提示词引用该规范，避免维护多套互相矛盾的色值。
