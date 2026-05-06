"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import styles from "./DraggableSlider.module.css";

import services from "@/data/services.json";

const ServiceHeaderSlider = () => {
  const sliderRef = useRef(null);
  const wrapRef = useRef(null);
  const isAnimating = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const numSets = 3;
  const totalOriginal = services.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateProgress = (currentX, totalSetWidth) => {
    // Calculate progress based on the position relative to one set
    const progress = (Math.abs(currentX) % totalSetWidth) / totalSetWidth;
    setScrollProgress(progress * 100);
  };

  const handleNext = () => {
    if (isAnimating.current || !mounted) return;
    const slider = sliderRef.current;
    if (!slider) return;

    isAnimating.current = true;
    const card = slider.children[0];
    const step = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
    const totalSetWidth = (slider.scrollWidth / numSets);

    gsap.to(slider, {
      x: `-=${step}`,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function () {
        updateProgress(gsap.getProperty(slider, "x"), totalSetWidth);
      },
      onComplete: () => {
        const currentX = gsap.getProperty(slider, "x");
        if (currentX <= -totalSetWidth) {
          gsap.set(slider, { x: currentX + totalSetWidth });
        }
        isAnimating.current = false;
      },
    });
  };

  const handlePrev = () => {
    if (isAnimating.current || !mounted) return;
    const slider = sliderRef.current;
    if (!slider) return;

    isAnimating.current = true;
    const card = slider.children[0];
    const step = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
    const totalSetWidth = (slider.scrollWidth / numSets);

    gsap.to(slider, {
      x: `+=${step}`,
      duration: 0.5,
      ease: "power2.out",
      onUpdate: function () {
        updateProgress(gsap.getProperty(slider, "x"), totalSetWidth);
      },
      onComplete: () => {
        const currentX = gsap.getProperty(slider, "x");
        if (currentX >= 0) {
          gsap.set(slider, { x: currentX - totalSetWidth });
        }
        isAnimating.current = false;
      },
    });
  };

  const allServices = [];
  for (let i = 0; i < numSets; i++) {
    allServices.push(...services);
  }



  if (!mounted) {
    return <div style={{ height: "450px" }}></div>;
  }

  return (
    <div className={styles.sliderWrapper}>
      {/* Navigation and Scroller - Fixed and Visible */}


      <div
        ref={wrapRef}
        className={styles.sliderContainer}
      >

        <div
          ref={sliderRef}
          className={styles.sliderTrack}
          style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          {allServices.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className={styles.sliderCard}
            >
              <Link href={service.link}>
                <div className={styles.cardImage}>
                  <Image
                    src={service.imgSrc}
                    alt={service.title}
                    fill
                    draggable={false}
                    style={{
                      objectFit: "cover",
                      borderRadius: "20px",
                    }}
                    sizes="(max-width: 768px) 80vw, 38vw"
                  />
                </div>
                <h3 className={styles.cardHeading}>
                  {service.title}
                </h3>

              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottomNavigation}>
        <button className={styles.navArrow} onClick={handlePrev} aria-label="Previous">
          <BsArrowLeft />
        </button>
        <button className={styles.navArrow} onClick={handleNext} aria-label="Next">
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ServiceHeaderSlider;
