import { redirect } from "next/navigation";

/**
 * /posts não existe como listing próprio — redireciona pra home,
 * hub principal do site.
 */
export default function PostsRedirect() {
  redirect("/");
}
