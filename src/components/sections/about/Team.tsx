import TeamCard from "@/components/cards/TeamCard"
import SectionHeader from "@/components/text/SectionHeader"
import { teamData } from "@/utils/team-data"
import { useTranslations } from "next-intl"
import { StaticImageData } from "next/image"

const Team = () => {
  const t = useTranslations("Team")
  return (
    <div className="py-20 lg:py-28 flex flex-col gap-12 lg:gap-16">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 sm:gap-x-9 gap-y-10 lg:gap-y-16">
        {teamData.map((obj, index) => (
          <TeamCard
            key={index}
            name={obj.name}
            position={t(`positions.${obj.positionKey}`)}
            image={obj.image as StaticImageData}
            linkedIn={obj.linkedIn}
          />
        ))}
      </div>
    </div>
  )
}

export default Team
