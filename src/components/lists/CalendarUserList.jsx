import CalendarActivity from "../subcomponents/CalendarActivity";

export default function CalendarUserList({ userActivities }) {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      {userActivities?.map((activity, index) => (
        <CalendarActivity key={activity?.id} index={index} activity={activity} />
      ))}
    </div>
  );
}
