import InputPair from "~/common/components/input-pair";
import type { Route } from "./+types/otp-complete-page";
import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [{ title: "OTP Complete | Wemake" }];
};

export default function OtpCompletePage({}: Route.ComponentProps) {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center max-w-md w-full gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Verify OTP</h1>
          <p className="text-sm text-muted-foreground">We will send you a 4 digit OTP for log-in.</p>
        </div>
        <Form className="w-full space-y-4">
          <InputPair
            id="email"
            label="Email"
            name="email"
            type="text"
            description="Enter your email"
            required
            placeholder="Enter your email"
          />
          <InputPair
            id="otp"
            label="OTP"
            name="otp"
            type="number"
            description="Enter the 4 digit OTP sent to your email"
            required
            placeholder="Enter the 4 digit OTP sent to your email"
          />
          <Button className="w-full h-10" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}
