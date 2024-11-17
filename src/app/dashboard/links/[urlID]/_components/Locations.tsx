import { getUrlStats } from "@/src/app/actions";
import { LocationStat } from "@prisma/client";
import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";

const Locations = ({ id }: { id: string }) => {
  const [groupedData, setGroupedData] = useState<
    { name: string; value: number; fill: string }[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUrlStats(id);

      // Group data by country and sum clicks
      const countryClicks = data.locationStats.reduce(
        (acc: Record<string, number>, stat: LocationStat) => {
          acc[stat.country] = (acc[stat.country] || 0) + stat.clicks;
          return acc;
        },
        {}
      );

      // Generate random color for each country
      const getRandomColor = () =>
        `#${Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")}`;

      // Transform grouped data into array format
      const transformedData = Object.entries(countryClicks).map(
        ([country, clicks]) => ({
          name: country,
          value: clicks,
          fill: getRandomColor(),
        })
      );

      setGroupedData(transformedData);
      console.log(transformedData);
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col gap-y-2 w-full  p-4">
      <h2 className="text-lg font-bold text-black/80">Locations</h2>

      {groupedData && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={200} height={200}>
            <Pie
              dataKey="value"
              data={groupedData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            />
            <Tooltip />
            <Legend layout="horizontal" align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Locations;
