import React, { useState } from 'react';
import { 
  MousePointer, 
  Square, 
  Circle, 
  Type, 
  Pen, 
  Image,
  Hand,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const tools = [
  { id: 'select', icon: MousePointer, name: 'Select' },
  { id: 'frame', icon: Square, name: 'Frame' },
  { id: 'rectangle', icon: Square, name: 'Rectangle' },
  { id: 'ellipse', icon: Circle, name: 'Ellipse' },
  { id: 'text', icon: Type, name: 'Text' },
  { id: 'pen', icon: Pen, name: 'Pen' },
  { id: 'image', icon: Image, name: 'Image' },
  { id: 'hand', icon: Hand, name: 'Hand' },
];

const zoomControls = [
  { id: 'zoom-out', icon: ZoomOut, name: 'Zoom Out' },
  { id: 'zoom-in', icon: ZoomIn, name: 'Zoom In' },
];

export function DesignToolbar() {
  const [activeTool, setActiveTool] = useState('select');

  return (
    <div className="h-12 bg-card border-b border-border flex items-center px-4 gap-2 shadow-toolbar">
      {/* Main Tools */}
      <div className="flex items-center gap-1">
        {tools.map((tool, index) => (
          <React.Fragment key={tool.id}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-8 h-8 p-0 hover:bg-tool-hover transition-colors",
                activeTool === tool.id && "bg-tool-active text-accent-foreground"
              )}
              onClick={() => setActiveTool(tool.id)}
              title={tool.name}
            >
              <tool.icon className="w-4 h-4" />
            </Button>
            {index === 0 && <Separator orientation="vertical" className="mx-1 h-6" />}
          </React.Fragment>
        ))}
      </div>

      <Separator orientation="vertical" className="mx-2 h-6" />

      {/* Zoom Controls */}
      <div className="flex items-center gap-1">
        {zoomControls.map((control) => (
          <Button
            key={control.id}
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 hover:bg-tool-hover transition-colors"
            title={control.name}
          >
            <control.icon className="w-4 h-4" />
          </Button>
        ))}
        <span className="text-sm text-muted-foreground mx-2">100%</span>
      </div>

      <Separator orientation="vertical" className="mx-2 h-6" />

      {/* Undo/Redo */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 hover:bg-tool-hover transition-colors"
          title="Undo"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 hover:bg-tool-hover transition-colors"
          title="Redo"
        >
          <RotateCw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}