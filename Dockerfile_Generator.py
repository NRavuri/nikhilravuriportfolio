
import ollama
import os
import json

def detect_project_type():
    files = set(os.listdir("."))

    # Detect Vite (your portfolio project)
    if "vite.config.ts" in files or "vite.config.js" in files:
        return "vite-react"

    # Detect React (CRA or other)
    if "package.json" in files:
        try:
            with open("package.json") as f:
                pkg = json.load(f)
                deps = pkg.get("dependencies", {})
                if "react" in deps:
                    return "react"
                if "express" in deps:
                    return "node-backend"
        except:
            pass

    return "unknown"


def generate_dockerfile_with_llm(project_type):
    if project_type == "vite-react":
        prompt = """
Generate a production-ready Dockerfile for a Vite + React project.
Requirements:
- Use multi-stage build
- Stage 1: node:18-alpine → install deps → npm run build
- Stage 2: nginx:alpine → copy dist/ → serve static files
- Expose port 80
Return ONLY a valid Dockerfile, no code fences.
"""

    elif project_type == "react":
        prompt = """
Generate a Dockerfile for a standard React (CRA or similar) application.
- Use node:18-alpine
- Install dependencies
- Run npm run build
- Serve using production server or npm start
Return ONLY the Dockerfile, no explanation, no code fences.
"""

    elif project_type == "node-backend":
        prompt = """
Generate a Dockerfile for a Node.js backend server (Express).
- Use node:18-alpine
- Install dependencies
- Start the app with node server.js
Return ONLY the Dockerfile.
"""

    else:
        prompt = """
Generate a generic Dockerfile for an unknown project.
Use Linux Alpine base image and describe minimal steps.
Return ONLY the Dockerfile.
"""

    response = ollama.chat(
        model="llama3.2",   # stable working model
        messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]


if __name__ == "__main__":
    project_type = detect_project_type()
    print(f"\nDetected project type: {project_type}\n")

    dockerfile = generate_dockerfile_with_llm(project_type)

    print("Generated Dockerfile:\n")
    print(dockerfile)
