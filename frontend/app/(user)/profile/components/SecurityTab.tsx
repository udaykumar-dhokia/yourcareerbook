import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const SecurityTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security & Account</CardTitle>
        <CardDescription>
          Manage your password and account settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
        </div>
        
        <div className="pt-4 flex justify-between items-center">
             <Button variant="destructive">Delete Account</Button>
            <Button>Update Password</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default SecurityTab
