import { Content } from '@runtime';
import 'unocss';

export function Layout() {
  return (
    <div>
      <h1 p="2" m="2" className="text-red">
        This is Layout Component
      </h1>
      <Content />
    </div>
  );
}
