import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc } from "drizzle-orm";
import ProjectsManager from "./ProjectsManager";

export default async function ProyectosPage() {
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));

  return (
    <div>
      <ProjectsManager initialProjects={allProjects} />
    </div>
  );
}
