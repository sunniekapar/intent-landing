import invariant from 'tiny-invariant';
import { createClient } from '@supabase/supabase-js';

function sanitizeBase(base) {
  return base.replace(/^\/|\/$/g, "");
}
const createServerRpc = (functionId, serverBase, splitImportFn) => {
  invariant(
    splitImportFn,
    "\u{1F6A8}splitImportFn required for the server functions server runtime, but was not provided."
  );
  const sanitizedAppBase = sanitizeBase("/");
  const sanitizedServerBase = sanitizeBase(serverBase);
  const url = `${sanitizedAppBase ? `/${sanitizedAppBase}` : ``}/${sanitizedServerBase}/${functionId}`;
  return Object.assign(splitImportFn, {
    url,
    functionId
  });
};
const supabaseUrl = void 0;
const supabaseKey = void 0;
{
  throw new Error("Missing Supabase environment variables. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export { createServerRpc as c, supabase as s };
//# sourceMappingURL=supabase-NWwdWcP4.mjs.map
