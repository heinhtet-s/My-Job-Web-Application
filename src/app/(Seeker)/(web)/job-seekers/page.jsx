import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { SeekersConst } from "@/lib/queryConst";
import CandidatePage from "./body";
import { GetSeekerList } from "@/modules/services/seeker_service";

export default async function Candidates() {
  try {
    const data = await odataQueryHandler(
      SeekersConst,
      SeekersConst.filter,
      SeekersConst.order,
      SeekersConst.fields,
      "normal",
      { top: 10, skip: 0 },
      GetSeekerList
    );
    return <CandidatePage data={data} />;
  } catch (error) {
    console.error('Error fetching data:', error);
    return <CandidatePage data={{ count: 0, value: [] }} />;
  }
}




