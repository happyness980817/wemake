import type { Route } from "./+types/submit-product-page";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Submit Product - WeMake" }, { name: "description", content: "Submit a new product" }];
}

export function loader({ request }: Route.LoaderArgs) {
  return {
    message: "Submit your product",
  };
}

export function action({ request }: Route.ActionArgs) {
  // Form data processing logic
  return {
    success: true,
  };
}

export default function SubmitProductPage({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Submit Product</h1>
      <div className="max-w-2xl">
        <form method="post" className="space-y-6">
          {/* Product submission form */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded-md" required />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
            Submit
          </button>
        </form>

        {actionData?.success && <p className="mt-4 text-green-600">Product submitted successfully!</p>}
      </div>
    </div>
  );
}
