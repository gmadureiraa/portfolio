import { Bento } from "@/components/bento";
import { NewsletterManifestoBlock } from "@/components/newsletter-manifesto-block";

export default function Home() {
  return (
    <>
      <div className="w-full flex items-center justify-center max-w-5xl mx-auto">
        <div className="flex flex-col items-center overflow-hidden">
          <div className="w-full py-2 px-2 lg:py-10 lg:px-4">
            <Bento />
          </div>
        </div>
      </div>

      {/* Bloco de inscrição da newsletter — substitui o antigo card
          "Projetos ao Vivo" do bento. Same manifesto da /newsletter. */}
      <NewsletterManifestoBlock />
    </>
  );
}
