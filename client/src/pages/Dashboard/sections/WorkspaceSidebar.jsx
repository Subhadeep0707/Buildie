import { DASHBOARD_SECTIONS } from "../../../constants/DashboardConfig";

const WorkspaceSidebar = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="w-56 h-full bg-white dark:bg-[#1a1d27] rounded-xl shadow p-4 border border-gray-200 dark:border-gray-800 flex flex-col overflow-y-auto custom-scrollbar">
      <h2 className="text-lg font-semibold mb-6 dark:text-white tracking-wide">
        Workspace
      </h2>
      <div className="space-y-6">
        {DASHBOARD_SECTIONS.map((category, index) => (
          <div key={index}>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-1">
              {category.categoryTitle}
            </h3>
            <div className="space-y-2">
              {category.items.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg capitalize transition font-medium ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white shadow"
                      : "bg-gray-200 text-gray-800 dark:bg-[#232734] dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#2a2f3d]"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default WorkspaceSidebar;
