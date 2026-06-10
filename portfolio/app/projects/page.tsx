import { Suspense } from "react";
import { ProjectsClient } from "./_components/projects-client";

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center py-20">
          <div className="animate-pulse text-muted-foreground">Carregando...</div>
        </div>
      }
    >
      <ProjectsClient />
    </Suspense>
  );
}
