import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";
import { useActionData } from "react-router";
import type { action } from "../pages/product-reviews-page";

export default function CreateReviewDialog() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const actionData = useActionData<typeof action>();
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">
          What do you think about this product?
        </DialogTitle>
        <DialogDescription>
          Give us your thoughts. Share your experience with others.
        </DialogDescription>
      </DialogHeader>
      <Form className="space-y-10" method="post">
        <div>
          <Label className="flex flex-col gap-1">
            Rating{" "}
            <small className="text-muted-foreground">
              Select the rating for the product
            </small>
          </Label>

          <div className="flex gap-2 mt-5">
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className="relative"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
              >
                <StarIcon
                  className="size-5 text-yellow-500"
                  fill={
                    hoveredStar >= star || rating >= star
                      ? "currentColor"
                      : "none"
                  }
                />
                <input
                  type="radio"
                  value={star}
                  name="rating"
                  required
                  className="opacity-0 h-px w-px absolute"
                  onChange={() => setRating(star)}
                />
              </label>
            ))}
          </div>
          {actionData?.formErrors?.rating && (
            <p className="text-red-500">
              {actionData.formErrors.rating.join(", ")}
            </p>
          )}
        </div>
        <InputPair
          label="Review"
          placeholder="How would you rate this product?"
          description="Maximum 1000 characters"
          name="review"
          required
          textArea
        />
        {actionData?.formErrors?.review && (
          <p className="text-red-500">
            {actionData.formErrors.review.join(", ")}
          </p>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Submit</Button>
          </DialogClose>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
