import { Link } from '@tanstack/react-router'
import { cdn } from '@/lib/img'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('group flex items-center gap-2.5', className)} aria-label="Rabiu Yustech home">
      <span className="grid size-9 place-items-center overflow-hidden rounded-xl bg-white ring-1 ring-border transition-transform duration-300 group-hover:-rotate-6 motion-reduce:transition-none">
        <img src={cdn('/img/logo-mark.jpg', 80)} alt="" width={36} height={29} className="w-7" />
      </span>
      <span className="font-display text-[0.95rem] leading-none font-extrabold tracking-[0.12em] uppercase">
        Rabiu<span className="text-primary">Yustech</span>
      </span>
    </Link>
  )
}
