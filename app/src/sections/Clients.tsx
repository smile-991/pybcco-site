
const clients = [
  { name: "KAFD", src: "/clients/kafd.png" },
  { name: "KAEC", src: "/clients/kaec.png" },
  { name: "KKIA", src: "/clients/kkia.png" },
  { name: "McDonald's", src: "/clients/mcdonalds.png" },

  { name: "Nesma", src: "/clients/nesma.png" },
  { name: "MBL", src: "/clients/mbl.png" },
  { name: "Built Industrial", src: "/clients/built.png" },
  { name: "Salini", src: "/clients/salini.png" },

  { name: "Sela", src: "/clients/sela.png" },
  { name: "GEA", src: "/clients/tarfeeh.png" },
  { name: "Derrah", src: "/clients/derrah.png" },
  { name: "Marco", src: "/clients/marco.png" },
];

export default function Clients() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">
            عملاؤنا
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => (
            <div
              key={index}
              className="bg-white h-32 flex items-center justify-center rounded-xl shadow-sm hover:shadow-md transition duration-300 p-6"
            >
              <img
                src={client.src}
                alt={client.name}
                className="max-h-16 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
