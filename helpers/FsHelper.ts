import fs from 'node:fs/promises';

export async function createFolderIfNotExists(path: string) {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path, { recursive: true });
  }
}
