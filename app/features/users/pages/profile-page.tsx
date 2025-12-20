import type { Route } from "./+types/profile-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Profile | Wemake" }];
};

export default function ProfilePage() {
  return (
    <div className="max-w-3xl flex flex-col space-y-10">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          I'm a designer who loves to create beautiful and functional products.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">
          I'm a designer who loves to create beautiful and functional products.
        </p>
      </div>
    </div>
  );
}
