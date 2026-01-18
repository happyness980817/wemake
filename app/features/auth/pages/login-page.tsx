import { Form, Link, useNavigation } from "react-router";
import type { Route } from "./+types/login-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | Wemake" }];
};

export const action = async ({ request }: Route.ActionArgs) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  return {
    message: "Error: Wrong password",
  };
};
// action 함수 - post 요청 처리

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="link" asChild className="absolute top-8 right-8">
        <Link to="/auth/join">Join &rarr;</Link>
      </Button>
      <div className="flex items-center flex-col justify-center max-w-md w-full gap-10">
        <h1 className="text-2xl font-semibold">Log In</h1>
        <Form className="w-full space-y-4" method="post">
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
          <Button className="w-full h-10" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Log In"
            )}
          </Button>
          {actionData?.message && (
            <p className="text-sm text-red-500">{actionData.message}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
