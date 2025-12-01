import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Link as LinkIcon } from "lucide-react";
import { User } from "@/store/slices/user.slice";

interface ProfileHeaderProps {
  user: User | null;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  const location =
    user?.city && user?.country
      ? `${user.city}, ${user.state}, ${user.country}`
      : "Location not set";
  const portfolio = user?.socialLinks?.porfolio ?? "#";

  const avatarUrl = user?.id
    ? `https://api.dicebear.com/7.x/thumbs/svg?seed=${user.id}`
    : "https://api.dicebear.com/7.x/adventurer/svg?seed=guest";

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8">
      <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-xl">
        <AvatarImage src={avatarUrl} alt={user?.fullName ?? "User"} />
        <AvatarFallback className="text-2xl md:text-4xl">
          {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "?"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-2">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            {user?.fullName ?? "Unnamed User"}
          </h1>
        </div>

        <p className="text-muted-foreground max-w-2xl">
          {user?.summary ?? "No bio added yet."}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          )}

          {user?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
          )}

          {user?.mobile && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>{user.mobile}</span>
            </div>
          )}

          {portfolio !== "#" && (
            <div className="flex items-center gap-1">
              <LinkIcon className="w-4 h-4" />
              <a href={portfolio} target="_blank" className="hover:underline">
                {portfolio}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline">Share</Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
