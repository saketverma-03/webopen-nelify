"use client";
import ProjectCard from "@/app/editor/components/Card";

import { HomeNavbar } from "@/components/navbar/homeNavbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreateCard from "./components/CreateCard";

type Project = {
  _id: string;
  discription: string;
  isPublic: boolean;
  title: string;
};

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      let res = await axios.get("/api/projects");
      return res.data as {
        projects: Project[];
      };
    },
  });

  return (
    <main className="flex flex-col items-center">
      <div className="p-4 pb-0 pt-6 w-screen max-w-[1440px] h-full">
        <HomeNavbar />
        <div className="grid">
          <section className="mb-4">
            <CreateCard />
          </section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.projects.map((data, i: number) => (
              <ProjectCard
                key={i}
                discription={data.discription}
                id={data._id}
                isPublic={data.isPublic}
                title={data.title}
                createdAt="12345"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
