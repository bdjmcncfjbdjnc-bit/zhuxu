# 竹序第二版素材记录

## 文档反馈整合版（2026-10-13）

- 移除“入门平编 / 疏朗团扇 / 细密手袋”三个预设入口，保留下方编法选择。
- 复古配色更新为 6 组；现代配色增加 8 组。上传图片取色独立保留。
- 单根竹条点选、拖涂、吸色、擦除和 100–200% 放大；同一竹条的所有交叉点一起改色。涂色保存于本机、支持撤销，并进入 SVG 与文创套样。
- 团扇 6 种器型、瓷器 4 种器型；“其他文创”包含礼盒、纸袋、书签和杯垫。纸品明确标注为印制纹样。
- `china-workshop.png` 替换原印度尼西亚工艺图，来源为浙江农林大学暨阳学院的嵊州工坊参访报道：https://www.zjyc.edu.cn/info/1027/17372.htm 。原始图片：https://www.zjyc.edu.cn/__local/F/9B/49/6CFA0F0D1F9B9F454B7FCB58582_307CDC5F_CEA8F.png 。此图不适用下方 Wikimedia 的 CC 许可；网页单独标注原报道来源。
- `tote-studio-v6.png` 是内置 image_gen 生成的原创摄影风格样机；`tote-studio-v6.webp` 是网站优化副本，`bag-mock-data.js` 内嵌 800×600 PNG 以保证 SVG 转 PNG 时不依赖外部图片。实时设计只替换正面面板，竹框、提手、侧面保持样机本色，网页明确说明。

### tote-studio-v6.png / tote-studio-v6.webp 最终提示词

Use case: product-mockup. Create an original photorealistic premium Chinese bamboo-weaving handbag product mockup. Landscape 4:3 image, entire handbag centered on a warm ivory seamless studio surface. Straight-on frontal view, symmetrical simple rectangular bag with a narrow slightly visible right side, two rounded honey-brown bamboo handles, expertly bound bamboo edges. Large FLAT front woven panel in neutral natural pale cream bamboo, uncolored fine plain weave, parallel rectangular boundaries (approximately x=25% to75%, y=40% to80% of image). Bag handles extend up to18% image height. Bottom rests at82%. This large flat front is intended for an interactive pattern overlay later; keep it unobstructed and evenly softly illuminated, no objects over the panel. Extremely realistic bamboo grain, fine fiber texture, handmade binding, soft studio shadows and subtle depth. Quiet minimal editorial product photography, no logos, no writing, no watermark, no flowers, no props. A tangible craft object, not vector illustration, not cartoon, not shiny plastic.

全部最终网页素材位于 `dist/assets/`。原创场景使用内置 image_gen 工具生成，非 API/CLI。AI 场景与实拍图在网页中分开标注。实时套样使用参数化 SVG，不冒充摄影或 AI 实时生成。

## 真实图片来源

- `craft-weaving.jpg`：Abdulrohmatt，Woman weaving a bamboo basket, Tasikmalaya，CC BY-SA 4.0。https://commons.wikimedia.org/wiki/File:Woman_weaving_a_bamboo_basket,_Tasikmalaya.jpg
- `heritage-basket.jpg`：猫猫的日记本，浙江省博物馆嵊州竹编绍兴八角三格提篮，CC BY-SA 4.0。https://commons.wikimedia.org/wiki/File:Shengzhou_Bamboo_Weaving_Basket_in_Zhejiang_Provincial_Museum_2014-04.JPG
- 两幅照片由 CSS 按画框裁切；原照片及裁切版本依照 https://creativecommons.org/licenses/by-sa/4.0/ 许可。
- `painting-shanshui.jpg`：王希孟《千里江山图》局部，公版艺术品复制图。https://commons.wikimedia.org/wiki/File:A_Thousand_Li_of_Rivers_and_Mountains_part.jpg

## 内置 image_gen 最终提示词

### hero-luxe.png
Use case: ads-marketing. Create an exquisite wide 3:2 editorial website hero background for Chinese bamboo craft heritage. NO text or letters. Near-black charcoal Chinese ink-wash with authentic rough xuan paper fibers, dry-brush texture and subtly drifting gray ink, NOT green. Left 45 percent very dark quiet negative space for website headline. Right side a magnificent sculptural flowing ribbon woven from extremely fine golden bamboo strips, complex interlacing, 3D volume, brushed brass/gold leaf reflections, warm champagne rim lighting and dramatic chiaroscuro, deeply black shadows. Delicate gold-leaf bamboo stems and leaves at extreme right and a few gold dust flecks. Restrained luxurious traditional Chinese aesthetic, cinematic macro material realism, not vector, not flat, not excessive glitter. Strong composition, gallery art direction.

### tote-real.png
Use case: product-mockup. Photorealistic luxury product photograph, landscape 3:2. ONE entire handcrafted Chinese bamboo woven handbag on a rough charcoal stone plinth in a pitch-black ink textured studio. Three-quarter front view, centered, whole bag and both handles fully visible with generous space. All exterior surfaces including sides, bottom, top rim and curved handles are actual honey-gold bamboo weave, fine flat split bamboo strips with realistic over-under interlacing, tiny fibers, slight natural irregularity, dense herringbone weaving on body, thick bound rim, bamboo wrapped arch handles, visible open top interior and side depth. Absolutely NO cloth panels, no fabric body, no leather, no printed texture panel, no logos or text. Warm side spotlight, subtle gold dust and soft shadow, premium museum catalogue photograph, physically believable craft object.

### fan-real.png
Use case: product-mockup. Photorealistic luxury museum catalogue photograph landscape 3:2 of ONE entire traditional Chinese round bamboo woven hand fan. Whole circular face and long bamboo handle visible, fan leaning diagonally very slightly against a rough charcoal stone block. Black ink wash studio background, warm cinematic gold lighting, subtle natural shadow. Fan face entirely intricately interlaced ultra-fine golden natural bamboo strips, dense diagonal herringbone weave with small realistic open gaps, NOT fabric, NOT paper, NOT illustrated or printed geometric pattern. Bound bamboo circumference with realistic thickness, polished bamboo handle and tiny dark tassel. Real material fibers, exquisite handmade detail, elegant restraint, no text or watermark.

### vase-real.png
Use case: product-mockup. A photorealistic luxury product photograph of a Chinese white porcelain vase entirely sheathed in ultra-fine golden bamboo weaving except its white porcelain neck and rim. Whole object centered in landscape 3:2 frame on charcoal stone plinth, black ink textured background, warm cinematic side lighting, intricate bamboo fiber material, curved three dimensional volume, no text.

### bookmark-real.png
Use case: product-mockup. A photorealistic editorial photograph of a handmade thin woven bamboo bookmark, entire bookmark finely interwoven golden bamboo strips with bound edges and a small black silk tassel, resting diagonally on open cream book pages, charcoal black ink wash background, warm gold side lighting, macro texture, landscape 3:2 composition, no legible text, refined Chinese luxury craft.

### phone-real.png
Use case: product-mockup. A photorealistic product photograph of a sleek dark smartphone on a charcoal stone plinth in a black ink wash studio, whole phone visible in three-quarter portrait orientation, display edge to edge showing a highly detailed golden bamboo interlacing pattern on black, no apps or text, cinematic gold rim lighting, landscape 3:2 image, refined minimal gallery composition.
# Continuous weave revision

The combination engine now uses one uninterrupted warp/weft grid. Plain and herringbone crossing rules alternate in a 16-cell repeat; it no longer clips together complete images. Spiral and three-direction structures are excluded from this mode. An odd number of radial spokes allows the continuous spiral weft to alternate its crossing order on successive turns.

Reference: [Madelyn van der Hoogt, Handwoven: combining plain weave and twill](https://handwovenmagazine.com/weaving-plain-weave-and-twill-on-an-8-shaft-loom/). This source supports combining crossing structures on continuous warp/weft in textiles. It does not establish bamboo material feasibility. The website remains a digital structure study; actual bamboo prototypes require testing material thickness, bend radius and edge construction.

QA: `node test-studio.cjs` uses LinkeDOM installed in the parent workspace's `qa-tools` folder. It executes all four production scripts and checks state/UI interactions, continuity, floating-strand feedback and exports. SVGs were rasterized for visual inspection. Full browser layout, native file upload and native PNG download remain unverified because the supported CUA runtime fails to initialize with Windows error 3.

