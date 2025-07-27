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
      
      timezones.forEach(tz => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
          timeZone: tz.timezone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        });
        newTimes[tz.code] = timeString;
      });
      
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
            <span className="font-mono text-gray-900 dark:text-gray-100">
              {times[tz.code] || '--:--'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-500">
              {tz.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;