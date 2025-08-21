import React, { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { DesignToolbar } from '@/components/DesignToolbar';
import { LeftSidebar } from '@/components/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { CanvasArea } from '@/components/CanvasArea';

const Index = () => {
  const [activeTool, setActiveTool] = useState('select');
  const [activeColor, setActiveColor] = useState('#6366f1');

  const handleZoom = (direction: 'in' | 'out') => {
    // Zoom functionality will be handled by CanvasArea
    console.log('Zoom:', direction);
  };

  const handleUndo = () => {
    console.log('Undo');
  };

  const handleRedo = () => {
    console.log('Redo');
  };
  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <TopBar />
      
      {/* Design Toolbar */}
      <DesignToolbar 
        activeTool={activeTool}
        onToolChange={setActiveTool}
        onZoom={handleZoom}
        onUndo={handleUndo}
        onRedo={handleRedo}
      />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Files & Layers */}
        <LeftSidebar />
        
        {/* Canvas Area */}
        <CanvasArea activeTool={activeTool} activeColor={activeColor} />
        
        {/* Right Sidebar - Properties */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default Index;
