import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="bg-linear-to-br from-primary hidden lg:block via-black to-primary/50"></div>
      <Outlet />
      {/* Outlet: 자식 컴포넌트를 렌더링하는 공간 (인데 그냥 레이아웃 아닌 애들 여기에 들어간다고 생각하면 됨) */}
    </div>
  );
}
