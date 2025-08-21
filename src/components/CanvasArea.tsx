import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function CanvasArea() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.metaKey)) { // Middle click or Cmd+click
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  return (
    <div 
      className="flex-1 bg-canvas overflow-hidden relative cursor-default select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--canvas-grid)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--canvas-grid)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: `translate(${panOffset.x % 20}px, ${panOffset.y % 20}px)`
        }}
      />

      {/* Canvas Content */}
      <div 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px)`
        }}
      >
        {/* Sample Frames */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Main Desktop Frame */}
          <div className="bg-background border-2 border-primary rounded-lg shadow-lg relative group">
            <div className="w-96 h-64 p-6">
              <div className="text-lg font-semibold mb-4 text-foreground">Landing Page</div>
              
              {/* Header */}
              <div className="bg-secondary rounded p-3 mb-3">
                <div className="flex items-center justify-between">
                  <div className="w-16 h-4 bg-primary rounded"></div>
                  <div className="flex gap-2">
                    <div className="w-12 h-3 bg-muted rounded"></div>
                    <div className="w-12 h-3 bg-muted rounded"></div>
                    <div className="w-12 h-3 bg-muted rounded"></div>
                  </div>
                </div>
              </div>

              {/* Hero Section */}
              <div className="bg-card rounded p-4 mb-3">
                <div className="w-32 h-4 bg-foreground rounded mb-2"></div>
                <div className="w-24 h-3 bg-muted rounded mb-3"></div>
                <div className="w-20 h-6 bg-primary rounded"></div>
              </div>

              {/* Content Cards */}
              <div className="flex gap-2">
                <div className="flex-1 bg-secondary rounded p-2">
                  <div className="w-full h-2 bg-muted rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-muted rounded"></div>
                </div>
                <div className="flex-1 bg-secondary rounded p-2">
                  <div className="w-full h-2 bg-muted rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-muted rounded"></div>
                </div>
              </div>
            </div>

            {/* Frame Label */}
            <div className="absolute -top-8 left-0 text-sm font-medium text-foreground bg-card px-2 py-1 rounded border border-border">
              Desktop - 1440x900
            </div>

            {/* Selection Handles */}
            <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -left-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -right-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>

          {/* Mobile Frame */}
          <div className="absolute left-full top-0 ml-12 bg-background border border-border rounded-lg shadow-lg group">
            <div className="w-48 h-80 p-4">
              <div className="text-sm font-semibold mb-3 text-foreground">Mobile</div>
              
              {/* Mobile Header */}
              <div className="bg-secondary rounded p-2 mb-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-2 bg-primary rounded"></div>
                  <div className="w-4 h-2 bg-muted rounded"></div>
                </div>
              </div>

              {/* Mobile Content */}
              <div className="bg-card rounded p-3 mb-2">
                <div className="w-20 h-3 bg-foreground rounded mb-2"></div>
                <div className="w-16 h-2 bg-muted rounded mb-2"></div>
                <div className="w-12 h-4 bg-primary rounded"></div>
              </div>

              <div className="space-y-2">
                <div className="bg-secondary rounded p-2">
                  <div className="w-full h-2 bg-muted rounded"></div>
                </div>
                <div className="bg-secondary rounded p-2">
                  <div className="w-full h-2 bg-muted rounded"></div>
                </div>
              </div>
            </div>

            {/* Mobile Frame Label */}
            <div className="absolute -top-8 left-0 text-sm font-medium text-foreground bg-card px-2 py-1 rounded border border-border">
              iPhone 14 - 390x844
            </div>

            {/* Mobile Selection Handles */}
            <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -left-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -right-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>

          {/* Tablet Frame */}
          <div className="absolute left-0 top-full mt-12 bg-background border border-border rounded-lg shadow-lg group">
            <div className="w-80 h-56 p-4">
              <div className="text-sm font-semibold mb-3 text-foreground">Tablet</div>
              
              {/* Tablet Header */}
              <div className="bg-secondary rounded p-2 mb-2">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-3 bg-primary rounded"></div>
                  <div className="flex gap-2">
                    <div className="w-8 h-2 bg-muted rounded"></div>
                    <div className="w-8 h-2 bg-muted rounded"></div>
                    <div className="w-8 h-2 bg-muted rounded"></div>
                  </div>
                </div>
              </div>

              {/* Tablet Content */}
              <div className="bg-card rounded p-3 mb-2">
                <div className="w-28 h-3 bg-foreground rounded mb-2"></div>
                <div className="w-20 h-2 bg-muted rounded mb-2"></div>
                <div className="w-16 h-5 bg-primary rounded"></div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-secondary rounded p-2">
                  <div className="w-full h-2 bg-muted rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-muted rounded"></div>
                </div>
                <div className="bg-secondary rounded p-2">
                  <div className="w-full h-2 bg-muted rounded mb-1"></div>
                  <div className="w-3/4 h-2 bg-muted rounded"></div>
                </div>
              </div>
            </div>

            {/* Tablet Frame Label */}
            <div className="absolute -top-8 left-0 text-sm font-medium text-foreground bg-card px-2 py-1 rounded border border-border">
              iPad - 1024x768
            </div>

            {/* Tablet Selection Handles */}
            <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>  
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -left-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -right-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>

          {/* Component Frame */}
          <div className="absolute right-0 top-full mt-12 ml-12 bg-background border border-accent rounded-lg shadow-lg group">
            <div className="w-64 h-32 p-3">
              <div className="text-sm font-semibold mb-2 text-foreground">Button Component</div>
              
              {/* Component Content */}
              <div className="flex gap-2 mb-2">
                <div className="bg-primary rounded px-4 py-2">
                  <div className="w-12 h-2 bg-primary-foreground rounded"></div>
                </div>
                <div className="bg-secondary rounded px-4 py-2">
                  <div className="w-12 h-2 bg-secondary-foreground rounded"></div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="border border-border rounded px-3 py-1">
                  <div className="w-8 h-1 bg-muted rounded"></div>
                </div>
                <div className="bg-destructive rounded px-3 py-1">
                  <div className="w-8 h-1 bg-destructive-foreground rounded"></div>
                </div>
              </div>
            </div>

            {/* Component Frame Label */}
            <div className="absolute -top-8 left-0 text-sm font-medium text-accent bg-card px-2 py-1 rounded border border-accent">
              Component Library
            </div>

            {/* Component Selection Handles */}
            <div className="absolute inset-0 border-2 border-accent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent rounded-full"></div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent rounded-full"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -left-1 w-2 h-2 bg-accent rounded-full"></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 -right-1 w-2 h-2 bg-accent rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-accent rounded-full"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent rounded-full"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Controls */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="bg-card border border-border rounded px-3 py-1 text-sm font-medium text-foreground shadow-lg">
          100%
        </div>
        <div className="bg-card border border-border rounded px-3 py-1 text-sm text-muted-foreground shadow-lg">
          {Math.round(-panOffset.x)}, {Math.round(-panOffset.y)}
        </div>
      </div>
    </div>
  );
}