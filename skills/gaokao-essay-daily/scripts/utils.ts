/**
 * 格式化日期为 YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 模拟保存文件功能
 * 注意：在实际 OpenClaw 环境中，脚本可能无法直接访问 G:\，我们需要通过命令或 API 模拟
 */
export async function saveEssay(content: string, filename: string) {
  console.log(`[gaokao-essay] Saving file: ${filename}`);
  // 如果在 Node/Bun 环境运行，这里会尝试写入
}
