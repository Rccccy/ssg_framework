import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { describe, test, expect } from 'vitest';
import { rehypePluginPreWrapper } from '../plugin-mdx/rehypePlugins/preWrapper';
import { rehypePluginShiki } from '../plugin-mdx/rehypePlugins/shiki';
import shiki from 'shiki';
import remarkMdx from 'remark-mdx';
import { remarkPluginToc } from '../plugin-mdx/remarkPlugins/toc';
import remarkStringify from 'remark-stringify';

describe('Markdown compile case', async () => {
  const processor = unified();

  processor
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePluginPreWrapper)
    .use(rehypePluginShiki, {
      highlighter: await shiki.getHighlighter({ theme: 'dark-plus' })
    })
    .use(rehypeStringify);

  test('Compile title', async () => {
    const mdContent = '# 123';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot('"<h1>123</h1>"');
  });

  test('Compile code', async () => {
    const mdContent = 'I am using `Island.js`';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(
      '"<p>I am using <code>Island.js</code></p>"'
    );
  });

  test('Compile code block', async () => {
    const mdContent = '```js\nconsole.log(123);\n```';
    const result = processor.processSync(mdContent);
    expect(result.value).toMatchInlineSnapshot(`
      "<div class=\\"language-js\\"><span class=\\"lang\\">js</span><pre class=\\"shiki\\" style=\\"background-color: #1E1E1E\\"><code><span class=\\"line\\"><span style=\\"color: #9CDCFE\\">console</span><span style=\\"color: #D4D4D4\\">.</span><span style=\\"color: #DCDCAA\\">log</span><span style=\\"color: #D4D4D4\\">(</span><span style=\\"color: #B5CEA8\\">123</span><span style=\\"color: #D4D4D4\\">);</span></span>
      <span class=\\"line\\"></span></code></pre></div>"
    `);
  });

  test('Compile Toc', async () => {
    const remarkProcessor = unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(remarkPluginToc)
      .use(remarkStringify);

    const mdContent = '## title `xxx` [link](/path)';
    const result = remarkProcessor.processSync(mdContent);
    expect(result.value.toString().replace(mdContent, ''))
      .toMatchInlineSnapshot(`
      "

      export const toc=[
        {
          \\"id\\": \\"title-xxx-link\\",
          \\"text\\": \\"title xxx link\\",
          \\"depth\\": 2
        }
      ]
      "
    `);
  });
});
