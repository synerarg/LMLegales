
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const MeetingButton = ({ text, locale }: { text?: string, locale: string }) => {
  return (
    <Link href={'https://calendly.com/ip-lmlegales/reunion'} target="_blank" className={buttonVariants({ variant: "outline" })}>
      <h3>{text || 'Nada'}</h3>
    </Link >

  );
};

export default MeetingButton;