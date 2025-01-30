import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { SettingsForm } from "./settingsForm";

export default function Settings() {
    return (
        <Dialog>
            <DialogTrigger className="w-full text-left">Settings</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <SettingsForm/>
            </DialogContent>
        </Dialog>
    );
}
