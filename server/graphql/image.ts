import { type H3Event, type EventHandlerRequest } from 'h3';
import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import sharp from 'sharp';


if (!process.env.SUPABASE_STORAGE) {
  throw Error("Environment variable `SUPABASE_STORAGE` is undefined.");
}

export const Image = {
  createFromBase64(data: string) {
    const imageBuffer = Buffer.from(data.split(';base64,').pop() || '', 'base64url');
    return sharp(imageBuffer);
  },

  setQuality(image: sharp.Sharp, quality: number) {
    image.jpeg({ quality });
  },

  async resizeByMaxSize(image: sharp.Sharp, maxSize: number) {
    const metadata = await image.metadata();

    let width = metadata.width || 0;
    let height = metadata.height || 0;

    if (width > maxSize || height > maxSize) {
      if (width > height) {
        height = Math.round(height / (width / maxSize));
        width = maxSize;
      } else {
        width = Math.round(width / (height / maxSize));
        height = maxSize;
      }
      image.resize(width, height);
    }
  },

  async resizeByWidth(image: sharp.Sharp, resultWidth: number) {
    const metadata = await image.metadata();

    let width = metadata.width || 0;
    let height = metadata.height || 0;

    height = Math.round(height / (width / resultWidth));
    width = resultWidth;
    image.resize(width, height);
  },

  async loadToSupabase(image: sharp.Sharp, id: string, context: H3Event<EventHandlerRequest>) {
    const client = await serverSupabaseClient(context);
    await client.storage
      .from(process.env.SUPABASE_STORAGE || '')
      .upload(id + '.jpeg', await image.toBuffer(), {
        contentType: 'image/jpeg'
      });
  }
};