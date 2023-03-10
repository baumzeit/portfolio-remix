import { navigate } from "gatsby";
import React from "react";

import { UseJitterGridReturn } from "../../../common/hooks/use-jitter-grid";
import { useHighlightArea } from "../../project/use-highlight-area";
import { useProjectsChartData } from "../../projects/use-projects-chart-data";
import { VoronoiChart } from "./VoronoiChart";

type VoronoiContainerProps = {
  projects: Queries.ProjectBaseFragment[];
  areas: Queries.AreaBaseFragment[];
} & Required<UseJitterGridReturn>;

export const VoronoiContainer = ({
  gridSpecs: { width, height, numCols, numRows },
  projects,
  areas,
  getGridCoordinates,
}: VoronoiContainerProps) => {
  const [highlightArea] = useHighlightArea();

  const chartData = useProjectsChartData({ projects, getGridCoordinates });

  return (
    <div>
      <VoronoiChart
        data={chartData}
        width={width}
        height={height}
        onClickCell={(data) => navigate(data.slug)}
        imageSize={Math.max(width / numCols, height / numRows) * 1.2}
        highlightPatternData={areas}
        highlightedAreaId={highlightArea?.id}
      />
    </div>
  );
};
