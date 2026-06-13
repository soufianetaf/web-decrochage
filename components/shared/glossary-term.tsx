// components/shared/glossary-term.tsx — terme souligné avec tooltip de définition.
'use client'

import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useI18n } from '@/components/providers/language-provider'
import { GLOSSARY } from '@/lib/i18n/glossary'

interface GlossaryTermProps {
  term: keyof typeof GLOSSARY | string
  children?: React.ReactNode
}

export function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const { locale } = useI18n()
  const def = GLOSSARY[term]?.[locale]
  if (!def) return <>{children ?? term}</>

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="cursor-help font-medium text-forest-600 underline decoration-dotted decoration-from-font underline-offset-4 dark:text-moss-500"
        >
          {children ?? term}
        </button>
      </TooltipTrigger>
      <TooltipContent>{def}</TooltipContent>
    </Tooltip>
  )
}
