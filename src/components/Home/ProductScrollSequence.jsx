import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProductScrollSequence = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const frameCount = 240;
  const currentFrame = (index) => 
    `/images/product-frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Original Image Resolution
    canvas.width = 1920;
    canvas.height = 1080;

    const images = [];
    const sequence = { frame: 1 };

    let loadedImages = 0;
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedImages++;
        setLoadingProgress(Math.round((loadedImages / frameCount) * 100));
        if (loadedImages === frameCount) render();
      };
      images.push(img);
    }

    const render = () => {
      const img = images[sequence.frame - 1];
      if (img) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Drawing image to fill the canvas resolution exactly
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600%", 
        pin: true,
        scrub: 1, 
      }
    });

    tl.to(sequence, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      duration: 10, 
      onUpdate: render,
    }, 0); 

    // Text Animations with Sky Blue color
    tl.fromTo(".text-left", 
      { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2 }, 1 
    ).to(".text-left", { opacity: 0, y: -50, duration: 2 }, 3.5);

    tl.fromTo(".text-right", 
      { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2 }, 6 
    ).to(".text-right", { opacity: 0, y: -50, duration: 2 }, 8.5);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-black">
      {/* Original Preloader */}
      {loadingProgress < 100 && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
          <div className="text-2xl font-bold tracking-[0.2em] mb-4">UNICORE</div>
          <div className="w-64 h-[2px] bg-gray-800">
            <div className="h-full bg-yellow-600 transition-all" style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <div className="mt-2 text-xs text-gray-500">{loadingProgress}%</div>
        </div>
      )}

      <section ref={sectionRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        
        {/* Full Image Display - No Cropping */}
        <div className="w-full h-full flex items-center justify-center pointer-events-none p-4">
          <canvas 
            ref={canvasRef} 
            className="max-w-full max-h-full object-contain" 
            style={{ 
                aspectRatio: "16/9", // Match your 1920/1080 ratio
                width: 'auto',
                height: 'auto'
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 w-full h-full flex flex-col justify-between p-8 md:p-24 pointer-events-none">
          
          <div className="text-left text-white max-w-xl">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-[0.9]">
              Advanced <br /><span className="text-[#0ea5e9] text-2xl md:text-5xl">Sealant Tech</span>
            </h2>
            <p className="mt-4 text-gray-300 text-base md:text-lg border-l-2 border-[#0ea5e9] pl-4">
              Unicore liquid instantly seals punctures, keeping your journey smooth.
            </p>
          </div>

          <div className="text-right text-white self-end max-w-xl">
             <h2 className="text-4xl md:text-7xl font-black italic uppercase leading-[0.9]">
              Ride <br /><span className="text-[#0ea5e9] text-2xl md:text-5xl">Fearless</span>
            </h2>
            <p className="mt-4 text-gray-300 text-base md:text-lg border-right-2 border-[#0ea5e9] pr-4">
              Engineered for maximum durability and ultimate tyre protection.
            </p>
          </div>

        </div>
      </section>

      <div className="h-[20vh] bg-black"></div>
    </div>
  );
};

export default ProductScrollSequence;