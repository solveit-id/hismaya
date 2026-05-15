import { del, put } from "@vercel/blob";

// Using Vercel Blob for Saving Image Data

export async function uploadImage(
  file: File,
  folder: string
) {
  const fileName = `${folder}/${Date.now()}-${file.name}`;

  const blob = await put(
    fileName,
    file,
    {
        access: "public",
        contentType: file.type,
    }
  );

  return blob.url;
}

export async function deleteImage(
  url?: string | null
) {
  if (!url) return;

  try {
    await del(url);
  } catch {
    // ignore delete error
  }
}