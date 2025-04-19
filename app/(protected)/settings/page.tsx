// 'use client'
// import { settings } from "@/actions/settings";
// import { Button } from "@/components/ui/button";
// import { CardContent, Card, CardHeader } from "@/components/ui/card"
// import { useTransition, useState } from "react"
// import * as z from "zod";
// import {useForm} from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { SettingsSchema } from "@/schemas";
// import { FormError } from "@/components/form-error";
// import { FormSucess } from "@/components/form-success";

// import { Switch } from "@/components/ui/switch";

// import { 
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
  
//  } from "@/components/ui/select";


// import { Form, FormField, FormControl, FormItem, FormLabel,  FormMessage,  } from "@/components/ui/form";

// import { Input } from "@/components/ui/input";
// import { useSession } from "next-auth/react";
// import { useCurrentUser } from "@/hooks/use-current-user";
// import { UserRole } from "@prisma/client";


//  const SettingsPage = () => {

//   const user = useCurrentUser();
  
//   const {update} = useSession();

//   const [error, setError] = useState<string | undefined>();
//   const [success, setSuccess] = useState<string | undefined>();

//   const form = useForm<z.infer <typeof SettingsSchema>>({
//     resolver: zodResolver(SettingsSchema),
//     defaultValues: {
//       name: user?.name || undefined,
//       email: user?.email || undefined,
//       password: undefined,
//       newPassword: undefined,
//       role: user?.role || undefined,

//     }

//   })

  

//   const [isPending, startTransition] = useTransition();

//   const onCLick = (values: z.infer<typeof SettingsSchema>) => {
//     startTransition(() => {
//       settings(values)
//         .then((data) => {
//           if (data.error) {
//             setError(data.error);
//           }

//           if (data.success) {
//             update();
//             setSuccess(data.success);
//           }
//         })
//         .catch(() => setError('Something went wrong!'));
//     });
//   };



//   return (
//     <div className="w-[600px]">
  
//     <Card className="w=[600px]">

//       <CardHeader >
//         <p className="test-2xl font-semibold text-center ">
//           settings
//         </p>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}> 
//           <form
//            className="space-y-4"
//            onSubmit={form.handleSubmit(onCLick)}>
//             <div className="space-y-4">
//             <FormField
//               control={form.control}
//               name= "name"
//               render={({ field}) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Diamine"
//                       disabled= {isPending}
//                     />
//                   </FormControl>
//                   <FormMessage/>
//                 </FormItem>
//               )}
//               />
//               {user?.isOAuth === false && (
//                 <>
        
//                <FormField
//               control={form.control}
//               name= "email"
//               render={({ field}) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="diamine123@gmail.com"
//                       disabled= {isPending}
//                     />
//                   </FormControl>
//                   <FormMessage/>

//                 </FormItem>
//               )}
//               />
//                <FormField
//               control={form.control}
//               name= "password"
//               render={({ field}) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="******"
//                       disabled= {isPending}
//                       type="password"
//                     />
//                   </FormControl>
//                   <FormMessage/>

//                 </FormItem>
//               )}
//               />
//                <FormField
//               control={form.control}
//               name= "newPassword"
//               render={({ field}) => (
//                 <FormItem>
//                   <FormLabel>New password</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="******"
//                       disabled= {isPending}
//                       type="password"
//                     />
//                   </FormControl>
//                   <FormMessage/>

//                 </FormItem>
//               )}
//               />
//               </>
//             )}
//                <FormField
//               control={form.control}
//               name= "role"
//               render={({ field}) => (
//                 <FormItem>
//                   <FormLabel>Role</FormLabel>
//                   <Select 
//                     disabled={isPending}
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select a role" />

//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>

//                         <SelectItem value={UserRole.USER}>User</SelectItem>
                      
                        
//                       </SelectContent>
                        
//                     </Select>
//                     <FormMessage/>
                     
//                 </FormItem>
//               )}
//               />
//              {user?.isOAuth === false && (
//            <FormField
//               control={form.control}
//               name= "isTwoFactorEnabled"
//               render={({ field}) => (
//                 <FormItem>
//                   <FormLabel>Enable Two factor authentication for your account</FormLabel>
//                   <FormControl>
//                     <Switch 
//                       disabled={isPending}
//                       checked={field.value}
//                       onCheckedChange={field.onChange}
//                       />
//                   </FormControl>
//                   <FormMessage/>

//                 </FormItem>
//               )}
//               />
//             )}
              
//               </div>
//               <FormError message={error}/>
//               <FormSucess message={success}/>

//               <Button disabled={isPending} type="submit">Save</Button>
//           </form>
//         </Form>
//       </CardContent>

//     </Card>
       
    
//     </div>
//   )
// }

// export default SettingsPage










'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition, useState } from 'react';
import { useSession } from 'next-auth/react';

import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SettingsSchema } from '@/schemas';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { settings } from '@/actions/settings';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FormError } from '@/components/form-error';
import { FormSucess} from '@/components/form-success';
import { UserRole } from '@prisma/client';

const SettingsPage = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      password: undefined,
      newPassword: undefined,
      name: user?.name || undefined,
      email: user?.email || undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError('Something went wrong!'));
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">⚙️ Settings</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="john.doe@example.com"
                            type="email"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="******"
                            type="password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="******"
                            type="password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                        <SelectItem value={UserRole.USER}>User</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormError message={error} />
            <FormSucess message={success} />
            <Button disabled={isPending} type="submit">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;


