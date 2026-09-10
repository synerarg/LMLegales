"use client"

import { ArrowLeft, Check } from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { createPayment } from "@/controller/payment-controller"
import { toast } from "react-toastify"

export default function CheckoutSummary() {
  const tPayment = useTranslations("confirm-purchase")
  const searchParams = useSearchParams()
  const locale = useLocale()
  const name = searchParams.get("name")
  const email = searchParams.get("email")
  const registration = searchParams.get("registration")
  const enterprisePhone = searchParams.get("enterprisePhone")
  const price = searchParams.get("price")
  const router = useRouter()

  const handleCreatePayment = async () => {
    try {
      const result = await createPayment({
        title: "Registro de marca",
        quantity: 1,
        price: Number(price),
        locale,
      })

      if (!("init_point" in result)) {
        return toast.error(result.userMessage)
      }

      if ("init_point" in result) {
        router.push(result.init_point)
      }
    } catch (error) {
      console.log(error)
      return toast.error("Hubo un error al crear el pago")
    }
  }

  return (
    <div className="min-h-screen bg-surface-page flex items-center justify-center p-4">
      <div className="absolute top-3 left-3 z-10">
        <Link href={`/${locale}/brand-register`} passHref>
          <Button variant="default" className="shadow-md text-sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {tPayment("link")}
          </Button>
        </Link>
      </div>
      <Card className="w-full max-w-xl bg-surface-raised shadow-lg">
        <CardHeader className="text-center space-y-4 pb-6">
          <CardTitle className="font-meshedDisplay text-3xl sm:text-4xl font-bold text-fg-primary">
            {tPayment("title")}
          </CardTitle>
          <p className="text-fg-muted text-sm sm:text-base">
            {tPayment("subtitle")}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Client Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-fg-primary">
              {tPayment("client-info-title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {[
                { label: "client-name", value: name },
                { label: "client-email", value: email },
                { label: "client-id", value: registration },
                { label: "client-phone", value: enterprisePhone },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-fg-muted">{tPayment(item.label)}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Service Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-fg-primary">
              {tPayment("service-details-title")}
            </h3>
            <div className="bg-surface-page p-4 rounded-lg">
              <div className="flex flex-col sm:flex-row items-start justify-between">
                <div className="mb-4 sm:mb-0">
                  <ul className="space-y-2">
                    {["service-item1", "service-item2", "service-item3"].map(
                      (item, index) => (
                        <li
                          key={index}
                          className="flex items-center text-sm text-fg-secondary"
                        >
                          <Check className="h-4 w-4 mr-2 text-fg-secondary shrink-0" />
                          <span>{tPayment(item)}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="text-left sm:text-right mt-4 sm:mt-0">
                  <p className="text-sm text-fg-muted">
                    {tPayment("price-label")}
                  </p>
                  <p className="text-2xl font-semibold text-fg-primary">
                    {price}$
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 gap-4 sm:gap-0">
            <div>
              <p className="text-fg-muted">{tPayment("total-label")}</p>
              <p className="text-2xl sm:text-3xl font-semibold text-fg-primary">
                {price}$
              </p>
            </div>
            <div className="text-left sm:text-right text-sm text-fg-muted">
              <p>{tPayment("total-note")}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 bg-surface-page">
          <Button
            className="w-full text-base px-2 py-4 sm:py-6 rounded-md"
            onClick={handleCreatePayment}
          >
            {tPayment("confirm-purchase")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
