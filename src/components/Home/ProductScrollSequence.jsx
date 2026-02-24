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
    canvas.width = 1920;
    canvas.height = 1080;

    const images = [];
    const sequence = { frame: 1 };

    // Preloading Logic
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
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    // --- MAIN SYNCHRONIZED TIMELINE ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=800%", // Scroll depth badha di taaki slow aur premium lage
        pin: true,
        scrub: 1, 
      }
    });

    // 1. Frames: Ye poori timeline (duration 10) tak chalega
    tl.to(sequence, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      duration: 10, 
      onUpdate: render,
    }, 0); 

    // 2. Left Content: Jab frames 10% par hon tab aaye, 40% par chala jaye
    tl.fromTo(".text-left", 
      { opacity: 0, y: 50, filter: "blur(10px)" }, 
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 2 }, 
      1 // Start position
    ).to(".text-left", 
      { opacity: 0, y: -50, filter: "blur(10px)", duration: 2 }, 
      3 // End position
    );

    // 3. Right Content: Jab frames 60% par hon tab aaye, 90% par jaye
    tl.fromTo(".text-right", 
      { opacity: 0, y: 50, filter: "blur(10px)" }, 
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 2 }, 
      6 // Start position
    ).to(".text-right", 
      { opacity: 0, y: -50, filter: "blur(10px)", duration: 2 }, 
      8 // End position
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-black">
      {/* Premium Loader */}
      {loadingProgress < 100 && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
          <div className="text-2xl font-bold tracking-[0.2em] mb-4">UNICORE</div>
          <div className="w-64 h-[2px] bg-gray-800">
            <div className="h-full bg-yellow-600 transition-all" style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <div className="mt-2 text-xs text-gray-500">{loadingProgress}%</div>
        </div>
      )}

      <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
        
        {/* Background Frames (Canvas) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-10 md:p-24 pointer-events-none">
          
          {/* Top Left Text */}
          <div className="text-left text-white text-left max-w-lg">
            <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.9]">
              Pure <br /><span className="text-yellow-500 text-3xl md:text-5xl">Dry Fruit Power</span>
            </h2>
            <p className="mt-6 text-gray-400 text-lg border-l-2 border-yellow-500 pl-4">
              Hamare UNICORE powder me milta hai asli dry fruits ka swad aur ayurvedic shakti.
            </p>
          </div>

          {/* Bottom Right Text */}
          <div className="text-right text-white text-right self-end max-w-lg">
             <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.9]">
              Healthy <br /><span className="text-yellow-500 text-3xl md:text-5xl">Daily Routine</span>
            </h2>
            <p className="mt-6 text-gray-400 text-lg border-right-2 border-yellow-500 pr-4">
              Health aur energy ke liye ek behtareen premium choice.
            </p>
          </div>

        </div>

        {/* Subtle Vignette for Professional Look */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none"></div>
      </section>

      {/* Spacer to allow for scroll completion */}
      <div className="h-screen bg-black"></div>
    </div>
  );
};

export default ProductScrollSequence;