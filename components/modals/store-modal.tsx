"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      setLoading(true);
      
      const response = await axios.post("/api/stores", values);

     window.location.assign(`/${response.data.id}`);
    } catch (error){
      toast.error("Ada yang salah, coba lagi ya!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Tambah Service Baru yuk!"
      description="Buat Produk/Jasa Baru untuk mengatur produk dan kategori"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nama
                      </FormLabel>
                      <FormControl>
                        <Input 
                        disabled={loading} 
                        placeholder="Nama Service Anda" 
                        {...field}
                      />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                  />
                  <div className="pt-6 space-x-2 flex item-center justify-end w-full">
                    <Button 
                    disabled={loading}
                    variant="outline" 
                    onClick={storeModal.onClose}>
                      Batal
                    </Button>
                    <Button disabled={loading} type="submit">Lanjut</Button>
                  </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
