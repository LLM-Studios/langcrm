"use client";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Value as ValueType, Key as KeyType } from "@prisma/client";

type DataType = ValueType & { key: KeyType };

export default function DataTable() {
  const [data, setData] = useState<DataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setIsLoading(true);
    const response = await fetch("api/data");
    if (!response.ok) {
      throw new Error("Error getting data");
    }
    const json = await response.json();
    if (json.success) {
      const data = json.data as DataType[];
      setData(data);
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Data</h1>
      </div>
      <div className="border shadow-sm rounded-lg">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <Layout data={data} />
        )}
      </div>
    </>
  );
}

function Row({ data }: { data: DataType }) {
  return (
    <TableRow>
      <TableCell>{data.key.id}</TableCell>
      <TableCell className="font-medium">{data.value}</TableCell>
      <TableCell>{data.key.description}</TableCell>
      <TableCell className="hidden md:table-cell">{data.distinctId}</TableCell>
      <TableCell className="hidden md:table-cell">
        {data.createdAt.toString()}
      </TableCell>
    </TableRow>
  );
}

function Layout({ data }: { data: DataType[] }) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[150px]">key</TableHead>
            <TableHead className="max-w-[150px]">value</TableHead>
            <TableHead className="max-w-[150px]">description</TableHead>
            <TableHead className="hidden md:table-cell">distinctId</TableHead>
            <TableHead className="hidden md:table-cell">createdAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <Row key={item.id} data={item} />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
