import type { Route } from "./+types/promote-product-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Promote Product - WeMake" }, { name: "description", content: "Promote your product" }];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    message: "Promote your product",
  };
}

export function action({ request }: Route.ActionArgs) {
  // Promotion request processing logic
  return {
    success: true,
  };
}

export default function PromoteProductPage({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Promote Product</h1>
      <div className="max-w-2xl">
        <p className="text-muted-foreground mb-6">
          Want to reach more people with your product? Choose a promotion option.
        </p>

        <form method="post" className="space-y-6">
          {/* Promotion request form */}
          <div>
            <label htmlFor="productId" className="block text-sm font-medium mb-2">
              Product ID
            </label>
            <input
              type="text"
              id="productId"
              name="productId"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="promotionType" className="block text-sm font-medium mb-2">
              Promotion Type
            </label>
            <select id="promotionType" name="promotionType" className="w-full px-3 py-2 border rounded-md" required>
              <option value="">Select an option</option>
              <option value="featured">Featured</option>
              <option value="sponsored">Sponsored</option>
              <option value="highlighted">Highlighted</option>
            </select>
          </div>

          <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Submit Promotion
          </button>
        </form>

        {actionData?.success && <p className="mt-4 text-green-600">Promotion request submitted successfully!</p>}
      </div>
    </div>
  );
}
