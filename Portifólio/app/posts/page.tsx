import { redirect } from "next/navigation";

/**
 * /posts não existe como listing — redireciona pra /newsletter,
 * que já é o índice canônico das cartas (newsletter Synecdoche).
 */
export default function PostsRedirect() {
  redirect("/newsletter");
}
