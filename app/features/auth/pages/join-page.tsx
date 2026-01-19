import { Form, Link } from "react-router";
import type { Route } from "./+types/join-page";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import AuthButtons from "../components/auth-buttons";
import { makeSSRClient } from "~/supa-client";
import z from "zod";
import { checkUsernameExists } from "../queries";
import { redirect } from "react-router";
import { useNavigation } from "react-router";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Join | Wemake" }];
};

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  username: z.string().min(3, "Username must be at least 3 characters long."),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, error, data } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { formError: error.flatten().fieldErrors };
  }
  const usernameExists = await checkUsernameExists(request, {
    username: data.username,
  });
  if (usernameExists) {
    return { formError: { username: ["Username already exists"] } };
  }
  const { client, headers } = makeSSRClient(request);
  const { error: signUpError } = await client.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        name: data.name,
        username: data.username,
      },
    },
  });
  if (signUpError) {
    return { signUpError: signUpError.message };
    // errors.ts - AuthError (supabase auth error)
    // export class AuthError extends Error { ...
    // Error 객체는 message 프로퍼티를 가짐
    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Error/message
  }
  return redirect("/", { headers }); // 사용자 로그인/로그아웃 시 쿠키는 설정/삭제된다. 그래서 headers 넘겨주는 것
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="link" asChild className="absolute top-8 right-8">
        <Link to="/auth/login">Log In &rarr;</Link>
      </Button>
      <div className="flex items-center flex-col justify-center max-w-md w-full gap-10">
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="name"
            label="Name"
            name="name"
            type="text"
            description="Enter your name"
            required
            placeholder="Enter your name"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formError?.name}
            </p>
          )}
          <InputPair
            id="username"
            label="Username"
            name="username"
            type="text"
            description="Enter your username"
            required
            placeholder="Enter your username"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formError?.username}
            </p>
          )}
          <InputPair
            id="email"
            label="Email"
            name="email"
            type="email"
            description="Enter your email"
            required
            placeholder="Enter your email"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formError?.email}
            </p>
          )}
          <InputPair
            id="password"
            label="Password"
            name="password"
            type="password"
            description="Enter your password"
            required
            placeholder="Enter your password"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formError?.password}
            </p>
          )}
          <InputPair
            id="passwordConfirmation"
            label="Password Confirmation"
            name="passwordConfirmation"
            type="password"
            description="Confirm your password"
            required
            placeholder="Confirm your password"
          />
          <Button className="w-full h-10" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
          {actionData && "signUpError" in actionData && (
            <p className="text-sm text-red-500">{actionData.signUpError}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
