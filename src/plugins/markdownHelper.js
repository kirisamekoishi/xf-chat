import { marked } from 'marked';

export function processText(inputString) {
  const markdownDelimiter = /```(?:\w+)?([\s\S]+?)```/g;

  let result = '';
  let match;
  let lastIndex = 0;

  // 配置 marked 以解释换行符
  marked.setOptions({
    breaks: true,
  });

  while ((match = markdownDelimiter.exec(inputString)) !== null) {
    // 将非 Markdown 部分转化为 HTML
    result += marked(inputString.substring(lastIndex, match.index));

    // 将 Markdown 部分手动处理并转化为 HTML，添加类名或行内样式
    const markdownContent = marked(match[1]);
    result += `<pre class="markdown-content">${markdownContent}</pre>`;

    lastIndex = markdownDelimiter.lastIndex;
  }

  // 处理剩余的非 Markdown 部分
  result += marked(inputString.substring(lastIndex));

  return {
    renderedText: result,
  };
}