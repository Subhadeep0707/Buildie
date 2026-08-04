export const estimateRooms = (rooms) => {
  const details = rooms.map((room) => {
    const {
      length,
      width,
      height,
      wallThickness,
      openings = [],
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

    const openingArea = openings.reduce(
      (sum, o) => sum + o.width * o.height,
      0,
    );

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

  return {
    details,
    totals,
  };
};