import CalendarActivity from "../subcomponents/CalendarActivity";

export default function CalendarUserList({ userActivities }) {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      {userActivities?.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border p-4">
          <h1 className="text-center text-lg">Du er ikke tilmeldt nogle aktiviteter, kig rundt for at finde nye aktiviteter!</h1>
        </div>
      ) : (
        userActivities?.map((activity, index) => <CalendarActivity key={activity?.id} index={index} activity={activity} />)
      )}
    </div>
  );
}
