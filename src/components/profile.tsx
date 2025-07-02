import { ChevronDown, CircleUser } from "lucide-react";

function Profile() {
  return (
    <div className="h-14 bg-foreground rounded-lg gap-2 p-2 flex items-center justify-start">
      <div className="bg-background p-2 h-10 w-10 rounded-full">
        <CircleUser />
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-medium">Ahmed Elgaedy</p>
        <p className="text-xs opacity-80">aelgaedy@gmail.com</p>
      </div>

      
      <div className="ml-auto">
      <ChevronDown />
      </div>
    </div>
  );
}

export default Profile;
