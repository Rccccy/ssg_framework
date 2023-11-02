import { usePageData } from '@runtime';
import { NavItemWithLInk } from 'share/types';
import styles from './index.module.scss';

function MenuItem(item: NavItemWithLInk) {
  return (
    <div className="text-sm front-medium mx-3">
      <a href={item.link} className={styles.link}>
        {item.text}
      </a>
    </div>
  );
}

export function Nav() {
  const { siteData } = usePageData();
  const nav = siteData?.themeConfig?.nav || [];
  return (
    <header fixed="~" w="full" pos="t-0 l-0">
      <div
        flex="~"
        items="center"
        justify="between"
        className="px-8 h-14 divider-bottom"
      >
        <div>
          <a
            href="/"
            className="w-full h-full text-1rem font-semibold flex items-center"
            hover="opacity-60"
          >
            Island.js
          </a>
          <div flex="~">
            <div flex="~">
              {nav.map((item) => (
                <MenuItem key={item.text} {...item} />
              ))}
            </div>
            <div>主题切换按钮</div>
            <div className={styles.socialLinkIcon} ml="2">
              <a href="/">
                <div className="i-carbon-logo-github w-5 h-5 full-current"></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
