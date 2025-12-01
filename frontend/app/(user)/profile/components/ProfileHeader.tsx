import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Phone, Link as LinkIcon } from 'lucide-react'
import { User } from '@/store/slices/user.slice'

interface ProfileHeaderProps {
  user: User | null;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
      <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-xl">
        <AvatarImage src="https://github.com/shadcn.png" alt={user?.fullName as string} />
        <AvatarFallback className="text-2xl md:text-4xl">
            {user?.fullName?.toString().charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-2">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">{user?.fullName}</h1>
            <Badge variant="secondary" className="w-fit">Software Engineer</Badge>
        </div>
        
        <p className="text-muted-foreground max-w-2xl">
            Passionate developer building amazing things. Loves React, Node.js, and coffee.
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
            <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
            </div>
             <div className="flex items-center gap-1">
                <LinkIcon className="w-4 h-4" />
                <a href="#" className="hover:underline">portfolio.com</a>
            </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button>Edit Profile</Button>
        <Button variant="outline">Share</Button>
      </div>
    </div>
  )
}

export default ProfileHeader
