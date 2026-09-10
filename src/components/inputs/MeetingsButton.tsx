
import Link from "next/link";

const MeetingButton = ({ text, locale }: { text?: string, locale: string }) => {
  return (
    <Link href={'https://calendly.com/ip-lmlegales/reunion'} target="_blank" className="sm:px-[30px] sm:py-[10px] px-[22px] py-[6px] rounded-lg border-2 border-action-ghost-border text-action-ghost-fg hover:bg-action-ghost-bg-hover motion-safe:transition-colors">
      <h3 className="font-medium sm:text-lg sm:text-md">{text || 'Nada'}</h3>
    </Link >

  );
};

export default MeetingButton;