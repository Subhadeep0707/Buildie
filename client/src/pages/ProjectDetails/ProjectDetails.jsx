import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BoqSection from "../Dashboard/sections/BoqSection";
import CostChart from "../../components/costChart";
import OpeningBreakdown from "../Dashboard/sections/OpeningBreakdown";
import { useProjectSettings } from "../../store/slices/useProjectSettings";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const { units } = useProjectSettings();
  const projects = useSelector((state) => state.projects.projects);

  // Safe lookup supporting both id and MongoDB _id
  const project = projects.find(
    (p) => p._id?.toString() === id || p.id?.toString() === id,
  );

  const reportRef = useRef();
  if (!project) {
    return <div className="p-6 dark:text-white">Project not found</div>;
  }

  // Multi-page PDF Export Logic
  const exportPDF = async () => {
    const element = reportRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#1f2937", 
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Loop to create additional pages if content overflows A4 height
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(`${project.name}.pdf`);
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      {/* reportRef container stays intact for PDF generation */}
      <div ref={reportRef} className="p-6 space-y-6 min-h-max">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">
              {project.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Created: {new Date(project.createdAt).toLocaleString()} | Concrete
              Grade:{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {project.formData?.grade || "M20"}
              </span>
            </p>
          </div>

          <button
            onClick={exportPDF}
            data-html2canvas-ignore
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition cursor-pointer shadow-md"
          >
            Export PDF
          </button>
        </div>

        {/* BOQ Summary */}
        <BoqSection result={project.result} />

        {/* Cost Chart */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6">
          <CostChart result={project.result} />
        </div>

        {/* Read-Only Detailed Rooms Breakdown */}
        {project.detailedRooms && project.detailedRooms.length > 0 && (
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow p-6 space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
              <h2 className="text-xl font-bold dark:text-white">
                Room Design Specifications
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Saved room dimensions and opening configurations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.detailedRooms.map((room, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#232734] space-y-2 text-sm"
                >
                  <div className="flex justify-between items-center font-bold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1">
                    <span>{room.name || `Room ${idx + 1}`}</span>
                    <span className="text-xs font-normal text-gray-500">
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                    <p>
                      <span className="font-medium">Dimensions:</span>{" "}
                      {room.length} × {room.width} × {room.height}{" "}
                      {units.length}
                    </p>
                    <p>
                      <span className="font-medium">Wall Thickness:</span>{" "}
                      {room.wallThickness} {units.length}
                    </p>
                    <p>
                      <span className="font-medium">Openings:</span>{" "}
                      {room.doors?.length || 0} Doors,{" "}
                      {room.windows?.length || 0} Windows
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Structural Floor Breakdown */}
        {project.result?.breakdown?.floorsBreakdown && (
          <OpeningBreakdown
            floorData={project.result.breakdown.floorsBreakdown}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
