// Detailed Room-by-Room Estimator
export const estimateRooms = (rooms) => {
  const details = rooms.map((room) => {
    const {
      length,
      width,
      height,
      wallThickness,
      doors = [], 
      windows = [], 
      plasterSides = 2,
    } = room;

    if (!length || !width || !height || !wallThickness) {
      return {
        wallArea: 0,
        openingArea: 0,
        netArea: 0,
        brickVolume: 0,
        plasterArea: 0,
      };
    }

    const perimeter = 2 * (length + width);
    const wallArea = perimeter * height;
    const doorArea = doors.reduce(
      (sum, d) => sum + (Number(d.width) || 0) * (Number(d.height) || 0),
      0,
    );
    const windowArea = windows.reduce(
      (sum, w) => sum + (Number(w.width) || 0) * (Number(w.height) || 0),
      0,
    );

    // Combine them for the total deduction
    const openingArea = doorArea + windowArea;
    const netArea = Math.max(wallArea - openingArea, 0);
    return {
      wallArea,
      openingArea,
      netArea,
      brickVolume: netArea * wallThickness,
      plasterArea: netArea * plasterSides,
    };
  });

  const totals = details.reduce(
    (acc, r) => {
      acc.brickVolume += r.brickVolume;
      acc.plasterArea += r.plasterArea;
      return acc;
    },
    { brickVolume: 0, plasterArea: 0 },
  );

  return { details, totals };
};

// Smart Area-Based Estimator 
export const estimateFloorsByArea = (floors) => {
  const details = floors.map((floor) => {
    const {
      area = 0,
      height = 3,
      wallThickness = 0.23,
      slabThickness = 0.15,
    } = floor;

    if (!area || area <= 0) {
      return { slabVolume: 0, brickVolume: 0, plasterArea: 0 };
    }

    const slabVolume = area * slabThickness;
    const baseBrickCoefficient = 0.15;
    const brickVolume = area * baseBrickCoefficient * (wallThickness / 0.23);
    const plasterArea = area * 3.5;

    return {
      floorArea: area,
      floorHeight: height,
      slabVolume: Number(slabVolume.toFixed(2)),
      brickVolume: Number(brickVolume.toFixed(2)),
      plasterArea: Number(plasterArea.toFixed(2)),
    };
  });

  const totals = details.reduce(
    (acc, f) => {
      acc.totalArea += f.floorArea || 0;
      acc.slabVolume += f.slabVolume;
      acc.brickVolume += f.brickVolume;
      acc.plasterArea += f.plasterArea;
      return acc;
    },
    { totalArea: 0, slabVolume: 0, brickVolume: 0, plasterArea: 0 },
  );

  return {
    details,
    totals: {
      totalArea: Number(totals.totalArea.toFixed(2)),
      slabVolume: Number(totals.slabVolume.toFixed(2)),
      brickVolume: Number(totals.brickVolume.toFixed(2)),
      plasterArea: Number(totals.plasterArea.toFixed(2)),
    },
  };
};
