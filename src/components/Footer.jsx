import Link from "next/link";
import { footer } from "@/lib/const";
import { Facebook, Linkedin, Viber, Telegram, Youtube } from "lucide-react";

const groupByHeader = (footer) => {
  return footer.reduce((result, item) => {
    if (!result[item.header]) {
      result[item.header] = [];
    }

    result[item.header].push(item);
    return result;
  }, {});
};

export default function Footer() {
  const groupedFooter = groupByHeader(footer);
  return (
    <>
      <footer className=" text-white py-8 w-full  bg-[#dceeff]">
        <div className="container mb-8">
          {" "}
          <img src="./myjob.svg"></img>
        </div>
        <div className="container flex flex-wrap ">
          {Object.keys(groupedFooter).map((header) => (
            <div key={header} className="w-full md:w-1/3 lg:w-1/4 mb-8 px-4">
              <h1 className=" text-[#111] font-black mb-4">{header}</h1>
              <ul className="space-y-2">
                {groupedFooter[header].map(({ id, name, link }) => (
                  <li key={id} className="text-[#f69322]">
                    {link ? (
                      <Link
                        href={`/${link}`}
                        className="text-[#f69322]-400 hover:underline"
                      >
                        {name}
                      </Link>
                    ) : (
                      <span className="text-[#666]">{name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>{" "}
        <div className="flex space-x-4 justify-center">
          <a
            href="https://www.facebook.com/MyJobsMyanmar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400"
          >
            Facebook
            {/* <Facebook className="w-6 h-6" /> */}
          </a>
          <a
            href="https://www.linkedin.com/company/myjobsmyanmar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400"
          >
            Linkedin
            {/* <Linkedin className="w-6 h-6" /> */}
          </a>
          <a
            href="https://invite.viber.com/?g2=AQB5dKmasEkSskshfzPT9MHDsTXWrkyf6i0N4Kf82lz6%2B%2F7JOWfRKLpLLE7gvydu&lang=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400"
          >
            Viber
            {/* <Viber className="w-6 h-6" /> */}
          </a>
          <a
            href="https://t.me/myjobsmyanmartelegram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400"
          >
            Telegram
            {/* <Telegram className="w-6 h-6" /> */}
          </a>
          <a
            href="https://www.youtube.com/@MyJobsMyanmarMyJobsMyanmar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400"
          >
            Youtube
            {/* <Youtube className="w-6 h-6" /> */}
          </a>
        </div>
      </footer>
      <div className="bg-[#0a0a45] py-7 w-full text-center ">
        <p className="text-[#fff]">
          Copyright © 2024 Myjobs. All Rights Reserved.
        </p>
      </div>
    </>
  );
}
