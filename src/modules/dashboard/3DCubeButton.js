// CubeButton.jsx - FIXED Ctrl+Click Support
import React, { useRef, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import DemoPage from './demopage';
import './demopage.css'
const CubeButton = () => {
  const history = useHistory();
  const containerRef = useRef(null);
  const cubeRef = useRef(null);

  const [rotationX, setRotationX] = React.useState(0);
  const [rotationY, setRotationY] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const animationRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // ✅ FIXED: Proper drag detection + Ctrl+Click
  const handleMouseDown = useCallback((e) => {
    // Allow Ctrl+Click through
    if (e.ctrlKey) return;
 
    
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseUp = useCallback((e) => {
    // ✅ Ctrl+Click navigation works!
    if (e.ctrlKey) {
      history.push('/DemoPage');
      return;
    }
    
    setIsDragging(false);
  }, [history]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !containerRef.current || !cubeRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = (e.clientX - dragStartPos.current.x) * 0.3;
    const deltaY = (e.clientY - dragStartPos.current.y) * 0.3;

    setRotationY((prev) => (prev + deltaX) % 360);
    setRotationX((prev) => Math.max(-90, Math.min(90, prev - deltaY)));
    
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handleContainerClick = useCallback((e) => {
    // ✅ Prevent drag conflicts - only navigate on container click without Ctrl
    if (e.ctrlKey || isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    history.push('/Demopage');
  }, [history, isDragging]);

  // Auto-rotation
  const autoRotate = useCallback(() => {
    if (!isDragging) {
      setRotationY((prev) => (prev + 0.2) % 360);
    }
    animationRef.current = requestAnimationFrame(autoRotate);
  }, [isDragging]);

  useEffect(() => {
    if (cubeRef.current) {
      cubeRef.current.style.transform = `
        rotateX(${rotationX}deg) 
        rotateY(${rotationY}deg) 
        scale(1.05)
      `;
    }
  }, [rotationX, rotationY]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('click', handleContainerClick);

    autoRotate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('click', handleContainerClick);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleContainerClick, autoRotate]);

  return (
    <div className="cube-container" ref={containerRef}>
      <div className="box-card" ref={cubeRef}>
        <div className="face front">DEMO</div>
        <div className="face back">BOOK</div>
        <div className="face right">DEMO</div>
        <div className="face left">BOOK</div>
        <div className="face top">DEMO</div>
        <div className="face bottom">DEMO</div>
      </div>
    </div>
  );
};

export default CubeButton;
