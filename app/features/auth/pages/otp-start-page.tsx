import { Form, Link } from "react-router";
import type { Route } from "./+types/otp-start-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";

export const meta: Route.MetaFunction = () => {
  return [{ title: "OTP Start | Wemake" }];
};

export default function OtpStartPage({}: Route.ComponentProps) {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center max-w-md w-full gap-10">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Log In with OTP</h1>
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
          <Button className="w-full h-10" type="submit">
            Send OTP
          </Button>
        </Form>
      </div>
    </div>
  );
}
