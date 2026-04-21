# Alfoil World 发布前检查与 WordPress 迁移建议

## 1. 双语发布前检查

### 检查范围
- 中文页与英文页是否成对存在
- `CN / EN` 切换是否可落到对应语言页面
- 导航、页脚、按钮、表单提示、`title`、`meta description` 是否按语言输出
- 中英文站内链接是否跳到对应语言版本
- 是否残留明显未翻译内容
- 是否存在明显过长按钮文案或易溢出文案

### 当前页面成对状态
- 首页：`index.html` / `index-en.html`
- 关于平台：`about.html` / `about-en.html`
- AI 搜索：`ai-search.html` / `ai-search-en.html`
- 全球采购商专区：`buyer-desk.html` / `buyer-desk-en.html`
- 企业情报：`company-radar.html` / `company-radar-en.html`
- 联系我们：`contact.html` / `contact-en.html`
- 采购询盘：`global-inquiry.html` / `global-inquiry-en.html`
- 产业历史：`history.html` / `history-en.html`
- 企业入驻：`join.html` / `join-en.html`
- 知识库：`knowledge.html` / `knowledge-en.html`
- 行业资讯：`news.html` / `news-en.html`
- 供应商目录：`supplier-directory.html` / `supplier-directory-en.html`

### 检查结果
- 通过：所有页面已具备中英文成对版本。
- 通过：所有页面均带有 `data-locale`，共享壳层会按语言输出导航、页脚和按钮文案。
- 通过：全站 `CN / EN` 切换已支持按当前页面跳转到对应语言版本。
- 通过：英文页未发现中文残留。
- 通过：中文页未发现明显英文标题残留，首页专家区已恢复为纯中文表达。
- 通过：所有页面都接入统一 `site-pages.css`、`site-shell.js`、header 与 footer。
- 通过：静态相对路径链接检查未发现断链。

### 需注意但不构成当前阻塞的问题
- 英文按钮与标题长度是按代码层面控制的，没有在真实浏览器里做逐页截图验收。
- 当前未接入 `hreflang`、Open Graph、多语言 sitemap 等搜索引擎层的双语增强配置。
- 首页与部分深色 Hero 中的实时行情、评分、响应时效等模块仍属于展示型占位内容，不是实时数据。

### 结论
- 当前双语静态站已经达到“可发布原型”状态。
- 进入 WordPress 阶段时，不建议再推翻视觉，而应保留现有前端结构，优先把内容模型、后台录入方式和动态数据关系理顺。

## 2. 页面功能分类

### A. 静态展示页

这些页面当前更适合作为固定信息页或固定模板页，即使迁移到 WordPress，也不需要复杂后台逻辑即可成立。

- `index.html` / `index-en.html`
  理由：首页以品牌展示、入口导流和模块聚合为主，后续更适合做成可编辑首页模板，而不是数据驱动列表页。
- `about.html` / `about-en.html`
  理由：平台介绍页，内容相对稳定，适合普通页面。
- `history.html` / `history-en.html`
  理由：产业发展脉络页，属于长期内容，更新频率低。
- `buyer-desk.html` / `buyer-desk-en.html`
  理由：采购路径说明页，本质是说明型页面。

### B. 后续需迁移到 WordPress 做成功能页

这些页面当前虽然是静态展示版，但后续更适合由后台数据、表单或内容模型驱动。

- `supplier-directory.html` / `supplier-directory-en.html`
  理由：后续需要供应商列表、筛选、排序、标签、单独详情页和多语言内容管理。
- `company-radar.html` / `company-radar-en.html`
  理由：后续适合与供应商数据打通，基于企业动态、能力标签和观察信号来管理。
- `knowledge.html` / `knowledge-en.html`
  理由：后续应沉淀为可持续扩展的知识库内容体系，而不是单页长内容。
- `news.html` / `news-en.html`
  理由：天然适合 WordPress 文章流、分类、发布时间和归档逻辑。
- `global-inquiry.html` / `global-inquiry-en.html`
  理由：当前只是静态表单，后续需要真实提交、线索管理、邮件通知、CRM 对接。
- `join.html` / `join-en.html`
  理由：当前只是展示型入驻表单，后续需要企业资料提交、审核与目录入库。
- `contact.html` / `contact-en.html`
  理由：当前是静态联系页，后续建议接真实表单与线索通知。
- `ai-search.html` / `ai-search-en.html`
  理由：当前仅为展示入口，后续若要成立，必须接入真实 AI 检索、知识库搜索或问答服务。

## 3. WordPress 迁移建议

### 3.1 可以直接迁移为普通页面
- About
- History
- Buyer Desk

原因：
- 内容结构稳定
- 更新频率低
- 不依赖复杂列表或后台筛选

### 3.2 适合做成可编辑模板
- Home / Home EN
- Contact / Contact EN
- Join / Join EN
- Global Inquiry / Global Inquiry EN

原因：
- 页面结构固定，但局部模块需要后台配置
- 适合用 ACF / Meta Box / Gutenberg pattern 做模块化编辑
- 表单、CTA、说明卡片、Hero 文案需要灵活调整

建议模板化模块：
- Hero 标题、副标题、按钮组
- 市场快照卡
- 核心入口卡片
- 专家顾问区
- 采购路径区
- CTA strip

### 3.3 适合做自定义文章类型

#### `supplier`
用于供应商目录和企业基础资料。

原因：
- 天然需要列表页、详情页、标签筛选
- 适合与公司情报、应用方向、市场标签做关联

#### `knowledge`
用于知识库文章、工艺条目、标准说明、FAQ。

原因：
- 后续一定会增长
- 适合做分类、标签、相关文章和搜索

#### `insight`
用于行业资讯、市场洞察、政策变化、企业动态。

原因：
- 本质是内容流
- 适合时间线、归档、分类、推荐位

#### `company_watch`
用于企业情报和观察记录。

原因：
- 可以与 `supplier` 关联，但又不一定等同于企业基础资料
- 适合存储“信号、趋势、观察结论、更新日期、相关来源”

### 3.4 需要真实表单或后台数据支持的页面
- Global Inquiry
  需要真实提交、邮件通知、后台线索管理、状态追踪。
- Join as Supplier
  需要企业资料提交、后台审核、录入供应商目录。
- Contact
  需要联系表单、邮件通知与简单线索归档。
- AI Search
  需要真实搜索接口、知识库检索逻辑或 AI 问答能力。
- Supplier Directory
  需要真实数据、筛选、排序、单个供应商详情。
- Company Radar
  需要企业观察数据、更新时间、信号状态与内容关联。
- Knowledge Base
  需要后台可持续发文、分类、标签与相关文章。
- News / Insights
  需要后台发稿、归档、推荐位与分类。

### 3.5 当前仍属于占位，后续再开发的模块
- 首页 Market Snapshot 实时行情区
- 供应商优先级评分
- Company Radar 中的部分信号分值与状态
- Advisory Board 的真实专家档案
- AI Search 的实际搜索框与问答逻辑
- 24h 响应、优先级评分等承诺型展示字段
- 目录筛选 chips 的真实交互与筛选结果

## 4. 数据结构建议

说明：
- 以下所有实体建议都做双语字段。
- 建议统一采用：
  - `title_zh`, `title_en`
  - `summary_zh`, `summary_en`
  - `content_zh`, `content_en`
  - `seo_title_zh`, `seo_title_en`
  - `seo_description_zh`, `seo_description_en`

### 4.1 Supplier Directory

建议字段：
- `supplier_name_zh`
- `supplier_name_en`
- `slug`
- `logo`
- `company_type`
- `listed_status`
- `stock_code`
- `country`
- `province_city`
- `founded_year`
- `website`
- `contact_email`
- `contact_phone`
- `short_intro_zh`
- `short_intro_en`
- `profile_zh`
- `profile_en`
- `application_focus`
- `product_categories`
- `alloy_range`
- `temper_range`
- `thickness_range`
- `width_range`
- `surface_capabilities`
- `certifications`
- `export_markets`
- `key_customers_note`
- `capacity_note`
- `sample_support`
- `trial_order_support`
- `moq_note`
- `packaging_capability`
- `battery_foil_capability`
- `pharma_foil_capability`
- `hvac_foil_capability`
- `industrial_foil_capability`
- `priority_score`
- `featured_flag`
- `sort_order`
- `related_company_watch`

建议分类法：
- 应用方向 taxonomy
- 出口市场 taxonomy
- 企业类型 taxonomy
- 能力标签 taxonomy

### 4.2 Company Radar

建议字段：
- `watch_title_zh`
- `watch_title_en`
- `related_supplier`
- `watch_score`
- `application_signal`
- `capacity_signal`
- `export_signal`
- `procurement_relevance`
- `signal_status`
- `watch_summary_zh`
- `watch_summary_en`
- `watch_detail_zh`
- `watch_detail_en`
- `recent_update_date`
- `source_name`
- `source_url`
- `watch_tags`
- `featured_flag`

建议说明：
- `company_watch` 最好和 `supplier` 建立关联字段
- 同一个 supplier 可以对应多条 watch 记录

### 4.3 Knowledge Base

建议字段：
- `knowledge_title_zh`
- `knowledge_title_en`
- `knowledge_slug`
- `knowledge_type`
- `knowledge_category`
- `knowledge_summary_zh`
- `knowledge_summary_en`
- `content_zh`
- `content_en`
- `key_points_zh`
- `key_points_en`
- `faq_zh`
- `faq_en`
- `related_applications`
- `related_alloys`
- `related_standards`
- `related_suppliers`
- `difficulty_level`
- `featured_flag`
- `publish_status`

建议分类法：
- 工艺
- 标准
- 质量指标
- 应用
- FAQ

### 4.4 News / Insights

建议字段：
- `news_title_zh`
- `news_title_en`
- `news_slug`
- `news_type`
- `news_summary_zh`
- `news_summary_en`
- `content_zh`
- `content_en`
- `publish_date`
- `source_name`
- `source_url`
- `author_name`
- `related_supplier`
- `related_company_watch`
- `related_application`
- `featured_flag`
- `insight_level`

建议分类法：
- 企业动态
- 政策变化
- 出口趋势
- 市场信号
- 下游应用

### 4.5 Global Inquiry Form

建议字段：
- `company_name`
- `contact_name`
- `email`
- `phone_or_whatsapp`
- `website`
- `application_focus`
- `alloy`
- `temper`
- `thickness`
- `width`
- `surface_requirements`
- `target_market`
- `certification_requirements`
- `incoterm`
- `trial_or_annual_volume`
- `delivery_timing`
- `destination_port`
- `supplier_preferences`
- `message`
- `language`
- `source_page`
- `submission_time`
- `status`
- `assigned_to`
- `internal_note`

建议状态字段：
- `new`
- `reviewing`
- `matched`
- `contacted`
- `closed`

### 4.6 Supplier Join Form

建议字段：
- `company_name`
- `brand_name`
- `contact_name`
- `job_title`
- `email`
- `phone`
- `website`
- `company_type`
- `main_products`
- `application_focus`
- `export_markets`
- `certifications`
- `factory_location`
- `capacity_note`
- `company_intro`
- `language`
- `submission_time`
- `status`
- `review_note`
- `converted_supplier_id`

建议状态字段：
- `new`
- `pending_review`
- `approved`
- `rejected`
- `converted`

## 5. 推荐的 WordPress 实施顺序

### 第一阶段
- 搭建双语站点结构
- 完成普通页面迁移
- 还原当前前端视觉

### 第二阶段
- 上线 `supplier`、`knowledge`、`insight`、`company_watch` 自定义文章类型
- 把目录、知识库、资讯、企业情报接成后台驱动

### 第三阶段
- 接入 Inquiry / Join / Contact 真实表单
- 做邮件通知、后台线索管理、基础 CRM 流程

### 第四阶段
- 继续开发 AI Search
- 继续开发实时数据、评分和更细的筛选逻辑

## 6. 当前建议结论

- 不建议继续大改视觉。
- 建议把当前静态双语前端作为 WordPress 主题原型直接保留。
- 迁移重点应该转向：
  - 内容模型
  - 双语字段
  - 自定义文章类型
  - 表单与线索管理
  - 站内内容关系

