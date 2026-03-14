import { execSync } from 'child_process';
import { formatDate } from './utils';

/**
 * 高考作文模拟命题生成主脚本
 */
async function main() {
  const today = new Date();
  const dateStr = formatDate(today);
  const fileName = `高考作文模拟（${dateStr}）.md`;
  
  console.log(`正在为 ${dateStr} 生成高考作文模拟命题...`);

  const prompt = `
你是一位资深的高考语文专家。请**以一名优秀高中毕业生的身份**，结合百度教育"天工"系列作文素材库的风格，完成一次高考作文模拟。

【核心任务】
1. **身份设定**：你的思维、语气和文风应符合一名准大学生（高中毕业生）的特征，既有少年的朝气与担当，又不失深刻的思辨。
2. **内容质量**：参考天工素材库的"实用、系统、应试导向"。重点关注"科技向善与人文底线"或"个体成长与时代担当"。

【输出结构规范】（**严格仅限以下三个板块，禁止输出任何额外的命题分析或技巧总结**）
1. ## 【高考作文模拟命题】
   - 给定一段具有时代感的背景材料，并明确写作要求。
2. ## 【破题思路】
   - **审题关键**：**禁止简单罗列**。必须深入解析材料的时代背景、核心矛盾点（如效率与意外、技术与人文等），挖掘材料背后的多层内涵。
   - **立意建议**：提供3个不同层面的立意选择（如：从技术工具论、成长哲学、人文关怀等角度）。**每个立意必须详细展开**，说明该立意下的核心逻辑、论证切入点。
   - **架构与素材**：提供清晰的议论文结构蓝图（如"引议联结"的具体填充逻辑），并推荐3-5条具有天工风格的高质量、非套路化素材。
3. ## 【范例】
   - 一篇800字左右的高分示范作文（模拟考场实战风格）。

【禁止事项】
- **严禁**输出"当前高考命题趋势分析"板块。
- **严禁**输出"写作技巧总结"或"高分要点"等专家点评板块。
- **严禁**输出除上述三个指定板块外的任何背景说明或引导语。

格式要求：Markdown。
`;

  // 尝试保存并手动触发 GitHub 推送（为 Zeabur 环境增强可靠性）
  console.log("PROMPT_START");
  console.log(prompt);
  console.log("PROMPT_END");
  
  const targetPath = `documents/${fileName}`;
  console.log(`GAOKAO_FILENAME:${targetPath}`);

  // 尝试手动执行 Git 命令
  try {
    console.log("正在尝试手动同步到 GitHub...");
    const token = process.env.GITHUB_TOKEN;
    
    if (token) {
      console.log("检测到 GITHUB_TOKEN，正在配置远程仓库...");
      execSync(`git remote set-url origin https://${token}@github.com/vgtmy/gaokao.git`, { stdio: 'inherit' });
    }

    // 配置基础身份信息防止 commit 失败
    try {
      execSync('git config --global user.email "gaokao-bot@openclaw.ai"', { stdio: 'inherit' });
      execSync('git config --global user.name "Gaokao Essay Bot"', { stdio: 'inherit' });
    } catch (e) {
      // 忽略配置错误（可能是由于容器只读文件系统）
    }
    
    execSync('git add .', { stdio: 'inherit' });
    execSync(`git commit -m "Auto-generate gaokao essay: ${dateStr}"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    
    console.log("✅ 手动同步尝试成功。");
  } catch (err: any) {
    console.log("⚠️ 手动同步失败。请确保您已在 Zeabur 设置了 GITHUB_TOKEN 环境变量。");
    console.error(err.message || err);
  }
}

main().catch(console.error);
