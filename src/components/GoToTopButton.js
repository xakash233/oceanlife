"use client";

import { useState, useEffect } from "react";

import { usePathname } from "next/navigation";

const GoToTopButton = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const isAdminRoute = pathname?.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) {
      setIsVisible(false);
      return;
    }

    // Show button when the user scrolls down 100px from the top
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="go-to-top-button"
        aria-label="Go to top"
      >
        ↑
      </button>
    )
  );
};

export default GoToTopButton;
