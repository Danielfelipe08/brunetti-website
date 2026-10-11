import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type TextLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "children" | "href"
> & {
  /** Undefined while the destination has not been approved or implemented. */
  href: string | undefined;
  children: ReactNode;
};

export function TextLink({
  href,
  className,
  children,
  ...props
}: TextLinkProps) {
  const classes = ["text-link", className].filter(Boolean).join(" ");

  if (href === undefined) {
    return (
      <a className={classes} {...props} role="link" aria-disabled="true" title="Em breve">
        {children}
        <span aria-hidden="true">→</span>
      </a>
    );
  }

  const isExternal = /^(https?:)?\/\//.test(href);

  if (isExternal) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
