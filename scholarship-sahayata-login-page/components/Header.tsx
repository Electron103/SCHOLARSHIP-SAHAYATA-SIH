import NotificationBell from "./NotificationBell"; // adjust path if needed

export default function Header() {
  return (
    <header>
      {/* other header elements */}
      <div className="header-right">
        <NotificationBell />
      </div>
    </header>
  );
}
