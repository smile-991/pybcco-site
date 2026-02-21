import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Phone, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";

type Product = {
  id: string;
  name: string;
  texture: string;
  images: string[];
  popular?: boolean;
};

const SITE_URL = "https://pybcco.com";

const PRICE_BOARD = 95;
const INSTALL_PRICE = 60;

const DIMENSIONS = "290 × 120 سم";
const THICKNESS = "3 مم";
const WARRANTY = "5 سنوات ضد عيوب التصنيع";

export default function DecorMarble() {
  const products: Product[] = useMemo(
    () => [
      { id: "C", name: "بديل رخام – C", texture: "خشن", images: ["/decor/marble/C1.webp", "/decor/marble/C2.webp"], popular: true },
      { id: "R", name: "بديل رخام – R", texture: "ملمس بارز", images: ["/decor/marble/R1.webp", "/decor/marble/R2.webp"], popular: true },
      { id: "T", name: "بديل رخام – T", texture: "خشن", images: ["/decor/marble/T1.webp", "/decor/marble/T2.webp"], popular: true },

      { id: "A", name: "بديل رخام – A", texture: "خشن", images: ["/decor/marble/A1.webp", "/decor/marble/A2.webp"] },
      { id: "B", name: "بديل رخام – B", texture: "خشن", images: ["/decor/marble/B1.webp", "/decor/marble/B2.webp"] },
      { id: "F", name: "بديل رخام – F", texture: "خشن", images: ["/decor/marble/F1.webp", "/decor/marble/F2.webp"] },
      { id: "G", name: "بديل رخام – G", texture: "خشن", images: ["/decor/marble/G1.webp", "/decor/marble/G2.webp"] },
      { id: "J", name: "بديل رخام – J", texture: "خشن", images: ["/decor/marble/J1.webp", "/decor/marble/J2.webp"] },
      { id: "U", name: "بديل رخام – U", texture: "خشن", images: ["/decor/marble/U1.webp", "/decor/marble/U2.webp"] },
    ],
    []
  );

  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <SeoHead
        title="بديل الرخام بالرياض | سعر اللوح 95 ريال + تركيب 60 ريال/م² – PYBCCO"
        description="ألواح بديل الرخام بعروق طبيعية تحاكي الرخام الفاخر. مقاوم للماء، سهل التنظيف، مقاس 290×120 سم، تركيب احترافي داخل الرياض."
        canonical="https://pybcco.com/decor/marble"
      />

      <main className="pt-28 pb-28">
        <div className="container-custom">

          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-800">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link to="/decor" className="hover:text-gray-800">المتجر</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-semibold">بديل الرخام</span>
          </div>

          {/* Header */}
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            بديل الرخام (PVC)
          </h1>

          <p className="text-gray-600 max-w-3xl leading-relaxed">
            ألواح بعروق ظاهرة تُحاكي الرخام الطبيعي، تمنح الجدران مظهراً فاخراً
            مع مقاومة عالية للماء وسهولة في التنظيف. مناسبة للمجالس والمطابخ
            وغرف النوم داخل الرياض.
          </p>

          {/* Price Strip */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 mb-12">
            <div className="rounded-2xl border p-4">
              <div className="text-xs text-gray-500">سعر اللوح</div>
              <div className="text-xl font-extrabold mt-1">{PRICE_BOARD} ريال</div>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="text-xs text-gray-500">التركيب</div>
              <div className="text-xl font-extrabold mt-1">{INSTALL_PRICE} ريال/م²</div>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="text-xs text-gray-500">المقاس</div>
              <div className="text-xl font-extrabold mt-1">{DIMENSIONS}</div>
            </div>
            <div className="rounded-2xl border p-4">
              <div className="text-xs text-gray-500">السماكة</div>
              <div className="text-xl font-extrabold mt-1">{THICKNESS}</div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <article key={p.id} className="rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="aspect-[4/3] bg-gray-100 cursor-pointer" onClick={() => setLightbox(p.images[0])}>
                  <img
                    src={p.images[0]}
                    alt={`${p.name} – ${p.texture}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold">{p.name}</h3>
                    {p.popular && (
                      <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full font-bold">
                        الأكثر طلباً
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mt-2">
                    الملمس: {p.texture}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500">سعر اللوح</div>
                      <div className="font-extrabold">{PRICE_BOARD} ريال</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">التركيب</div>
                      <div className="font-extrabold">{INSTALL_PRICE} ريال/م²</div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button asChild className="w-full bg-gold text-black font-bold">
                      <a href="https://wa.me/966550604837" target="_blank" rel="noopener noreferrer">
                        طلب / استفسار
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Warranty */}
          <div className="mt-14 text-gray-600 text-sm">
            الضمان: {WARRANTY}
          </div>

        </div>
      </main>
    </>
  );
}