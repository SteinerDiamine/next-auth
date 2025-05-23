'use client';

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSucess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";

import { toast } from "sonner";

const AdminPage =  () => {

    const onServerActionClick = () => {
            admin()
            .then((data) => {
                if(data.error){
                    toast.error(data.error)
                } 

                if(data.success){
                    toast.success(data.success)
                }
                
               
            })
    }


    const onApiRouteClick = () => {
        fetch("/api/admin")
          .then((response) => {
            if (response.ok) {
              toast.success("Success! You are allowed to see the content");
           
            } else {
              toast.error("Forbidden API Route!");

            console.log('not ok')
            }
          })
      }
    
   
    return (
       <Card className="w-[600px]">

        <CardHeader>
            <p className="text-2xl font-semibold text-center">
                Admin Page
            </p>
        </CardHeader>
        <CardContent className="space-y-4">
                <RoleGate allowedRoles={UserRole.ADMIN}>
                    <FormSucess message="You are allowed to see the content"/>
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p>Admin only api route</p>
                    <Button onClick={onApiRouteClick}>CLick to test</Button>
                </div>

                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p>Admin only server action</p>
                    <Button onClick={onServerActionClick}>CLick to test</Button>
                </div>
        </CardContent>

       </Card>
    )
}

export default AdminPage;

