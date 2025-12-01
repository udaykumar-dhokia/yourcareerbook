"use client";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "./components/ProfileHeader";
import GeneralTab from "./components/GeneralTab";
import ProfessionalTab from "./components/ProfessionalTab";

const page = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  return (
    <div className="min-h-[80vh] w-full max-w-5xl mx-auto my-12 md:my-24 px-4">
      <ProfileHeader user={user} />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralTab user={user} />
        </TabsContent>

        <TabsContent value="professional">
          <ProfessionalTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
