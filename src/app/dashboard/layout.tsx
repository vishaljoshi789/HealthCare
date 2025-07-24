"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  BarChart2,
  Users,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
  PersonStanding,
  ChevronDown,
  Baby,
  Activity,
  Calendar,
  User,
  X
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useAxios from "../hooks/UseAxios";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [pregnancyOpen, setPregnancyOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/");
  };
  
  const [userInfo, setUserInfo] = useState<any>(null);
  const api = useAxios();
  
  const getUserInfo = async () => {
    const res = await api.get("/userInfo/");
    if (res.status == 200) {
      setUserInfo(res.data);
    }
  };
  
  useEffect(() => {
    getUserInfo();
    
    // Check if screen is mobile on initial load
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar on mobile, open on desktop
      setSidebarOpen(window.innerWidth >= 768);
    };
    
    // Run check on mount
    checkIfMobile();
    
    // Add event listener for resize
    window.addEventListener("resize", checkIfMobile);
    
    // Clean up event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleLogout = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem("accessToken");
    router.push("/auth/login");
  };

  // Function to close sidebar when clicking outside on mobile
  const handleOverlayClick = () => {
    if (isMobile && sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20" 
          onClick={handleOverlayClick}
        ></div>
      )}

      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 mr-2"
              aria-label="Toggle menu"
            >
              {sidebarOpen && isMobile ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl font-semibold truncate">Dashboard</h1>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 lg:w-64"
              />
              <Search
                size={16}
                className="absolute left-2 top-2.5 text-gray-500"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">Appointment Reminder</span>
                    <span className="text-sm text-gray-500">
                      Your next checkup is tomorrow at 2:00 PM
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col">
                    <span className="font-medium">New Message</span>
                    <span className="text-sm text-gray-500">
                      Dr. Smith sent you a message
                    </span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <span className="text-blue-600">View all notifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium cursor-pointer">
                  US
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-0 mt-14 bg-white h-[calc(100vh-56px)] shadow-md transition-all duration-300 z-30 flex flex-col w-64 md:w-64 ${
          sidebarOpen 
            ? "translate-x-0" 
            : "-translate-x-full md:translate-x-0 md:w-20"
        }`}
      >
        <div className="py-4 flex-grow overflow-y-auto">
          <div className={`px-4 mb-4 ${!sidebarOpen && !isMobile ? "text-center" : ""}`}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              {sidebarOpen || isMobile ? "MAIN NAVIGATION" : "MENU"}
            </h2>
          </div>

          <nav className="space-y-1 px-2">
            <Link
              href="/dashboard"
              className={`flex items-center px-4 py-3 rounded-md hover:bg-blue-50 hover:text-blue-600 group ${
                isActive("/dashboard")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-900"
              } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
            >
              <Home
                className={`${
                  isActive("/dashboard")
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-blue-600"
                } ${sidebarOpen || isMobile ? "mr-3" : ""}`}
                size={20}
              />
              {(sidebarOpen || isMobile) && <span className="font-medium">Home</span>}
            </Link>
          </nav>

          <div className={`px-4 mb-4 mt-4 ${!sidebarOpen && !isMobile ? "text-center" : ""}`}>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
              {sidebarOpen || isMobile ? "General Care" : "CARE"}
            </h2>
          </div>

          <nav className="space-y-1 px-2">
            <Collapsible
              open={pregnancyOpen}
              onOpenChange={setPregnancyOpen}
              className="w-full"
            >
              <CollapsibleTrigger className="w-full">
                <div
                  className={`flex items-center px-4 py-3 rounded-md hover:bg-blue-50 hover:text-blue-600 cursor-pointer group ${
                    isActive("/pregnancy")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-900"
                  } ${!sidebarOpen && !isMobile ? "justify-center" : "justify-between"}`}
                >
                  <div className={`flex items-center ${!sidebarOpen && !isMobile ? "flex-col" : ""}`}>
                    <PersonStanding
                      className={`${
                        isActive("/pregnancy")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : "mb-1"}`}
                      size={20}
                    />
                    {(sidebarOpen || isMobile) ? (
                      <span className="font-medium">Consult</span>
                    ) : (
                      <span className="text-xs">Consult</span>
                    )}
                  </div>
                  {(sidebarOpen || isMobile) && (
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform duration-200 ${
                        pregnancyOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className={`space-y-1 mt-1 ${(sidebarOpen || isMobile) ? "pl-10 pr-2" : "px-2"}`}>
                  <Link
                    href="/dashboard/pregnancy"
                    className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 group ${
                      isActive("/dashboard/pregnancy")
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-900"
                    } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
                  >
                    <Activity
                      className={`${
                        isActive("/dashboard/pregnancy")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : ""}`}
                      size={16}
                    />
                    {(sidebarOpen || isMobile) && <span className="font-medium text-sm">Pregnancy</span>}
                  </Link>
                  <Link
                    href="/dashboard/child"
                    className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 group ${
                      isActive("/dashboard/child")
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-900"
                    } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
                  >
                    <Activity
                      className={`${
                        isActive("/dashboard/child")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : ""}`}
                      size={16}
                    />
                    {(sidebarOpen || isMobile) && <span className="font-medium text-sm">Child</span>}
                  </Link>
                  <Link
                    href="/dashboard/general"
                    className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 group ${
                      isActive("/dashboard/general")
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-900"
                    } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
                  >
                    <Activity
                      className={`${
                        isActive("/dashboard/general")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : ""}`}
                      size={16}
                    />
                    {(sidebarOpen || isMobile) && <span className="font-medium text-sm">General</span>}
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Collapsible
              open={childOpen}
              onOpenChange={setChildOpen}
              className="w-full"
            >
              <CollapsibleTrigger className="w-full">
                <div
                  className={`flex items-center px-4 py-3 rounded-md hover:bg-blue-50 hover:text-blue-600 cursor-pointer group ${
                    isActive("/medication")
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-900"
                  } ${!sidebarOpen && !isMobile ? "justify-center" : "justify-between"}`}
                >
                  <div className={`flex items-center ${!sidebarOpen && !isMobile ? "flex-col" : ""}`}>
                    <Baby
                      className={`${
                        isActive("/medication")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : "mb-1"}`}
                      size={20}
                    />
                    {(sidebarOpen || isMobile) ? (
                      <span className="font-medium">Medication</span>
                    ) : (
                      <span className="text-xs">Meds</span>
                    )}
                  </div>
                  {(sidebarOpen || isMobile) && (
                    <ChevronDown
                      size={16}
                      className={`transform transition-transform duration-200 ${
                        childOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className={`space-y-1 mt-1 ${(sidebarOpen || isMobile) ? "pl-10 pr-2" : "px-2"}`}>
                  <Link
                    href="/dashboard/medication/prescription"
                    className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 group ${
                      isActive("/medication/prescription")
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-900"
                    } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
                  >
                    <Activity
                      className={`${
                        isActive("/medication/prescription")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : ""}`}
                      size={16}
                    />
                    {(sidebarOpen || isMobile) && <span className="font-medium text-sm">Prescription</span>}
                  </Link>
                  <Link
                    href="/dashboard/medication/substitute"
                    className={`flex items-center px-4 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 group ${
                      isActive("/medication/substitute")
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-900"
                    } ${!sidebarOpen && !isMobile ? "justify-center" : ""}`}
                  >
                    <Activity
                      className={`${
                        isActive("/medication/substitute")
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-blue-600"
                      } ${(sidebarOpen || isMobile) ? "mr-3" : ""}`}
                      size={16}
                    />
                    {(sidebarOpen || isMobile) && (
                      <span className="font-medium text-sm">Substitute Medication</span>
                    )}
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </div>

        {/* Sidebar Footer with Profile */}
        {(sidebarOpen || isMobile) && (
          <div className="border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-100">
                  <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    US
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {userInfo?.first_name + " " + userInfo?.last_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {userInfo?.email}
                    </p>
                  </div>
                  <ChevronDown size={16} className="text-gray-500" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </aside>

      {/* Main content area */}
      <main
        className={`transition-all duration-300 pt-14 ${
          sidebarOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}