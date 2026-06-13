// components/ui/badge.tsx — badge / pill (dérivé shadcn/ui).
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-moss-100 text-forest-700 dark:bg-forest-700/50 dark:text-moss-100',
        outline: 'border border-border text-foreground',
        aws: 'bg-aws/15 text-aws',
        databricks: 'bg-databricks/15 text-databricks',
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
