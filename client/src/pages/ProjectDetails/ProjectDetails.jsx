import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import BoqSection from "../Dashboard/sections/BoqSection";
import CostChart from "../../components/costChart";
import OpeningBreakdown from "../Dashboard/sections/OpeningBreakdown";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

const ProjectDetails = () => {
  const { id } = useParams();
  const projects = useSelector((state) => state.projects.projects);
  const project = projects.find((p) => p.id.toString() === id);
  if (!project) {
    return <div className="p-6 dark:text-white">Project not found</div>;
  }
  const reportRef = useRef();
  const exportPDF = async () => {
    const element = reportRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${project.name}.pdf`);
  };

  return (
    <div ref={reportRef} className="p-6 space-y-6">
      {/* Header */}
      <div
        className="
    bg-white
    dark:bg-gray-800
    border
    border-gray-200
    dark:border-gray-700
    rounded-xl
    shadow
    p-6
  "
      >
        <h1 className="text-4xl font-bold dark:text-white">{project.name}</h1>

        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Created: {new Date(project.createdAt).toLocaleString()}
        </p>

        <button
          onClick={exportPDF}
          data-html2canvas-ignore
          className="
      mt-4
      bg-green-600
      hover:bg-green-700
      text-white
      px-4
      py-2
      rounded-lg
      font-medium
      transition
    "
        >
          Export PDF
        </button>
      </div>
      {/* BOQ */}
      <BoqSection result={project.result} />

      {/* Chart */}
      <div
        className="
    bg-white
    dark:bg-gray-800
    border
    border-gray-200
    dark:border-gray-700
    rounded-xl
    shadow
    p-6
  "
      >
        <CostChart result={project.result} />
      </div>

      {/* Openings */}
      {project.roomData && <OpeningBreakdown roomData={project.roomData} />}
    </div>
  );
};

export default ProjectDetails;
