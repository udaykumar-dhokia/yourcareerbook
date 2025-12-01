import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const ProfessionalTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Details</CardTitle>
        <CardDescription>
          Manage your professional identity and skills.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input id="title" placeholder="e.g. Senior Frontend Developer" />
        </div>
        
        <div className="space-y-2">
            <Label htmlFor="skills">Skills</Label>
            <Input id="skills" placeholder="e.g. React, TypeScript, Node.js (comma separated)" />
        </div>

        <div className="space-y-2">
            <Label htmlFor="experience">Work Experience Summary</Label>
            <Textarea id="experience" placeholder="Briefly describe your experience..." className="min-h-[100px]" />
        </div>
        
        <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
             <Input id="education" placeholder="University / Degree" />
        </div>

        <div className="pt-4 flex justify-end">
            <Button>Save Professional Details</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfessionalTab
