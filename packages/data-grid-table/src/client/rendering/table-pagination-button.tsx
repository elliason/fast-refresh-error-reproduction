import { buttonVariants } from "@project/ui/components/button";

import { Button } from "@project/ui/components/button";
import { cn } from "@project/ui/lib/utils";

interface TablePaginationItemProps {
  isActive?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const TablePaginationButton = ({ isActive, isDisabled, children, onClick }: TablePaginationItemProps) => {
  return (
    <Button
      disabled={isDisabled}
      className={cn(
        "h-full cursor-pointer",
        buttonVariants({
          variant: "ghost",
          size: "icon",
        }),
        isActive ? "border-active/30 size-8 cursor-auto border p-0 font-semibold hover:bg-transparent" : "size-8 p-0"
      )}
      onClick={onClick}
      aria-label="Přejít na první stranu"
    >
      {children}
    </Button>
  );
};
