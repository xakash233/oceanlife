"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Styles from "./ServiceSlider.module.css";
import Link from "next/link";
import Image from "next/image";

// Register GSAP Plugins only on the client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: 1,
    title: "Turnkey Solutions",
    imgSrc: "/interior.webp",
    link: "/services/turnkey-solutions",
  },
  {
    id: 2,
    title: "Interior Fit-Out Services",
    imgSrc: "/fitOuts.webp",
    link: "/services/interior-fit-out-services",
  },
  {
    id: 3,
    title: "Civil Construction",
    imgSrc: "/services/civil1.webp",
    link: "/services/civil-construction",
  },
  {
    id: 4,
    title: "Real Estate Development",
    imgSrc: "/designBuild.webp",
    link: "/services/real-estate-development",
  },
  {
    id: 5,
    title: "Infrastructure Development",
    imgSrc: "/marine.webp",
    link: "/services/infrastructure-development",
  },
  {
    id: 6,
    title: "Data Centre Project Expertise",
    imgSrc: "/interior/home-interior.webp",
    link: "/services/data-centre-project-expertise",
  },
  {
    id: 7,
    title: "Hospitals and Hospitality",
    imgSrc: "/services/hotelgreysuit.webp",
    link: "/services/hospitals-and-hospitality",
  },
];

const ServiceSlider = () => {
  const sliderRef = useRef(null);
  const wrapRef = useRef(null);
  const serviceSectionRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const sliderContainerRef = useRef(null); // New container ref
  const isAnimating = useRef(false); // Prevent overlapping animations

  const numClones = 2; // Number of clones for looping effect

  // ScrollTrigger Animation Setup for the container
  useEffect(() => {
    const context = gsap.context(() => {
      // Create a GSAP timeline with ScrollTrigger for heading, button, and container
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: serviceSectionRef.current,
          start: "top 80%", // Trigger when the section is 80% in the viewport
          end: "bottom top", // End when the bottom of the section reaches the top
          once: true, // Ensure it triggers only once
        },
      });

      // Animate headings and button sequentially
      tl.from(headingRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
      })
        .from(
          buttonRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1,
          },
          "-=0.5" // Overlap animations slightly
        )
        // Apply animation to the slider container
        .from(
          sliderContainerRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 1,
          },
          "-=0.5"
        );
    }, serviceSectionRef);

    return () => {
      // Clean up ScrollTrigger and GSAP context
      context.revert();
    };
  }, []);

  // Slider Navigation Logic
  const handleNext = () => {
    if (isAnimating.current) return;
    const slider = sliderRef.current;
    if (!slider) return;

    isAnimating.current = true;
    const card = slider.children[0];
    const step = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
    const totalWidth = (slider.scrollWidth / (1 + numClones));

    gsap.to(slider, {
      x: `-=${step}`,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        const currentX = gsap.getProperty(slider, "x");
        if (currentX <= -totalWidth) {
          gsap.set(slider, { x: currentX + totalWidth });
        }
        isAnimating.current = false;
      },
    });
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    const slider = sliderRef.current;
    if (!slider) return;

    isAnimating.current = true;
    const card = slider.children[0];
    const step = card.offsetWidth + parseFloat(getComputedStyle(card).marginRight);
    const totalWidth = (slider.scrollWidth / (1 + numClones));

    gsap.to(slider, {
      x: `+=${step}`,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        const currentX = gsap.getProperty(slider, "x");
        if (currentX >= 0) {
          gsap.set(slider, { x: currentX - totalWidth });
        }
        isAnimating.current = false;
      },
    });
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Clone elements to create infinite scroll effect
    const cloneElements = () => {
      const children = Array.from(slider.children);
      if (children.length <= services.length) {
        // Only clone if not already cloned
        for (let i = 0; i < numClones; i++) {
          children.forEach((child) => {
            const clone = child.cloneNode(true);
            clone.style.opacity = 1;
            slider.appendChild(clone);
          });
        }
      }
    };

    cloneElements();
    
    // Set initial position to the middle set of clones if needed, 
    // but starting at 0 is fine with the current logic.
  }, []);

  return (
    <section
      className={Styles.serviceSliderSection}
      ref={serviceSectionRef}
    >
      <div className="container">
        <div className={Styles.rowServiceSlider}>
          <div className={Styles.columnServiceSlider} ref={headingRef}>
            <h4>Redefining Excellence, Delivering Perfection</h4>
            <h2>Our Services</h2>
          </div>
          <div className={Styles.columnServiceSlider} ref={buttonRef}>
            <div className={Styles.navigationButtons}>
              <button className={Styles.arrowBtn} onClick={handlePrev}>
                <BsArrowLeft />
              </button>
              <button className={Styles.arrowBtn} onClick={handleNext}>
                <BsArrowRight />
              </button>
            </div>
            <Link href="/services">
              <button className={Styles.cta}>
                <span>Learn More</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Slider container */}
        <div
          ref={sliderContainerRef}
          style={{ overflow: "hidden", width: "100%", position: "relative" }}
        >
          <div ref={wrapRef} style={{ overflow: "hidden", width: "100%" }}>
            <div
              ref={sliderRef}
              style={{ display: "flex", width: "max-content" }}
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  style={{
                    flex: "0 0 auto",
                    width: "30vw",
                    marginRight: "2vw",
                  }}
                  className={Styles.cardServiceSlider}
                >
                  <Link href={service.link}>
                    <Image
                      src={service.imgSrc}
                      alt={service.title}
                      width={600}
                      height={338}
                    />
                    <h3 style={{ textAlign: "left" }}>{service.title}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSlider;
