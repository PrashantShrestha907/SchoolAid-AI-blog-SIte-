import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { IKImage } from "imagekitio-react";
import BlurText from "../Components/BlurText";

const Aboutus = () => {
  const [showdiv, Setshowdiv] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      Setshowdiv(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="px-8 md:px-8 lg:px-16 xl:px-32">
      <Navbar />

      <div
        className={
          showdiv
            ? "relative h-[40rem] md:h-[30rem] my-20 rounded-3xl transition-all duration-[4000ms] ease-in-out"
            : "relative h-[40rem] md:h-[30rem] my-20 rounded-3xl shadow-2xl transition-all duration-[4000ms] ease-in-out"
        }
      >
        <div
          className={
            showdiv
              ? "absolute top-[-150%] left-0 w-1/2 h-full transition-all duration-[900ms]ease-in-out"
              : "absolute top-0 left-0 w-1/2 h-full transition-all duration-[900ms] ease-in-out"
          }
        >
          <IKImage
            urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
            path="/Workspace.jpg"
            loading="lazy"
            lqip={{ active: true, quality: 20 }}
            className="object-cover w-full h-full rounded-tl-3xl rounded-bl-3xl"
          />
        </div>

        <div
          className={
            showdiv
              ? "absolute top-[-150%] right-0 w-1/2 h-full bg-[#bbaaca9f] text-justify text-[#454555] px-8 py-8 rounded-tr-3xl rounded-br-3xl transition-all duration-[900ms] ease-in-out"
              : "absolute top-0 right-0 w-1/2 h-full bg-[#2C2175] text-justify text-[#f1f1f3] px-8 py-8 rounded-tr-3xl rounded-br-3xl transition-all duration-[900ms] ease-in-out"
          }
        >
          <div className="flex flex-col gap-4 h-full justify-center">
            <h1 className="font-bold text-2xl self-start pt-4">
              <BlurText
                text="About Us"
                delay={120}
                animateBy="letters"
                direction="top"
                className="text-2xl mb-8"
              />
            </h1>
            <p className="xl:text-2xl lg:text-xl text-base">
              Where Young Minds Shine Bright — Welcome to Your Creative Space!
            </p>
            <p className="text-[#FFDB70] text-xs md:text-sm lg:text-base mt-4">
              Step into the digital hub where imagination meets expression! Our
              School Blog System is more than just a platform — it’s a vibrant
              space where students share ideas, tell stories, spark discussions,
              and explore creativity. Whether it's poetry, project reflections,
              opinion pieces, or exciting innovations, every student gets a
              voice and every voice matters. Join the conversation. Inspire and
              be inspired. Your thoughts belong here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
