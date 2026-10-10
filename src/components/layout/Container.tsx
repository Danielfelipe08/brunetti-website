import type { ElementType, HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
};

export function Container({
  as: Component = "div",
  className,
  ...props
}: ContainerProps) {
  const classes = ["site-container", className].filter(Boolean).join(" ");
  return <Component className={classes} {...props} />;
}
