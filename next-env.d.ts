/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
  import React from 'react';
  const content: React.FC<React.SVGAttributes<SVGGElement>>;
  export default content;
}
