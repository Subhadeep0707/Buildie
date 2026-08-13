import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  deleteProject,
  setActiveProject,
  fetchProjectsAsync,
} from "../../store/slices/projectSlice";

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FETCH PROJECTS FROM WORDPRESS
  useEffect(() => {
    dispatch(fetchProjectsAsync());
  }, [dispatch]);

  const projects = useSelector((state) => state.projects.projects);

  const handleDelete = (id) => {
    dispatch(deleteProject(id));
  };

  const handleOpenProject = (project) => {
    dispatch(setActiveProject(project));
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Heading & Count aligned cleanly using items-baseline */}
      <div className="flex items-baseline justify-between">
        <h1 className="text-4xl font-bold dark:text-white">Saved Projects</h1>

        <span className="text-xs font-semibold px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full">
          {projects.length} {projects.length === 1 ? "Project" : "Projects"}
        </span>
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div
          className="
            bg-white
            dark:bg-gray-800
            p-8
            rounded-xl
            shadow
            text-gray-500
            dark:text-gray-400
            border
            border-gray-200
            dark:border-gray-700
            text-center
          "
        >
          No saved projects yet. Start by building and saving a project from
          your dashboard!
        </div>
      )}

      {/* Project Cards */}
      <div className="grid gap-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="
              bg-white
              dark:bg-gray-800
              border
              border-gray-200
              dark:border-gray-700
              p-5
              rounded-xl
              shadow
              flex
              flex-col
              md:flex-row
              justify-between
              gap-4
            "
          >
            {/* Project Info */}
            <div className="space-y-2">
              <h2 className="text-xl font-semibold dark:text-white">
                {project.name}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Created: {new Date(project.createdAt).toLocaleString()}
              </p>

              <p className="text-sm dark:text-gray-300">
                Floors: {project.floors?.length || 0}
              </p>

              <p className="text-sm dark:text-gray-300">
                Total Cost: ₹{project.result?.totalCost?.toFixed(2) || "0.00"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 items-start">
              <button
                onClick={() => handleOpenProject(project)}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  transition
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  font-medium
                "
              >
                Open
              </button>

              <button
                onClick={() => handleDelete(project.id)}
                className="
                  bg-red-600
                  hover:bg-red-700
                  transition
                  text-white
                  px-4
                  py-2
                  rounded-lg
                  font-medium
                "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
