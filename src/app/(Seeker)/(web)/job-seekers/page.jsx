import { odataQueryHandler } from "@/lib/apiQueryHandler";
import { FunctionalAreasConst, SeekersConst } from "@/lib/queryConst";
import CandidatePage from "./body.jsx";
import { GetSeekerList } from "@/modules/services/seeker_service";
import { GetFunctionalAreaLists } from "@/modules/services/employer_service";

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
    const functionalArea = await odataQueryHandler(
      FunctionalAreasConst,
      FunctionalAreasConst.fields,
      FunctionalAreasConst.order,
      FunctionalAreasConst.fields,
      "no_child",
      { top: 100, skip: 0 },
      GetFunctionalAreaLists
    );
    return (
      <CandidatePage data={data} functionalAreas={functionalArea?.value} />
    );
  } catch (error) {
    return (
      <CandidatePage
        data={{ count: 0, value: [] }}
        functionalArea={{ count: 0, value: [] }}
      />
    );
  }
}
