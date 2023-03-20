import ActivityList from "../components/lists/ActivityList";
export default function ActivitiesPage() {
  return (
    <section className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-xl lg:mt-14 lg:text-center">Aktiviteter</h1>
      <ActivityList />
    </section>
  );
}
