import React from 'react';
import { 
  Share2, 
  Play, 
  MessageSquare, 
  ChevronDown,
  Users,
  Crown,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export function TopBar() {
  const collaborators = [
    { id: '1', name: 'Alice Johnson', initials: 'AJ', color: 'bg-collaborator-1' },
    { id: '2', name: 'Bob Smith', initials: 'BS', color: 'bg-collaborator-2' },
    { id: '3', name: 'Carol Davis', initials: 'CD', color: 'bg-collaborator-3' },
  ];

  return (
    <div className="h-14 bg-card border-b border-border flex items-center justify-between px-4 shadow-toolbar">
      {/* Left Section - File Name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-foreground">Design System v2</h1>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
        
        <Badge variant="secondary" className="text-xs font-medium">
          <Crown className="w-3 h-3 mr-1" />
          Pro
        </Badge>
      </div>

      {/* Center Section - Version History */}
      <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
        <span>Last edited 2 minutes ago by</span>
        <Avatar className="w-5 h-5">
          <AvatarFallback className="bg-collaborator-1 text-xs font-medium">AJ</AvatarFallback>
        </Avatar>
        <span>Alice Johnson</span>
      </div>

      {/* Right Section - Actions & Collaboration */}
      <div className="flex items-center gap-3">
        {/* Collaborators */}
        <div className="hidden sm:flex items-center gap-1">
          {collaborators.map((collaborator) => (
            <Avatar key={collaborator.id} className="w-8 h-8 border-2 border-background">
              <AvatarFallback className={`${collaborator.color} text-white text-xs font-medium`}>
                {collaborator.initials}
              </AvatarFallback>
            </Avatar>
          ))}
          <Button variant="outline" size="sm" className="ml-2 h-8">
            <Users className="w-4 h-4 mr-1" />
            Invite
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8">
            <MessageSquare className="w-4 h-4 mr-1" />
            Comments
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8">
            <Bell className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" className="h-8">
            <Play className="w-4 h-4 mr-1" />
            Present
          </Button>

          <Button variant="default" size="sm" className="h-8 bg-primary hover:bg-primary/90">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}