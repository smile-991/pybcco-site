const clients = [
  { name: "KAFD", src: "/clients/kafd.webp" },
  { name: "KAEC", src: "/clients/kaec.webp" },
  { name: "KKIA", src: "/clients/kkia.webp" },
  { name: "McDonald's", src: "/clients/mcdonalds.webp" },

  { name: "Nesma", src: "/clients/nesma.webp" },
  { name: "MBL", src: "/clients/mbl.webp" },
  { name: "Built Industrial", src: "/clients/built.webp" },
  { name: "Salini", src: "/clients/salini.webp" },

  { name: "Sela", src: "/clients/sela.webp" },
  { name: "GEA", src: "/clients/tarfeeh.webp" },
  { name: "Derrah", src: "/clients/derrah.webp" },
  { name: "Marco", src: "/clients/marco.webp" },
];

export default function Clients() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            عملاؤنا
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="bg-white h-24 sm:h-28 md:h-32 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition duration-300 p-4 sm:p-6"
            >
              <img
                src={client.src}
                alt={`شعار ${client.name}`}
                loading="lazy"
                decoding="async"
                width="140"
                height="70"
                className="max-h-12 sm:max-h-14 md:max-h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}