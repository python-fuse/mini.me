import { getUrlStats } from '@/src/app/actions';
import { transformData } from '@/src/utils/utils';
import { LocationStat, DeviceStat } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Locations = ({ id }: { id: string }) => {
  const [countryData, setCountryData] = useState<
    { name: string; value: number; fill: string }[] | undefined
  >(undefined);
  const [cityData, setCityData] = useState<
    { name: string; value: number; fill: string }[] | undefined
  >(undefined);
  const [osData, setOsData] = useState<
    { name: string; value: number; fill: string }[] | undefined
  >(undefined);
  const [browserData, setBrowserData] = useState<
    { name: string; value: number; fill: string }[] | undefined
  >(undefined);
  const [deviceData, setDeviceData] = useState<
    { name: string; value: number; fill: string }[] | undefined
  >(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUrlStats(id);

      // Group data by country and sum clicks
      const countryClicks = data.locationStats.reduce(
        (acc: Record<string, number>, stat: LocationStat) => {
          acc[stat.country] = (acc[stat.country] || 0) + stat.clicks;
          return acc;
        },
        {},
      );

      // Group data by city and sum clicks
      const cityClicks = data.locationStats.reduce(
        (acc: Record<string, number>, stat: LocationStat) => {
          acc[stat.city] = (acc[stat.city] || 0) + stat.clicks;
          return acc;
        },
        {},
      );

      // Group data by os and sum clicks
      const osClicks = data.deviceStats.reduce(
        (acc: Record<string, number>, stat: DeviceStat) => {
          acc[stat.os] = (acc[stat.os] || 0) + stat.clicks;
          return acc;
        },
        {},
      );

      // Group data by browser and sum clicks
      const browserClicks = data.deviceStats.reduce(
        (acc: Record<string, number>, stat: DeviceStat) => {
          acc[stat.browser] = (acc[stat.browser] || 0) + stat.clicks;
          return acc;
        },
        {},
      );

      // Group data by device and sum clicks
      const deviceClicks = data.deviceStats.reduce(
        (acc: Record<string, number>, stat: DeviceStat) => {
          acc[stat.device] = (acc[stat.device] || 0) + stat.clicks;
          return acc;
        },
        {},
      );

      // Transform grouped data into array format
      const transformedCountryData = transformData(countryClicks);
      const transformedCityData = transformData(cityClicks);
      const transformedOsData = transformData(osClicks);
      const transformedBrowserData = transformData(browserClicks);
      const transformedDeviceData = transformData(deviceClicks);

      // Set state
      setCountryData(transformedCountryData);
      setCityData(transformedCityData);
      setOsData(transformedOsData);
      setBrowserData(transformedBrowserData);
      setDeviceData(transformedDeviceData);
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col gap-y-2 w-full  p-4">
      <h2 className="text-lg font-bold text-black/80">Analytic Sources</h2>

      <div className="grid grid-cols-1 md:grid-cols-4">
        {countryData && (
          // [1,2,3,4].map((_)=>(

          // ))
          <>
            <MyPieChart data={countryData} cityData={cityData} />
            <MyPieChart data={osData} />
            <MyPieChart data={browserData} />
            <MyPieChart data={deviceData} />
          </>
        )}
      </div>
    </div>
  );
};

export default Locations;

const MyPieChart = ({
  data,
  cityData,
}: {
  data:
    | {
        name: string;
        value: number;
        fill: string;
      }[]
    | undefined;
  cityData?:
    | {
        name: string;
        value: number;
        fill: string;
      }[]
    | undefined;
}) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={300}
      // className={'bg-red-500'}
    >
      <PieChart width={200} height={200}>
        <Pie
          dataKey="value"
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={60}
          label
        />
        <Legend layout="horizontal" align="center" verticalAlign="bottom" />

        {cityData && (
          <Pie
            dataKey="value"
            data={cityData}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            label
          />
        )}
        <Tooltip />
        {/* <Legend layout="horizontal" align="center" verticalAlign="bottom" /> */}
      </PieChart>
    </ResponsiveContainer>
  );
};
