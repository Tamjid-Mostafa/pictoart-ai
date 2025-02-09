import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";

const VisuallyHidden = ({ children }: { children: React.ReactNode }) => {
  return <VisuallyHiddenPrimitive.Root>{children}</VisuallyHiddenPrimitive.Root>;
};

export default VisuallyHidden;
