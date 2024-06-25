import React, { useEffect, useRef } from 'react';
import Hammer from 'hammerjs';

const TwoFingerSwipeTest = () => {
  const swipeRef = useRef(null);

  useEffect(() => {
    const hammer = new Hammer.Manager(swipeRef.current);

    // Add a recognizer for two-finger swipes
    hammer.add(new Hammer.Swipe({ pointers: 2 }));

    hammer.on('swipeleft', () => console.log('Two-finger swiped left'));
    hammer.on('swiperight', () => console.log('Two-finger swiped right'));
    hammer.on('swipeup', () => console.log('Two-finger swiped up'));
    hammer.on('swipedown', () => console.log('Two-finger swiped down'));

    return () => {
      hammer.off('swipeleft');
      hammer.off('swiperight');
      hammer.off('swipeup');
      hammer.off('swipedown');
    };
  }, []);

  return (
    <div ref={swipeRef} className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-10 bg-white rounded shadow">
        Two-finger swipe here
      </div>
    </div>
  );
};

export default TwoFingerSwipeTest;
