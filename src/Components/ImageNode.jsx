import { DecoratorNode } from 'lexical';
import * as React from 'react';

function ImageComponent({ src, alt }) {
  return <img
  src={src}
  alt={alt}
  style={{
    width: '150px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px', // optional
  }}
/>;
}

export class ImageNode extends DecoratorNode {
  __src;
  __alt;

  static getType() {
    return 'image';
  }

  static clone(node) {
    return new ImageNode(node.__src, node.__alt, node.__key);
  }

  constructor(src, alt, key) {
    super(key);
    this.__src = src;
    this.__alt = alt;
  }

  createDOM() {
    return document.createElement('span');
  }

  updateDOM() {
    return false;
  }

  static importJSON(serializedNode) {
    const { src, alt } = serializedNode;
    return new ImageNode(src, alt);
  }

  exportJSON() {
    return {
      type: 'image',
      version: 1,
      src: this.__src,
      alt: this.__alt,
    };
  }

  exportDOM() {
    const img = document.createElement('img');
    img.setAttribute('src', this.__src);
    img.setAttribute('alt', this.__alt || 'image');
    img.style.width = '150px';
    img.style.height = '200px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    return {element: img};
  }

  decorate() {
    return <ImageComponent src={this.__src} alt={this.__alt} />;
  }
}

export function $createImageNode(src, alt = 'image') {
  return new ImageNode(src, alt);
}
