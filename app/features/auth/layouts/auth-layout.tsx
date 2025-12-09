import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-linear-to-br from-primary via-black to-primary/50"></div>
      <Outlet /> {/* Outlet: 자식 컴포넌트를 렌더링하는 공간 */}
    </div>
  );
}
