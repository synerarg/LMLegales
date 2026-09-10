import { cn } from "@/lib/utils"

interface Props {
  pos: string
  text: string
  className?: string
}

const InputLabel = ({ pos, text, className }: Props) => {
  return (
    <div className="w-full flex gap-6 font-normal text-left items-center cursor-default">
      <h3 className="text-fg-muted text-[0.875rem]">{pos}</h3>
      <h3 className={cn("text-[1.125rem]", className)}>{text}</h3>
    </div>
  )
}

export default InputLabel
