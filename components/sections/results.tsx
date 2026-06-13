// components/sections/results.tsx
// Dashboard des résultats : 4 cartes métriques (Recharts) + tabs détaillés.
'use client'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ReferenceLine,
} from 'recharts'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { useI18n } from '@/components/providers/language-provider'
import {
  RESULTS,
  EARLY_PREDICTION_SERIES,
  CLOUD_PHASE_SERIES,
} from '@/lib/data/results'

const FOREST = '#4F46E5' // indigo (primaire)
const MOSS = '#0EA5E9' // ciel (accent)
const AWS = '#F59E0B' // ambre
const DATABRICKS = '#E11D48' // rose-rouge
const GRID = '#E2E8F0' // slate-200

function ChartTooltip({ active, payload, label, unit }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-lg">
      {label && <p className="mb-1 font-medium text-foreground">{label}</p>}
      {payload.map((p: any) => (
        <p key={p.dataKey} className="font-mono text-muted">
          {p.value}
          {unit}
        </p>
      ))}
    </div>
  )
}

export function ResultsSection() {
  const { t } = useI18n()
  const donutData = [
    { name: 'Convergence', value: RESULTS.explainability.semanticConvergence, fill: FOREST },
    { name: 'Divergence', value: 100 - RESULTS.explainability.semanticConvergence, fill: GRID },
  ]
  const gaugeData = [{ name: 'F1', value: RESULTS.classification.f1, fill: FOREST }]

  return (
    <section id="results" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.results.eyebrow}
          title={t.results.title}
          subtitle={t.results.subtitle}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Carte 1 — Performance globale (jauge) */}
          <Reveal as="article">
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">{t.results.perf}</p>
                    <p className="mt-1 font-display text-4xl font-extrabold text-forest-500 dark:text-moss-500">
                      {RESULTS.classification.f1} %
                    </p>
                    <p className="text-xs text-muted">{t.results.f1score}</p>
                  </div>
                  <Badge>{RESULTS.classification.bestModel}</Badge>
                </div>
                <div className="mx-auto h-40 w-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      innerRadius="70%"
                      outerRadius="100%"
                      data={gaugeData}
                      startAngle={90}
                      endAngle={-270}
                    >
                      <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                      <RadialBar background dataKey="value" cornerRadius={20} fill={FOREST} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <dl className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <dt className="text-xs text-muted">AUC</dt>
                    <dd className="font-mono font-semibold text-foreground">
                      {RESULTS.classification.auc}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Précision</dt>
                    <dd className="font-mono font-semibold text-foreground">
                      {RESULTS.classification.precision}%
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted">Rappel</dt>
                    <dd className="font-mono font-semibold text-foreground">
                      {RESULTS.classification.recall}%
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </Reveal>

          {/* Carte 2 — Prédiction précoce (line) */}
          <Reveal as="article" index={1}>
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">{t.results.early}</p>
                    <p className="mt-1 font-display text-4xl font-extrabold text-forest-500 dark:text-moss-500">
                      {t.results.earlyValue}
                    </p>
                    <p className="text-xs text-muted">{t.results.f1week}</p>
                  </div>
                  <Badge variant="outline">{t.results.threshold}</Badge>
                </div>
                <div className="mt-6 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={EARLY_PREDICTION_SERIES} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
                      <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#6b7280' }} />
                      <YAxis domain={[70, 92]} tick={{ fontSize: 12, fill: '#6b7280' }} />
                      <Tooltip content={<ChartTooltip unit=" %" />} />
                      <ReferenceLine y={80} stroke={AWS} strokeDasharray="4 4" />
                      <Line
                        type="monotone"
                        dataKey="f1"
                        stroke={FOREST}
                        strokeWidth={3}
                        dot={{ r: 4, fill: FOREST }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Carte 3 — Explicabilité (donut) */}
          <Reveal as="article" index={2}>
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">{t.results.explain}</p>
                    <p className="mt-1 font-display text-4xl font-extrabold text-forest-500 dark:text-moss-500">
                      {RESULTS.explainability.semanticConvergence} %
                    </p>
                    <p className="text-xs text-muted">{t.results.explainSub}</p>
                  </div>
                  <Badge variant="outline">{t.results.vsStrict}</Badge>
                </div>
                <div className="mx-auto h-44 w-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        dataKey="value"
                        innerRadius="65%"
                        outerRadius="100%"
                        startAngle={90}
                        endAngle={450}
                        stroke="none"
                      >
                        {donutData.map((d) => (
                          <Cell key={d.name} fill={d.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-center text-sm text-muted">{t.results.explainNote}</p>
              </CardContent>
            </Card>
          </Reveal>

          {/* Carte 4 — Speedup cloud (bar) */}
          <Reveal as="article" index={3}>
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted">{t.results.speedup}</p>
                    <p className="mt-1 font-display text-4xl font-extrabold text-forest-500 dark:text-moss-500">
                      ×{RESULTS.cloud.speedupGlobal}
                    </p>
                    <p className="text-xs text-muted">
                      {RESULTS.cloud.pandasTimeMin} min → {RESULTS.cloud.sparkTimeMin} min ·{' '}
                      {t.results.efficiency} {RESULTS.cloud.parallelEfficiency} %
                    </p>
                  </div>
                  <Badge variant="databricks">Databricks AWS</Badge>
                </div>
                <div className="mt-6 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={CLOUD_PHASE_SERIES} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
                      <XAxis dataKey="phase" tick={{ fontSize: 11, fill: '#6b7280' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                      <Tooltip content={<ChartTooltip unit="×" />} cursor={{ fill: 'rgba(151,188,98,0.1)' }} />
                      <ReferenceLine y={1} stroke="#9ca3af" strokeDasharray="4 4" />
                      <Bar dataKey="speedup" radius={[6, 6, 0, 0]}>
                        {CLOUD_PHASE_SERIES.map((d) => (
                          <Cell key={d.phase} fill={d.speedup >= 1 ? MOSS : DATABRICKS} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        {/* Tabs détaillés */}
        <Reveal index={1}>
          <div className="mt-12">
            <Tabs defaultValue="classification" className="w-full">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="classification">{t.results.tabs.classification}</TabsTrigger>
                  <TabsTrigger value="clustering">{t.results.tabs.clustering}</TabsTrigger>
                  <TabsTrigger value="xai">{t.results.tabs.xai}</TabsTrigger>
                  <TabsTrigger value="cloud">{t.results.tabs.cloud}</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="classification">
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4 text-sm text-muted">
                      {t.results.confusionNote} ({RESULTS.classification.bestModel})
                    </p>
                    <div className="grid max-w-md grid-cols-2 gap-2 font-mono text-sm">
                      <div className="rounded-lg bg-moss-100 p-4 text-center dark:bg-forest-700/40">
                        <p className="text-xs text-muted">{t.results.tn}</p>
                        <p className="text-2xl font-bold text-foreground">{RESULTS.classification.tn}</p>
                      </div>
                      <div className="rounded-lg bg-databricks/10 p-4 text-center">
                        <p className="text-xs text-muted">{t.results.fp}</p>
                        <p className="text-2xl font-bold text-foreground">{RESULTS.classification.fp}</p>
                      </div>
                      <div className="rounded-lg bg-databricks/10 p-4 text-center">
                        <p className="text-xs text-muted">{t.results.fn}</p>
                        <p className="text-2xl font-bold text-foreground">{RESULTS.classification.fn}</p>
                      </div>
                      <div className="rounded-lg bg-moss-100 p-4 text-center dark:bg-forest-700/40">
                        <p className="text-xs text-muted">{t.results.tp}</p>
                        <p className="text-2xl font-bold text-foreground">{RESULTS.classification.tp}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clustering">
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4 text-sm text-muted">{t.results.clusterNote}</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border text-left text-muted">
                            <th className="py-2 pr-4 font-medium">{t.results.colCluster}</th>
                            <th className="py-2 pr-4 font-medium">{t.results.colEffectif}</th>
                            <th className="py-2 pr-4 font-medium">{t.results.colDropout}</th>
                            <th className="py-2 pr-4 font-medium">{t.results.colProfile}</th>
                            <th className="py-2 font-medium">{t.results.colAction}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {RESULTS.riskLevels.map((r) => (
                            <tr key={r.id} className="border-b border-border/60">
                              <td className="py-2 pr-4 font-mono font-semibold text-foreground">{r.id}</td>
                              <td className="py-2 pr-4 font-mono text-muted">{r.effectif.toLocaleString('fr-FR')}</td>
                              <td className="py-2 pr-4">
                                <span
                                  className="font-mono font-semibold"
                                  style={{
                                    color: r.dropout > 70 ? DATABRICKS : r.dropout > 40 ? AWS : MOSS,
                                  }}
                                >
                                  {r.dropout} %
                                </span>
                              </td>
                              <td className="py-2 pr-4 text-foreground/80">{r.profile}</td>
                              <td className="py-2 text-muted">{r.action}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="xai">
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4 text-sm text-muted">{t.results.xaiNote}</p>
                    <ul className="space-y-3">
                      {RESULTS.explainability.topFeatures.map((f, i) => (
                        <li key={f} className="flex items-center gap-3">
                          <span className="w-32 shrink-0 font-mono text-xs text-foreground/80">{f}</span>
                          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-forest-100 dark:bg-forest-700/50">
                            <div
                              className="h-full rounded-full bg-forest-500"
                              style={{ width: `${100 - i * 16}%` }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-muted">{t.results.xaiNote2}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cloud">
                <Card>
                  <CardContent className="p-6">
                    <p className="mb-4 text-sm text-muted">{t.results.cloudNote}</p>
                    <div className="h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={CLOUD_PHASE_SERIES} layout="vertical" margin={{ left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={GRID} horizontal={false} />
                          <XAxis type="number" tick={{ fontSize: 12, fill: '#6b7280' }} />
                          <YAxis dataKey="phase" type="category" width={90} tick={{ fontSize: 12, fill: '#6b7280' }} />
                          <Tooltip content={<ChartTooltip unit="×" />} cursor={{ fill: 'rgba(151,188,98,0.1)' }} />
                          <ReferenceLine x={1} stroke="#9ca3af" strokeDasharray="4 4" />
                          <Bar dataKey="speedup" radius={[0, 6, 6, 0]}>
                            {CLOUD_PHASE_SERIES.map((d) => (
                              <Cell key={d.phase} fill={d.speedup >= 1 ? MOSS : DATABRICKS} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
