import React, { useState } from 'react';
import { 
  File, 
  Folder, 
  ChevronRight, 
  ChevronDown,
  Layers,
  Square,
  Circle,
  Type,
  Image
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const mockFiles = [
  { id: '1', name: 'Design System', type: 'folder', children: [
    { id: '2', name: 'Components', type: 'file' },
    { id: '3', name: 'Colors', type: 'file' },
    { id: '4', name: 'Typography', type: 'file' },
    { id: '5', name: 'Icons', type: 'file' },
  ]},
  { id: '6', name: 'Projects', type: 'folder', children: [
    { id: '7', name: 'Landing Page v1', type: 'file' },
    { id: '8', name: 'Landing Page v2', type: 'file' },
    { id: '9', name: 'Dashboard', type: 'file' },
    { id: '10', name: 'User Profile', type: 'file' },
  ]},
  { id: '11', name: 'Mobile Apps', type: 'folder', children: [
    { id: '12', name: 'iOS App', type: 'file' },
    { id: '13', name: 'Android App', type: 'file' },
    { id: '14', name: 'Tablet Version', type: 'file' },
  ]},
  { id: '15', name: 'Prototypes', type: 'folder', children: [
    { id: '16', name: 'User Flow', type: 'file' },
    { id: '17', name: 'Onboarding', type: 'file' },
    { id: '18', name: 'Checkout Process', type: 'file' },
  ]},
  { id: '19', name: 'Wireframes', type: 'file' },
  { id: '20', name: 'Brand Guidelines', type: 'file' },
];

const mockLayers = [
  { id: '1', name: 'Header', type: 'frame', level: 0 },
  { id: '2', name: 'Navigation', type: 'frame', level: 1 },
  { id: '3', name: 'Logo', type: 'image', level: 2 },
  { id: '4', name: 'Menu Items', type: 'frame', level: 2 },
  { id: '5', name: 'Home', type: 'text', level: 3 },
  { id: '6', name: 'About', type: 'text', level: 3 },
  { id: '7', name: 'Contact', type: 'text', level: 3 },
  { id: '8', name: 'User Avatar', type: 'circle', level: 2 },
  { id: '9', name: 'Hero Section', type: 'frame', level: 0 },
  { id: '10', name: 'Background Gradient', type: 'rectangle', level: 1 },
  { id: '11', name: 'Hero Content', type: 'frame', level: 1 },
  { id: '12', name: 'Main Headline', type: 'text', level: 2 },
  { id: '13', name: 'Subtitle', type: 'text', level: 2 },
  { id: '14', name: 'CTA Button', type: 'rectangle', level: 2 },
  { id: '15', name: 'Button Text', type: 'text', level: 3 },
  { id: '16', name: 'Hero Image', type: 'image', level: 1 },
  { id: '17', name: 'Features Section', type: 'frame', level: 0 },
  { id: '18', name: 'Section Title', type: 'text', level: 1 },
  { id: '19', name: 'Feature Cards', type: 'frame', level: 1 },
  { id: '20', name: 'Card 1', type: 'frame', level: 2 },
  { id: '21', name: 'Icon', type: 'image', level: 3 },
  { id: '22', name: 'Title', type: 'text', level: 3 },
  { id: '23', name: 'Description', type: 'text', level: 3 },
  { id: '24', name: 'Card 2', type: 'frame', level: 2 },
  { id: '25', name: 'Card 3', type: 'frame', level: 2 },
  { id: '26', name: 'Footer', type: 'frame', level: 0 },
  { id: '27', name: 'Links', type: 'frame', level: 1 },
  { id: '28', name: 'Copyright', type: 'text', level: 1 },
];

const getLayerIcon = (type: string) => {
  switch (type) {
    case 'frame': return Square;
    case 'rectangle': return Square;
    case 'circle': return Circle;
    case 'text': return Type;
    case 'image': return Image;
    default: return Square;
  }
};

export function LeftSidebar() {
  const [activeTab, setActiveTab] = useState<'files' | 'layers'>('files');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['1', '6', '11', '15']);

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => 
      prev.includes(id) 
        ? prev.filter(folderId => folderId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col shadow-panel">
      {/* Tab Header */}
      <div className="flex h-10 border-b border-border">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex-1 h-full rounded-none text-sm font-medium",
            activeTab === 'files' 
              ? "bg-secondary text-foreground border-b-2 border-primary" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab('files')}
        >
          <File className="w-4 h-4 mr-2" />
          Files
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex-1 h-full rounded-none text-sm font-medium",
            activeTab === 'layers' 
              ? "bg-secondary text-foreground border-b-2 border-primary" 
              : "text-muted-foreground hover:text-foreground"
          )}
          onClick={() => setActiveTab('layers')}
        >
          <Layers className="w-4 h-4 mr-2" />
          Layers
        </Button>
      </div>

      <ScrollArea className="flex-1 p-2">
        {activeTab === 'files' ? (
          <div className="space-y-1">
            {mockFiles.map((item) => (
              <div key={item.id}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-8 text-sm hover:bg-secondary"
                  onClick={() => item.type === 'folder' && toggleFolder(item.id)}
                >
                  {item.type === 'folder' ? (
                    expandedFolders.includes(item.id) ? (
                      <ChevronDown className="w-4 h-4 mr-1" />
                    ) : (
                      <ChevronRight className="w-4 h-4 mr-1" />
                    )
                  ) : (
                    <div className="w-5" />
                  )}
                  {item.type === 'folder' ? (
                    <Folder className="w-4 h-4 mr-2 text-accent" />
                  ) : (
                    <File className="w-4 h-4 mr-2 text-muted-foreground" />
                  )}
                  {item.name}
                </Button>
                
                {item.type === 'folder' && item.children && expandedFolders.includes(item.id) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Button
                        key={child.id}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start h-7 text-sm hover:bg-secondary"
                      >
                        <div className="w-5" />
                        <File className="w-3 h-3 mr-2 text-muted-foreground" />
                        {child.name}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {mockLayers.map((layer) => {
              const Icon = getLayerIcon(layer.type);
              return (
                <Button
                  key={layer.id}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-7 text-sm hover:bg-secondary"
                  style={{ paddingLeft: `${8 + layer.level * 16}px` }}
                >
                  <Icon className="w-3 h-3 mr-2 text-muted-foreground" />
                  {layer.name}
                </Button>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}