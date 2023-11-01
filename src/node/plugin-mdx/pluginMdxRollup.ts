import pluginMdx from '@mdx-js/rollup';
import remakeGFM from 'remark-gfm';
import type { Plugin } from 'vite';
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import remarkPluginFrontMatter from 'remark-frontmatter';
import { rehypePluginPreWrapper } from './rehypePlugins/preWrapper';

export function pluginMdxRollup() {
  return [
    pluginMdx({
      remarkPlugins: [
        remakeGFM,
        remarkPluginFrontMatter,
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
        rehypePluginPreWrapper
      ]
    }) as unknown as Plugin
  ];
}
