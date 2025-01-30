"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const FormSchema = z.object({
    dark_mode: z.boolean(),
});

export function SettingsForm() {
    const { setTheme, theme } = useTheme();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            dark_mode: theme === "dark" ? true : false,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setTheme(data.dark_mode ? "dark" : "light");
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
            >
                <div>
                    <h3 className="mb-4 text-lg font-medium">
                        Email Notifications
                    </h3>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="dark_mode"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>DarkMode</FormLabel>
                                        <FormDescription>
                                            Enable or disable Darkmode
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
