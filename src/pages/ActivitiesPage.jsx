import ActivityList from "../components/lists/ActivityList";
import SEO from "../components/global/SEO";
export default function ActivitiesPage() {
  return (
    <>
      <SEO title="Landrup Dans - Aktiviteter" />
      <section className="mx-auto max-w-6xl p-6">
        <h1 className="mb-8 text-xl lg:mt-14 lg:text-center">Aktiviteter</h1>
        <ActivityList />
      </section>
    </>
  );
}
