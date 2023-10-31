// 编写测试用例
import { expect, test } from 'vitest';

test('add', () => {
  expect(1 + 1).toBe(2);
  //   expect('map'.slice(1)).toMatchFileSnapshot('ap');
  expect('map'.slice(1)).toMatchInlineSnapshot('"ap"');
});
