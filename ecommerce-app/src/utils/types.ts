/* eslint-disable @typescript-eslint/no-explicit-any */

export type Product = {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
};

export type ProductDetail = {
  name: string;
  description: string;
  price?: number;
  imageUrl: string;
  metaTitle: string;
  metaDescription: string;
};

export type ApiProductResponse = {
  id: number;
  documentId: string;
  name: string;
  description: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }>;
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: ImageFormat;
      medium?: ImageFormat;
      small?: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
  seo: Array<{
    id: number;
    metaTitle: string;
    metaDescription: string;
  }>;
};

export type ImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
};

export type TrackingEventType = { event: string; value: object };
