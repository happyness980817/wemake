import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";
import { SiGithub, SiApple, SiGoogle } from "@icons-pack/react-simple-icons";
import { Link } from "react-router";
import { LockIcon } from "lucide-react";

export default function AuthButtons() {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <Separator className="w-full" />
        <span className="text-xs text-muted-foreground uppercase font-medium">Or continue with</span>
        <Separator className="w-full" />
        <div className="w-full flex flex-col gap-2">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/auth/social/github/start">
              <SiGithub size={24} className="w-4 h-4" />
              GitHub
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/auth/social/google/start">
              <SiGoogle size={24} className="w-4 h-4" />
              Google
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/auth/social/apple/start">
              <SiApple size={24} className="w-4 h-4" />
              Apple
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/auth/otp/start">
              <LockIcon className="w-4 h-4" />
              OTP
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
