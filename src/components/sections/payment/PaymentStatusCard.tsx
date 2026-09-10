"use client"

import { CheckCircle2, Clock, XCircle, LucideIcon } from "lucide-react"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ICONS: Record<"success" | "failure" | "pending", LucideIcon> = {
  success: CheckCircle2,
  failure: XCircle,
  pending: Clock,
}

const ICON_COLORS: Record<"success" | "failure" | "pending", string> = {
  success: "text-success",
  failure: "text-danger",
  pending: "text-warning",
}

type PaymentStatusCardProps = {
  status: "success" | "failure" | "pending"
}

export default function PaymentStatusCard({ status }: PaymentStatusCardProps) {
  const t = useTranslations("payment-status")
  const locale = useLocale()
  const Icon = ICONS[status]

  return (
    <div className="min-h-screen bg-surface-page flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-surface-raised shadow-lg">
        <CardHeader className="text-center space-y-4 pb-2">
          <Icon className={`h-14 w-14 mx-auto ${ICON_COLORS[status]}`} />
          <CardTitle className="font-meshedDisplay text-2xl sm:text-3xl font-bold text-fg-primary">
            {t(`${status}.title`)}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6 pb-6">
          <p className="text-fg-muted text-sm sm:text-base">
            {t(`${status}.description`)}
          </p>
          <Link href={`/${locale}`}>
            <Button className="w-full">
              {t("back-home")}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
