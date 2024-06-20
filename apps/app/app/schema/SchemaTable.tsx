"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Key as KeyType } from "@prisma/client";
import SchemaInput from "./SchemaInput";
import EditSchemaButton from "./EditSchemaButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SchemaTable({ ...props }) {
  const [schema, setSchema] = useState<KeyType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSchema();
  }, []);

  async function getSchema() {
    setIsLoading(true);
    const response = await fetch("/api/schema");
    const data = await response.json();
    setSchema(data);
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-4" {...props}>
      <SchemaInput
        schema={schema}
        setSchema={setSchema}
        getSchema={getSchema}
        isLoading={isLoading}
      />
      {isLoading ? (
        <div className="flex justify-center items-center h-24 w-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <CurrentSchema
          schema={schema}
          setSchema={setSchema}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

function CurrentSchema({
  schema,
  setSchema,
  isLoading,
}: {
  schema: KeyType[];
  setSchema: (schema: KeyType[]) => void;
  isLoading: boolean;
}) {
  async function handleDelete(id: string) {
    const response = await fetch(`/api/schema`, {
      method: "DELETE",
      body: JSON.stringify({ key: id }),
    });
    if (response.ok) {
      setSchema(schema.filter((item) => item.id !== id));
    }
  }

  return (
    <div className="border shadow-sm rounded-lg">
      {isLoading ? (
        <div className="flex justify-center items-center h-24 w-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px]">key</TableHead>
              <TableHead className="max-w-[150px]">description</TableHead>
              <TableHead className="max-w-[150px]">priority</TableHead>
              <TableHead className="hidden md:table-cell">type</TableHead>
              <TableHead className="hidden md:table-cell">tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!schema.length ? (
              <TableRow>
                <TableCell>No data available</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell />
              </TableRow>
            ) : (
              schema.map((item, i) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">
                      {item.description}
                    </TableCell>
                    <TableCell>{item.priority}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.type}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.tags && item.tags.length
                        ? item.tags.join(", ")
                        : "-"}
                    </TableCell>
                    <TableCell className="flex flex-row gap-2 justify-end">
                      <EditSchemaButton
                        item={item}
                        onSuccess={(data) =>
                          setSchema(
                            schema.map((item, index) =>
                              index === i ? data : item,
                            ),
                          )
                        }
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={"destructive"}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(item.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
