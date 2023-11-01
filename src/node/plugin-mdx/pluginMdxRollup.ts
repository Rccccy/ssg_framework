import pluginMdx from '@mdx-js/rollup';
import remakeGFM from 'remark-gfm';
import type { Plugin } from 'vite';
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import remarkPluginFrontMatter from 'remark-frontmatter';
import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';
import { rehypePluginShiki } from './rehypePlugins/shiki';
import shiki from 'shiki';
import { remarkPluginToc } from './remarkPlugins/toc';

export async function pluginMdxRollup(): Promise<Plugin> {
  return pluginMdx({
    remarkPlugins: [
      remakeGFM,
      remarkPluginFrontMatter,
      remarkPluginToc,
      [
        remarkPluginMDXFrontMatter,
        {
          name: 'frontmatter'
        }
      ]
    ],
    rehypePlugins: [
      rehypePluginSlug,
      [
        rehypePluginAutolinkHeadings,
        {
          properties: {
            class: 'header-anchor'
          },
          content: {
            type: 'text',
            value: '#'
          }
        }
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginShiki,

        {
          highlighter: await shiki.getHighlighter({
            theme: 'dark-plus'
          })
        }
      ]
    ]
  }) as unknown as Plugin;
}
