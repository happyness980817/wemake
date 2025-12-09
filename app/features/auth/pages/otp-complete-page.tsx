import type { Route } from "./+types/otp-complete-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "OTP Complete | Wemake" }];
};

export default function OtpCompletePage({}: Route.ComponentProps) {
  return <div>OTP Complete Page</div>;
}

