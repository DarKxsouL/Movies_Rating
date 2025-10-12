


import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 

export default function HorizontalScroller({ children }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 1);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };
  
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition, { passive: true });
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [children]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const firstItem = container.children[0];
      let scrollAmount = container.clientWidth * 0.7; 

      if (firstItem) {
        const itemWidth = firstItem.offsetWidth;
        const gap = 25;
        const itemsToScroll = 3;
        scrollAmount = (itemWidth + gap) * itemsToScroll;
      }
      
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;

      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  // Manual Drag Handling
  const handlePan = (event, info) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft -= info.delta.x;
    }
  };

  return (
    <div className="scroll-wrapper">
      {canScrollLeft && (
        <button className="scroll-btn left" onClick={() => scroll('left')}>
          <ChevronLeft />
        </button>
      )}

      <motion.div
        className="card-list-container"
        ref={scrollContainerRef}
        onPan={handlePan}
        style={{ touchAction: 'pan-y' }} 
      >
        {children}
      </motion.div>

      {canScrollRight && (
        <button className="scroll-btn right" onClick={() => scroll('right')}>
          <ChevronRight />
        </button>
      )}
    </div>
  );
}