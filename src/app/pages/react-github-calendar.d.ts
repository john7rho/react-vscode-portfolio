declare module 'react-github-calendar' {
    import React from 'react';
  
    interface GitHubCalendarProps {
      username: string;
      transformData?: (data: any) => any;
      hideColorLegend?: boolean;
      labels?: {
        totalCount?: string;
      };
      colorScheme?: string;
    }
  
    const GitHubCalendar: React.FC<GitHubCalendarProps>;
  
    export default GitHubCalendar;
  }