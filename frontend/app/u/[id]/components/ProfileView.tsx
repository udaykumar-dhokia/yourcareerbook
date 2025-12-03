import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User } from "@/store/slices/user.slice";

interface GeneralTabProps {
  user: User | null;
}

const ProfileView = ({ user }: GeneralTabProps) => {
  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Basic Info */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Basic Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={user.fullName ?? ""} disabled />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={user.email ?? ""} disabled />
            </div>

            <div className="space-y-2">
              <Label>Mobile</Label>
              <Input value={user.mobile ?? ""} disabled />
            </div>

            <div className="space-y-2">
              <Label>City</Label>
              <Input value={user.city ?? ""} disabled />
            </div>

            <div className="space-y-2">
              <Label>State</Label>
              <Input value={user.state ?? ""} disabled />
            </div>

            <div className="space-y-2">
              <Label>Country</Label>
              <Input value={user.country ?? ""} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Summary</Label>
            <Textarea value={user.summary ?? ""} disabled />
          </div>
        </section>

        {/* Social Links */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Social Links</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.socialLinks?.linkedin && (
              <div className="space-y-2">
                <Label>LinkedIn</Label>
                <Input value={user.socialLinks?.linkedin ?? ""} disabled />
              </div>
            )}

            {user.socialLinks?.github && (
              <div className="space-y-2">
                <Label>GitHub</Label>
                <Input value={user.socialLinks?.github ?? ""} disabled />
              </div>
            )}

            {user.socialLinks?.porfolio && (
              <div className="space-y-2">
                <Label>Portfolio</Label>
                <Input value={user.socialLinks?.porfolio ?? ""} disabled />
              </div>
            )}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Skills</h3>

          <div className="space-y-2">
            <Label>Skills</Label>
            <Input value={user.skills?.join(", ") ?? ""} disabled />
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default ProfileView;
