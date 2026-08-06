import React from "react";
import SettingsForm from "../../components/settingsForm";

const Settings = () => {
  return (
    <div className="h-full w-full overflow-y-auto bg-gray-100 dark:bg-[#12141c] p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-6 dark:text-white">Settings</h1>
      <SettingsForm />
    </div>
  );
};

export default Settings;
