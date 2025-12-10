import { FolderGit2, Github, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url?: string;
  technologies?: string[];
  github_url?: string;
  live_url?: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      id: 1,
      title: "My Portfolio",
      description: "A modern React + TypeScript portfolio deployed on Vercel.",
      technologies: ["React", "TypeScript", "Vite", "TailwindCSS"],
      github_url: "https://github.com/NRavuri/nikhiportfolio",
      live_url: "https://nikhilportfolio.vercel.app/",
    },
    {
      id: 2,
      title: "AI Assistant",
      description: "A personal AI agent that integrates Calendar, Canvas LMS, and automation.",
      technologies: ["Python", "Flask", "LangChain", "OpenRouter"],
      github_url: "",
    },
  ];

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Projects
        </h2>

        {projects.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="bg-gray-50 rounded-lg p-12 border-2 border-dashed border-gray-300">
              <FolderGit2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No Projects Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Add static objects in the Projects component to display them
                here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-4">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <Github size={18} />
                        <span className="text-sm font-medium">Code</span>
                      </a>
                    )}

                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <ExternalLink size={18} />
                        <span className="text-sm font-medium">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
