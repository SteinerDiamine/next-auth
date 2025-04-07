

import { AiOutlineWarning } from "react-icons/ai";

import { CardWrapper } from "./card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
    headerLabel="Oops!! Something went wrong!"
    backButtonHref="/auth/login"
    backButtonLabel="Back button Login">
        <div className="w-full items-center flex justify-center">
            <AiOutlineWarning className="text-destructive"/>
        </div>
    </CardWrapper>
  );
};
