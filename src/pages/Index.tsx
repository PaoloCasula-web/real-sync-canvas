import React from 'react';
import { TopBar } from '@/components/TopBar';
import { DesignToolbar } from '@/components/DesignToolbar';
import { LeftSidebar } from '@/components/LeftSidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { CanvasArea } from '@/components/CanvasArea';

const Index = () => {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Top Navigation Bar */}
      <TopBar />
      
      {/* Design Toolbar */}
      <DesignToolbar />
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Files & Layers */}
        <LeftSidebar />
        
        {/* Canvas Area */}
        <CanvasArea />
        
        {/* Right Sidebar - Properties */}
        <RightSidebar />
      </div>
    </div>
  );
};

export default Index;
