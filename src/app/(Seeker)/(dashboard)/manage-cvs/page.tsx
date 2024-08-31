"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import PrimaryBtn from "@/components/ui/primaryBtn";

const page = () => {
  return (
    <div>
      <h1 className="text-[38px] font-[700]">Manage CVs</h1>
      <p className="opacity-60 mb-[40px]">
        Edit and update your profile to attract your potential employers.
      </p>
      <Table>
        <TableHeader className="border-b-2 border-black">
          <TableRow>
            <TableHead>FileName</TableHead>
            <TableHead>Uploaded Date</TableHead>
            <TableHead>Default CV</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>MyLoad Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-primary">CVForm.pdf</TableCell>
            <TableCell className="text-green-600">14 Dec 2022</TableCell>
            <TableCell>
              <Switch />
            </TableCell>
            <TableCell className="text-red-700">Delete</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <PrimaryBtn text="Upload" handleClick={() => {}} />
    </div>
  );
};

export default page;
