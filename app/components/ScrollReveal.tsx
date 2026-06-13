"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  delay?: number; // Animation delay in milliseconds
  duration?: number; // Animation duration in milliseconds
}

export default function ScrollReveal({ 
  children, 
  className = "", 
  threshold = 0.05,
  direction = "up",
  delay = 0,
  duration = 800
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fallback: show content immediately if Intersection Observer is missing
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const currentElement = elementRef.current;
    if (!currentElement) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentElement);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  // Determine starting transform classes
  const getDirectionClass = () => {
    switch (direction) {
      case "down": return "reveal-hidden-down";
      case "left": return "reveal-hidden-left";
      case "right": return "reveal-hidden-right";
      case "scale": return "reveal-hidden-scale";
      case "up":
      default:
        return "reveal-hidden-up";
    }
  };

  return (
    <div 
      ref={elementRef} 
      className={`${className} ${isVisible ? "reveal-active" : `reveal-hidden ${getDirectionClass()}`}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform, opacity"
      }}
    >
      {children}
    </div>
  );
}
