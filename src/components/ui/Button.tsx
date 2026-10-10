import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type Variant = "primary" | "ghost";
type Tone = "light" | "dark";

type CommonProps = {
  variant?: Variant;
  /** Tone of the surface the button sits on. */
  surface?: Tone;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

function buildClassName(
  variant: Variant,
  surface: Tone,
  className?: string,
): string {
  return [
    "button",
    `button--${variant}`,
    surface === "dark" ? "button--on-dark" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    surface = "light",
    className,
    children,
  } = props;
  const classes = buildClassName(variant, surface, className);

  if (props.href !== undefined) {
    const {
      variant: _v,
      surface: _s,
      className: _c,
      children: _ch,
      href,
      ...anchorProps
    } = props;
    void [_v, _s, _c, _ch];
    const isExternal = /^(https?:)?\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const {
    variant: _v,
    surface: _s,
    className: _c,
    children: _ch,
    type = "button",
    ...buttonProps
  } = props;
  void [_v, _s, _c, _ch];
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
