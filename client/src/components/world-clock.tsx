import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimeZone {
  label: string;
  timezone: string;
  code: string;
}

const WorldClock: React.FC = () => {
  const [times, setTimes] = useState<{ [key: string]: string }>({});

  const timezones: TimeZone[] = [
    { label: 'Local', timezone: 'America/Los_Angeles', code: 'PST' },
    { label: 'Eastern', timezone: 'America/New_York', code: 'EST' },
    { label: 'UTC', timezone: 'UTC', code: 'UTC' }
  ];

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};
      const now = new Date();
      
      // PST (Pacific Standard Time)
      const pstTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(now);
      newTimes['PST'] = pstTime;
      
      // EST (Eastern Standard Time)
      const estTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(now);
      newTimes['EST'] = estTime;
      
      // UTC
      const utcTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(now);
      newTimes['UTC'] = utcTime;
      
      setTimes(newTimes);
    };

    // Update immediately
    updateTimes();
    
    // Update every minute
    const interval = setInterval(updateTimes, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4" />
        <span className="font-medium">Business Hours</span>
      </div>
      <div className="flex items-center gap-4">
        {timezones.map((tz) => (
          <div key={tz.code} className="flex items-center gap-1">
            <span className="font-mono text-white dark:text-gray-100 min-w-[50px] font-medium">
              {times[tz.code] || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-400 font-medium">
              {tz.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;