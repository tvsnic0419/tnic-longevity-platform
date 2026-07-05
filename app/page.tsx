import { ManusHome } from '@/components/sections/ManusHome';
import { seoRoutes } from '@/lib/seo-routes';

export const metadata = seoRoutes.home();

export default function HomePage() {
  return <ManusHome />;
}
