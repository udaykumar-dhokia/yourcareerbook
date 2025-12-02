import { useEffect, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { updateUser, User } from "@/store/slices/user.slice";
import { axiosInstance } from "@/utils/axios";
import { toast } from "sonner";
import { store } from "@/store/store";
import { Loader2 } from "lucide-react";

interface GeneralTabProps {
  user: User | null;
}

const GeneralTab = ({ user }: GeneralTabProps) => {
  const [initialState, setInitialState] = useState<any>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [country, setCountry] = useState("");
  const [summary, setSummary] = useState("");

  // Social links
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  // Skills
  const [skills, setSkills] = useState("");

  // Preferences
  const [gridOrTable, setGridOrTable] = useState(true);

  useEffect(() => {
    if (!user) return;

    const initial = {
      fullName: user.fullName ?? "",
      email: user.email ?? "",
      mobile: user.mobile ?? "",
      city: user.city ?? "",
      state: user.state ?? "",
      country: user.country ?? "",
      summary: user.summary ?? "",
      socialLinks: {
        linkedin: user.socialLinks?.linkedin ?? "",
        github: user.socialLinks?.github ?? "",
        portfolio: user.socialLinks?.porfolio ?? "",
      },
      skills: user.skills?.join(", ") ?? "",
      gridOrTable: user.gridOrTable ?? true,
    };

    setFullName(initial.fullName);
    setEmail(initial.email);
    setMobile(initial.mobile);
    setCity(initial.city);
    setStateValue(initial.state);
    setCountry(initial.country);
    setSummary(initial.summary);
    setLinkedin(initial.socialLinks.linkedin);
    setGithub(initial.socialLinks.github);
    setPortfolio(initial.socialLinks.portfolio);
    setSkills(initial.skills);
    setGridOrTable(initial.gridOrTable);

    setInitialState(initial);
    setIsDirty(false);
  }, [user]);

  useEffect(() => {
    if (!initialState) return;

    const current = {
      fullName,
      email,
      mobile,
      city,
      state: stateValue,
      country,
      summary,
      socialLinks: { linkedin, github, portfolio },
      skills,
      gridOrTable,
    };

    setIsDirty(JSON.stringify(current) !== JSON.stringify(initialState));
  }, [
    fullName,
    email,
    mobile,
    city,
    stateValue,
    country,
    summary,
    linkedin,
    github,
    portfolio,
    skills,
    gridOrTable,
    initialState,
  ]);

  const handleSave = async () => {
    const updatedUser = {
      fullName,
      email,
      mobile,
      city,
      state: stateValue,
      country,
      summary,
      socialLinks: { linkedin, github, portfolio },
      skills: skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      gridOrTable,
    };

    try {
      setLoading(true);
      const res = await axiosInstance.put("/user/", updatedUser);
      store.dispatch(updateUser(updatedUser));

      setInitialState(updatedUser);
      setIsDirty(false);

      toast.success(res.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

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
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                type="number"
                value={mobile}
                maxLength={10}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={stateValue}
                onChange={(e) => setStateValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              maxLength={200}
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
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
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio</Label>
              <Input
                id="portfolio"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                placeholder="https://your-portfolio.com"
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
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, Node.js, TypeScript"
            />
          </div>
        </section>

        {/* Preferences */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">Preferences</h3>

          <div className="flex items-center space-x-2">
            <Switch
              id="gridOrTable"
              checked={gridOrTable}
              onCheckedChange={(val) => setGridOrTable(val)}
            />
            <Label htmlFor="gridOrTable">Use Grid View</Label>
          </div>
        </section>

        <div className="pt-4 flex justify-end">
          {isDirty && <Button onClick={handleSave}>Save Changes</Button>}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralTab;
