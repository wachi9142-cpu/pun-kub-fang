import { Star } from "lucide-react";
import { REVIEWS } from "@/data/site";

export default function Reviews() {
  return (
    <section id="reviews" className="py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-grape-700 sm:text-4xl">
            รีวิวจากลูกค้า <span className="text-blossom-400">💗</span>
          </h2>
          <p className="mt-2 text-grape-500">
            เสียงจริงจากคนที่หลงรักความสดชื่นของเรา
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <figure
              key={r.id}
              className="hover-lift flex flex-col rounded-3xl bg-white/80 p-6 shadow-card ring-1 ring-white/70"
            >
              <div className="flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full text-lg font-bold text-white"
                  style={{ backgroundColor: r.avatarColor }}
                >
                  {r.name.replace(/^(น้อง|K\.|B\.)\s?/, "").charAt(0)}
                </span>
                <div>
                  <figcaption className="font-semibold text-grape-700">
                    {r.name}
                  </figcaption>
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill="#f4b23e"
                        className="text-[#f4b23e]"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-grape-600">
                “{r.text}”
              </blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
