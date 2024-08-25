import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { SeekersConst,  EmployersConst } from "@/lib/queryConst";
import { GetSeekerList } from "@/modules/services/seeker_service";
import {GetEmployersList} from '@/modules/services/employer_service'
import HomePage from "./home";

export default async function Home() {
  try {
    // Call all APIs in parallel
    const [data1, data2] = await Promise.all([
      odataQueryHandler(
        SeekersConst,
        SeekersConst.filter,
        SeekersConst.order,
        SeekersConst.fields,
        "no_child",
        { top: 10, skip: 0 },
        GetSeekerList
      ),
      odataQueryHandler(
        EmployersConst,
        EmployersConst.filter,
        EmployersConst.order,
        EmployersConst.fields,
        "no_child",
        { top: 10, skip: 0 },
        GetEmployersList
      ),
      // odataQueryHandler(
      //   AnotherConst,
      //   AnotherConst.filter,
      //   AnotherConst.order,
      //   AnotherConst.fields,
      //   "no_child",
      //   { top: 10, skip: 0 },
      //   GetAnotherList
      // ),
      // odataQueryHandler(
      //   ThirdConst,
      //   ThirdConst.filter,
      //   ThirdConst.order,
      //   ThirdConst.fields,
      //   "no_child",
      //   { top: 10, skip: 0 },
      //   GetThirdList
      // ),
      // odataQueryHandler(
      //   FourthConst,
      //   FourthConst.filter,
      //   FourthConst.order,
      //   FourthConst.fields,
      //   "no_child",
      //   { top: 10, skip: 0 },
      //   GetFourthList
      // ),
    ]);
    console.log(data1)
    console.log(data2)
    console.log('first')

    // Pass the data to the HomePage component
    return <HomePage data1={data1} data2={data2} data3={data3} data4={data4} />;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle error by sending empty data to the HomePage
    return <HomePage data1={{ count: 0, value: [] }} data2={{ count: 0, value: [] }} data3={{ count: 0, value: [] }} data4={{ count: 0, value: [] }} />;
  }
}
