import { Form, Link } from "react-router";
import type { Route } from "./+types/login-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | Wemake" }];
};

export default function LoginPage({}: Route.ComponentProps) {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="link" asChild className="absolute top-8 right-8 text-black hover:text-primary">
        <Link to="/auth/join">Join &rarr;</Link>
      </Button>
      <div className="flex items-center flex-col justify-center max-w-md w-full gap-10">
        <h1 className="text-2xl font-semibold">Log In</h1>
        <Form className="w-full space-y-4">
          <InputPair
            id="email"
            label="Email"
            name="email"
            type="email"
            description="Enter your email"
            required
            placeholder="Enter your email"
          />
          <InputPair
            id="password"
            label="Password"
            name="password"
            type="password"
            description="Enter your password"
            required
            placeholder="Enter your password"
          />
          <Button className="w-full h-10" type="submit">
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}
