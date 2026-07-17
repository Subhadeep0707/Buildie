import { DASHBOARD_SECTIONS } from "../../../constants/DashboardConfig";

const WorkspaceSidebar = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="w-56 bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Workspace</h2>

      <div className="space-y-2">
        {DASHBOARD_SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`w-full text-left px-4 py-2 rounded-lg capitalize transition font-medium ${
              activeSection === section.id
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;
