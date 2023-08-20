import { remark } from "remark";
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
// import html from "remark-html";

/**
 * Markdown を解析して HTML にして返す
 * @param markdown Markdown ファイル名
 * @returns HTML
 */
const markdownToHtml = async (markdown: string) => {
    const result = await remark()
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw) // *Parse* the raw HTML strings embedded in the tree
        .use(rehypeStringify)
        .process(markdown);
    return result.toString();
};

export default markdownToHtml;