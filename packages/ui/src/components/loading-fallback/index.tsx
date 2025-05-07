"use client";

import { Loader } from "#components/loader";
import { cva, type VariantProps } from "class-variance-authority";

const loadingFallbackVariants = cva("flex flex-col items-center justify-center gap-2", {
  variants: {
    variant: {
      full: "h-full w-full",
      fixed: "h-[400px] w-full",
    },
  },
  defaultVariants: {
    variant: "full",
  },
});

type LoadingFallbackProps = VariantProps<typeof loadingFallbackVariants> & {
  children?: React.ReactNode;
};

/**
 * @param variant - full: Use full variant inside a small widget that is visible in the viewport
 * @param variant - fixed: Use fixed variant inside a large page that stretches its height
 */
export const LoadingFallback = ({ variant, children }: LoadingFallbackProps) => {
  return (
    <div className={loadingFallbackVariants({ variant })}>
      <Loader className="aspect-square size-8 animate-loader-spinner rounded-full border-4 border-gray-300 border-e-gray-400" />
      {children || <p>Loading...</p>}
    </div>
  );
};
