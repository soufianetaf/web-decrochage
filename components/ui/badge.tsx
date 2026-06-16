// components/ui/badge.tsx — badge / pill (dérivé shadcn/ui).
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-border bg-card text-muted',
        outline: 'border border-border text-foreground',
        aws: 'border border-aws/25 bg-aws/10 text-aws',
        databricks: 'border border-databricks/25 bg-databricks/10 text-databricks',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
