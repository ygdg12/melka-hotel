import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (inner) {
        inner.style.left = mouseX + 'px';
        inner.style.top = mouseY + 'px';
      }
    };

    const onMouseDown = () => outer?.classList.add('click');
    const onMouseUp = () => outer?.classList.remove('click');

    const onMouseEnterLink = () => outer?.classList.add('hover');
    const onMouseLeaveLink = () => outer?.classList.remove('hover');

    const attachLinkListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    const animate = () => {
      outerX += (mouseX - outerX) * 0.12;
      outerY += (mouseY - outerY) * 0.12;
      if (outer) {
        outer.style.left = outerX + 'px';
        outer.style.top = outerY + 'px';
      }
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    raf = requestAnimationFrame(animate);
    attachLinkListeners();

    const observer = new MutationObserver(attachLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  );
};

export default CustomCursor;
