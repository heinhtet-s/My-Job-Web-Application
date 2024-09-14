"use client";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PrimaryBtn from "@/components/ui/primaryBtn";
import PaginatedItems from "@/components/share/pagination";
import { apiQueryHandler } from "@/lib/apiQueryHandler";
import { AppliedJobPostConst, EmployersConst } from "@/lib/queryConst";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [filter, setFilter] = useState(AppliedJobPostConst.filter);
  const SEEKERID = session?.user?.Id;
  const [data, setData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const fetchCompanyList = useCallback(
    async (pageNumber, perPage) => {
      setLoading(true);
      const queryString = await apiQueryHandler(
        EmployersConst,
        EmployersConst.filter,
        EmployersConst.order,
        EmployersConst.fields,
        "normal",
        {
          pageNumber,
          perPage,
        }
      );

      axios
        .get(`/api/company_lists/get?${queryString}`)
        .then((res) => {
          setPaging({
            pageNumber,
            perPage,
            total: res["@odata.count"],
          });
          setCompanyData(res.data.value);
        })
        .catch((error) => {})
        .finally(() => {
          setLoading(false);
        });
    },
    [filter]
  );
  const [paging, setPaging] = useState({
    pageNumber: 1,
    perPage: 100,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (SEEKERID) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        SeekerId: {
          ...prevFilter.SeekerId,
          value: SEEKERID,
        },
      }));
    }
  }, [SEEKERID]);
  async function getApplications(pageNumber, perPage) {
    setLoading(true);
    try {
      const result = await axios.get(
        `/api/appliedJobpost/get?${await apiQueryHandler(
          AppliedJobPostConst,
          filter,
          AppliedJobPostConst.order,
          AppliedJobPostConst.fields,
          "no_child",
          {
            pageNumber,
            perPage,
          }
        )}`
      );
      setPaging((prev) => ({
        ...prev,
        total: result.data["@odata.count"],
      }));
      setData(result.data);
    } catch (error) {
      // errorMessage(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (filter.SeekerId.value) {
      fetchCompanyList(paging.pageNumber, paging.perPage);
      getApplications(paging.pageNumber, paging.perPage);
    }
  }, [paging.pageNumber, paging.perPage, filter]);

  useEffect(() => {
    setPaging((prev) => ({
      ...prev,
      pageNumber: currentPage,
    }));
  }, [currentPage]);

  return (
    <div>
      <h1 className="text-[38px] font-[700]">Applications</h1>
      <p className="opacity-60 mb-[40px]">
        Detailed list of your job applications.
      </p>
      <Table>
        <TableHeader className="border-b-2 border-black">
          <TableRow>
            <TableHead>Job Title </TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Functional Area</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Apply Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan="5">Loading...</TableCell>
            </TableRow>
          ) : data?.length > 0 ? (
            data?.map((item, index) => {
              const formattedDate = format(
                new Date(item.CreatedAt),
                "dd/MM/yy hh:mm a"
              );
              return (
                <TableRow key={index}>
                  <TableCell>
                    <p className="text-primary font-[500]">{item.JobTitle}</p>
                    <p className="flex items-center gap-1 font-[500]">
                      <EarthIcon />
                      {
                        companyData?.filter(
                          (el) => el?.Id === item?.EmployerId
                        )?.[0]?.MapAddress
                      }
                    </p>
                  </TableCell>
                  <TableCell className="text-blue-500 font-[300] ">
                    {item.CompanyName}
                  </TableCell>
                  <TableCell>{item.FunctionalArea}</TableCell>
                  <TableCell className="font-[500]">{item.JobType}</TableCell>
                  <TableCell className="font-[300]">{formattedDate}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan="5">No applications found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <PaginatedItems
        itemsPerPage={paging.perPage}
        totalPage={Math.ceil(paging.total / paging.perPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
const EarthIcon = () => {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_90_1416)">
        <path
          d="M2.78362 2.26573C2.78362 2.26573 2.99702 2.1412 3.42383 1.89213C3.85063 1.64305 4.56943 1.51852 5.58022 1.51852C6.59101 1.51852 7.5232 1.76759 8.37681 2.26573C9.23042 2.76387 9.9063 3.43974 10.4044 4.29335C10.9026 5.14696 11.1516 6.07916 11.1516 7.08995C11.1516 8.10074 10.9026 9.03294 10.4044 9.88654C9.9063 10.7402 9.23042 11.416 8.37681 11.9142C7.5232 12.4123 6.59101 12.6614 5.58022 12.6614C4.56943 12.6614 3.63723 12.4123 2.78362 11.9142C1.93001 11.416 1.25414 10.7402 0.755999 9.88654C0.257859 9.03294 0.00878906 8.10074 0.00878906 7.08995C0.00878906 6.07916 0.257859 5.14696 0.755999 4.29335C1.25414 3.43974 1.93001 2.76387 2.78362 2.26573ZM7.56794 5.2981C7.55827 5.30293 7.5353 5.3259 7.49902 5.36701C7.46275 5.40812 7.43011 5.43109 7.40109 5.43593C7.41076 5.43593 7.42164 5.42384 7.43373 5.39966C7.44582 5.37548 7.45791 5.34888 7.47001 5.31986C7.4821 5.29084 7.49056 5.27391 7.4954 5.26908C7.52441 5.23522 7.57761 5.19895 7.65499 5.16026C7.7227 5.13124 7.84845 5.10223 8.03223 5.07321C8.19666 5.03452 8.31999 5.06112 8.4022 5.15301C8.39253 5.14333 8.4155 5.1119 8.47112 5.0587C8.52674 5.0055 8.5618 4.97648 8.57631 4.97164C8.59082 4.96197 8.62709 4.95109 8.68513 4.939C8.74316 4.92691 8.77944 4.90877 8.79395 4.88459L8.80845 4.72499C8.75042 4.72983 8.7081 4.7129 8.6815 4.67421C8.6549 4.63552 8.63918 4.58474 8.63435 4.52187C8.63435 4.53154 8.61984 4.55089 8.59082 4.5799C8.59082 4.54605 8.57994 4.5267 8.55818 4.52187C8.53641 4.51703 8.5086 4.51945 8.47475 4.52912C8.44089 4.5388 8.41913 4.54121 8.40946 4.53638C8.3611 4.52187 8.32482 4.50373 8.30064 4.48197C8.27646 4.46021 8.25711 4.42031 8.24261 4.36227C8.2281 4.30423 8.21842 4.26796 8.21359 4.25345C8.20392 4.22927 8.18094 4.20267 8.14467 4.17365C8.1084 4.14464 8.08543 4.12045 8.07575 4.10111C8.07092 4.09144 8.06487 4.07814 8.05762 4.06121C8.05036 4.04428 8.04311 4.02856 8.03585 4.01406C8.0286 3.99955 8.01893 3.98625 8.00684 3.97416C7.99474 3.96207 7.98145 3.95602 7.96694 3.95602C7.95243 3.95602 7.9355 3.96811 7.91615 3.99229C7.89681 4.01647 7.87867 4.04066 7.86175 4.06484C7.84482 4.08902 7.83394 4.10111 7.8291 4.10111C7.81459 4.09144 7.80008 4.08781 7.78557 4.09023C7.77107 4.09265 7.76018 4.09506 7.75293 4.09748C7.74568 4.0999 7.73479 4.10715 7.72028 4.11925C7.70578 4.13134 7.69368 4.1398 7.68401 4.14464C7.6695 4.15431 7.64895 4.16156 7.62235 4.1664C7.59575 4.17124 7.5752 4.17607 7.56069 4.18091C7.63323 4.15673 7.63081 4.13013 7.55343 4.10111C7.50507 4.08176 7.46638 4.07451 7.43736 4.07935C7.48089 4.06 7.49902 4.03098 7.49177 3.99229C7.48451 3.9536 7.46396 3.91975 7.43011 3.89073H7.46638C7.46154 3.87138 7.44099 3.85083 7.40472 3.82907C7.36844 3.8073 7.32613 3.78675 7.27776 3.7674C7.2294 3.74806 7.19796 3.73355 7.18345 3.72388C7.14476 3.6997 7.06255 3.67672 6.9368 3.65496C6.81106 3.6332 6.73126 3.63199 6.6974 3.65133C6.67322 3.68035 6.66234 3.70574 6.66476 3.7275C6.66718 3.74927 6.67685 3.78312 6.69378 3.82907C6.7107 3.87501 6.71917 3.90524 6.71917 3.91975C6.724 3.94877 6.7107 3.9802 6.67927 4.01406C6.64783 4.04791 6.63211 4.07693 6.63211 4.10111C6.63211 4.13496 6.66597 4.17245 6.73368 4.21355C6.80139 4.25466 6.82557 4.30665 6.80622 4.36952C6.79171 4.40821 6.75302 4.44691 6.69015 4.4856C6.62728 4.52429 6.58859 4.5533 6.57408 4.57265C6.5499 4.61134 6.54627 4.65608 6.5632 4.70686C6.58012 4.75764 6.60552 4.79754 6.63937 4.82656C6.64904 4.83623 6.65267 4.8459 6.65025 4.85557C6.64783 4.86525 6.63937 4.87613 6.62486 4.88822C6.61035 4.90031 6.59705 4.90998 6.58496 4.91724C6.57287 4.92449 6.55715 4.93295 6.53781 4.94263L6.51604 4.95714C6.46284 4.98132 6.41327 4.96681 6.36733 4.91361C6.32138 4.86041 6.28874 4.79754 6.26939 4.72499C6.23554 4.60409 6.19685 4.53154 6.15332 4.50736C6.04209 4.46867 5.97196 4.47109 5.94294 4.51461C5.91876 4.45174 5.81961 4.38887 5.64551 4.326C5.5246 4.28247 5.38435 4.2728 5.22475 4.29698C5.25377 4.29214 5.25377 4.25587 5.22475 4.18816C5.19089 4.11562 5.14495 4.0866 5.08691 4.10111C5.10142 4.07209 5.1111 4.02977 5.11593 3.97416C5.12077 3.91854 5.12319 3.88589 5.12319 3.87622C5.1377 3.81335 5.16671 3.75773 5.21024 3.70937C5.21508 3.70453 5.232 3.68398 5.26102 3.64771C5.29004 3.61143 5.31301 3.57879 5.32994 3.54977C5.34687 3.52075 5.34807 3.50624 5.33357 3.50624C5.50284 3.52559 5.62374 3.49899 5.69629 3.42644C5.72047 3.40226 5.74828 3.36115 5.77972 3.30312C5.81115 3.24508 5.83654 3.20397 5.85589 3.17979C5.89941 3.15077 5.93327 3.13748 5.95745 3.13989C5.98163 3.14231 6.01669 3.15561 6.06264 3.17979C6.10858 3.20397 6.14365 3.21606 6.16783 3.21606C6.23554 3.2209 6.27302 3.1943 6.28027 3.13627C6.28753 3.07823 6.26939 3.02987 6.22586 2.99118C6.2839 2.99601 6.29115 2.9549 6.24763 2.86785C6.22828 2.834 6.20894 2.81223 6.18959 2.80256C6.13156 2.78321 6.06627 2.79531 5.99372 2.83883C5.95503 2.85818 5.95987 2.87752 6.00823 2.89687C6.00339 2.89203 5.98042 2.91742 5.93931 2.97304C5.8982 3.02866 5.85831 3.07098 5.81961 3.09999C5.78092 3.12901 5.74223 3.11692 5.70354 3.06372C5.69871 3.05888 5.68541 3.02624 5.66364 2.96579C5.64188 2.90533 5.61891 2.87269 5.59473 2.86785C5.55604 2.86785 5.51735 2.90412 5.47865 2.97667C5.49316 2.93798 5.46656 2.9017 5.39886 2.86785C5.33115 2.834 5.27311 2.81465 5.22475 2.80981C5.31664 2.75178 5.29729 2.68649 5.16671 2.61394C5.13286 2.5946 5.08329 2.58251 5.018 2.57767C4.95271 2.57284 4.90555 2.58251 4.87653 2.60669C4.85235 2.64054 4.83905 2.66835 4.83664 2.69012C4.83422 2.71188 4.84631 2.73123 4.87291 2.74815C4.89951 2.76508 4.9249 2.77838 4.94908 2.78805C4.97326 2.79772 5.00107 2.8074 5.03251 2.81707C5.06394 2.82674 5.0845 2.834 5.09417 2.83883C5.16188 2.8872 5.18122 2.92105 5.1522 2.9404C5.14253 2.94523 5.12198 2.9537 5.09054 2.96579C5.0591 2.97788 5.0313 2.98876 5.00711 2.99843C4.98293 3.0081 4.96842 3.01778 4.96359 3.02745C4.94908 3.04679 4.94908 3.08065 4.96359 3.12901C4.9781 3.17737 4.97326 3.21123 4.94908 3.23057C4.9249 3.20639 4.90313 3.16407 4.88379 3.10362C4.86444 3.04317 4.84752 3.00327 4.83301 2.98392C4.86686 3.02745 4.80641 3.04196 4.65165 3.02745L4.5791 3.02019C4.55976 3.02019 4.52107 3.02503 4.46303 3.0347C4.40499 3.04438 4.35542 3.04679 4.31431 3.04196C4.2732 3.03712 4.24056 3.01778 4.21638 2.98392C4.19703 2.94523 4.19703 2.89687 4.21638 2.83883C4.22121 2.81949 4.23089 2.81465 4.2454 2.82432C4.22605 2.80981 4.19945 2.78684 4.1656 2.75541C4.13174 2.72397 4.10756 2.70342 4.09305 2.69374C3.87058 2.76629 3.64328 2.86543 3.41113 2.99118C3.44015 2.99601 3.46917 2.99359 3.49819 2.98392C3.52237 2.97425 3.5538 2.95853 3.59249 2.93677C3.63118 2.915 3.65537 2.9017 3.66504 2.89687C3.82947 2.82916 3.93104 2.81223 3.96973 2.84609L4.006 2.80981C4.07371 2.8872 4.12207 2.94765 4.15109 2.99118C4.11723 2.97183 4.04469 2.96941 3.93345 2.98392C3.83673 3.01294 3.78353 3.04196 3.77386 3.07098C3.80771 3.12901 3.8198 3.17254 3.81013 3.20156C3.79078 3.18705 3.76297 3.16287 3.7267 3.12901C3.69043 3.09516 3.65537 3.06856 3.62151 3.04921C3.58766 3.02987 3.55139 3.01778 3.5127 3.01294C3.43531 3.01294 3.38211 3.01536 3.3531 3.02019C2.647 3.4071 2.07873 3.94393 1.6483 4.63068C1.68215 4.66454 1.71117 4.68388 1.73535 4.68872C1.7547 4.69356 1.76679 4.71532 1.77162 4.75401C1.77646 4.7927 1.78251 4.8193 1.78976 4.83381C1.79701 4.84832 1.82482 4.84106 1.87319 4.81205C1.91671 4.85074 1.92397 4.89668 1.89495 4.94988C1.89979 4.94505 2.00618 5.01034 2.21415 5.14575C2.30604 5.22797 2.35682 5.27875 2.36649 5.2981C2.381 5.3513 2.35682 5.39482 2.29395 5.42868C2.28911 5.419 2.26735 5.39724 2.22866 5.36339C2.18996 5.32953 2.1682 5.31986 2.16336 5.33437C2.14886 5.35855 2.15006 5.40329 2.16699 5.46858C2.18392 5.53387 2.20931 5.56409 2.24316 5.55926C2.20931 5.55926 2.18634 5.59795 2.17425 5.67533C2.16216 5.75271 2.15611 5.83855 2.15611 5.93286C2.15611 6.02717 2.15369 6.084 2.14886 6.10334L2.16336 6.1106C2.14886 6.16863 2.16216 6.25206 2.20326 6.36088C2.24437 6.46969 2.29636 6.51685 2.35924 6.50234C2.29636 6.51685 2.34473 6.62083 2.50432 6.81428C2.53334 6.85297 2.55269 6.87473 2.56236 6.87957C2.57687 6.88924 2.60589 6.90738 2.64941 6.93398C2.69294 6.96058 2.72921 6.98476 2.75823 7.00652C2.78725 7.02829 2.81143 7.05368 2.83078 7.08269C2.85012 7.10688 2.8743 7.16128 2.90332 7.24592C2.93234 7.33055 2.96619 7.38738 3.00488 7.4164C2.99521 7.44542 3.01818 7.49378 3.0738 7.56149C3.12942 7.6292 3.15481 7.68481 3.14997 7.72834C3.14514 7.72834 3.13909 7.73076 3.13184 7.7356C3.12458 7.74043 3.11854 7.74285 3.1137 7.74285C3.12821 7.7767 3.16569 7.81056 3.22614 7.84441C3.2866 7.87827 3.32408 7.9097 3.33859 7.93872C3.34342 7.95323 3.34826 7.97741 3.3531 8.01127C3.35793 8.04512 3.36519 8.07172 3.37486 8.09106C3.38453 8.11041 3.40388 8.11525 3.4329 8.10557C3.44257 8.00885 3.38453 7.85892 3.25879 7.6558C3.18624 7.53489 3.14514 7.46476 3.13546 7.44542C3.12095 7.42124 3.10765 7.38375 3.09556 7.33297C3.08347 7.28219 3.07259 7.24713 3.06292 7.22778C3.07259 7.22778 3.0871 7.23141 3.10645 7.23867C3.12579 7.24592 3.14634 7.25438 3.16811 7.26406C3.18987 7.27373 3.20801 7.2834 3.22252 7.29307C3.23703 7.30275 3.24186 7.31 3.23703 7.31484C3.22252 7.34869 3.22735 7.39101 3.25153 7.44179C3.27572 7.49257 3.30473 7.53731 3.33859 7.576C3.37244 7.61469 3.41355 7.66063 3.46191 7.71383C3.51028 7.76703 3.53929 7.79847 3.54897 7.80814C3.57799 7.83716 3.61184 7.88431 3.65053 7.9496C3.68922 8.01489 3.68922 8.04754 3.65053 8.04754C3.69406 8.04754 3.74242 8.07293 3.79562 8.12371C3.84882 8.17449 3.88993 8.22164 3.91895 8.26517C3.94313 8.30386 3.96247 8.36673 3.97698 8.45379C3.99149 8.54084 4.00358 8.59888 4.01325 8.62789C4.02293 8.66175 4.04348 8.69439 4.07492 8.72583C4.10635 8.75727 4.13658 8.78024 4.1656 8.79475C4.19461 8.80926 4.23331 8.8286 4.28167 8.85278C4.33003 8.87696 4.36147 8.89389 4.37598 8.90356C4.40016 8.91324 4.44489 8.93863 4.51018 8.97974C4.57547 9.02085 4.62746 9.04865 4.66615 9.06316C4.71452 9.08251 4.75321 9.09218 4.78223 9.09218C4.81124 9.09218 4.84631 9.08614 4.88742 9.07404C4.92852 9.06195 4.96117 9.05349 4.98535 9.04865C5.0579 9.03898 5.12802 9.07525 5.19573 9.15747C5.26344 9.23969 5.31422 9.29047 5.34807 9.30981C5.52218 9.4017 5.65518 9.4283 5.74707 9.38961C5.7374 9.39445 5.73861 9.41259 5.7507 9.44402C5.76279 9.47546 5.78213 9.51294 5.80873 9.55647C5.83533 9.59999 5.8571 9.63506 5.87402 9.66166C5.89095 9.68826 5.90425 9.70881 5.91392 9.72332C5.9381 9.75234 5.98163 9.78861 6.0445 9.83214C6.10738 9.87566 6.1509 9.91194 6.17508 9.94095C6.2041 9.92161 6.22103 9.89984 6.22586 9.87566C6.21136 9.91435 6.22828 9.96272 6.27665 10.0208C6.32501 10.0788 6.36854 10.103 6.40723 10.0933C6.47493 10.0788 6.50879 10.0014 6.50879 9.86115C6.35886 9.9337 6.24037 9.89017 6.15332 9.73057C6.15332 9.72574 6.14727 9.71244 6.13518 9.69067C6.12309 9.66891 6.11342 9.64836 6.10617 9.62901C6.09891 9.60967 6.09287 9.58911 6.08803 9.56735C6.08319 9.54558 6.08319 9.52745 6.08803 9.51294C6.09287 9.49843 6.10496 9.49118 6.1243 9.49118C6.16783 9.49118 6.19201 9.48271 6.19685 9.46579C6.20168 9.44886 6.19685 9.41863 6.18234 9.3751C6.16783 9.33158 6.15816 9.30014 6.15332 9.2808C6.14848 9.24211 6.12188 9.19374 6.07352 9.13571C6.02516 9.07767 5.99614 9.0414 5.98647 9.02689C5.96229 9.07042 5.9236 9.08976 5.8704 9.08493C5.8172 9.08009 5.77851 9.05833 5.75432 9.01964C5.75432 9.02447 5.7507 9.03777 5.74344 9.05954C5.73619 9.0813 5.73256 9.09702 5.73256 9.10669C5.66969 9.10669 5.63342 9.10427 5.62374 9.09944C5.62858 9.08493 5.63463 9.04261 5.64188 8.97248C5.64914 8.90236 5.6576 8.84795 5.66727 8.80926C5.67211 8.78991 5.68541 8.76089 5.70717 8.7222C5.72893 8.68351 5.74707 8.64845 5.76158 8.61701C5.77609 8.58558 5.78576 8.55535 5.7906 8.52633C5.79543 8.49731 5.78455 8.47434 5.75795 8.45742C5.73135 8.44049 5.68903 8.43444 5.631 8.43928C5.53911 8.44412 5.47624 8.49248 5.44238 8.58437C5.43755 8.59888 5.43029 8.62427 5.42062 8.66054C5.41095 8.69681 5.39886 8.72462 5.38435 8.74397C5.36984 8.76331 5.34807 8.78024 5.31906 8.79475C5.2852 8.80926 5.22717 8.81409 5.14495 8.80926C5.06273 8.80442 5.0047 8.79233 4.97084 8.77298C4.90797 8.73429 4.85356 8.66417 4.80762 8.5626C4.76167 8.46104 4.7387 8.37157 4.7387 8.29419C4.7387 8.24583 4.74475 8.18175 4.75684 8.10195C4.76893 8.02215 4.77618 7.96169 4.7786 7.92058C4.78102 7.87948 4.76772 7.82023 4.7387 7.74285C4.75321 7.73318 4.77497 7.71021 4.80399 7.67393C4.83301 7.63766 4.85719 7.61227 4.87653 7.59776C4.88621 7.59292 4.89709 7.5893 4.90918 7.58688C4.92127 7.58446 4.93215 7.58446 4.94182 7.58688C4.9515 7.5893 4.96117 7.58567 4.97084 7.576C4.98052 7.56633 4.98777 7.55182 4.99261 7.53247C4.98777 7.52763 4.9781 7.52038 4.96359 7.51071C4.94908 7.4962 4.93941 7.48894 4.93457 7.48894C4.96842 7.50345 5.03734 7.49983 5.14132 7.47806C5.2453 7.4563 5.3118 7.45993 5.34082 7.48894C5.41336 7.54214 5.46656 7.53731 5.50042 7.47444C5.50042 7.4696 5.49437 7.44663 5.48228 7.40552C5.47019 7.36441 5.46898 7.33176 5.47865 7.30758C5.50284 7.43816 5.57296 7.45993 5.68903 7.37287C5.70354 7.38738 5.74102 7.39947 5.80148 7.40914C5.86193 7.41882 5.90425 7.43091 5.92843 7.44542C5.94294 7.45509 5.95987 7.46839 5.97921 7.48532C5.99856 7.50224 6.01186 7.51313 6.01911 7.51796C6.02637 7.5228 6.03846 7.52159 6.05539 7.51433C6.07231 7.50708 6.09287 7.49136 6.11705 7.46718C6.16541 7.53489 6.19443 7.59292 6.2041 7.64129C6.2573 7.83474 6.30325 7.94114 6.34194 7.96048C6.37579 7.97499 6.40239 7.97983 6.42174 7.97499C6.44108 7.97016 6.45196 7.94718 6.45438 7.90608C6.4568 7.86497 6.4568 7.83111 6.45438 7.80451C6.45196 7.77791 6.44834 7.74769 6.4435 7.71383L6.43624 7.6558C6.43624 7.61227 6.43624 7.56874 6.43624 7.52522L6.42899 7.46718C6.35645 7.45267 6.31171 7.42365 6.29478 7.38013C6.27785 7.3366 6.28148 7.29186 6.30566 7.24592C6.32985 7.19997 6.36612 7.15524 6.41448 7.11171C6.41932 7.10688 6.43866 7.09841 6.47252 7.08632C6.50637 7.07423 6.54385 7.05851 6.58496 7.03917C6.62607 7.01982 6.6563 7.00048 6.67564 6.98113C6.7772 6.88924 6.81348 6.80461 6.78446 6.72723C6.81831 6.72723 6.84491 6.70546 6.86426 6.66194C6.85942 6.66194 6.84733 6.65468 6.82799 6.64017C6.80864 6.62566 6.7905 6.61357 6.77358 6.6039C6.75665 6.59423 6.74577 6.58939 6.74093 6.58939C6.78446 6.56521 6.78929 6.52652 6.75544 6.47332C6.77962 6.45881 6.79776 6.43221 6.80985 6.39352C6.82194 6.35483 6.84008 6.33065 6.86426 6.32098C6.90778 6.37901 6.95857 6.38385 7.0166 6.33548C7.05529 6.29679 7.05771 6.2581 7.02386 6.21941C7.04804 6.18556 7.09761 6.16017 7.17257 6.14324C7.24754 6.12631 7.29227 6.10334 7.30678 6.07432C7.34063 6.084 7.35998 6.07916 7.36482 6.05981C7.36965 6.04047 7.37207 6.01145 7.37207 5.97276C7.37207 5.93407 7.37932 5.90505 7.39383 5.88571C7.41318 5.86153 7.44945 5.83976 7.50265 5.82042C7.55585 5.80107 7.58729 5.78898 7.59696 5.78414L7.72028 5.70435C7.73479 5.685 7.73479 5.67533 7.72028 5.67533C7.80734 5.685 7.8823 5.6584 7.94517 5.59553C7.99354 5.54233 7.97903 5.49397 7.90165 5.45044C7.91615 5.42142 7.9089 5.39845 7.87988 5.38152C7.85086 5.36459 7.81459 5.3513 7.77107 5.34162C7.78557 5.33679 7.81338 5.33558 7.85449 5.338C7.8956 5.34041 7.92099 5.33679 7.93066 5.32711C8.00321 5.27875 7.98628 5.24006 7.87988 5.21104C7.79767 5.18686 7.69368 5.21588 7.56794 5.2981ZM6.38546 11.6603C7.38174 11.4862 8.23052 11.0291 8.93178 10.2892C8.91727 10.2747 8.88704 10.2638 8.8411 10.2565C8.79515 10.2493 8.76493 10.2408 8.75042 10.2311C8.66336 10.1973 8.60533 10.1779 8.57631 10.1731C8.58115 10.1392 8.5751 10.1078 8.55818 10.0788C8.54125 10.0498 8.5219 10.028 8.50014 10.0135C8.47838 9.99899 8.44815 9.97964 8.40946 9.95546C8.37077 9.93128 8.34417 9.91435 8.32966 9.90468C8.31999 9.89501 8.30306 9.8805 8.27888 9.86115C8.2547 9.84181 8.23777 9.82851 8.2281 9.82125C8.21842 9.814 8.20029 9.80312 8.17369 9.78861C8.14709 9.7741 8.12653 9.76926 8.11203 9.7741C8.09752 9.77894 8.07333 9.78135 8.03948 9.78135L8.01772 9.78861C8.00321 9.79345 7.98991 9.79949 7.97782 9.80675C7.96573 9.814 7.95243 9.82125 7.93792 9.82851C7.92341 9.83576 7.91374 9.84302 7.9089 9.85027C7.90406 9.85753 7.90406 9.86357 7.9089 9.86841C7.80734 9.78619 7.72028 9.73299 7.64774 9.70881C7.62356 9.70397 7.59696 9.69067 7.56794 9.66891C7.53892 9.64715 7.51353 9.63022 7.49177 9.61813C7.47001 9.60604 7.44582 9.60241 7.41922 9.60725C7.39262 9.61208 7.36482 9.62901 7.3358 9.65803C7.31162 9.68221 7.29711 9.71848 7.29227 9.76685C7.28743 9.81521 7.2826 9.84664 7.27776 9.86115C7.24391 9.83697 7.24391 9.79465 7.27776 9.7342C7.31162 9.67375 7.31645 9.62901 7.29227 9.59999C7.27776 9.57098 7.25237 9.56009 7.2161 9.56735C7.17983 9.5746 7.15081 9.58548 7.12905 9.59999C7.10728 9.6145 7.07947 9.63506 7.04562 9.66166C7.01177 9.68826 6.99 9.70397 6.98033 9.70881C6.97066 9.71365 6.9501 9.72695 6.91867 9.74871C6.88723 9.77047 6.86668 9.78861 6.857 9.80312C6.84249 9.82246 6.82799 9.85148 6.81348 9.89017C6.79897 9.92886 6.78688 9.95546 6.7772 9.96997C6.76753 9.95063 6.73972 9.93491 6.69378 9.92282C6.64783 9.91073 6.62486 9.89743 6.62486 9.88292C6.63453 9.93128 6.64421 10.0159 6.65388 10.1368C6.66355 10.2577 6.67564 10.3496 6.69015 10.4125C6.724 10.5624 6.69499 10.6785 6.6031 10.7607C6.47252 10.8816 6.40239 10.9783 6.39272 11.0509C6.37337 11.1573 6.40239 11.2202 6.47977 11.2395C6.47977 11.2734 6.46043 11.3229 6.42174 11.3882C6.38304 11.4535 6.36612 11.5055 6.37095 11.5442C6.37095 11.5732 6.37579 11.6119 6.38546 11.6603Z"
          fill="#17171D"
        />
      </g>
      <defs>
        <clipPath id="clip0_90_1416">
          <rect
            width="11.16"
            height="13"
            fill="white"
            transform="matrix(1 0 0 -1 0 13.59)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Page;
