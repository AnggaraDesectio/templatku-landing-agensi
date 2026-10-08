// Landing page KREASINUSA, agensi digital.
// Halaman ini TIDAK memakai AuthenticatedLayout, header/nav + footer inline, self-contained.
// Tidak menerima props.
import { useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StickyMobileCta } from '@/components/sticky-mobile-cta';
import { StatCounter } from '@/components/stat-counter';
import {
    ArrowRight,
    Brush,
    CheckCircle2,
    Globe,
    Lightbulb,
    Menu,
    Quote,
    Rocket,
    Search,
    Share2,
    Sparkles,
    X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Format rupiah gaya Indonesia: 25000000 -> "Rp25.000.000"
const rupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;

// ---------- Data ----------

type Kategori = 'web' | 'branding' | 'sosmed';

interface Proyek {
    nama: string;
    klien: string;
    kategori: Kategori;
    hasil: string;
    foto: string;
}

const PORTOFOLIO: Proyek[] = [
    { nama: 'Toko Online Fashion', klien: 'Brand pakaian, Bandung', kategori: 'web', hasil: 'Konversi naik 2,4x', foto: '/images/landing-agensi/portofolio-fashion.jpg' },
    { nama: 'Rebranding Kopi Lokal', klien: 'Coffee chain, Jakarta', kategori: 'branding', hasil: 'Brand recall +68%', foto: '/images/landing-agensi/portofolio-kopi.jpg' },
    { nama: 'Kampanye TikTok Skincare', klien: 'Brand kecantikan, Surabaya', kategori: 'sosmed', hasil: '12 jt views organik', foto: '/images/landing-agensi/portofolio-skincare.jpg' },
    { nama: 'Company Profile Properti', klien: 'Developer, Bali', kategori: 'web', hasil: 'Leads naik 3,1x', foto: '/images/landing-agensi/portofolio-properti.jpg' },
    { nama: 'Identitas Resto Nusantara', klien: 'Restoran, Yogyakarta', kategori: 'branding', hasil: 'Rating 4.9 di Google', foto: '/images/landing-agensi/portofolio-resto.jpg' },
    { nama: 'Konten IG Klinik Gigi', klien: 'Klinik, Semarang', kategori: 'sosmed', hasil: 'Followers 8 rb → 61 rb', foto: '/images/landing-agensi/portofolio-klinik.jpg' },
];

const TAB_KATEGORI = [
    { value: 'semua', label: 'Semua' },
    { value: 'web', label: 'Web' },
    { value: 'branding', label: 'Branding' },
    { value: 'sosmed', label: 'Sosial Media' },
] as const;

const LAYANAN = [
    { nama: 'Website & E-Commerce', deskripsi: 'Website company profile, landing page, dan toko online yang cepat dan menjual.', icon: Globe, poin: ['Desain UI/UX kustom', 'SEO-ready & cepat', 'Integrasi pembayaran'] },
    { nama: 'Branding & Identitas', deskripsi: 'Logo, guideline visual, dan kemasan yang bikin brand-mu diingat.', icon: Brush, poin: ['Logo & visual identity', 'Brand guideline', 'Desain kemasan'] },
    { nama: 'Kelola Sosial Media', deskripsi: 'Konten rutin, copywriting, dan ads yang mendatangkan leads berkualitas.', icon: Share2, poin: ['20 konten/bulan', 'Copywriting & desain', 'Meta & TikTok Ads'] },
];

const PROSES = [
    { tahap: 'Discovery', deskripsi: 'Kami gali target bisnismu, audiens, dan kompetitor lewat workshop 2 jam.', icon: Search },
    { tahap: 'Konsep', deskripsi: 'Kamu terima 2–3 arah konsep dengan moodboard dan rationale yang jelas.', icon: Lightbulb },
    { tahap: 'Produksi', deskripsi: 'Eksekusi dengan revisi terstruktur, progress bisa dipantau tiap minggu.', icon: Sparkles },
    { tahap: 'Peluncuran', deskripsi: 'Serah terima + panduan pakai, plus pendampingan 30 hari setelah launching.', icon: Rocket },
];

// Testimoni teratribusi: nama + hasil terukur, bukan "John Doe".
const TESTIMONI = [
    { kutip: 'Website baru kami akhirnya terlihat seperti brand nasional. Leads dari Google naik tiga kali lipat dalam 4 bulan.', nama: 'Dimas Prasetyo', jabatan: 'Direktur Marketing', perusahaan: 'PT Cahaya Properti Nusantara' },
    { kutip: 'Tim Kreasinusa paham banget bahasa anak muda. Kampanye TikTok kami viral tanpa perlu budget ads jumbo, 12 juta views organik.', nama: 'Anisa Rahma', jabatan: 'Founder', perusahaan: 'GlowLab Skincare' },
    { kutip: 'Rebranding-nya rapi dan sistematis. Sekarang semua outlet punya identitas yang konsisten.', nama: 'Yoga Saputra', jabatan: 'Owner', perusahaan: 'Kopi Aroma Timur' },
];

const PAKET = [
    {
        nama: 'Starter',
        harga: 15000000,
        durasi: 'proyek',
        untuk: 'Bisnis baru yang butuh fondasi digital.',
        fitur: ['Landing page 5 section', 'Logo + kartu nama', 'Setup Instagram bisnis', '1x revisi mayor'],
    },
    {
        nama: 'Growth',
        harga: 35000000,
        durasi: 'proyek',
        untuk: 'Bisnis berjalan yang siap scale up.',
        fitur: ['Website company profile / toko online', 'Brand guideline lengkap', '20 konten sosmed + ads setup', '3x revisi mayor', 'Pendampingan 30 hari'],
        unggulan: true,
    },
    {
        nama: 'Retainer',
        harga: 12000000,
        durasi: '/bulan',
        untuk: 'Butuh tim kreatif bulanan tanpa rekrut.',
        fitur: ['20 konten sosmed/bulan', 'Manajemen iklan', 'Laporan performa bulanan', 'Prioritas pengerjaan'],
    },
];

// ---------- Halaman ----------

export default function AgensiLanding() {
    const [menuBuka, setMenuBuka] = useState(false);
    const [tabAktif, setTabAktif] = useState<(typeof TAB_KATEGORI)[number]['value']>('semua');

    const proyekTampil = tabAktif === 'semua' ? PORTOFOLIO : PORTOFOLIO.filter((p) => p.kategori === tabAktif);

    // Form konsultasi, tanpa backend, hanya state konfirmasi.
    const [nama, setNama] = useState('');
    const [noWa, setNoWa] = useState('');
    const [kebutuhan, setKebutuhan] = useState('');
    const [konsultasiOk, setKonsultasiOk] = useState(false);

    function kirimKonsultasi(e: FormEvent) {
        e.preventDefault();
        if (!nama.trim() || !noWa.trim()) return;
        setKonsultasiOk(true);
    }

    const scrollKe = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const navLinks = [
        { href: '#beranda', label: 'Beranda' },
        { href: '#portofolio', label: 'Portofolio' },
        { href: '#layanan', label: 'Layanan' },
        { href: '#proses', label: 'Proses' },
        { href: '#harga', label: 'Harga' },
    ];

    return (
        <div className="min-h-screen bg-stone-950 pb-24 text-stone-100 md:pb-0">
            {/* Navbar */}
            <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
                    <a href="#beranda" className="flex items-center gap-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400">
                            <Sparkles className="h-5 w-5 text-stone-950" />
                        </span>
                        <span className="text-xl font-extrabold tracking-tight text-white">
                            KREASI<span className="text-lime-400">NUSA</span>
                        </span>
                    </a>
                    <nav className="ml-8 hidden items-center gap-1 md:flex">
                        {navLinks.map((l) => (
                            <a key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm font-medium text-stone-400 transition-colors hover:bg-white/5 hover:text-white">
                                {l.label}
                            </a>
                        ))}
                    </nav>
                    <Button className="ml-auto hidden bg-lime-400 text-stone-950 hover:bg-lime-300 sm:inline-flex" onClick={() => scrollKe('konsultasi')}>
                        Konsultasi Gratis <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-auto text-white sm:hidden" onClick={() => setMenuBuka((v) => !v)} aria-label="Menu">
                        {menuBuka ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
                {menuBuka && (
                    <nav className="border-t border-white/10 px-4 py-2 md:hidden">
                        {navLinks.map((l) => (
                            <a key={l.href} href={l.href} onClick={() => setMenuBuka(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-stone-300 hover:bg-white/5">
                                {l.label}
                            </a>
                        ))}
                    </nav>
                )}
            </header>

            {/* Hero, 1 proposisi konkret, CTA primer = konversi */}
            <section id="beranda" className="relative overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 15% 20%, rgba(163,230,53,.12) 0, transparent 40%), radial-gradient(circle at 85% 70%, rgba(217,70,239,.1) 0, transparent 45%)' }} aria-hidden />
                <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
                    <h1 className="font-display max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        120+ proyek, 94% klien kembali. <span className="text-lime-400">Brand-mu pantas terlihat mahal.</span>
                    </h1>
                    <p className="mt-4 max-w-xl text-stone-400">
                        Kami merancang website, identitas brand, dan konten sosial media yang bukan cuma bagus
                        dilihat, tapi terbukti menaikkan penjualan klien.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Button size="lg" className="bg-lime-400 text-stone-950 hover:bg-lime-300" onClick={() => scrollKe('konsultasi')}>
                            Konsultasi 30 Menit, Gratis
                        </Button>
                        <button onClick={() => scrollKe('portofolio')} className="text-sm font-semibold text-stone-400 underline decoration-lime-400/50 underline-offset-4 hover:text-white">
                            Lihat portofolio dulu
                        </button>
                    </div>
                    <div className="mt-12 grid grid-cols-3 gap-4">
                        {[
                            { nilai: 120, suffix: '+', label: 'Proyek selesai' },
                            { nilai: 8, suffix: ' thn', label: 'Berpengalaman' },
                            { nilai: 94, suffix: '%', label: 'Klien kembali lagi' },
                        ].map((s) => (
                            <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-5">
                                <p className="tnum text-3xl font-extrabold text-lime-400">
                                    <StatCounter value={s.nilai} suffix={s.suffix} />
                                </p>
                                <p className="mt-1 text-xs text-stone-400">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portofolio */}
            <section id="portofolio" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-14">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">Portofolio</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white">Kerja yang berbicara</h2>
                    <p className="mt-2 text-sm text-stone-400">Setiap proyek diukur dari hasil bisnisnya, bukan sekadar tampilannya.</p>
                </div>
                <Tabs value={tabAktif} onValueChange={(v) => setTabAktif(v as typeof tabAktif)} className="mt-8">
                    <TabsList className="mx-auto flex w-full max-w-xl bg-white/10">
                        {TAB_KATEGORI.map((t) => (
                            <TabsTrigger key={t.value} value={t.value} className="flex-1 text-stone-300 data-[state=active]:bg-lime-400 data-[state=active]:text-stone-950">
                                {t.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {TAB_KATEGORI.map((t) => (
                        <TabsContent key={t.value} value={t.value}>
                            <div className="grid gap-5 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                                {proyekTampil.map((p) => (
                                    <div key={p.nama} className="group overflow-hidden rounded-2xl border border-white/10 bg-stone-900 transition-transform hover:-translate-y-1">
                                        <div className="relative h-44 overflow-hidden">
                                            <img src={p.foto} alt={p.nama} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                                            <Badge className="absolute top-2 left-2 bg-black/40 text-white hover:bg-black/40">{p.hasil}</Badge>
                                        </div>
                                        <div className="p-4">
                                            <p className="font-bold text-white">{p.nama}</p>
                                            <p className="mt-0.5 text-xs text-stone-400">{p.klien}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </section>

            {/* Layanan */}
            <section id="layanan" className="scroll-mt-16 border-y border-white/10 bg-stone-900/50 py-14">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">Layanan</p>
                        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white">Tiga senjata utama</h2>
                    </div>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {LAYANAN.map((l) => (
                            <Card key={l.nama} className="border-white/10 bg-stone-900 text-stone-100 transition-shadow hover:shadow-lg">
                                <CardHeader>
                                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400">
                                        <l.icon className="h-6 w-6 text-stone-950" />
                                    </span>
                                    <CardTitle className="mt-3 text-white">{l.nama}</CardTitle>
                                    <p className="text-sm text-stone-400">{l.deskripsi}</p>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-stone-300">
                                        {l.poin.map((poin) => (
                                            <li key={poin} className="flex items-start gap-2">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" /> {poin}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proses */}
            <section id="proses" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-14">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">Cara Kerja</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white">Proses yang transparan</h2>
                    <p className="mt-2 text-sm text-stone-400">Kamu selalu tahu proyekmu ada di tahap apa, tanpa perlu bertanya.</p>
                </div>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {PROSES.map((p, i) => (
                        <div key={p.tahap} className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
                            <span className="tnum absolute top-3 right-4 text-4xl font-extrabold text-white/10">{i + 1}</span>
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                                <p.icon className="h-5 w-5 text-lime-400" />
                            </span>
                            <p className="mt-3 font-bold text-white">{p.tahap}</p>
                            <p className="mt-1 text-sm text-stone-400">{p.deskripsi}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimoni teratribusi */}
            <section className="border-y border-white/10 bg-stone-900/50 py-14">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">Kata Klien</p>
                        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white">Mereka yang sudah bekerja sama</h2>
                    </div>
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {TESTIMONI.map((t) => (
                            <Card key={t.perusahaan} className="border-white/10 bg-stone-900 text-stone-100">
                                <CardContent className="p-6">
                                    <Quote className="h-8 w-8 text-lime-400/60" />
                                    <p className="mt-3 text-sm leading-relaxed text-stone-300">"{t.kutip}"</p>
                                    <div className="mt-4 border-t border-white/10 pt-4">
                                        <p className="text-sm font-bold text-white">{t.nama}</p>
                                        <p className="text-xs text-stone-500">{t.jabatan} · {t.perusahaan}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Harga */}
            <section id="harga" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-14">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-300">Paket Harga</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-white">Investasi yang jelas</h2>
                    <p className="mx-auto mt-2 max-w-lg text-sm text-stone-400">Harga proyek final mengikuti brief, angka di bawah adalah titik mulai.</p>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {PAKET.map((p) => (
                        <Card key={p.nama} className={cn('flex flex-col border-white/10 bg-stone-900 text-stone-100 transition-shadow hover:shadow-lg', p.unggulan && 'border-lime-400 ring-2 ring-lime-400/30')}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white">{p.nama}</CardTitle>
                                    {p.unggulan && <Badge className="bg-lime-400 text-stone-950 hover:bg-lime-400">Terlaris, 7 dari 10 klien</Badge>}
                                </div>
                                <p className="mt-1 text-sm text-stone-400">{p.untuk}</p>
                                <p className="mt-2">
                                    <span className="text-xs text-stone-500">Mulai dari</span><br />
                                    <span className="tnum text-3xl font-extrabold text-lime-400">{rupiah(p.harga)}</span>
                                    <span className="text-sm text-stone-500"> {p.durasi}</span>
                                </p>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col">
                                <ul className="flex-1 space-y-2 text-sm text-stone-300">
                                    {p.fitur.map((f) => (
                                        <li key={f} className="flex items-start gap-2">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-lime-400" /> {f}
                                        </li>
                                    ))}
                                </ul>
                                <Button className={cn('mt-5 w-full', p.unggulan ? 'bg-lime-400 text-stone-950 hover:bg-lime-300' : 'border-white/20 text-white hover:bg-white/10')} variant={p.unggulan ? 'default' : 'outline'} onClick={() => scrollKe('konsultasi')}>
                                    Pilih {p.nama}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Konsultasi, form fungsional + bukti */}
            <section id="konsultasi" className="scroll-mt-16 border-t border-white/10 bg-gradient-to-br from-lime-400 to-emerald-400 py-14 text-stone-950">
                <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-2">
                    <div>
                        <h2 className="font-display text-3xl font-extrabold tracking-tight">Konsultasi 30 menit, gratis.</h2>
                        <p className="mt-2 max-w-md text-sm text-stone-800">
                            Ceritakan kebutuhanmu, kami beri penilaian jujur: apakah kamu butuh agensi,
                            dan paket mana yang paling masuk akal. Tanpa hard selling.
                        </p>
                        <ul className="mt-5 space-y-2 text-sm font-medium">
                            {['Respons maksimal 1x24 jam', 'Estimasi biaya transparan di awal', 'NDA tersedia bila diperlukan'].map((x) => (
                                <li key={x} className="flex items-start gap-2">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> {x}
                                </li>
                            ))}
                        </ul>
                        <blockquote className="mt-6 max-w-md rounded-2xl bg-stone-950/5 p-5">
                            <p className="text-sm italic text-stone-800">
                                "Konsultasi pertamanya saja sudah membuka mata, mereka jujur bilang kami belum
                                butuh website, cukup landing page. Hemat Rp20 juta."
                            </p>
                            <footer className="mt-2 text-xs font-semibold text-stone-700">
                                Fajar Nugroho, owner Kopi Pagi, Yogyakarta
                            </footer>
                        </blockquote>
                    </div>
                    <Card className="border-stone-950/10">
                        <CardHeader>
                            <CardTitle>Minta Jadwal Konsultasi</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {konsultasiOk ? (
                                <div className="rounded-xl bg-green-50 p-6 text-center">
                                    <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
                                    <p className="mt-3 text-lg font-bold text-green-800">Terima kasih!</p>
                                    <p className="mt-1 text-sm text-green-700">
                                        Halo <span className="font-semibold">{nama}</span>, tim kami akan menghubungimu
                                        di {noWa} maksimal 1x24 jam untuk menjadwalkan sesi konsultasi.
                                    </p>
                                    <Button variant="outline" className="mt-4" onClick={() => { setKonsultasiOk(false); setNama(''); setNoWa(''); setKebutuhan(''); }}>
                                        Kirim lagi
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={kirimKonsultasi} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="kn-nama">Nama</Label>
                                        <Input id="kn-nama" placeholder="Nama kamu" value={nama} onChange={(e) => setNama(e.target.value)} required />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="kn-wa">Nomor WhatsApp</Label>
                                        <Input id="kn-wa" placeholder="cth: 081234567890" inputMode="tel" value={noWa} onChange={(e) => setNoWa(e.target.value)} required />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="kn-kebutuhan">Kebutuhan proyek</Label>
                                        <Textarea id="kn-kebutuhan" rows={3} placeholder="cth: Butuh website toko online + logo untuk brand fashion..." value={kebutuhan} onChange={(e) => setKebutuhan(e.target.value)} />
                                    </div>
                                    <Button type="submit" className="w-full bg-stone-950 text-white hover:bg-stone-800">Minta Jadwal Konsultasi</Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-stone-400">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-400">
                                <Sparkles className="h-4 w-4 text-stone-950" />
                            </span>
                            <span className="text-lg font-extrabold text-white">KREASI<span className="text-lime-400">NUSA</span></span>
                        </div>
                        <p className="mt-3 text-sm">Agensi digital Jakarta. Website, branding, dan sosial media yang menjual.</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Layanan</p>
                        <ul className="mt-3 space-y-1.5 text-sm">
                            <li><a href="#layanan" className="hover:text-lime-300">Website & E-Commerce</a></li>
                            <li><a href="#layanan" className="hover:text-lime-300">Branding & Identitas</a></li>
                            <li><a href="#layanan" className="hover:text-lime-300">Kelola Sosial Media</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Kontak</p>
                        <ul className="mt-3 space-y-1.5 text-sm">
                            <li>Jl. Kemang Raya No. 27, Jakarta Selatan</li>
                            <li>0812-3456-7890</li>
                            <li>halo@kreasinusa.id</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 py-4 text-center text-xs">© 2026 Kreasinusa. Dibuat dengan obsesi pada detail.</div>
            </footer>

            {/* CTA sticky mobile */}
            <StickyMobileCta
                variant="whatsapp"
                title="Kreasinusa"
                subtitle="Konsultasi 30 menit gratis"
                actionLabel="Chat WhatsApp"
                onAction={() => window.open('https://wa.me/6281234567890?text=Halo%20Kreasinusa!%20Saya%20mau%20konsultasi%20gratis.', '_blank', 'noopener')}
            />
        </div>
    );
}
