"use client"

import React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTranslations } from "next-intl"

const DialogBrand = () => {
  const tBrandRegister = useTranslations("brand-register")
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button variant="link" className="text-base text-fg-primary underline">
          {tBrandRegister("popup")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center mb-6">
            {tBrandRegister("popup")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <ul className="list-disc pl-6 space-y-3">
            <li>{tBrandRegister("bullet1")}</li>
            <li>{tBrandRegister("bullet2")}</li>
            <li>{tBrandRegister("bullet3")}</li>
            <li>{tBrandRegister("bullet4")}</li>
            <li>{tBrandRegister("bullet5")}</li>
            <li>{tBrandRegister("bullet6")}</li>
            <li>{tBrandRegister("bullet7")}</li>
            <li>{tBrandRegister("bullet8")}</li>
          </ul>
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setIsOpen(false)}
              variant="default"
              className="text-sm px-8 py-5 rounded-md"
            >
              {tBrandRegister("close-btn")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogBrand
