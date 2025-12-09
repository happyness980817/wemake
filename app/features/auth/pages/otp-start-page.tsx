import type { Route } from "./+types/otp-start-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "OTP Start | Wemake" }];
};

export default function OtpStartPage({}: Route.ComponentProps) {
  return <div>OTP Start Page</div>;
}

