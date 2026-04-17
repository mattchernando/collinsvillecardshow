import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B3rDivAf.mjs';
import 'piccolore';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_Bz5FcRdW.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Page Not Found \u2014 Collinsville Card Show", "description": "The page you're looking for doesn't exist." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen flex items-center justify-center px-4"> <div class="text-center max-w-md"> <p class="text-8xl font-black bg-gradient-to-r from-amber-400 to-orange-600 bg-clip-text text-transparent mb-4">404</p> <h1 class="text-3xl font-bold text-white mb-4">Page not found</h1> <p class="text-gray-400 text-lg mb-8">
Sorry, we couldn't find the page you're looking for. It may have been moved or no longer exists.
</p> <a href="/" class="inline-block px-8 py-3 bg-gradient-to-r from-amber-400 to-orange-600 text-gray-950 font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/25 transition-all">
Back to Home
</a> </div> </main> ` })}`;
}, "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/pages/404.astro", void 0);

const $$file = "/sessions/blissful-sleepy-albattani/mnt/Collinsville Card Show/astro/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
