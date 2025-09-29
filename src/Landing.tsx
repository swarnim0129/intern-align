import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Building2, GraduationCap, Landmark, ShieldCheck } from 'lucide-react'

const Landing = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/dashboard')
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-orange-200 via-white to-green-200 dark:bg-background text-foreground">
      {/* Top Govt Bar */}
     

      {/* Navbar */}
      <header className="h-16 border-b border-border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto max-w-7xl h-full px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Match Mitra" className="h-14 rounded" />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">Matchमित्र</div>
              <div className="text-[10px] text-muted-foreground -mt-0.5">AI-powered Internship Matching</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a className="hover:text-foreground" href="#about">About</a>
            <a className="hover:text-foreground" href="#benefits">Benefits</a>
            <a className="hover:text-foreground" href="#process">Process</a>
            <a className="hover:text-foreground" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center gap-3 w-full max-w-md">
            <Input placeholder="Search companies, students, roles..." className="w-full" />
            <Button variant="default" onClick={handleGetStarted}>Get Started</Button>
          </div>
        </div>
      </header>
      <div className="w-full border-b border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 h-9 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-flex overflow-hidden rounded-sm">
              <span className="h-1.5 w-4 bg-[#FF9933]" />
              <span className="h-1.5 w-4 bg-white" />
              <span className="h-1.5 w-4 bg-[#138808]" />
            </span>
            <span>Government of India</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">PM Internship Scheme</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <a className="hover:text-foreground" href="#accessibility">Accessibility</a>
            <a className="hover:text-foreground" href="#screen-reader">Screen Reader</a>
            <a className="hover:text-foreground" href="#faq">FAQ</a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <main className="flex-1">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_10%_10%,hsl(var(--primary)/0.06),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Copy */}
          <section className="space-y-6">
            <div>
              {/* <p className="uppercase text-xs tracking-wider text-muted-foreground mb-2">AI-powered internship matching</p> */}
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                Match<span className="bg-gradient-to-br from-orange-600  to-green-600 bg-clip-text text-transparent">मित्र</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-base sm:text-lg">
              A nationwide platform that intelligently connects students with companies. Visualize demand and talent density across India and streamline allocations with data-driven insights.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={handleGetStarted}>Explore Dashboard</Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/companies">Browse Companies</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded bg-muted">Real-time analytics</span>
              <span className="px-2 py-1 rounded bg-muted">State-wise insights</span>
              <span className="px-2 py-1 rounded bg-muted">Smart matching</span>
            </div>

            {/* Trust band like govt sites */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="rounded-lg border border-border bg-card p-3 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Secure & Verified</div>
                  <div className="text-xs text-muted-foreground">Govt-grade data privacy</div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3 flex items-center gap-3">
                <Landmark className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Departments Onboarded</div>
                  <div className="text-xs text-muted-foreground">Central & State</div>
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3 flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-medium text-foreground">Students Benefitted</div>
                  <div className="text-xs text-muted-foreground">Nationwide</div>
                </div>
              </div>
            </div>
          </section>

          {/* Right - India Map with heatmap */}
          <section className="relative">
            <div className="relative rounded-xl border border-border bg-card p-4 sm:p-6 shadow-lg">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-transparent">
                <img
                  src="/indiaMap.png"
                  alt="India Map"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Marker overlay (Google Maps-like pins) */}
                <div className="absolute inset-0 pointer-events-none">
                  {[
                    // Delhi vicinity (more left, more down)
                    [45.0, 41.5], [44.2, 42.8], [45.6, 43.4],
                    // Gujarat
                    [24.0, 55.0], [25.8, 56.2], [23.2, 56.8], [26.6, 54.5],
                    // Maharashtra
                    [32.0, 68.0], [33.6, 66.6], [30.8, 66.2], [31.4, 69.6], [33.0, 68.8],
                    // Karnataka
                    [33.2, 76.5], [34.6, 78.0], [32.4, 78.8], [34.0, 75.4],
                    // Tamil Nadu
                    [38.2, 86.5], [39.8, 88.0], [38.8, 88.8], [37.6, 85.2],
                    // Scatter across country
                    [28.5, 47.0], [36.0, 52.0], [42.0, 54.0], [47.5, 48.0], [20.0, 60.0], [27.5, 72.0], [39.0, 70.0], [45.0, 78.0]
                  ].map(([left, top], idx) => (
                    <div key={idx} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: `${left}%`, top: `${top - 12}%` }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] animate-[bounce_2.2s_infinite_ease-in-out]">
                        <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" fill="#ef4444"/>
                        <circle cx="12" cy="8" r="3" fill="white"/>
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[rgba(255,99,71,0.9)]" /> High demand
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[rgba(255,165,0,0.9)]" /> Medium demand
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[rgba(50,205,50,0.9)]" /> Talent rich
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[rgba(30,144,255,0.9)]" /> Emerging
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Info Tiles */}
        <div className="mx-auto max-w-7xl px-4 pb-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <div className="font-medium">For Students</div>
            </div>
            <p className="text-sm text-muted-foreground">Discover internships tailored to your skills and location.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="h-5 w-5 text-primary" />
              <div className="font-medium">For Companies</div>
            </div>
            <p className="text-sm text-muted-foreground">Access pre-vetted candidates with transparent eligibility.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition">
            <div className="flex items-center gap-3 mb-2">
              <Landmark className="h-5 w-5 text-primary" />
              <div className="font-medium">For Departments</div>
            </div>
            <p className="text-sm text-muted-foreground">Plan allocations with state-wise insights and analytics.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Landing
