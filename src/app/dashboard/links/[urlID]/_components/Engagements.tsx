import { getUrlStats } from '@/src/app/actions';
import { DailyStat } from '@prisma/client';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Engagements = ({ id }: { id: string }) => {
  const [dailyStats, setDailyStats] = useState<DailyStat[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: any = await getUrlStats(id);

      const transformedData = data.dailyStats.map((item: DailyStat) => {
        return {
          date: format(item.date, 'dd MMM'),
          clicks: item.clicks,
        };
      });

      setDailyStats(transformedData);
      console.log(data);
    };

    fetchData();
  }, [id]);
  return (
    <div className="flex flex-col gap-y-2 w-full h-[300px] p-4">
      <h2 className="text-lg font-bold text-black/80">Engagements</h2>

      {dailyStats && (
        <ResponsiveContainer width={'100%'} height="100%">
          <LineChart data={dailyStats} width={150} height={10}>
            <Line dataKey="clicks" type="bump" fill="#024efc" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
export default Engagements;
