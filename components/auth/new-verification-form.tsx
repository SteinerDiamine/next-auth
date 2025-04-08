// "use client"

// import { CardWrapper } from "./card-wrapper"
// import {BeatLoader} from 'react-spinners'
// import { useCallback, useState } from "react"
// import { useEffect } from "react"

// import { useSearchParams } from "next/navigation"
// import { newVerification } from "@/actions/new-verification"
// import { FormError } from "@/components/form-error"
// import { FormSucess } from "@/components/form-success"


// const VerificationForm = () => {

//   const searchParams = useSearchParams();

//   const [error, setError] = useState<string | undefined>();
//   const [success, setSuccess] = useState<string | undefined>();

//   const token = searchParams.get("token");

//   const onSubmit = useCallback(() => {

//     if(!token) {
//       setError("Missing token!");
//       return;
//     }
//     newVerification(token)
//      .then((data) => {
//        setSuccess(data.success);
//        setError(data.error)
//      })
//      .catch(() => {
//       setError("something went wrong")
//      })
//   },[token]);

//   useEffect(() => {
//     onSubmit();
//   },[onSubmit])

  
//   return (
//     <CardWrapper 
//     headerLabel="Confirming your verification"
//     backButtonHref="/auth/login"
//     backButtonLabel="back to login"> 

//     <div className="flex items-center w-full justify-center">
//        {!success && !error && (
//  <BeatLoader color="#4f46e5" size={20} className="text-center" />
//        )} 
       
//         <FormSucess message={success} />
//         <FormError message={error}/>
//     </div>

//     </CardWrapper>
//   )
// }

// export default VerificationForm










"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSucess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      })
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <BeatLoader />
        )}
        <FormSucess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  )
}
