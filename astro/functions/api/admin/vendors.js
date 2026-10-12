import { json, loadVendorDirectory } from '../../../server/lib.js';

export async function onRequestGet({ env }) {
  return json({ vendors: await loadVendorDirectory(env.DB) });
}
