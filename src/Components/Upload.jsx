import { IKContext, IKUpload } from 'imagekitio-react'
import React, { useContext, useRef } from 'react'
import { toast } from 'react-toastify';
import { AuthContext } from './Context/AuthContext';

const Upload = ({children,setData}) => {
  const ref = useRef(null)
   const { token } = useContext(AuthContext)
  const authenticator = async () => {
        try {
            const response = await fetch("http://localhost:3000/post/upload-auth");
            if (!response.ok) {
                
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
           
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

  
    const onError = (err)=>{
    console.log(err)
    toast.error("Image not uploaded!!")
  }

  const onSuccess = (res)=>{
    setData(res)
    toast("Image Uploaded!")
  }

  return (
    <div>
          <IKContext
            publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
            urlEndpoint="https://ik.imagekit.io/schoolaid"
            authenticator={authenticator}
            >
              <IKUpload
                useUniqueFileName
                onError={onError}
                onSuccess={onSuccess}
                className='hidden'
                ref={ref}
              />
              <div className='cursor-pointer' onClick={()=>ref.current.click()}>{children}</div>

            </IKContext>
    </div>
  )
}

export default Upload
