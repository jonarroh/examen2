import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect, useFetcher } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchSchema = z.object({
  search: z
    .string()
    .min(3, "La búsqueda debe tener al menos 3 caracteres")
    .max(50, "La búsqueda no debe exceder los 50 caracteres")
});

type SearchFormData = z.infer<typeof searchSchema>;

export const Search = () => {
  const fetcher = useFetcher();
  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = async (data: SearchFormData) => {
    console.log(data);
    redirect(`/search?q=${data.search}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-lg bg-white rounded-lg">
        <CardHeader className="flex items-center justify-center">
          <img src="/logo.jpg" alt="Logo" className="w-16 h-16 rounded-full" />
        </CardHeader>
        <CardContent className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Bazar Online</h1>
          <fetcher.Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <Input
                type="text"
                {...register("search")}
                placeholder="Buscar productos..."
                className="text-lg placeholder-gray-400"
              />
              {errors.search && (
                <p className="text-red-500 text-sm mt-1">{errors.search.message}</p>
              )}
            </div>
            <Button type="submit" variant="default" className="w-full">
              Buscar
            </Button>
          </fetcher.Form>
        </CardContent>
      </Card>
    </div>
  );
};
