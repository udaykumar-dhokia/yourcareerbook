import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User } from "@/store/slices/user.slice";
import { Textarea } from "@/components/ui/textarea";

interface GeneralTabProps {
  user: User | null;
}

const GeneralTab = ({ user }: GeneralTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
        <CardDescription>
          Update your personal details and contact information.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Basic Info */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue={user?.fullName ?? ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={user?.email ?? ""} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input id="mobile" defaultValue={user?.mobile ?? ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue={user?.city ?? ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" defaultValue={user?.state ?? ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" defaultValue={user?.country ?? ""} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              defaultValue={user?.summary ?? ""}
              placeholder="Tell something about yourself..."
              className="rounded-none hover:rounded-xl transition-all"
            />
          </div>
        </section>

        {/* Social Links */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Social Links</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/username"
                defaultValue={user?.socialLinks?.linkedin ?? ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                placeholder="https://github.com/username"
                defaultValue={user?.socialLinks?.github ?? ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio</Label>
              <Input
                id="portfolio"
                placeholder="https://your-portfolio.com"
                defaultValue={user?.socialLinks?.porfolio ?? ""}
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Skills</h3>

          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma-separated)</Label>
            <Input
              id="skills"
              placeholder="React, Node.js, TypeScript"
              defaultValue={user?.skills?.join(", ") ?? ""}
            />
          </div>
        </section>

        {/* Preferences */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Preferences</h3>

          <div className="flex items-center space-x-2">
            <Switch
              id="gridOrTable"
              defaultChecked={user?.gridOrTable ?? true}
            />
            <Label htmlFor="gridOrTable">Use Grid View</Label>
          </div>
        </section>

        <div className="pt-4 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralTab;
