"use client";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { Loader2, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Value as ValueType, Key as KeyType } from "@prisma/client";
import { Button } from "@/components/ui/button";

type DataType = ValueType & { key: KeyType };

export default function ValuesTable() {
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
    <div className="flex flex-col items-start gap-4">
      <Button onClick={getData} variant={"outline"}>
        <RotateCcw className={`h-4 w-4`} />
      </Button>
      <div className="border shadow-sm rounded-lg w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-24 w-full">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-[150px]">key</TableHead>
                <TableHead className="max-w-[150px]">value</TableHead>
                <TableHead className="max-w-[150px]">description</TableHead>
                <TableHead className="hidden md:table-cell">
                  distinctId
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  createdAt
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!data.length ? (
                <TableRow>
                  <TableCell>No data available</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow>
                    <TableCell>{item.key.id}</TableCell>
                    <TableCell className="font-medium">{item.value}</TableCell>
                    <TableCell>{item.key.description}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.distinctId}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.createdAt.toString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
