# 直营 HTML 统一风格 v1.0.0

统一直营信息站与一图看懂的字体、蓝色配色、深浅色、表格及紧凑布局。此目录是可安装skill，不需要部署信息站服务器。

## 安装提示词（发给Codex）

请使用 skill-installer，从以下仓库安装完整的 direct-retail-html-style 技能：

- 仓库：Rz995/direct-retail-html-style
- 分支：main
- 路径：skills/direct-retail-html-style

安装整个文件夹，保留 agents、assets、references、scripts。这是公开仓库，可直接下载，无需业务项目权限。若同名skill已存在，先检查本地修改，再说明更新差异，不要直接覆盖。安装后验证SKILL.md及相对资源可读取，并告诉我调用方法。

## 使用

> 使用 $direct-retail-html-style，按统一风格制作HTML。业务内容如下：……

无skill功能的工具，可同时提供 [提示词](references/prompt.md) 与 [单文件样板](assets/统一风格样板_v1.0.html)。样板使用演示数据，不是正式业务报告。

## 样式维护

`assets/theme.css`是样式源，`references/visual-spec.md`是视觉规范。修改后运行：

```sh
python3 scripts/build_template.py --output assets/统一风格样板_v1.0.html
```

未进行Chrome81真机或最终样板画面验收；已做结构、语法、离线引用和图表边界函数检查。真实接入按references/data-integration.md核对平台契约。
