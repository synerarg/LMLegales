import type React from "react"
import Image from "next/image"

interface AboutCardProps {
  title: string
  text: string
  image: string
  index: number
}

const AboutCard: React.FC<AboutCardProps> = ({ title, text, image }) => {
  return (
    <div className="group relative bg-surface-raised rounded-xl p-6 hover:shadow-md transition-all duration-300 border border-border-hairline hover:border-border-control">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-12 h-12 bg-surface-page rounded-lg flex items-center justify-center group-hover:bg-surface-sunken transition-colors duration-300">
          <Image
            src={image || "/placeholder.svg"}
            alt={`${title} icon`}
            width={24}
            height={24}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-fg-primary text-lg mb-2 group-hover:text-fg-secondary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-fg-secondary text-sm leading-relaxed">{text}</p>
        </div>
      </div>

      <div className="absolute left-0 top-0 w-1 h-full bg-action-bg rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  )
}

export default AboutCard
