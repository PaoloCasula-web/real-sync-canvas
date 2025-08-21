import React from 'react';
import { 
  Palette, 
  Type, 
  Move, 
  RotateCw,
  Layers,
  AlignCenter,
  AlignLeft,
  AlignRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RightSidebar() {
  return (
    <div className="w-64 bg-card border-l border-border flex flex-col shadow-panel">
      {/* Header */}
      <div className="h-10 flex items-center px-3 border-b border-border">
        <h3 className="text-sm font-medium text-foreground">Properties</h3>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-4">
          {/* Position & Size */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Position & Size</Label>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">X</Label>
                <Input 
                  type="number" 
                  value="240" 
                  className="h-7 text-xs" 
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Y</Label>
                <Input 
                  type="number" 
                  value="120" 
                  className="h-7 text-xs" 
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">W</Label>
                <Input 
                  type="number" 
                  value="400" 
                  className="h-7 text-xs" 
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">H</Label>
                <Input 
                  type="number" 
                  value="200" 
                  className="h-7 text-xs" 
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Transform */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <RotateCw className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Transform</Label>
            </div>
            
            <div className="space-y-2">
              <div>
                <Label className="text-xs text-muted-foreground">Rotation</Label>
                <Input 
                  type="number" 
                  value="0" 
                  className="h-7 text-xs" 
                />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Opacity</Label>
                <Slider 
                  value={[100]} 
                  max={100} 
                  step={1} 
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Fill */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Fill</Label>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded border border-border bg-primary"></div>
                <Input 
                  value="#8B5CF6" 
                  className="h-7 text-xs flex-1" 
                />
              </div>
              <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                Add Fill
              </Button>
            </div>
          </div>

          <Separator />

          {/* Typography */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Typography</Label>
            </div>
            
            <div className="space-y-2">
              <div>
                <Label className="text-xs text-muted-foreground">Font Family</Label>
                <Input 
                  value="Inter" 
                  className="h-7 text-xs" 
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Size</Label>
                  <Input 
                    type="number" 
                    value="16" 
                    className="h-7 text-xs" 
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Weight</Label>
                  <Input 
                    type="number" 
                    value="400" 
                    className="h-7 text-xs" 
                  />
                </div>
              </div>
              
              {/* Text Alignment */}
              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="w-8 h-7 p-0">
                  <AlignLeft className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-7 p-0">
                  <AlignCenter className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-7 p-0">
                  <AlignRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Layer Effects */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Effects</Label>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                Add Shadow
              </Button>
              <Button variant="outline" size="sm" className="w-full h-7 text-xs">
                Add Blur
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}