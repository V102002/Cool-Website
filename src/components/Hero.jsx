import { useRef, useState, useEffect } from "react"
import Button from './Button';
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'; 

import {ScrollTrigger} from 'gsap/all';
gsap.registerPlugin(ScrollTrigger); 
const Hero = () => {
  // Keep track of what video is playing
  const [CurrentIndex,setCurrentIndex] = useState(1);
  // Make Sure the user has Clicked anything
  const[hasClicked,setHasClicked]= useState(false);
  // Loading on Clicked
  const [isLoading, setisLoading] = useState(true);
  // Number of Videos loaded
  const [loadedVideo, setLoadedVideo]=useState(0);

  const totalVideos=4;
  // Want to target a DOM element
  const nextVideoRef= useRef(null);

  const handleVideoLoad=()=>{
    setLoadedVideo((prev) => prev+1);
  }

  const UpcomingVideoIndex= (CurrentIndex%totalVideos)+1;

  const handleMinVideoCLick = () =>{
    // On click what should the function do
    setHasClicked(true);
    setCurrentIndex(UpcomingVideoIndex);
  }

  useEffect(()=>{
    if (loadedVideo===totalVideos-1) {
      setisLoading(false);
    }
  },[loadedVideo])

  useGSAP(()=>{
    if (hasClicked) {
      gsap.set('#next-video', {visibility:'visible'});
      gsap.to('#next-video',{
        transformOrigin: 'center center',
        scale:1,
        height:'100%',
        width:'100%',
        duration:1,
        ease:'power1.inOut',
        onStart:()=> nextVideoRef.current.play(),
      })

      gsap.from('#current-video', {
        transformOrigin:'center center',
        scale:0,
        duration:1.5,
        ease:'power1.inOut'
      })
      
    }
  },{dependencies: [CurrentIndex], revertOnUpdate:true})

  useGSAP(()=>{  
    gsap.set('#video-frame',{
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius:'0 0 40% 10%'
    })
    //Starting animation
    gsap.from('#video-frame',{
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius:'0 0 0 0',
      ease:'power1.inOut',
      scrollTrigger:{ //When the animation should start
        trigger:'#video-frame',
        start:'center center',
        end:'bottom center',
        scrub:true,
      }
    })

  })

  const getVideoSrc=(index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">

      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div onClick={handleMinVideoCLick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
              <video 
                ref={nextVideoRef}
                src={getVideoSrc(UpcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            src={getVideoSrc(CurrentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          <video 
            src={getVideoSrc(CurrentIndex=== totalVideos-1? 1: CurrentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the MetaGame Layer <br/>Unleash The Play Economy</p>

            <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>} containerClass="!bg-yellow-300 flex-center gap-1"/>
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
          G<b>a</b>ming
        </h1>
    </div>
  )
}

export default Hero
