import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import { buttonVariants } from "./internal/button";
import XLogoIcon from "./internal/x-icon";
import { socialLinks } from "@/lib/constants";
import Link from "next/link";

export const NewsletterFooter = () => {
  return (
    <div className="flex gap-6 items-center absolute bottom-[calc(var(--inset)+0.8rem)] md:bottom-[calc(var(--inset)+1.5rem)] left-1/2 -translate-x-1/2">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={buttonVariants({ size: "icon-xl" })}
        href={socialLinks.instagram}
      >
        <InstagramLogoIcon className="size-6" />
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X / Twitter"
        className={buttonVariants({ size: "icon-xl" })}
        href={socialLinks.x}
      >
        <XLogoIcon className="size-6" />
      </Link>
      <Link
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={buttonVariants({ size: "icon-xl" })}
        href={socialLinks.linkedin}
      >
        <LinkedInLogoIcon className="size-6" />
      </Link>
    </div>
  );
};
