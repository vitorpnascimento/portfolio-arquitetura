
import React, { useEffect, useMemo, useState } from "react";

// === DATA (edite aqui) ======================================================
const data = {
  name: "Nome Sobrenome",
  role: "Estudante de Arquitetura e Urbanismo",
  about:
    "Sou estudante de Arquitetura e Urbanismo com interesse em projetos residenciais, urbanismo e interiores. Busco unir estética, funcionalidade e sustentabilidade em soluções que valorizem o espaço e a experiência humana.",
  location: "Cidade – UF",
  email: "email@exemplo.com",
  phone: "(00) 00000-0000",
  links: {
    linkedin: "#",
    behance: "#",
    portfolio: "#",
  },
  education: [
    {
      course: "Bacharelado em Arquitetura e Urbanismo",
      institution: "[Nome da Instituição]",
      period: "20XX — atual",
      notes: "Bolsista / Monitoria / Projetos de extensão (exemplo)",
    },
  ],
  skills: {
    softwares: ["AutoCAD", "Revit", "SketchUp", "Lumion", "Photoshop"],
    areas: ["Arquitetura Residencial", "Urbanismo", "Interiores", "Paisagismo"],
    competencias: ["Desenho técnico", "Renderização", "Maquetes", "Modelagem 3D"],
  },
  projects: [
    {
      title: "Casa Sustentável",
      tags: ["Residencial", "Sustentabilidade"],
      description:
        "Residência unifamiliar com foco em eficiência energética, ventilação cruzada, reaproveitamento de água da chuva e integração com o terreno.",
      links: { behance: "#", drive: "#" },
    },
    {
      title: "Revitalização de Praça",
      tags: ["Urbanismo", "Espaço público"],
      description:
        "Requalificação de área degradada com novo traçado de circulação, mobiliário urbano, iluminação e paisagismo nativo.",
      links: { behance: "#" },
    },
    {
      title: "Apartamento Conceito",
      tags: ["Interiores", "Minimalista"],
      description:
        "Projeto de interiores focado em modularidade, setorização clara e iluminação indireta, priorizando materiais de fácil manutenção.",
      links: { behance: "#", portfolio: "#" },
    },
  ],
  languages: ["Português (nativo)", "Inglês (intermediário)"],
  awards: [] as { title: string; year: string }[],
};


// === UI HELPERS ==============================================================
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">{title}</h2>
    <div className="text-muted-foreground/90 leading-relaxed">{children}</div>
  </section>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm border bg-muted/40">
    {children}
  </span>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden">
    {children}
  </div>
);

const CardBody = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-5 md:p-6 ${className}`}>{children}</div>
);

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    (typeof window !== "undefined" && (localStorage.getItem("theme") as any)) || "light"
  );
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);
  return { theme, setTheme } as const;
}

// === MAIN ====================================================================
export default function App() {
  const { theme, setTheme } = useTheme();

  const menu = useMemo(
    () => [
      { id: "sobre", label: "Sobre" },
      { id: "formacao", label: "Formação" },
      { id: "projetos", label: "Projetos" },
      { id: "habilidades", label: "Habilidades" },
      { id: "contato", label: "Contato" },
    ],
    []
  );

  return (
    <div className="min-h-screen antialiased">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-gradient-to-br from-primary/80 to-primary/40" />
            <div>
              <div className="text-sm text-muted-foreground">Portfólio</div>
              <div className="font-medium leading-none">{data.name}</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-3">
            {menu.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="px-3 py-2 rounded-lg text-sm hover:bg-muted"
              >
                {m.label}
              </a>
            ))}
            <button
              aria-label="Alternar tema"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-2 px-3 py-2 rounded-lg text-sm border hover:bg-muted"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              aria-label="Imprimir/Salvar PDF"
              onClick={() => window.print()}
              className="ml-1 px-3 py-2 rounded-lg text-sm border hover:bg-muted"
            >
              PDF
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-3 gap-6 md:gap-8 py-10 md:py-14">
        <div className="md:col-span-2">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            {data.name}
          </h1>
          <p className="mt-2 text-lg md:text-xl text-muted-foreground">{data.role}</p>
          <p className="mt-4 md:mt-6 leading-relaxed text-muted-foreground/90">{data.about}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>{data.location}</Badge>
            {data.links.portfolio && <Badge>Portfólio</Badge>}
            {data.links.behance && <Badge>Behance</Badge>}
            {data.links.linkedin && <Badge>LinkedIn</Badge>}
          </div>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardBody>
              <h3 className="font-medium">Contato</h3>
              <div className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center justify-between"><span className="text-muted-foreground">E-mail</span><a className="hover:underline" href={`mailto:${data.email}`}>{data.email}</a></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Telefone</span><span>{data.phone}</span></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">LinkedIn</span><a className="hover:underline" href={data.links.linkedin} target="_blank">Abrir</a></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Behance</span><a className="hover:underline" href={data.links.behance} target="_blank">Abrir</a></div>
                <div className="flex items-center justify-between"><span className="text-muted-foreground">Portfólio</span><a className="hover:underline" href={data.links.portfolio} target="_blank">Abrir</a></div>
              </div>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Content sections */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pb-16 space-y-12 md:space-y-16">
        <Section id="sobre" title="Sobre">
          <p>
            {data.about}
          </p>
        </Section>

        <Section id="formacao" title="Formação">
          <div className="grid gap-4">
            {data.education.map((e, idx) => (
              <Card key={idx}>
                <CardBody className="grid md:grid-cols-6 gap-2 md:gap-4">
                  <div className="md:col-span-4">
                    <div className="font-medium">{e.course}</div>
                    <div className="text-sm text-muted-foreground">{e.institution}</div>
                    {e.notes && (
                      <p className="mt-2 text-sm text-muted-foreground/90">{e.notes}</p>
                    )}
                  </div>
                  <div className="md:col-span-2 md:text-right text-sm text-muted-foreground">
                    {e.period}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="projetos" title="Projetos">
          <div className="grid md:grid-cols-3 gap-5">
            {data.projects.map((p, idx) => (
              <Card key={idx}>
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/60" />
                <CardBody>
                  <h3 className="font-medium text-lg">{p.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {p.tags.map((t, i) => (
                      <Badge key={i}>{t}</Badge>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground/90 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.links.behance && (
                      <a
                        className="px-3 py-1.5 rounded-lg border text-sm hover:bg-muted"
                        href={p.links.behance}
                        target="_blank"
                      >
                        Ver no Behance
                      </a>
                    )}
                    {p.links.drive && (
                      <a
                        className="px-3 py-1.5 rounded-lg border text-sm hover:bg-muted"
                        href={p.links.drive}
                        target="_blank"
                      >
                        Abrir no Drive
                      </a>
                    )}
                    {p.links.portfolio && (
                      <a
                        className="px-3 py-1.5 rounded-lg border text-sm hover:bg-muted"
                        href={p.links.portfolio}
                        target="_blank"
                      >
                        Mais detalhes
                      </a>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </Section>

        <Section id="habilidades" title="Habilidades">
          <div className="grid md:grid-cols-3 gap-5">
            <Card>
              <CardBody>
                <div className="font-medium">Softwares</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.skills.softwares.map((s, i) => (
                    <Badge key={i}>{s}</Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="font-medium">Áreas</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.skills.areas.map((s, i) => (
                    <Badge key={i}>{s}</Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="font-medium">Competências</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.skills.competencias.map((s, i) => (
                    <Badge key={i}>{s}</Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <Card>
              <CardBody>
                <div className="font-medium">Idiomas</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.languages.map((l, i) => (
                    <Badge key={i}>{l}</Badge>
                  ))}
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="font-medium">Prêmios & Menções</div>
                {data.awards.length === 0 ? (
                  <p className="mt-3 text-sm text-muted-foreground">Sem itens por enquanto.</p>
                ) : (
                  <ul className="mt-3 list-disc ml-5 text-sm">
                    {data.awards.map((a, i) => (
                      <li key={i}>{a.title} — {a.year}</li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>
          </div>
        </Section>

        <Section id="contato" title="Contato">
          <Card>
            <CardBody className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">E-mail</div>
                <a className="block hover:underline" href={`mailto:${data.email}`}>{data.email}</a>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Telefone</div>
                <div>{data.phone}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">LinkedIn</div>
                <a className="block hover:underline" href={data.links.linkedin} target="_blank">{data.links.linkedin}</a>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Behance</div>
                <a className="block hover:underline" href={data.links.behance} target="_blank">{data.links.behance}</a>
              </div>
            </CardBody>
          </Card>
          <p className="mt-3 text-sm text-muted-foreground">Dica: clique em <span className="px-1.5 py-0.5 border rounded">PDF</span> no topo para imprimir ou salvar em PDF.</p>
        </Section>
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} {data.name}. Todos os direitos reservados.</span>
          <a href="#top" className="hover:underline">Voltar ao topo ↑</a>
        </div>
      </footer>

      {/* Print styles */}
      <style>{`
        @media print {
          header, footer, nav, button { display: none !important; }
          section { page-break-inside: avoid; }
          a { text-decoration: none; color: inherit; }
          .scroll-mt-24 { scroll-margin-top: 0; }
        }
      `}</style>
    </div>
  );
}
