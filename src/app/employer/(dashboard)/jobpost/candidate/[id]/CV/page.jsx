// import PdfViewer from "../../../../../../../components/ui/PdfViewer";
"use client";

import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  const params = useParams();

  const searchParams = useSearchParams();
  const Url = decodeURI(searchParams.get("url") || "");

  return (
    <>
      <iframe src={Url} width="100%" height="500px" />
      {/* <PdfViewer url={"https://pdfobject.com/pdf/sample.pdf"} /> */}
    </>
  );
};
export default Page;
