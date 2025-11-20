import { WpProjectApiResponse } from './wordpress-types';

export const sortProjectsByDate = (projects: WpProjectApiResponse[]): WpProjectApiResponse[] => {
  return projects.sort((a, b) => {
    const aStart = a.meta._project_date_start || "";
    const aEnd = a.meta._project_date_end;
    const bStart = b.meta._project_date_start || "";
    const bEnd = b.meta._project_date_end;

    if (!aEnd && bEnd) return -1;
    if (aEnd && !bEnd) return 1;

    if (aEnd && bEnd) {
      return bEnd.localeCompare(aEnd);
    }

    return bStart.localeCompare(aStart);
  });
};
