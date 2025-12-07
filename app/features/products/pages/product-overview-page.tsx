import type { Route } from "./+types/product-overview-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Product Overview | Wemake" }, { name: "description", content: "Product overview page" }];
};

export default function ProductOverviewPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-1">
        <h3 className="text-lg font-bold">What is this product?</h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold">How does this product work?</h3>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </p>
      </div>
    </div>
  );
}
