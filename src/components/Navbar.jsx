import React, { useEffect, useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti';
import Button from './Button';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navItems=['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

const Navbar = () => {

  const [isAudioPlaying,setIsAudioPlaying]=useState(false);
  const [isIndicatorActive,setIsIndicatorActive]=useState(false);
  const [lastScrollY, setLastScrollY]=useState(0);
  const [isNavVisible,setIsNavVisible]=useState(true);

  const NavContainerRef=useRef(null);
  const audioElementRef=useRef(null);

  //Getting the y property of user's scroll
  const {y: currentScrollY}=useWindowScroll();

  useEffect(()=>{
    if(currentScrollY===0){ //It is the top most position
      setIsNavVisible(true);
      NavContainerRef.current.classList.remove('floating-nav');
    }else if(currentScrollY>lastScrollY){
        setIsNavVisible(false);
        NavContainerRef.current.classList.add('floating-nav');
    }else if(currentScrollY<lastScrollY){
      setIsNavVisible(true);
      NavContainerRef.current.classList.add('floating-nav');
    }
    setLastScrollY(currentScrollY);
  },[currentScrollY,lastScrollY]);

  useEffect(()=>{
    gsap.to(NavContainerRef.current,{
      y:isNavVisible? 0 : -100,
      opacity:isNavVisible? 1 : 0,
      duration: 0.2,
    })
  },[isNavVisible]);


  // Function to play music
  const toggleAudioIndicatior=()=>{
    setIsAudioPlaying((prev)=>!prev);
    setIsIndicatorActive((prev=>!prev));
  };

  useEffect(()=>{
    if(isAudioPlaying){
      audioElementRef.current.play();
    }else{
      audioElementRef.current.pause();
    }
  },[isAudioPlaying]);
  return (

    <div ref={NavContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>

         {/* //Left side of Navbar */}
          <div className='flex items-center gap-7'>
            <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="logo" className='w-10'/>
            <Button
              id="product-button" title="Products" rightIcon={<TiLocationArrow/>}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>
          
          {/* Right side of the Navbar */}
          <div className='flex h-full items-center'>
            {/* Hidden in phones but in medium or larger screens, visible */}
            <div className='hidden md:block'>
              {navItems.map((items)=>{
                  return(
                    <a key={items} href={`#${items.toLowerCase()}`} className='nav-hover-btn'>
                    {items}
                  </a>
                  );
              })}
            </div>
            
            {/* Music Button */}
            <button className='ml-10 flex items-center space-x-0.5' onClick={toggleAudioIndicatior}>
              <audio ref={audioElementRef} className= "hidden" src={`${import.meta.env.BASE_URL}audio/loop.mp3`} loop/>
                {/* Showing audio lines */}
                {[1,2,3,4].map((bar)=>(
                  <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : ''}`} style={{animationDelay: `${bar*0.1}s`}} />
                ))}
            </button>
          </div>
        </nav>
      </header>
    

    </div>
  )
}

export default Navbar
