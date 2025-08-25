import React from 'react'
import { IKImage } from 'imagekitio-react';

const Image = ({src,w,h,alt,className}) => {
    const style = {
    ...(w && { width: `${w}px` }),
    ...(h && { height: `${h}px` }),
  };

  const transformation = [];
  if (w) transformation.push({ width: w });
  if (h) transformation.push({ height: h });

  return (
    <div>
       <IKImage urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} path={src} 
       loading = "lazy"
       lqip = {{active: true, quality: 20}}
       alt={alt} 
       width={w}
       height={h}
       className={`object-cover ${className}`}
       />
    </div>
  )
}

export default Image
