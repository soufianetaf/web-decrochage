import { HeroSection } from '@/components/sections/hero'
import { ProblemSection } from '@/components/sections/problem'
import { DemoSection } from '@/components/sections/demo'
import { ContributionsSection } from '@/components/sections/contributions'
import { PipelineSection } from '@/components/sections/pipeline'
import { ResultsSection } from '@/components/sections/results'
import { ArchitectureSection } from '@/components/sections/architecture'
import { VisualizationsSection } from '@/components/sections/visualizations'
import { ResourcesSection } from '@/components/sections/resources'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <DemoSection />
      <ContributionsSection />
      <PipelineSection />
      <ResultsSection />
      <ArchitectureSection />
      <VisualizationsSection />
      <ResourcesSection />
    </>
  )
}
