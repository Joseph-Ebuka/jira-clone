"use client";

import z from "zod";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkspaceSchema } from "../schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DottedSeperator } from "@/components/dotted-seperator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkSpace } from "../api/use-create-workspace";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ImageIcon } from "lucide-react";

interface CreateWorkSpaceFormProps {
  onCancel?: () => void;
}

export const CreateWorkSpaceForm = ({ onCancel }: CreateWorkSpaceFormProps) => {
  const { mutate, isPending } = useCreateWorkSpace();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file){
      form.setValue("image", file);
    }
  }

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    mutate({ json: values });
    console.log({ data: values });
  };
  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">Create a new board</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeperator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WorkSpace Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Workspace name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      {field.value ? (
                        <div className="size-[72px] relative rounded-md overflow-hidden">
                          <Image
                            src={
                              field.value instanceof File
                                ? URL.createObjectURL(field.value)
                                : field.value
                            }
                            alt="logo"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <Avatar className="size-[72px]">
                          <AvatarFallback>
                            <ImageIcon className="size-[36px] text-neutral-400" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm">Workspace Icon</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, SVG or JPEG, max 1mb
                        </p>
                        <input 
                        className="hidden"
                        type="file"
                        accept=".jpg,.jpeg,.png,.svg"
                        ref={inputRef}
                        onChange={handleImageChange}
                        disabled={isPending}
                        />
                        <Button 
                        type="button"
                        disabled={isPending}
                        variant="teritary"
                        size="xs"
                        className="w-fit mt-2"
                        onClick={() => inputRef.current?.click()}
                        >
                          Upload Image
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              />
              {/* <DottedSeperator className="my-4" /> */}
            </div>
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isPending}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
