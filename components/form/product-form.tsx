"use client";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { use, useRef } from "react";
import { insertProduct } from "@/lib/data/products";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(100, "Title is too long.")
    .trim(),
  price: z
    .string()
    .min(1, "Price is required.")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Price must be > 0.",
    ),
  description: z
    .string()
    .min(20, "Description too short (min 20 chars).")
    .max(1000, "Description too long.")
    .trim(),
  categoryId: z.string().min(1, "Please select a category."),
  image: z.instanceof(File).nullable().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductForm({
  categories,
}: {
  categories: Promise<CategoryRespo[]>;
}) {
  const categoriesList = use(categories);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: "0.00",
      description: "",
      categoryId: "",
      image: null,
    },
  });

  const watchedImage = form.watch("image");
  const previewUrl = watchedImage ? URL.createObjectURL(watchedImage) : null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large (max 5MB)");
      return;
    }
    form.setValue("image", file, { shouldValidate: true });
  };

  const removeFile = () => {
    form.setValue("image", null, { shouldValidate: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/api/v1/files/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Image upload failed. Please try again.");

  const data = await res.json();
  return data.location;
}

  async function onSubmit(values: FormValues) {
  try {
    let imageUrl: string | null = null;
    if (values.image) {
      imageUrl = await uploadImage(values.image);
      
      if (!imageUrl) {
        throw new Error("Image upload failed. Please try again.");
      }
    }

    const productData = {
      title: values.title.trim(),
      price: Number(values.price),
      description: values.description.trim(),
      categoryId: Number(values.categoryId),
      images: imageUrl
        ? [imageUrl]
        : ["https://placehold.co/600x400?text=No+Image"],
    };

    const result = await insertProduct(productData);

    if (result?.name?.includes("Error") || result?.code) {
      throw new Error(
        result.code === "SQLITE_CONSTRAINT_UNIQUE"
          ? "This product with this title already exists."
          : result.message || "Failed to create product."
      );
    }

    form.reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success("Product created successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  } catch (err: any) {
    console.error(err);
    form.setError("root", { message: err.message || "Something went wrong." });
    toast.error(err.message || "Something went wrong.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  }
}
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card className="mx-auto w-full max-w-3xl shadow-sm border bg-card">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold text-center">
          Add New Product
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field className="md:col-span-2">
                  <FieldLabel>Product Title *</FieldLabel>
                  <Input placeholder="ex. MacBook Pro" {...field} />
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Price (USD) *</FieldLabel>
                  <Input
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="1299.00"
                    {...field}
                  />
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="categoryId"
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Category *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesList.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field className="md:col-span-2">
                  <FieldLabel>Description *</FieldLabel>
                  <Textarea
                    rows={5}
                    placeholder="Describe features, specifications, condition..."
                    {...field}
                  />
                  <FieldDescription className="text-xs mt-1.5">
                    Minimum 20 characters. Supports markdown.
                  </FieldDescription>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="image"
            render={({ fieldState }) => (
              <Field className="space-y-3">
                <FieldLabel>Product Image</FieldLabel>
                <div
                  className={`
                    border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
                    ${watchedImage ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"}
                  `}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {!watchedImage ? (
                    <>
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                      <p className="mt-4 text-sm font-medium">
                        Click to upload or drag & drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, WebP up to 5MB
                      </p>
                    </>
                  ) : (
                    <div className="space-y-4">
                      {previewUrl && (
                        <div className="relative mx-auto w-40 h-40 rounded-md overflow-hidden border shadow-sm">
                          <Image
                            src={previewUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-2 text-sm">
                        <span className="font-medium truncate max-w-[200px]">
                          {watchedImage.name}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                  Product...
                </>
              ) : (
                "Create Product"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                form.reset();
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              disabled={isSubmitting}
            >
              Reset Form
            </Button>
            <ToastContainer />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
