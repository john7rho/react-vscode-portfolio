/// <reference types="react-scripts" />

declare module 'get-ascii-image' {
  interface Options {
    maxWidth?: number;
    maxHeight?: number;
    charSet?: string;
    colored?: boolean;
  }
  export default function getAsciiImage(src: string, options?: Options): Promise<string>;
}
