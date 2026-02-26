import React, { useEffect, useRef } from "react";

const HeroSequence = () => {
  const canvasRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);
  const introTextRef = useRef(null); // Naya ref intro text ke liye
  const totalFrames = 240;
  const imagesRef = useRef([]);

  // 1. Preload saari images
  useEffect(() => {
    const preloadImages = () => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const frameNumber = i.toString().padStart(3, "0");
        img.src = `/images/hero-frames/ezgif-frame-${frameNumber}.jpg`;
        imagesRef.current[i - 1] = img;

        if (i === 1) {
          img.onload = () => renderFrame(0);
        }
      }
    };
    preloadImages();
    
    window.addEventListener("resize", () => renderFrame(0));
    return () => window.removeEventListener("resize", () => renderFrame(0));
  }, []);

  // 2. Scroll Logic & Text Animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.getElementById("hero-scroll-container");
      if (!scrollContainer) return;

      const rect = scrollContainer.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      const scrollPosition = -rect.top;
      
      let scrollFraction = scrollPosition / maxScroll;
      if (scrollFraction < 0) scrollFraction = 0;
      if (scrollFraction > 1) scrollFraction = 1;

      // Frame calculate karna
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(scrollFraction * totalFrames)
      );

      // Animation frame request me render aur text animation dono handle karenge
      requestAnimationFrame(() => {
        renderFrame(frameIndex);
        animateText(scrollFraction);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Text ko Scroll ke hisaab se Fade In/Out karna
  const animateText = (fraction) => {
    
    // --- INTRO TEXT LOGIC (Naya) ---
    // Start me dikhega (opacity 1), thoda sa scroll karte hi (0 to 0.05) fade out ho jayega
    if (introTextRef.current) {
      let introOpacity = 1 - (fraction * 20); // 0.05 fraction par 0 ho jayega
      if (introOpacity < 0) introOpacity = 0;
      introTextRef.current.style.opacity = introOpacity;
    }

    // --- TOP TEXT LOGIC ---
    if (topTextRef.current) {
      let opacity = 0;
      let translateY = 20;

      if (fraction > 0.05 && fraction < 0.45) {
        if (fraction < 0.15) {
          opacity = (fraction - 0.05) / 0.1;
          translateY = 20 - (opacity * 20);
        } else if (fraction > 0.35) {
          opacity = 1 - ((fraction - 0.35) / 0.1);
          translateY = -(1 - opacity) * 20;
        } else {
          opacity = 1;
          translateY = 0;
        }
      }
      topTextRef.current.style.opacity = opacity;
      topTextRef.current.style.transform = `translateY(${translateY}px)`;
    }

    // --- BOTTOM TEXT LOGIC ---
    if (bottomTextRef.current) {
      let opacity = 0;
      let translateY = 20;

      if (fraction > 0.55 && fraction < 0.95) {
        if (fraction < 0.65) {
          opacity = (fraction - 0.55) / 0.1;
          translateY = 20 - (opacity * 20);
        } else if (fraction > 0.85) {
          opacity = 1 - ((fraction - 0.85) / 0.1);
          translateY = -(1 - opacity) * 20;
        } else {
          opacity = 1;
          translateY = 0;
        }
      }
      bottomTextRef.current.style.opacity = opacity;
      bottomTextRef.current.style.transform = `translateY(${translateY}px)`;
    }
  };

  // 4. Canvas rendering logic
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[index];

    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    let ratio = Math.min(hRatio, vRatio);
    
    if (ratio > dpr) {
        ratio = dpr; 
    }

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
    );
  };

  return (
    <>
      <div id="hero-scroll-container" className="relative w-full h-[400vh] bg-black">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-black">
          
          {/* INTRO TEXT (Naya): Center me rahega aur scroll start karte hi gayab hoga */}
          <div 
            ref={introTextRef}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none transition-opacity duration-75 text-white"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-widest drop-shadow-lg text-gray-200">
              SCROLL TO DISCOVER
            </h2>
            <div className="mt-4 animate-bounce">
              {/* Ek chota sa arrow icon bhi laga diya hai scroll hint ke liye */}
              <svg className="w-6 h-6 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>

          {/* TOP CONTENT */}
          <div 
            ref={topTextRef}
            className="absolute top-[22%] left-0 w-full z-10 px-6 text-center text-white pointer-events-none transition-opacity duration-75"
            style={{ opacity: 0 }} 
          >
            <h1 className="text-3xl md:text-5xl font-bold tracking-wide drop-shadow-lg">
              Unicore Tyre Protector
            </h1>
            <p className="text-sm md:text-base text-gray-300 mt-2 max-w-md mx-auto drop-shadow-md">
             Prevents & Repair.
            </p>
          </div>

          {/* CANVAS (Video) */}
          <canvas
            ref={canvasRef}
            className="block w-full h-full z-0"
          ></canvas>

          {/* BOTTOM CONTENT */}
          <div 
            ref={bottomTextRef}
            className="absolute bottom-[22%] left-0 w-full z-10 px-6 text-center text-white pointer-events-none transition-opacity duration-75"
            style={{ opacity: 0 }}
          >
            <h3 className="text-xl md:text-3xl font-semibold drop-shadow-lg">
              Self Sealing Agent
            </h3>
            <p className="text-sm md:text-base text-gray-300 mt-1 drop-shadow-md">
             Rapid Action System.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default HeroSequence;