import React, { useRef, useEffect, useState } from 'react';
import { Canvas as FabricCanvas, Circle, Rect, FabricText, PencilBrush, Point } from 'fabric';
import { cn } from '@/lib/utils';

interface CanvasAreaProps {
  activeTool?: string;
  activeColor?: string;
}

export function CanvasArea({ activeTool = 'select', activeColor = '#6366f1' }: CanvasAreaProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 1200,
      height: 800,
      backgroundColor: 'hsl(var(--canvas))',
      selection: activeTool === 'select',
    });

    // Initialize drawing brush
    canvas.freeDrawingBrush = new PencilBrush(canvas);
    canvas.freeDrawingBrush.color = activeColor;
    canvas.freeDrawingBrush.width = 2;

    // Add sample objects
    const sampleRect = new Rect({
      left: 100,
      top: 100,
      fill: 'hsl(var(--primary))',
      width: 200,
      height: 120,
      rx: 8,
      ry: 8,
    });

    const sampleCircle = new Circle({
      left: 350,
      top: 100,
      fill: 'hsl(var(--accent))',
      radius: 60,
    });

    const sampleText = new FabricText('Sample Text', {
      left: 100,
      top: 250,
      fontFamily: 'Inter, sans-serif',
      fontSize: 24,
      fill: 'hsl(var(--foreground))',
    });

    canvas.add(sampleRect, sampleCircle, sampleText);
    setFabricCanvas(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  // Handle tool changes
  useEffect(() => {
    if (!fabricCanvas) return;

    fabricCanvas.isDrawingMode = activeTool === 'pen';
    fabricCanvas.selection = activeTool === 'select';
    
    if (activeTool === 'pen' && fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush.color = activeColor;
      fabricCanvas.freeDrawingBrush.width = 2;
    }

    // Handle shape creation
    if (activeTool === 'rectangle') {
      const rect = new Rect({
        left: 200 + Math.random() * 200,
        top: 200 + Math.random() * 200,
        fill: activeColor,
        width: 100,
        height: 80,
        rx: 4,
        ry: 4,
      });
      fabricCanvas.add(rect);
    } else if (activeTool === 'ellipse') {
      const circle = new Circle({
        left: 200 + Math.random() * 200,
        top: 200 + Math.random() * 200,
        fill: activeColor,
        radius: 50,
      });
      fabricCanvas.add(circle);
    } else if (activeTool === 'text') {
      const text = new FabricText('New Text', {
        left: 200 + Math.random() * 200,
        top: 200 + Math.random() * 200,
        fontFamily: 'Inter, sans-serif',
        fontSize: 18,
        fill: activeColor,
      });
      fabricCanvas.add(text);
    }
  }, [activeTool, activeColor, fabricCanvas]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTool === 'hand' || e.button === 1 || (e.button === 0 && e.metaKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && fabricCanvas) {
      const deltaX = e.clientX - panStart.x;
      const deltaY = e.clientY - panStart.y;
      setPanOffset({ x: deltaX, y: deltaY });
      
      fabricCanvas.relativePan(new Point(deltaX - panOffset.x, deltaY - panOffset.y));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!fabricCanvas) return;
    
    e.preventDefault();
    const delta = e.deltaY;
    let newZoom = fabricCanvas.getZoom();
    newZoom *= 0.999 ** delta;
    
    if (newZoom > 20) newZoom = 20;
    if (newZoom < 0.01) newZoom = 0.01;
    
    setZoom(newZoom);
    fabricCanvas.zoomToPoint(new Point(e.nativeEvent.offsetX, e.nativeEvent.offsetY), newZoom);
  };

  return (
    <div 
      className="flex-1 bg-canvas overflow-hidden relative select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--canvas-grid)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--canvas-grid)) 1px, transparent 1px)
          `,
          backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
          transform: `translate(${panOffset.x % (20 * zoom)}px, ${panOffset.y % (20 * zoom)}px)`
        }}
      />

      {/* Fabric.js Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="border border-border rounded-lg shadow-canvas"
          style={{
            cursor: activeTool === 'hand' ? 'grab' : activeTool === 'pen' ? 'crosshair' : 'default'
          }}
        />
      </div>

      {/* Canvas Controls */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="bg-card border border-border rounded px-3 py-1 text-sm font-medium text-foreground shadow-lg">
          {Math.round(zoom * 100)}%
        </div>
        <div className="bg-card border border-border rounded px-3 py-1 text-sm text-muted-foreground shadow-lg">
          Objects: {fabricCanvas?.getObjects().length || 0}
        </div>
      </div>

      {/* Tool Instructions */}
      <div className="absolute top-4 left-4 bg-card border border-border rounded px-3 py-2 text-sm text-muted-foreground shadow-lg max-w-xs">
        {activeTool === 'select' && 'Click and drag to select objects. Hold Ctrl/Cmd+click to pan.'}
        {activeTool === 'rectangle' && 'Click to add rectangles to the canvas.'}
        {activeTool === 'ellipse' && 'Click to add circles to the canvas.'}
        {activeTool === 'text' && 'Click to add text to the canvas.'}
        {activeTool === 'pen' && 'Draw freehand on the canvas.'}
        {activeTool === 'hand' && 'Pan around the canvas by dragging.'}
        {activeTool === 'frame' && 'Click to create frames for organizing content.'}
      </div>
    </div>
  );
}