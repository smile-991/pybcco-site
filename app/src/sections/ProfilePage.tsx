import SeoHead from "@/components/SeoHead";
import ProfileQR from "@/sections/ProfileQR";

const SITE = "https://www.pybcco.com";

export default function ProfilePage() {
  return (
    <main dir="rtl" className="min-h-screen bg-white">
      <SeoHead
        title="بروفايل الشركة | بنيان الهرم للمقاولات"
        description="تحميل بروفايل شركة بنيان الهرم للمقاولات (PYBCCO) + تواصل مباشر."
        canonical={`${SITE}/profile`}
      />

      {/* مسافة فوق مشان النافبار */}
      <section className="pt-28">
        <ProfileQR />
      </section>
    </main>
  );
}