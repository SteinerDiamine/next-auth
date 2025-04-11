import { Navbar } from "../_components/navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
    }

const layout = ({children}: ProtectedLayoutProps ) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gray-800">

        <Navbar/>
        {children}
    </div>
  )
}

export default layout