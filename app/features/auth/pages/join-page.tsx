import { Form, Link } from "react-router";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Join | Wemake" }];
};

export default function JoinPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="link" asChild className="absolute top-8 right-8 text-black hover:text-primary">
        <Link to="/auth/login">Log In &rarr;</Link>
      </Button>
      <div className="flex items-center flex-col justify-center max-w-md w-full gap-10">
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            id="name"
            label="Name"
            name="name"
            type="text"
            description="Enter your name"
            required
            placeholder="Enter your name"
          />
          <InputPair
            id="username"
            label="Username"
            name="username"
            type="text"
            description="Enter your username"
            required
            placeholder="Enter your username"
          />
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
          <InputPair
            id="passwordConfirmation"
            label="Password Confirmation"
            name="passwordConfirmation"
            type="password"
            description="Confirm your password"
            required
            placeholder="Confirm your password"
          />
          <Button className="w-full h-10" type="submit">
            Create Account
          </Button>
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
