import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/team-page";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Team | Wemake" }];
};

export default function TeamPage({}: Route.ComponentProps) {
  const teamInfoList = [
    {
      title: "Product Name",
      value: "Doggie Social",
    },
    {
      title: "Product Stage",
      value: "MVP",
    },
    {
      title: "Team Size",
      value: 3,
    },
    {
      title: "Equity",
      value: "5 - 10%",
    },
  ];
  const lookingForList = [
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "Sales Representative",
    "Customer Support",
  ];
  return (
    <div className="space-y-20">
      <Hero title="Join User123's Team" />
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 grid grid-cols-4 gap-5">
          {teamInfoList.map((item) => (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
                <CardContent className="p-0 font-bold text-2xl">
                  <p>{item.value}</p>
                </CardContent>
              </CardHeader>
            </Card>
          ))}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Looking for</CardTitle>
              <CardContent className="p-0 font-bold text-2xl">
                <ul className="list-disc list-inside text-lg">
                  {lookingForList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Idea Description</CardTitle>
              <CardContent className="p-0 font-medium text-xl">
                <p>
                  Doggie Social is a social media platform for dogs. We are looking for a team to help us build our
                  platform.
                </p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>
        <aside className="col-span-2 space-y-5 border rounded-lg shadow-sm p-6">
          <div className="flex gap-5">
            <Avatar className="size-10">
              <AvatarFallback>N</AvatarFallback>
              <AvatarImage src="https://github.com/happyness980817.png" />
            </Avatar>
            <div className="flex flex-col space-y-1">
              <h4 className="text-lg font-medium">Paul Jang</h4>
              <Badge variant="secondary">Entrepreneur</Badge>
            </div>
          </div>
          <Form className="space-y-5">
            <InputPair
              label="Introduce yourself"
              name="introduction"
              id="introduction"
              description="Introduce yourself to the team"
              required
              textArea
              placeholder="i.e. I'm a frontend developer with a passion for creating user-friendly interfaces."
            />
            <Button type="submit" className="w-full">
              Contact
            </Button>
          </Form>
          <Button variant="outline" className="w-full">
            Follow
          </Button>
        </aside>
      </div>
    </div>
  );
}
