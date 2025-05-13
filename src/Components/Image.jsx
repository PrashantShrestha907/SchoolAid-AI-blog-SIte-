import React from 'react'
import { IKImage } from 'imagekitio-react';

const Image = ({src,w,h,alt}) => {
  return (
    <div>
       <IKImage urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} path={src} 
       loading = "lazy"
       lqip = {{active: true, quality: 20}}
       alt={alt} 
       width={w}
       height={h}
       />
    </div>
  )
}

export default Image
